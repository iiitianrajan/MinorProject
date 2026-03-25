import { useParams } from "react-router-dom";

export default function BlogDetail() {
  const { id } = useParams();

  return (
    <div className="bg-white min-h-screen p-8 max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mb-3">
        Blog Title {id}
      </h1>

      <p className="text-gray-500 mb-6">
        By Astro Expert • March 2026
      </p>

      <img
        src="https://source.unsplash.com/800x400/?love,relationship"
        className="rounded-xl mb-6"
      />

      <p className="text-gray-700 leading-7">
        This is where your real blog content goes. You can write detailed
        articles here about astrology, love, career guidance, and more.
      </p>
    </div>
  );
}