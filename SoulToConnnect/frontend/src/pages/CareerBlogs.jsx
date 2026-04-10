import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function CareerBlogs() {
  const navigate = useNavigate();

  const blogs = [
    {
      id: 5,
      title: "Best Career Options 2026",
      desc: "Explore future-ready career paths.",
      author: "Career Expert",
      date: "Mar 2026",
    },
    {
      id: 6,
      title: "How to Choose Right Career",
      desc: "Find your passion and align it with skills.",
      author: "Mentor",
      date: "Feb 2026",
    },
    {
      id: 7,
      title: "Boost Productivity",
      desc: "Daily habits to improve your performance.",
      author: "Coach",
      date: "Jan 2026",
    },
    {
      id: 8,
      title: "Work Stress Management",
      desc: "Balance work pressure and mental health.",
      author: "Advisor",
      date: "Jan 2026",
    },
  ];

  // 🔥 animations
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-50 min-h-screen p-8"
    >

      {/* 🔥 HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-center mb-2">
          💼 Career & Growth Blogs
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Guidance for professional success and growth
        </p>
      </motion.div>

      {/* ⭐ FEATURED */}
      <motion.div
        whileHover={{
          scale: 1.02,
          boxShadow: "0px 20px 40px rgba(0, 100, 255, 0.2)"
        }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate("/blog/5")}
        className="bg-gradient-to-r from-blue-100 to-blue-50 p-6 rounded-2xl mb-10 cursor-pointer transition-all"
      >
        <h2 className="text-xl font-semibold text-blue-700">
          Featured: Career Trends 2026
        </h2>
        <p className="text-gray-600 mt-2">
          Stay ahead with future job trends and opportunities.
        </p>
      </motion.div>

      {/* 🧩 GRID */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid md:grid-cols-4 gap-6"
      >
        {blogs.map((blog) => (
          <motion.div
            key={blog.id}
            variants={item}

            whileHover={{
              y: -10,
              scale: 1.04,
              boxShadow: "0px 25px 50px rgba(0,0,0,0.1)"
            }}

            whileTap={{ scale: 0.97 }}

            onClick={() => navigate(`/blog/${blog.id}`)}

            className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-gray-100 cursor-pointer transition-all"
          >
            {/* category */}
            <div className="text-blue-500 font-semibold text-sm mb-2 tracking-wide">
              CAREER
            </div>

            {/* title */}
            <h2 className="font-bold text-lg hover:text-blue-600 transition-colors">
              {blog.title}
            </h2>

            {/* desc */}
            <p className="text-gray-500 text-sm mt-2 line-clamp-2">
              {blog.desc}
            </p>

            {/* footer */}
            <div className="text-xs text-gray-400 mt-4 flex justify-between">
              <span>{blog.author}</span>
              <span>{blog.date}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

    </motion.div>
  );
}