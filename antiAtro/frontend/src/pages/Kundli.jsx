import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Kundli = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    gender: "Male",
    day: "",
    month: "",
    year: "",
    hour: "",
    minute: "",
    ampm: "AM",
    place: "",
  });

  // 🔥 handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔮 zodiac logic
  const getZodiac = (day, month) => {
    day = Number(day);
    month = Number(month);

    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "Aries";
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "Taurus";
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "Gemini";
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "Cancer";
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "Leo";
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "Virgo";
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "Libra";
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "Scorpio";
    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "Sagittarius";
    if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return "Capricorn";
    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "Aquarius";
    return "Pisces";
  };

  // 🚀 submit handler
  const handleSubmit = () => {
    if (!form.name || !form.day || !form.month) {
      alert("Please fill required fields");
      return;
    }

    const zodiac = getZodiac(form.day, form.month);

    // navigate to result page
    navigate("/kundli-result", {
      state: { ...form, zodiac },
    });
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-8 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-gray-800 mb-4">Free Kundli Online</h1>
          <p className="text-gray-500 text-lg">Generate your exhaustive Janam Kundli completely free.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-4 mb-6">New Kundli</h2>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* NAME */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter full name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#ffdb42]"
                />
              </div>
              
              {/* GENDER */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Gender</label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              {/* DATE */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Birth Date</label>
                <div className="flex gap-2">
                  <input name="day" onChange={handleChange} placeholder="DD" className="w-1/3 px-4 py-3 border rounded-lg text-center" />
                  <input name="month" onChange={handleChange} placeholder="MM" className="w-1/3 px-4 py-3 border rounded-lg text-center" />
                  <input name="year" onChange={handleChange} placeholder="YYYY" className="w-1/3 px-4 py-3 border rounded-lg text-center" />
                </div>
              </div>

              {/* TIME */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Birth Time</label>
                <div className="flex gap-2">
                  <input name="hour" onChange={handleChange} placeholder="HH" className="w-1/3 px-4 py-3 border rounded-lg text-center" />
                  <input name="minute" onChange={handleChange} placeholder="MM" className="w-1/3 px-4 py-3 border rounded-lg text-center" />
                  <select name="ampm" onChange={handleChange} className="w-1/3 px-2 py-3 border rounded-lg">
                    <option>AM</option>
                    <option>PM</option>
                  </select>
                </div>
              </div>
            </div>

            {/* PLACE */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Birth Place</label>
              <input
                name="place"
                onChange={handleChange}
                placeholder="Enter birth city"
                className="w-full px-4 py-3 border rounded-lg"
              />
            </div>

            {/* BUTTON */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-4 bg-[#ffdb42] text-black rounded-lg font-black text-lg shadow hover:shadow-lg"
            >
              Generate Janam Kundli
            </button>

          </form>

        </div>
      </div>
    </div>
  );
};

export default Kundli;