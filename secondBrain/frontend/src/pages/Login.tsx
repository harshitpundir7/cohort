import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/content/check-auth",
          { withCredentials: true }
        );
        
        if (response.status == 200) {
          navigate("/dashboard");
        }
      } catch (error:any) {
        if (error.response?.status === 401) {
          setLoading(false);
        } else {
          console.error("Auth check error:", error);
          setLoading(false);
        }
      }
    };

    checkAuth();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitLoading(true);

    if (!formData.email || !formData.password) {
      setError("Please fill all fields!");
      setSubmitLoading(false);
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/user/signin", 
        formData, 
        { withCredentials: true }
      );
      
      navigate('/dashboard');
      
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Invalid email or password");
    } finally {
      setSubmitLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120 }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-12 w-12 border-4 border-yellow-400 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-900 flex items-center justify-center p-4"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md relative overflow-hidden border border-gray-700"
      >
        {/* Glowing top accent */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
        />

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-3 bg-red-900/30 text-red-300 rounded-lg border border-red-800/50 text-sm"
            >
              ⚠️ {error}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          variants={itemVariants}
          className="text-center mb-8"
        >
          <div className="mb-4 flex justify-center">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center"
            >
              <span className="text-2xl font-bold text-gray-900">SB</span>
            </motion.div>
          </div>
          <motion.h1
            className="text-3xl font-bold text-yellow-400 mb-2"
          >
            Welcome Back
          </motion.h1>
          <p className="text-gray-400">Continue organizing your digital mind</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: "email", type: "email", placeholder: "Email Address" },
            { name: "password", type: "password", placeholder: "Password" },
          ].map((field, index) => (
            <motion.div
              key={field.name}
              variants={itemVariants}
              transition={{ delay: index * 0.1 }}
            >
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name as keyof typeof formData]}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-500/30 text-gray-100 placeholder-gray-400 outline-none transition-all"
              />
            </motion.div>
          ))}

          <motion.div
            variants={itemVariants}
            className="pt-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={submitLoading}
              className="w-full py-3.5 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 rounded-lg font-semibold text-gray-900 relative overflow-hidden"
            >
              {submitLoading ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center"
                >
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-5 w-5 border-2 border-gray-900 border-t-transparent rounded-full mr-2"
                  />
                  Signing In...
                </motion.span>
              ) : (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  Log In
                </motion.span>
              )}
            </motion.button>
          </motion.div>
        </form>

        <motion.p
          variants={itemVariants}
          className="text-center text-gray-400 mt-6 text-sm"
        >
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-yellow-400 hover:text-amber-500 underline transition-colors"
          >
            Sign up
          </a>
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export default Login;