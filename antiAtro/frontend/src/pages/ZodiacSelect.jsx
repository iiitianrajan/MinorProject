import { useNavigate } from "react-router-dom";

const signs = [
  "Aries", "Taurus", "Gemini", "Cancer",
  "Leo", "Virgo", "Libra", "Scorpio",
  "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

export default function ZodiacSelect({ type }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-center">

      <h1 className="text-3xl font-bold mb-6">
        Select Your Zodiac Sign
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {signs.map((sign) => (
          <div
            key={sign}
            onClick={() => navigate(`/horoscope/${type}/${sign}`)}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg cursor-pointer"
          >
            {sign}
          </div>
        ))}
      </div>

    </div>
  );
}