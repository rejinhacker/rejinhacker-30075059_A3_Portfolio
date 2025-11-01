require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const User = require('./models/User');
const Project = require('./models/Project');
const { authenticateToken, requireAdmin } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Seed default admin user if none exist
const seedAdmin = async () => {
  const userCount = await User.countDocuments();
  if (userCount === 0) {
    const admin = new User({ username: 'admin', password: 'password123' });
    await admin.save();
    console.log('Default admin user created: username=admin, password=password123');
  }
};

// Seed initial projects if none exist
const seedProjects = async () => {
  const count = await Project.countDocuments();
  if (count === 0) {
    const projects = [
      {
        title: 'E-commerce Empire Builder',
        description: 'When online shopping carts were abandoning customers like bad dates, I built a MERN stack powerhouse that turns browsers into buyers. Seamless payments, secure auth, and a dashboard that makes managing inventory feel like playing a video game.',
        story: {
          problem: 'E-commerce sites losing customers at checkout due to clunky UX',
          solution: 'Intuitive MERN stack platform with Stripe integration',
          approach: 'Mobile-first design with real-time inventory and secure payments'
        },
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop&crop=center',
        github: 'https://github.com/rejinshrestha/ecommerce',
        live: 'https://ecommerce-rejin.herokuapp.com',
        tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        gradient: 'from-blue-500 to-purple-600',
        category: 'Full-Stack'
      },
      {
        title: 'Real-Time Task Slayer',
        description: 'Teams drowning in scattered to-do lists and missed deadlines? Enter the collaborative beast I built — Socket.io powered, MongoDB fueled, with live updates that make project management feel like a multiplayer game.',
        story: {
          problem: 'Teams struggling with outdated task management tools',
          solution: 'Real-time collaborative platform with live notifications',
          approach: 'WebSocket integration with responsive design and offline support'
        },
        image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=500&fit=crop&crop=center',
        github: 'https://github.com/rejinshrestha/taskmanager',
        live: 'https://taskmanager-rejin.netlify.app',
        tech: ['React', 'Socket.io', 'MongoDB', 'Express'],
        gradient: 'from-green-500 to-blue-600',
        category: 'Real-Time'
      },
      {
        title: 'Weather Wizard',
        description: 'Gone are the days of staring out windows wondering if you need that umbrella. My weather dashboard pulls real-time data from OpenWeatherMap API and presents it with such elegance that even meteorologists get jealous.',
        story: {
          problem: 'Clunky weather apps with poor UX and limited data',
          solution: 'Beautiful, responsive dashboard with accurate forecasts',
          approach: 'API integration with location services and elegant animations'
        },
        image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=500&fit=crop&crop=center',
        github: 'https://github.com/rejinshrestha/weatherapp',
        live: 'https://weather-rejin.vercel.app',
        tech: ['React', 'API', 'TailwindCSS', 'Weather'],
        gradient: 'from-cyan-500 to-blue-600',
        category: 'API Integration'
      },
      {
        title: 'Blog Builder Extraordinaire',
        description: 'Writers deserve better than complicated CMS platforms. I crafted a blogging universe where rich text editing feels natural, comments spark conversations, and the admin experience is so smooth it should be illegal.',
        story: {
          problem: 'Complex blogging platforms intimidating content creators',
          solution: 'Intuitive MERN stack blog with rich editing capabilities',
          approach: 'User-centered design with secure authentication and engaging UX'
        },
        image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=500&fit=crop&crop=center',
        github: 'https://github.com/rejinshrestha/blogplatform',
        live: 'https://blog-rejin.herokuapp.com',
        tech: ['React', 'MongoDB', 'Express', 'JWT'],
        gradient: 'from-purple-500 to-pink-600',
        category: 'Content Platform'
      }
    ];
    await Project.insertMany(projects);
    console.log('Initial projects seeded');
  }
};

seedAdmin();
seedProjects();

// Routes
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/projects', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/projects/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/projects/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});