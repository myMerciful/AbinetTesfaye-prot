require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const { sequelize, Project, ProjectFeature, ProjectTag, Experience, Profile, Message } = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Helper function to upload buffer to Cloudinary
const uploadToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    // If Cloudinary is not configured, fallback to a local mock (to not break local dev without keys)
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      console.warn('Cloudinary not configured. Skipping upload.');
      return resolve('/placeholder.png');
    }
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'portfolio', resource_type: 'auto' },
      (error, result) => {
        if (result) {
          resolve(result.secure_url);
        } else {
          reject(error);
        }
      }
    );
    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

// Use memory storage for Multer instead of disk
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(cors());
app.use(express.json());

// --- API Routes ---

// --- Profile ---
app.get('/api/profile', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/profile', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'resume', maxCount: 1 }]), async (req, res) => {
  try {
    let profile = await Profile.findOne();
    const updateData = { ...req.body };
    
    if (req.files && req.files['image']) {
      const url = await uploadToCloudinary(req.files['image'][0]);
      updateData.imageUrl = url;
    }
    if (req.files && req.files['resume']) {
      const url = await uploadToCloudinary(req.files['resume'][0]);
      updateData.resumeUrl = url;
    }
    
    if (profile) {
      await profile.update(updateData);
    } else {
      profile = await Profile.create(updateData);
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Projects ---
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [ProjectFeature, ProjectTag]
    });
    
    const formatted = projects.map(p => ({
      id: p.id,
      title: p.title,
      type: p.type,
      featured: p.featured,
      description: p.description,
      category: p.category,
      repo: p.repo,
      demo: p.demo,
      imageUrl: p.imageUrl,
      features: p.ProjectFeatures ? p.ProjectFeatures.map(f => f.feature) : [],
      tags: p.ProjectTags ? p.ProjectTags.map(t => t.tag) : []
    }));
    
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/projects', upload.single('image'), async (req, res) => {
  try {
    const projectData = { ...req.body };
    if (req.file) {
      projectData.imageUrl = await uploadToCloudinary(req.file);
    }
    
    const p = await Project.create(projectData);
    
    if (req.body.features) {
      const featureList = req.body.features.split(',').map(s => s.trim()).filter(s => s);
      for (const f of featureList) {
        await ProjectFeature.create({ feature: f, ProjectId: p.id });
      }
    }
    if (req.body.tags) {
      const tagList = req.body.tags.split(',').map(s => s.trim()).filter(s => s);
      for (const t of tagList) {
        await ProjectTag.create({ tag: t, ProjectId: p.id });
      }
    }
    
    res.json(p);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/projects/:id', upload.single('image'), async (req, res) => {
  try {
    const projectData = { ...req.body };
    if (req.file) {
      projectData.imageUrl = await uploadToCloudinary(req.file);
    }
    
    await Project.update(projectData, { where: { id: req.params.id } });
    
    if (req.body.features !== undefined) {
      await ProjectFeature.destroy({ where: { ProjectId: req.params.id } });
      const featureList = req.body.features.split(',').map(s => s.trim()).filter(s => s);
      for (const f of featureList) {
        await ProjectFeature.create({ feature: f, ProjectId: req.params.id });
      }
    }
    
    if (req.body.tags !== undefined) {
      await ProjectTag.destroy({ where: { ProjectId: req.params.id } });
      const tagList = req.body.tags.split(',').map(s => s.trim()).filter(s => s);
      for (const t of tagList) {
        await ProjectTag.create({ tag: t, ProjectId: req.params.id });
      }
    }
    
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    await Project.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Experience ---
app.get('/api/experience', async (req, res) => {
  try {
    const experience = await Experience.findAll();
    res.json(experience);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/experience', async (req, res) => {
  try {
    const exp = await Experience.create(req.body);
    res.json(exp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/experience/:id', async (req, res) => {
  try {
    await Experience.update(req.body, { where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/experience/:id', async (req, res) => {
  try {
    await Experience.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Messages ---
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.findAll({ order: [['createdAt', 'DESC']] });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/messages', async (req, res) => {
  try {
    const msg = await Message.create(req.body);
    res.json(msg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/messages/:id/read', async (req, res) => {
  try {
    await Message.update({ read: true }, { where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/messages/:id', async (req, res) => {
  try {
    await Message.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Auth ---
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    res.json({ success: true, token: 'fake-jwt-token-for-demo' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Serve the React frontend in production
const buildPath = path.join(__dirname, '../dist');
app.use(express.static(buildPath));

app.use((req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Start Server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
