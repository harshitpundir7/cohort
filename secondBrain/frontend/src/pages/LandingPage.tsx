import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Brain, ChevronDown, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const LandingPage = () => {
  const { scrollYProgress } = useScroll();
  const navigate = useNavigate();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    "Smart Knowledge Organization",
    "AI-Powered Connections",
    "Multi-Layered Tagging",
    "Instant Search & Recall",
    "Cross-Device Sync",
    "Military-Grade Security"
  ];

  // Animated background elements
  const floatingStars = Array(20).fill(null).map((_, i) => ({
    id: i,
    style: {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      scale: Math.random() * 0.5 + 0.5
    }
  }));

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      {floatingStars.map((star) => (
        <motion.div
          key={star.id}
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: [0, 0.4, 0],
            y: [0, -100],
            x: Math.random() * 100 - 50
          }}
          transition={{
            duration: Math.random() * 4 + 6,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
          className="absolute w-1 h-1 bg-yellow-400 rounded-full"
          style={star.style}
        />
      ))}

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-amber-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          isScrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-xl' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <motion.div
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Brain className="w-8 h-8 text-yellow-400" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
              SecondBrain
            </span>
          </motion.div>
          
          <div className="hidden md:flex space-x-8">
            {['Features', 'About', 'Contact'].map((item) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-300 hover:text-yellow-400 transition-all"
              >
                {item}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.header 
        className="h-screen flex flex-col items-center justify-center text-center px-4 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 120 }}
          className="mb-8 relative"
        >
          <div className="absolute inset-0 bg-yellow-400/20 blur-3xl rounded-full" />
          <Brain className="w-24 h-24 text-yellow-400 relative" />
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-amber-500 text-transparent bg-clip-text"
          {...fadeIn}
        >
          Remember The
          <motion.span 
            className="inline-block mx-2 text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-amber-500 text-transparent bg-clip-text"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            Important
          </motion.span>
          Things !
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Transform chaos into clarity with our neural-inspired knowledge platform.
          <motion.span 
            className="inline-block ml-2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            🧠
          </motion.span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex gap-4 flex-col sm:flex-row"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 30px rgba(234, 179, 8, 0.4)'
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-lg font-semibold flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5"/>
            <div onClick={()=>navigate("/dashboard")}>
            Start Free
            </div>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
          
          <motion.button
            whileHover={{ 
              scale: 1.05,
              borderColor: '#f59e0b',
              backgroundColor: 'rgba(234, 179, 8, 0.1)'
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('features')}
            className="px-8 py-3 border border-yellow-500/50 rounded-lg font-semibold"
          >
            Explore Features
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 cursor-pointer"
          onClick={() => scrollToSection('features')}
        >
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="w-8 h-8 text-yellow-400/50 hover:text-yellow-400 transition-colors" />
          </motion.div>
        </motion.div>
      </motion.header>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            Powerful Features
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group p-6 bg-gray-800 rounded-xl relative overflow-hidden hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CheckCircle className="w-8 h-8 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature}</h3>
                <p className="text-gray-400">
                  Revolutionize your workflow with intelligent knowledge management.
                </p>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        id="contact"
        className="py-40 px-4 text-center relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent" />
        <div className="max-w-4xl mx-auto relative">
          <motion.h2 
            className="text-4xl font-bold mb-8"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ type: 'spring' }}
          >
            Ready to Supercharge Your{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Productivity?
            </span>
          </motion.h2>
          
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 40px rgba(234, 179, 8, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-xl font-semibold text-lg"
          >
            <div onClick={()=>navigate("/login")}>
            Join Beta Now 🚀
            </div>
          </motion.button>
        </div>
      </motion.section>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: isScrolled ? 1 : 0, y: 0 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-3 bg-yellow-500 rounded-full shadow-xl hover:bg-amber-500 transition-colors"
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        >
          <ChevronDown className="w-6 h-6 text-gray-900 transform rotate-180" />
        </motion.div>
      </motion.button>
    </div>
  );
};

export default LandingPage;