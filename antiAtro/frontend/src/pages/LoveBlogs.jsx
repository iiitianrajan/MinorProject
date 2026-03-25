import { useNavigate } from "react-router-dom";

export default function LoveBlogs() {
  const navigate = useNavigate();

  const blogs = [
    {
      id: 1,
      title: "7 Signs of True Love",
      desc: "Understand the deep emotional connection beyond attraction.",
      author: "Astro Expert",
      date: "Mar 2026",
    },
    {
      id: 2,
      title: "How to Fix Communication",
      desc: "Improve understanding and reduce conflicts in your relationship.",
      author: "Relationship Coach",
      date: "Feb 2026",
    },
    {
      id: 3,
      title: "Top 5 Relationship Red Flags",
      desc: "Identify toxic patterns early and protect yourself.",
      author: "Astrologer",
      date: "Jan 2026",
    },
    {
      id: 4,
      title: "Compatibility by Zodiac",
      desc: "Check how your zodiac affects your love life.",
      author: "Astro Guru",
      date: "Jan 2026",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-8">

      {/* 🔥 HEADER */}
      <h1 className="text-3xl font-bold text-center mb-2">
        ❤️ Love & Relationship Blogs
      </h1>
      <p className="text-center text-gray-500 mb-8">
        Explore love, compatibility & emotional guidance
      </p>

      {/* ⭐ FEATURED */}
      <div
        onClick={() => navigate("/blog/1")}
        className="bg-pink-100 p-6 rounded-2xl mb-10 cursor-pointer hover:shadow-lg transition"
      >
        <h2 className="text-xl font-semibold text-pink-700">
          Featured: Signs of True Love
        </h2>
        <p className="text-gray-600 mt-2">
          Discover what real love feels like and how to build a strong bond.
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
            <div className="text-pink-500 font-semibold text-sm mb-2">
              LOVE
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