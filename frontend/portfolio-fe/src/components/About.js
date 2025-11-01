import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJsSquare, FaGitAlt } from 'react-icons/fa';
import { SiMongodb, SiExpress } from 'react-icons/si';

const About = () => {
  const skills = [
    { Icon: FaReact, name: 'React', color: '#3b82f6', bg: 'from-blue-500/20 to-blue-600/20' },
    { Icon: FaNodeJs, name: 'Node.js', color: '#10b981', bg: 'from-green-500/20 to-green-600/20' },
    { Icon: SiMongodb, name: 'MongoDB', color: '#22c55e', bg: 'from-green-600/20 to-green-700/20' },
    { Icon: SiExpress, name: 'Express', color: '#6b7280', bg: 'from-gray-500/20 to-gray-600/20' },
    { Icon: FaJsSquare, name: 'JavaScript', color: '#f59e0b', bg: 'from-yellow-500/20 to-yellow-600/20' },
    { Icon: FaHtml5, name: 'HTML5', color: '#ef4444', bg: 'from-red-500/20 to-red-600/20' },
    { Icon: FaCss3Alt, name: 'CSS3', color: '#3b82f6', bg: 'from-blue-600/20 to-blue-700/20' },
    { Icon: FaGitAlt, name: 'Git', color: '#dc2626', bg: 'from-red-500/20 to-red-600/20' },
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                               radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)`,
            }}
          />
        </div>
      </div>

      {/* Floating orbs */}
      <motion.div
        className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-32 right-32 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="section-header">
            <h2 className="section-title">About Me</h2>
            <p className="section-subtitle">Passionate developer crafting digital experiences</p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <motion.div
              className="glass-card p-8 rounded-3xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-slate-200 text-xl leading-relaxed mb-6">
                I'm a passionate <span className="text-blue-400 font-bold text-2xl">MERN stack developer</span> with expertise in building full-stack web applications. I love turning complex ideas into elegant, functional digital solutions.
              </p>
              <p className="text-slate-300 text-lg leading-relaxed">
                With a strong foundation in both frontend and backend technologies, I specialize in creating scalable, efficient, and user-centric applications that deliver exceptional experiences.
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-4">
              <motion.span
                className="px-6 py-3 glass border border-blue-400/30 text-blue-300 rounded-full text-base font-semibold hover:bg-blue-400/10 transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' }}
              >
                Problem Solver
              </motion.span>
              <motion.span
                className="px-6 py-3 glass border border-purple-400/30 text-purple-300 rounded-full text-base font-semibold hover:bg-purple-400/10 transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' }}
              >
                Team Player
              </motion.span>
              <motion.span
                className="px-6 py-3 glass border border-pink-400/30 text-pink-300 rounded-full text-base font-semibold hover:bg-pink-400/10 transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(236, 72, 153, 0.3)' }}
              >
                Innovator
              </motion.span>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="text-center group"
                whileHover={{ y: -8, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className={`w-24 h-24 mx-auto mb-4 bg-gradient-to-br ${skill.bg} glass border border-white/20 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300`}
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <skill.Icon className="text-4xl drop-shadow-lg" style={{ color: skill.color }} />
                </motion.div>
                <p className="text-slate-200 text-base font-bold group-hover:text-white transition-colors">{skill.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;