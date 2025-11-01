import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaEdit, FaPlus, FaTrash, FaSave, FaCode, FaRocket, FaEye, FaLaptop, FaMobileAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [editingProject, setEditingProject] = useState(null);
  const [flippedCards, setFlippedCards] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    image: '',
    github: '',
    live: '',
    tech: '',
    gradient: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  // Prevent body scroll when modals are open
  useEffect(() => {
    if (showLogin || showAdmin || editingProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showLogin, showAdmin, editingProject]);

  // Tech stack icons mapping
  const getTechIcon = (tech) => {
    const iconMap = {
      'React': '⚛️',
      'Node.js': '🌱',
      'MongoDB': '🍃',
      'Stripe': '💳',
      'Socket.io': '🔌',
      'Express': '🚀',
      'API': '🌐',
      'TailwindCSS': '🎨',
      'Weather': '🌤️',
      'JWT': '🔐'
    };
    return iconMap[tech] || '💻';
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok && data.token) {
        setToken(data.token);
        setIsAdmin(true);
        setShowLogin(false);
        setShowAdmin(true);
        setUsername('');
        setPassword('');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    const projectData = { ...newProject, tech: newProject.tech.split(',').map(t => t.trim()) };
    try {
      const response = await fetch('http://localhost:5000/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(projectData)
      });
      if (response.ok) {
        fetchProjects();
        setNewProject({ title: '', description: '', image: '', github: '', live: '', tech: '', gradient: '' });
        setSuccessMessage('Project added successfully!');
        setTimeout(() => setSuccessMessage(''), 5000);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'Failed to add project'}`);
      }
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setNewProject({ ...project, tech: project.tech.join(', ') });
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    const projectData = { ...newProject, tech: newProject.tech.split(',').map(t => t.trim()) };
    try {
      const response = await fetch(`http://localhost:5000/projects/${editingProject._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(projectData)
      });
      if (response.ok) {
        fetchProjects();
        setEditingProject(null);
        setNewProject({ title: '', description: '', image: '', github: '', live: '', tech: '', gradient: '' });
        setSuccessMessage('Project updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'Failed to update project'}`);
      }
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const response = await fetch(`http://localhost:5000/projects/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          fetchProjects();
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.error || 'Failed to delete project'}`);
        }
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  return (
    <section id="portfolio" className="py-32 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-32 left-20 w-64 h-64 bg-purple-500/8 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="section-header">
            <h2 className="section-title">My Projects</h2>
            <p className="section-subtitle">Showcasing my recent work and achievements</p>
            {isAdmin ? (
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setShowAdmin(true)}
                  className="glass border border-white/20 text-white px-6 py-3 rounded-2xl hover:bg-white/10 transition-all duration-300 flex items-center gap-3 font-medium"
                >
                  <FaPlus /> Add Project
                </button>
                <button
                  onClick={() => {
                    setIsAdmin(false);
                    setToken('');
                    setShowAdmin(false);
                    setEditingProject(null);
                    setSuccessMessage('');
                  }}
                  className="glass border border-red-400/20 text-red-300 px-6 py-3 rounded-2xl hover:bg-red-500/10 transition-all duration-300 flex items-center gap-3 font-medium"
                >
                  <FaEdit /> Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="mt-4 glass border border-white/20 text-white px-6 py-3 rounded-2xl hover:bg-white/10 transition-all duration-300 flex items-center gap-3 font-medium mx-auto"
              >
                <FaEdit /> Admin Login
              </button>
            )}
          </div>
        </motion.div>

        <div className="space-y-24 md:space-y-32">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={project._id}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-16`}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Image Section */}
                <motion.div
                  className="flex-1 relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Laptop/Phone Frame */}
                  <div className="relative mx-auto max-w-md lg:max-w-lg">
                    {/* Screen */}
                    <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-2 shadow-2xl border border-slate-700">
                      {/* Browser Header */}
                      <div className="flex items-center justify-between bg-slate-800 rounded-t-xl px-4 py-2 border-b border-slate-700">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="text-xs text-slate-400 font-mono">
                          {project.category || 'Project'}
                        </div>
                      </div>

                      {/* Image Container */}
                      <div className="relative overflow-hidden rounded-b-xl">
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-64 lg:h-80 object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        />

                        {/* Hover Overlay */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        >
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex flex-wrap gap-2">
                              {project.tech.slice(0, 4).map((tech, i) => (
                                <motion.span
                                  key={i}
                                  className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-xs rounded-full border border-white/20 flex items-center gap-1"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: i * 0.1 }}
                                >
                                  <span>{getTechIcon(tech)}</span>
                                  <span>{tech}</span>
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    
                  </div>
                </motion.div>

                {/* Content Section */}
                <motion.div
                  className={`flex-1 space-y-6 ${isEven ? 'lg:pl-8' : 'lg:pr-8'}`}
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                >
                  {/* Project Number */}
                  <motion.div
                    className="text-6xl md:text-8xl font-black text-cyan-400/20"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.1 }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </motion.div>

                  {/* Project Title */}
                  <motion.h3
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                  >
                    {project.title}
                  </motion.h3>

                  {/* Storytelling Description */}
                  <motion.p
                    className="text-lg md:text-xl text-slate-300 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                  >
                    {project.description}
                  </motion.p>

                  {/* Story Points */}
                  {project.story && (
                    <motion.div
                      className="space-y-3 pt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-red-400 text-sm">⚠️</span>
                        </div>
                        <div>
                          <div className="text-red-400 font-semibold text-sm uppercase tracking-wide">Problem</div>
                          <div className="text-slate-400 text-sm">{project.story.problem}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-green-400 text-sm">✅</span>
                        </div>
                        <div>
                          <div className="text-green-400 font-semibold text-sm uppercase tracking-wide">Solution</div>
                          <div className="text-slate-400 text-sm">{project.story.solution}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-blue-400 text-sm">🛠️</span>
                        </div>
                        <div>
                          <div className="text-blue-400 font-semibold text-sm uppercase tracking-wide">Approach</div>
                          <div className="text-slate-400 text-sm">{project.story.approach}</div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Action Buttons */}
                  <motion.div
                    className="flex flex-wrap gap-4 pt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.7 }}
                  >
                    <motion.a
                      href={project.live}
                      className="group relative px-6 py-3 bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold rounded-xl overflow-hidden shadow-lg hover:shadow-cyan-500/25 hover:shadow-violet-500/25 flex items-center gap-3"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaRocket className="text-base" />
                      <span className="relative z-10">Live Demo</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-violet-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </motion.a>

                    <motion.a
                      href={project.github}
                      className="group relative px-6 py-3 bg-transparent border border-white/20 text-white font-semibold rounded-xl overflow-hidden backdrop-blur-sm hover:border-cyan-400/50 flex items-center gap-3"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaCode className="text-base" />
                      <span>Peek Code</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.a>
                  </motion.div>

                  {/* Admin Controls */}
                  {isAdmin && (
                    <motion.div
                      className="flex gap-3 pt-4 border-t border-white/10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.2 + 0.8 }}
                    >
                      <button
                        onClick={() => handleEditProject(project)}
                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center gap-2 text-sm"
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project._id)}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm"
                      >
                        <FaTrash /> Delete
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Login Modal */}
        {showLogin && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="glass p-8 rounded-3xl border border-white/10 max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h3>
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label className="block text-white mb-2">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter username"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-white mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter password"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 btn-primary px-6 py-3 text-lg font-bold"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowLogin(false)}
                    className="flex-1 glass border border-white/20 text-white px-6 py-3 rounded-2xl hover:bg-white/10 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Admin Panel */}
        {showAdmin && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="glass p-8 rounded-3xl border border-white/10 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Admin Panel</h3>
                <button
                  onClick={() => setShowAdmin(false)}
                  className="text-white hover:text-gray-400"
                >
                  ✕
                </button>
              </div>
              {successMessage && (
                <div className="mb-4 p-3 bg-green-500/20 border border-green-400/50 rounded-lg text-green-300 text-center animate-pulse">
                  {successMessage}
                </div>
              )}
              <form onSubmit={editingProject ? handleUpdateProject : handleAddProject}>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <input
                    type="text"
                    placeholder="Title"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    className="px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={newProject.image}
                    onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                    className="px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="GitHub URL"
                    value={newProject.github}
                    onChange={(e) => setNewProject({ ...newProject, github: e.target.value })}
                    className="px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Live URL"
                    value={newProject.live}
                    onChange={(e) => setNewProject({ ...newProject, live: e.target.value })}
                    className="px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Tech (comma separated)"
                    value={newProject.tech}
                    onChange={(e) => setNewProject({ ...newProject, tech: e.target.value })}
                    className="px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Gradient (e.g., from-blue-500 to-purple-600)"
                    value={newProject.gradient}
                    onChange={(e) => setNewProject({ ...newProject, gradient: e.target.value })}
                    className="px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <textarea
                  placeholder="Description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
                  rows="3"
                />
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="btn-primary px-6 py-3 text-lg font-bold flex items-center gap-3"
                  >
                    <FaPlus /> {editingProject ? 'Update Project' : 'Add Project'}
                  </button>
                  {editingProject && (
                    <button
                      type="button"
                      onClick={() => { setEditingProject(null); setNewProject({ title: '', description: '', image: '', github: '', live: '', tech: '', gradient: '' }); }}
                      className="glass border border-white/20 text-white px-6 py-3 rounded-2xl hover:bg-white/10 transition-all duration-300"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;