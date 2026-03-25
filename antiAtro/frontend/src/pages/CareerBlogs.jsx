import { useNavigate } from "react-router-dom";

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

  return (
    <div className="bg-gray-50 min-h-screen p-8">

      {/* 🔥 HEADER */}
      <h1 className="text-3xl font-bold text-center mb-2">
        💼 Career & Growth Blogs
      </h1>
      <p className="text-center text-gray-500 mb-8">
        Guidance for professional success and growth
      </p>

      {/* ⭐ FEATURED */}
      <div
        onClick={() => navigate("/blog/5")}
        className="bg-blue-100 p-6 rounded-2xl mb-10 cursor-pointer hover:shadow-lg transition"
      >
        <h2 className="text-xl font-semibold text-blue-700">
          Featured: Career Trends 2026
        </h2>
        <p className="text-gray-600 mt-2">
          Stay ahead with future job trends and opportunities.
        </p>
      </div>

      {/* 🧩 GRID */}
      <div className="grid md:grid-cols-4 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            onClick={() => navigate(`/blog/${blog.id}`)}
            className="bg-white rounded-2xl p-5 shadow hover:shadow-xl transition cursor-pointer"
          >
            <div className="text-blue-500 font-semibold text-sm mb-2">
              CAREER
            </div>

            <h2 className="font-bold text-lg">{blog.title}</h2>
            <p className="text-gray-500 text-sm mt-2">{blog.desc}</p>

            <div className="text-xs text-gray-400 mt-4 flex justify-between">
              <span>{blog.author}</span>
              <span>{blog.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}