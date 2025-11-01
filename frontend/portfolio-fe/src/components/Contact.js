import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaTerminal } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isTyping, setIsTyping] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [showExecutionMessage, setShowExecutionMessage] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [responseType, setResponseType] = useState('success');

  const fields = [
    { key: 'name', prompt: 'contact.sh --name', placeholder: 'Enter your name...' },
    { key: 'email', prompt: 'contact.sh --email', placeholder: 'Enter your email...' },
    { key: 'message', prompt: 'contact.sh --message', placeholder: 'Type your message...' }
  ];


  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setResponseType('error');
      setShowResponse(true);
      setTimeout(() => setShowResponse(false), 3000);
      return;
    }

    // Show execution message
    setIsTyping(true);
    setShowExecutionMessage(true);

    // Simulate sending
    setTimeout(() => {
      setIsTyping(false);
      setShowExecutionMessage(false);
      setResponseType('success');
      setShowResponse(true);

      // Reset form
      setFormData({ name: '', email: '', message: '' });
      setFocusedField(null);

      setTimeout(() => setShowResponse(false), 3000);
    }, 2000);
  };


  return (
    <section id="contact" className="py-32 relative overflow-hidden min-h-screen flex items-center">
      {/* Full-width dark background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-5"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
             }}>
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 w-full">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="section-header">
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">Ready to execute some collaboration?</p>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Terminal Window */}
          <motion.div
            className="bg-slate-900/95 backdrop-blur-lg rounded-2xl border border-slate-700 shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {/* Terminal Header */}
            <div className="bg-slate-800 px-6 py-4 border-b border-slate-700">
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-sm font-mono">
                  <FaTerminal />
                  <span>contact-terminal ~ rejin</span>
                </div>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 md:p-8 font-mono text-sm md:text-base">
              {/* Terminal Output */}
              <div className="space-y-3 mb-8 min-h-[200px]">

                {/* Current input lines */}
                {fields.map((field, index) => (
                  <motion.div
                    key={field.key}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 + index * 0.3 }}
                    className="flex items-start gap-2"
                  >
                    <span className="text-green-400 mt-0.5">{'>'}</span>
                    <span className="text-cyan-400">{field.prompt}</span>
                    <input
                      type={field.key === 'email' ? 'email' : field.key === 'message' ? 'text' : 'text'}
                      value={formData[field.key]}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      onFocus={() => setFocusedField(field.key)}
                      onBlur={() => setFocusedField(null)}
                      placeholder={field.placeholder}
                      className="flex-1 bg-transparent border-none outline-none text-slate-300 placeholder-slate-600 font-mono focus:text-green-400 transition-colors"
                      style={{
                        caretColor: focusedField === field.key ? '#10b981' : 'transparent',
                        textShadow: formData[field.key] ? '0 0 8px rgba(16, 185, 129, 0.5)' : 'none'
                      }}
                    />
                    {focusedField === field.key && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="text-green-400 terminal-cursor"
                      >
                        ▊
                      </motion.span>
                    )}
                  </motion.div>
                ))}

                {/* Send Command */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.5 }}
                  className="pt-6"
                >
                  <motion.button
                    onClick={handleSubmit}
                    disabled={isTyping}
                    className="group relative px-6 py-3 bg-slate-800 border border-green-400/30 text-green-400 font-mono hover:bg-green-400/10 hover:border-green-400/60 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-slate-500">$</span>
                      <span>send_message.sh</span>
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-green-400/5 rounded opacity-0 group-hover:opacity-100"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.button>
                </motion.div>

                {/* Execution and Response Messages */}
                <AnimatePresence>
                  {showExecutionMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-start gap-2 text-cyan-400 pt-4"
                    >
                      <span className="text-slate-500 mt-0.5">$</span>
                      <span>Executing send_message.sh...</span>
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="text-cyan-400"
                      >
                        ▊
                      </motion.span>
                    </motion.div>
                  )}

                  {showResponse && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className={`flex items-start gap-2 pt-2 ${
                        responseType === 'success' ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      <span className="text-slate-500 mt-0.5">$</span>
                      <span>
                        {responseType === 'success'
                          ? 'Message sent successfully! 🚀'
                          : 'Error: Missing required fields. Please fill all inputs.'
                        }
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Social Links Section */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-slate-400 mb-8 font-mono">
              Or connect directly via social channels:
            </p>
            <div className="flex justify-center gap-6">
              {[
                { Icon: FaGithub, label: 'GitHub', href: 'https://github.com/rejinshrestha', color: 'hover:text-gray-300' },
                { Icon: FaLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/', color: 'hover:text-blue-400' },
                { Icon: FaTwitter, label: 'Twitter', href: 'https://twitter.com/', color: 'hover:text-blue-300' },
                { Icon: FaEnvelope, label: 'Email', href: 'mailto:rejin@example.com', color: 'hover:text-green-400' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className={`w-12 h-12 bg-slate-800/50 backdrop-blur-sm border border-slate-600 rounded-lg flex items-center justify-center text-slate-400 transition-all duration-300 ${social.color} hover:border-current`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                >
                  <social.Icon className="text-lg" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;