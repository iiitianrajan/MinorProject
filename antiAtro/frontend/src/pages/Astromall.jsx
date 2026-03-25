import React, { useEffect, useState } from 'react';
import { ShoppingBag, Star, Filter } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import AuthModal from '../components/auth/AuthModal'

const Astromall = () => {
  const { currentUser } = useAuth();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Products');

  const { addToCart } = useCart();

  // 🔥 Fetch from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/product');
        const data = await res.json();
        console.log(data);
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  // 🔥 Category Filter
  const filteredProducts =
    selectedCategory === 'All Products'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-black text-gray-800 flex items-center gap-2">
              <ShoppingBag className="text-[#ffdb42]" size={28} /> Astromall Shop
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              100% Authentic Gemstones, lowest price guaranteed.
            </p>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-bold hover:bg-gray-50">
            <Filter size={16} /> Filter Categories
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-4 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {['All Products', 'Gemstone', 'Rudraksha', 'Yantra', 'Evil Eye', 'Feng Shui'].map((cat, i) => (
            <button
              key={i}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-colors shadow-sm ${selectedCategory === cat
                ? 'bg-[#ffdb42] text-black'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
            >

              {/* Image */}
              <div className="h-48 bg-gradient-to-br from-amber-50 to-orange-50 border-b border-gray-100 relative flex items-center justify-center overflow-hidden">
                <div className="text-[80px] group-hover:scale-110 transition-transform duration-500">
                  {item.image || '🔮'}
                </div>

                {item.originalPrice && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] uppercase font-black px-2 py-0.5 rounded">
                    {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                  </div>
                )}
              </div>

              <div className="p-4">
                {/* Rating */}
                <div className="flex items-center gap-1 text-xs font-bold text-gray-400 mb-1">
                  <Star size={12} className="fill-[#ffdb42] text-[#ffdb42]" />
                  {item.rating || 4.5} (120 reviews)
                </div>

                {/* Title */}
                <h3 className="font-bold text-gray-800 text-base mb-1 hover:text-[#ffdb42] cursor-pointer line-clamp-1">
                  {item.name}
                </h3>

                {/* Price */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-end gap-2">
                    <p className="text-xl font-black text-gray-800">
                      ₹{item.price}
                    </p>
                    {item.originalPrice && (
                      <p className="text-sm font-bold text-gray-400 line-through pb-0.5">
                        ₹{item.originalPrice}
                      </p>
                    )}
                  </div>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => {
                    if (currentUser) {
                      addToCart(item)
                    } else {
                      if (!currentUser) {
                        setIsModelOpen(true);
                        // toast.error("Please login first 🔐");

                      }
                    }
                  }
                  }
                  className="w-full mt-4 py-2.5 bg-white border-2 border-[#ffdb42] text-black font-bold rounded-lg hover:bg-[#ffdb42] transition-colors"
                >
                  Add to Cart
                </button>
                <AuthModal
                  isOpen={isModelOpen}
                  onClose={() => setIsModelOpen(false)}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Astromall;