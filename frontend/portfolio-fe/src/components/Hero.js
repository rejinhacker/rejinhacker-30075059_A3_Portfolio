import { motion } from 'framer-motion';

const Hero = ({
  name = "Rejin Shrestha",
  mainRole = "Full-Stack Developer",
  secondaryRole = "Building clean & scalable web apps",
  description = "Crafting exceptional digital experiences through innovative code and modern design solutions.",
  primaryCtaText = "View My Work",
  secondaryCtaText = "Get In Touch",
  backgroundImage = '/hero.png', // Default background image
}) => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Use the prop here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 4 + 8}s`,
            }}
          />
        ))}
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {i % 4 === 0 && (
              <div className="w-32 h-32 border-2 border-blue-400 rotate-45 rounded-lg floating-animation"></div>
            )}
            {i % 4 === 1 && (
              <div className="w-24 h-24 border-2 border-purple-400 rounded-full pulse-glow"></div>
            )}
            {i % 4 === 2 && (
              <div className="w-16 h-40 border-2 border-pink-400 rounded-lg floating-animation"></div>
            )}
            {i % 4 === 3 && (
              <div className="w-28 h-28 border-2 border-cyan-400 rotate-12 rounded-full"></div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Glowing orbs */}
      <motion.div
        className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pulse-glow"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-32 right-16 w-[500px] h-[500px] bg-purple-500/8 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/2 left-1/3 w-80 h-80 bg-pink-500/6 rounded-full blur-2xl"
        animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.4, 0.1] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Content */}
          <motion.div
            className="space-y-6 md:space-y-8 lg:space-y-10"
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          >
            {/* Main Heading with Glow Effect */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h1 className="text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black leading-none text-white relative z-10">
                <span className="relative inline-block">
                  <span className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 opacity-20 blur-xl animate-pulse"></span>
                  <span className="relative bg-gradient-to-r from-white via-cyan-100 to-violet-200 bg-clip-text text-transparent">
                    {name} {/* Dynamic name */}
                  </span>
                </span>
              </h1>
              {/* Animated underline */}
              <motion.div
                className="absolute -bottom-4 left-0 h-1 bg-gradient-to-r from-cyan-400 to-violet-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Subtitle with Typing Effect */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <h2 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl text-slate-300 font-light leading-tight">
                <span className="text-cyan-400 font-semibold animate-pulse">{mainRole}</span> {/* Dynamic main role */}
              </h2>
              <h2 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl text-slate-400 font-light">
                <span className="text-violet-400 font-medium">{secondaryRole}</span> {/* Dynamic secondary role */}
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl lg:text-2xl text-slate-400 max-w-3xl leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              {description} {/* Dynamic description */}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              {/* Primary CTA - View My Work */}
              <motion.button
                className="group relative px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-lg border border-cyan-400/30 text-cyan-300 font-bold text-xl md:text-2xl rounded-2xl overflow-hidden transition-all duration-500 shadow-2xl hover:shadow-cyan-400/20 hover:border-cyan-400/60"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <span>{primaryCtaText}</span> {/* Dynamic primary CTA text */}
                  <motion.span
                    className="text-cyan-400"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </motion.button>

              {/* Secondary CTA - Get in Touch */}
              <motion.button
                className="group relative px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-violet-600/80 to-purple-600/80 backdrop-blur-lg border border-violet-400/30 text-violet-300 font-bold text-xl md:text-2xl rounded-2xl overflow-hidden transition-all duration-500 shadow-2xl hover:shadow-violet-400/20 hover:border-violet-400/60"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <span>{secondaryCtaText}</span> {/* Dynamic secondary CTA text */}
                  <motion.span
                    className="text-violet-400"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    💬
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;