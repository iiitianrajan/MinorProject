import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HoroscopeResult() {
  const { type, sign } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchHoroscope = async () => {
      try {
        const day = type === "weekly" ? "week" : "today";

        const response = await axios.get(`http://localhost:5001/horoscope?sign=${sign}&day=${day}`);

        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHoroscope();
  }, [sign, type]);

  return (
    <div className="min-h-screen bg-white p-8 max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        🔮 {sign} {type} Horoscope
      </h1>

      {!data ? (
        setData({
  description: "Today is a positive day full of energy.",
  love: "Good bonding with partner",
  career: "New opportunity coming",
  health: "Stay hydrated"
})
      ) : (
        <div className="bg-yellow-100 p-6 rounded-xl shadow">

          <p className="mb-4">
            <strong>Date:</strong> {data.current_date}
          </p>

          <p className="mb-4">
            <strong>Description:</strong> {data.description}
          </p>

          <p>❤️ Love: {data.love}</p>
          <p>💼 Career: {data.career}</p>
          <p>🏥 Health: {data.health}</p>

        </div>
      )}

    </div>
  );
}