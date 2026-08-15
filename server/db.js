const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

// Initialize Sequelize with Postgres if a DATABASE_URL is provided (e.g. Neon, Supabase)
// Otherwise fallback to SQLite for easy local development.
let sequelize;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
} else {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'database.sqlite'),
    logging: false,
  });
}

const Project = sequelize.define('Project', {
  title: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.STRING },
  featured: { type: DataTypes.BOOLEAN, defaultValue: false },
  description: { type: DataTypes.TEXT },
  category: { type: DataTypes.STRING },
  repo: { type: DataTypes.STRING },
  demo: { type: DataTypes.STRING },
  imageUrl: { type: DataTypes.STRING },
});

// Since features and tags are arrays, we can store them as JSON strings in SQLite/MySQL
const ProjectFeature = sequelize.define('ProjectFeature', {
  feature: { type: DataTypes.STRING, allowNull: false },
});
Project.hasMany(ProjectFeature);
ProjectFeature.belongsTo(Project);

const ProjectTag = sequelize.define('ProjectTag', {
  tag: { type: DataTypes.STRING, allowNull: false },
});
Project.hasMany(ProjectTag);
ProjectTag.belongsTo(Project);

const Experience = sequelize.define('Experience', {
  role: { type: DataTypes.STRING, allowNull: false },
  company: { type: DataTypes.STRING, allowNull: false },
  duration: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
});

const Profile = sequelize.define('Profile', {
  name: { type: DataTypes.STRING },
  firstName: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING },
  tagline: { type: DataTypes.STRING },
  location: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  github: { type: DataTypes.STRING },
  linkedin: { type: DataTypes.STRING },
  resumeUrl: { type: DataTypes.STRING },
  blurb: { type: DataTypes.TEXT },
  imageUrl: { type: DataTypes.STRING, defaultValue: '/profile.png' },
});

const Message = sequelize.define('Message', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  message: { type: DataTypes.TEXT, allowNull: false },
  read: { type: DataTypes.BOOLEAN, defaultValue: false },
});

module.exports = {
  sequelize,
  Project,
  ProjectFeature,
  ProjectTag,
  Experience,
  Profile,
  Message
};
