import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentNode, setCurrentNode] = useState('start');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Conversation data structure
  const conversationData = {
    start: {
      text: "Hi! I'm Rejin's AI assistant. How can I help you today?",
      options: [
        { text: "Tell me about skills", next: "skills" },
        { text: "Tell me about projects", next: "projects" },
        { text: "Get in touch", next: "contact" },
        { text: "About Rejin", next: "about" }
      ]
    },
    skills: {
      text: "Sure! Do you want to know about Frontend, Backend, or Both?",
      options: [
        { text: "Frontend", next: "frontend" },
        { text: "Backend", next: "backend" },
        { text: "Both", next: "both" }
      ]
    },
    frontend: {
      text: "Frontend: React ⚛️, Vue.js, Tailwind CSS, Next.js, TypeScript, HTML5, CSS3, JavaScript ES6+, Responsive Design, UI/UX principles",
      options: [
        { text: "Tell me more about React", next: "react" },
        { text: "Back to skills menu", next: "skills" },
        { text: "Something else?", next: "start" }
      ]
    },
    backend: {
      text: "Backend: Node.js 🌱, Express.js, MongoDB, PostgreSQL, REST APIs, GraphQL, Authentication (JWT), Cloud platforms (Vercel, Heroku)",
      options: [
        { text: "Tell me more about Node.js", next: "nodejs" },
        { text: "Back to skills menu", next: "skills" },
        { text: "Something else?", next: "start" }
      ]
    },
    both: {
      text: "Full-Stack Developer combining Frontend & Backend expertise. Proficient in MERN stack, modern web development, and scalable architectures.",
      options: [
        { text: "Frontend skills", next: "frontend" },
        { text: "Backend skills", next: "backend" },
        { text: "Something else?", next: "start" }
      ]
    },
    react: {
      text: "React expertise: Hooks, Context API, Redux, React Router, Component lifecycle, Performance optimization, Testing with Jest",
      options: [
        { text: "Back to frontend", next: "frontend" },
        { text: "Something else?", next: "start" }
      ]
    },
    nodejs: {
      text: "Node.js expertise: Server-side development, API design, Database integration, Security best practices, Microservices",
      options: [
        { text: "Back to backend", next: "backend" },
        { text: "Something else?", next: "start" }
      ]
    },
    projects: {
      text: "I'd love to show you my projects! Which type interests you?",
      options: [
        { text: "Web Applications", next: "webapps" },
        { text: "Full-Stack Projects", next: "fullstack" },
        { text: "View portfolio section", next: "portfolio" }
      ]
    },
    webapps: {
      text: "Recent web apps: Portfolio website (React/Tailwind), E-commerce platform (MERN), Task management app, Weather dashboard",
      options: [
        { text: "Tell me about portfolio", next: "portfolio" },
        { text: "Back to projects", next: "projects" },
        { text: "Something else?", next: "start" }
      ]
    },
    fullstack: {
      text: "Full-stack projects: Blog platform with CMS, Social media app, Real-time chat application, Admin dashboards",
      options: [
        { text: "Back to projects", next: "projects" },
        { text: "Something else?", next: "start" }
      ]
    },
    portfolio: {
      text: "Check out the Portfolio section above to see live demos and detailed descriptions of my projects!",
      options: [
        { text: "Back to projects", next: "projects" },
        { text: "Something else?", next: "start" }
      ]
    },
    contact: {
      text: "Great! You can reach Rejin through the Contact section above, or connect on LinkedIn/GitHub. Feel free to send a message!",
      options: [
        { text: "Go to contact section", next: "contact_scroll" },
        { text: "Something else?", next: "start" }
      ]
    },
    contact_scroll: {
      text: "Scrolling to contact section...",
      action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }),
      options: []
    },
    about: {
      text: "Rejin is a passionate Full-Stack Developer specializing in modern web technologies. Loves clean code, user experience, and solving complex problems.",
      options: [
        { text: "Tell me about skills", next: "skills" },
        { text: "Tell me about projects", next: "projects" },
        { text: "Something else?", next: "start" }
      ]
    }
  };

  const handleOptionClick = (option) => {
    // Add user message
    const userMessage = { sender: 'user', text: option.text };
    setMessages(prev => [...prev, userMessage]);

    // Set next node
    const nextNode = conversationData[option.next];
    if (nextNode) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { sender: 'bot', text: nextNode.text }]);
        setCurrentNode(option.next);
        if (nextNode.action) nextNode.action();
      }, 1500); // Typing delay
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      // Initialize with greeting
      setMessages([{ sender: 'bot', text: conversationData.start.text }]);
    }
  };

  const currentOptions = conversationData[currentNode]?.options || [];

  return (
    <>
      {/* Floating Icon */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <motion.button
          onClick={toggleChat}
          className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-xl neon-glow hover:pulse-glow transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Open chat"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </motion.button>
      </motion.div>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-[5.5rem] right-6 z-50 w-96 max-w-[calc(100vw-2rem)] max-h-[min(70vh,calc(100vh-6rem))]"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="glass-card p-4 rounded-2xl shadow-2xl border border-blue-400/20">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gradient">Chat with Rejin</h3>
                <button
                  onClick={toggleChat}
                  className="text-slate-400 hover:text-white transition-colors"
                  aria-label="Close chat"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Messages */}
              <div className="max-h-96 overflow-y-auto mb-4 space-y-3">
                <AnimatePresence>
                  {messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl ${
                          msg.sender === 'user'
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                            : 'glass text-slate-300'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    className="flex justify-start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="glass p-3 rounded-2xl max-w-[80%]">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Options */}
              {currentOptions.length > 0 && !isTyping && (
                <div className="space-y-2">
                  {currentOptions.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleOptionClick(option)}
                      className="w-full text-left p-3 glass-card hover:bg-blue-500/20 rounded-xl transition-all duration-200 border border-slate-600/30 hover:border-blue-400/50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {option.text}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;