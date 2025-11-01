import { motion } from 'framer-motion';

const Skills = () => {
  const skills = [
    { name: 'React', level: 90, color: '#3b82f6' },
    { name: 'Node.js', level: 85, color: '#10b981' },
    { name: 'MongoDB', level: 80, color: '#22c55e' },
    { name: 'Express.js', level: 85, color: '#6b7280' },
    { name: 'JavaScript', level: 95, color: '#f59e0b' },
    { name: 'HTML/CSS', level: 90, color: '#ef4444' },
    { name: 'Git', level: 80, color: '#dc2626' },
    { name: 'TailwindCSS', level: 85, color: '#06b6d4' }
  ];

  const CircularProgress = ({ level, name, color, icon, index }) => {
    const radius = 65;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (level / 100) * circumference;

    return (
      <motion.div
        className="text-center group relative"
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="relative glass-card p-8 rounded-3xl border border-white/10 hover:border-white/20 group-hover:ring-4 group-hover:ring-current group-hover:ring-opacity-20 transition-all duration-300">
          <div className="relative w-32 h-32 mx-auto mb-6">

            <svg className="w-full h-full transform -rotate-90 drop-shadow-2xl" viewBox="0 0 160 160">
              {/* Background circle with gradient */}
              <defs>
                <linearGradient id={`bg-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
                </linearGradient>
                <linearGradient id={`progress-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={color} />
                  <stop offset="100%" stopColor={color} stopOpacity="0.8" />
                </linearGradient>
              </defs>

              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke={`url(#bg-${index})`}
                strokeWidth="8"
                fill="none"
              />
              <motion.circle
                cx="80"
                cy="80"
                r={radius}
                stroke={`url(#progress-${index})`}
                strokeWidth="8"
                fill="none"
                strokeDasharray={strokeDasharray}
                initial={{ strokeDashoffset: circumference }}
                whileInView={{ strokeDashoffset }}
                transition={{ duration: 2.5, delay: 0.5 + index * 0.1 }}
                strokeLinecap="round"
                style={{ filter: `drop-shadow(0 0 8px ${color}40)` }}
              />
            </svg>

            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="text-4xl"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              >
                {icon}
              </motion.div>
            </div>

            {/* Percentage text */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2 + index * 0.1 }}
            >
              {level}%
            </motion.div>
          </div>

          <motion.h3
            className="text-xl font-bold text-white group-hover:text-gradient transition-all duration-300"
            whileHover={{ scale: 1.1 }}
          >
            {name}
          </motion.h3>

          {/* Hover sparkles */}
          {/* <motion.div
            className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100"
            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: 1 }}
          />
          <motion.div
            className="absolute -bottom-2 -left-2 w-3 h-3 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100"
            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 1.5 }}
          /> */}
        </div>
      </motion.div>
    );
  };

  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900 to-black">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
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
            <h2 className="section-title">Skills & Expertise</h2>
            <p className="section-subtitle">Technologies I work with</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {skills.map((skill, index) => (
            <CircularProgress
              key={index}
              level={skill.level}
              name={skill.name}
              color={skill.color}
              icon={skill.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;