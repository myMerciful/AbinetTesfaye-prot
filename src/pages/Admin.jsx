import { useState, useEffect, useRef } from 'react';
import { HiOutlineLogout, HiUser, HiBriefcase, HiFolderOpen, HiPlus, HiPencil, HiTrash, HiInbox, HiOutlineMail } from 'react-icons/hi';
import toast from 'react-hot-toast';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState('profile'); // profile, projects, experience
  const [profile, setProfile] = useState({});
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [messages, setMessages] = useState([]);

  // Modals state
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showExpModal, setShowExpModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [editingExp, setEditingExp] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('adminToken')) {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const [profRes, projRes, expRes, msgRes] = await Promise.all([
        fetch('/api/profile').then(r => r.json()),
        fetch('/api/projects').then(r => r.json()),
        fetch('/api/experience').then(r => r.json()),
        fetch('/api/messages').then(r => r.json()),
      ]);
      setProfile(profRes);
      setProjects(projRes);
      setExperience(expRes);
      setMessages(msgRes);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        setIsAuthenticated(true);
        fetchData();
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      alert('Login failed');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  // --- Profile Actions ---
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        body: formData, // using FormData for multer
      });
      if (!res.ok) throw new Error("Failed to update profile");
      const data = await res.json();
      setProfile(data);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error('Failed to update profile');
    }
  };

  // --- Project Actions ---
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const method = editingProject ? 'PUT' : 'POST';
    const url = editingProject ? `/api/projects/${editingProject.id}` : '/api/projects';
    
    try {
      const res = await fetch(url, {
        method,
        body: formData
      });
      if (!res.ok) throw new Error("Failed to save");
      fetchData();
      setShowProjectModal(false);
      setEditingProject(null);
      toast.success("Project saved successfully!");
    } catch (err) {
      toast.error(err.message || 'Failed to save project');
    }
  };

  const deleteProject = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (err) {
      alert('Failed to delete');
    }
  };

  // --- Experience Actions ---
  const handleExpSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData.entries());
    
    const method = editingExp ? 'PUT' : 'POST';
    const url = editingExp ? `/api/experience/${editingExp.id}` : '/api/experience';
    
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Failed to save");
      fetchData();
      setShowExpModal(false);
      setEditingExp(null);
      toast.success("Experience saved successfully!");
    } catch (err) {
      toast.error(err.message || 'Failed to save experience');
    }
  };

  const deleteExp = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      await fetch(`/api/experience/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (err) {
      alert('Failed to delete');
    }
  };

  // --- Message Actions ---
  const markAsRead = async (id) => {
    try {
      await fetch(`/api/messages/${id}/read`, { method: 'PUT' });
      fetchData();
    } catch (err) {
      alert('Failed to update message');
    }
  };

  const deleteMessage = async (id) => {
    if (!confirm('Delete message?')) return;
    try {
      await fetch(`/api/messages/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (err) {
      alert('Failed to delete message');
    }
  };


  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-5">
        <form onSubmit={handleLogin} className="glass p-8 rounded-2xl w-full max-w-md">
          <h2 className="text-2xl font-bold text-white mb-6">Admin Login</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Username</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" required />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white" required />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-neon-cyan text-bg font-bold py-2 rounded-lg hover:opacity-90">
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-slate-200 flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-black/40 border-r border-white/10 p-5 flex flex-col">
        <div className="flex items-center gap-2 mb-10">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-neon-violet to-neon-cyan font-bold text-white shadow-[0_0_15px_-3px_var(--color-neon-violet)]">
            AT
          </span>
          <span className="font-bold text-white tracking-tight">CMS Admin</span>
        </div>

        <nav className="flex-1 space-y-2">
          <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'profile' ? 'bg-neon-cyan/10 text-neon-cyan' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}>
            <HiUser size={20} /> Profile
          </button>
          <button onClick={() => setActiveTab('projects')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'projects' ? 'bg-neon-cyan/10 text-neon-cyan' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}>
            <HiFolderOpen size={20} /> Projects
          </button>
          <button onClick={() => setActiveTab('experience')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'experience' ? 'bg-neon-cyan/10 text-neon-cyan' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}>
            <HiBriefcase size={20} /> Experience
          </button>
          <button onClick={() => setActiveTab('messages')} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${activeTab === 'messages' ? 'bg-neon-cyan/10 text-neon-cyan' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}>
            <span className="flex items-center gap-3"><HiInbox size={20} /> Messages</span>
            {messages.filter(m => !m.read).length > 0 && (
              <span className="bg-neon-violet text-white text-xs font-bold px-2 py-0.5 rounded-full">{messages.filter(m => !m.read).length}</span>
            )}
          </button>
        </nav>

        <button onClick={handleLogout} className="mt-auto w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-all">
          <HiOutlineLogout size={20} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-5 md:p-10 overflow-y-auto">
        <h1 className="text-3xl font-bold text-white mb-8 capitalize">{activeTab}</h1>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <form onSubmit={handleProfileSubmit} className="glass p-6 md:p-8 rounded-2xl max-w-3xl space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
              <img src={profile.imageUrl || '/profile.png'} alt="Profile" className="h-24 w-24 rounded-full border-2 border-white/10 object-cover shrink-0" />
              <div className="w-full space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Update Profile Picture</label>
                  <input type="file" name="image" accept="image/*" className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-neon-cyan/10 file:text-neon-cyan hover:file:bg-neon-cyan/20" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Update Resume (PDF)</label>
                  <input type="file" name="resume" accept="application/pdf" className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-neon-violet/10 file:text-neon-violet hover:file:bg-neon-violet/20" />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Full Name</label>
                <input type="text" name="name" defaultValue={profile.name} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Role Title</label>
                <input type="text" name="role" defaultValue={profile.role} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-slate-400 mb-1">Tagline</label>
                <input type="text" name="tagline" defaultValue={profile.tagline} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-slate-400 mb-1">Bio Blurb</label>
                <textarea name="blurb" defaultValue={profile.blurb} rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white resize-none" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Email</label>
                <input type="email" name="email" defaultValue={profile.email} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Location</label>
                <input type="text" name="location" defaultValue={profile.location} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">GitHub URL</label>
                <input type="text" name="github" defaultValue={profile.github} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">LinkedIn URL</label>
                <input type="text" name="linkedin" defaultValue={profile.linkedin} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white" />
              </div>
            </div>
            
            <button type="submit" className="bg-neon-cyan text-bg font-bold px-6 py-2.5 rounded-lg hover:bg-emerald-400 transition-colors">
              Save Profile
            </button>
          </form>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <button onClick={() => { setEditingProject(null); setShowProjectModal(true); }} className="mb-6 flex items-center gap-2 bg-neon-cyan text-bg font-bold px-5 py-2.5 rounded-lg hover:opacity-90">
              <HiPlus size={18} /> Add Project
            </button>
            <div className="grid lg:grid-cols-2 gap-5">
              {projects.map(p => (
                <div key={p.id} className="glass p-5 rounded-xl border border-white/5 flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-white">{p.title}</h3>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingProject(p); setShowProjectModal(true); }} className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-md transition-colors"><HiPencil size={16} /></button>
                      <button onClick={() => deleteProject(p.id)} className="p-2 text-slate-400 hover:text-red-400 bg-white/5 hover:bg-red-500/10 rounded-md transition-colors"><HiTrash size={16} /></button>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 mb-4 flex-1 line-clamp-3">{p.description}</p>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                    <span>{p.category}</span>
                    <span>{p.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === 'experience' && (
          <div>
            <button onClick={() => { setEditingExp(null); setShowExpModal(true); }} className="mb-6 flex items-center gap-2 bg-neon-cyan text-bg font-bold px-5 py-2.5 rounded-lg hover:opacity-90">
              <HiPlus size={18} /> Add Experience
            </button>
            <div className="space-y-4">
              {experience.map(exp => (
                <div key={exp.id} className="glass p-5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-white/5">
                  <div>
                    <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                    <p className="text-neon-cyan text-sm mb-1">{exp.company} • {exp.duration}</p>
                    <p className="text-sm text-slate-400 max-w-2xl">{exp.description}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => { setEditingExp(exp); setShowExpModal(true); }} className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-md transition-colors"><HiPencil size={18} /></button>
                    <button onClick={() => deleteExp(exp.id)} className="p-2 text-slate-400 hover:text-red-400 bg-white/5 hover:bg-red-500/10 rounded-md transition-colors"><HiTrash size={18} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-slate-400">No messages yet.</div>
            ) : messages.map(msg => (
              <div key={msg.id} className={`glass p-5 rounded-xl border flex flex-col md:flex-row gap-4 ${msg.read ? 'border-white/5 opacity-70' : 'border-neon-violet/30'}`}>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        {msg.name} {!msg.read && <span className="h-2 w-2 rounded-full bg-neon-cyan" />}
                      </h3>
                      <a href={`mailto:${msg.email}`} className="text-sm text-neon-cyan hover:underline flex items-center gap-1"><HiOutlineMail /> {msg.email}</a>
                    </div>
                    <span className="text-xs text-slate-500">{new Date(msg.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-slate-300 mt-3 bg-black/20 p-4 rounded-lg text-sm whitespace-pre-wrap">{msg.message}</p>
                </div>
                <div className="flex flex-row md:flex-col gap-2 shrink-0 justify-end md:justify-start mt-4 md:mt-0">
                  {!msg.read && (
                    <button onClick={() => markAsRead(msg.id)} className="bg-white/5 hover:bg-white/10 text-slate-300 px-3 py-1.5 rounded-md text-sm transition-colors">Mark Read</button>
                  )}
                  <button onClick={() => deleteMessage(msg.id)} className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3 py-1.5 rounded-md text-sm transition-colors flex items-center justify-center gap-1"><HiTrash /> Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      {/* Project Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass p-6 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-4">{editingProject ? 'Edit Project' : 'New Project'}</h2>
            <form onSubmit={handleProjectSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Title</label>
                <input type="text" name="title" defaultValue={editingProject?.title} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Category (e.g. Frontend)</label>
                  <input type="text" name="category" defaultValue={editingProject?.category} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" required />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Type (e.g. Web App)</label>
                  <input type="text" name="type" defaultValue={editingProject?.type} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" required />
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Description</label>
                <textarea name="description" defaultValue={editingProject?.description} rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white resize-none" required />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Project Thumbnail (Optional)</label>
                <input type="file" name="image" accept="image/*" className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Features (comma separated)</label>
                  <textarea name="features" defaultValue={editingProject?.features?.join(', ')} rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white resize-none" />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Tags (comma separated)</label>
                  <textarea name="tags" defaultValue={editingProject?.tags?.join(', ')} rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white resize-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Demo URL</label>
                  <input type="text" name="demo" defaultValue={editingProject?.demo} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Repo URL</label>
                  <input type="text" name="repo" defaultValue={editingProject?.repo} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setShowProjectModal(false)} className="px-4 py-2 text-slate-300 hover:text-white transition-colors">Cancel</button>
                <button type="submit" className="bg-neon-cyan text-bg font-bold px-6 py-2 rounded-lg hover:opacity-90 transition-colors">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Experience Modal */}
      {showExpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass p-6 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-4">{editingExp ? 'Edit Experience' : 'New Experience'}</h2>
            <form onSubmit={handleExpSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Role Title</label>
                <input type="text" name="role" defaultValue={editingExp?.role} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Company</label>
                  <input type="text" name="company" defaultValue={editingExp?.company} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" required />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Duration</label>
                  <input type="text" name="duration" defaultValue={editingExp?.duration} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white" required />
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Description</label>
                <textarea name="description" defaultValue={editingExp?.description} rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white resize-none" required />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setShowExpModal(false)} className="px-4 py-2 text-slate-300 hover:text-white transition-colors">Cancel</button>
                <button type="submit" className="bg-neon-cyan text-bg font-bold px-6 py-2 rounded-lg hover:opacity-90 transition-colors">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
