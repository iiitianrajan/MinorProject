import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Share2, Twitter, MessageCircle, Bookmark, Clock, User, Sparkles, Heart, Star, Moon, Sun } from "lucide-react";
import { useState } from "react";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const blogs = {
    1: {
      title: "7 Signs of True Love",
      subtitle: "Understanding the cosmic connection between souls",
      author: "Astro Expert",
      date: "March 2026",
      readTime: "8 min read",
      category: "Love & Relationships",
      heroImage: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1200&h=600&fit=crop",
      authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      zodiacFocus: ["Cancer", "Pisces", "Libra"],
      content: [
        {
          type: "intro",
          text: "True love is not just about attraction or excitement — it's about emotional safety, trust, and deep understanding. In the cosmic dance of relationships, the universe aligns souls that are meant to find each other."
        },
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=500&fit=crop",
          caption: "The universe brings together souls destined to connect"
        },
        {
          type: "quote",
          text: "In today's fast-paced world, many people confuse attachment with love. But real love feels calm, secure, and uplifting — like the gentle pull of the moon on the tides.",
          author: "Ancient Vedic Wisdom"
        },
        {
          type: "heading",
          text: "The Seven Celestial Signs"
        },
        {
          type: "text",
          text: "According to ancient astrological wisdom, true love reveals itself through seven unmistakable signs. These are not mere coincidences, but cosmic confirmations of a genuine soul connection."
        },
        {
          type: "sign",
          number: 1,
          title: "You feel safe being yourself",
          description: "You don't pretend or hide your flaws. You are accepted fully, just as the moon accepts both its light and dark phases. This is the essence of Venus in harmony.",
          icon: "heart"
        },
        {
          type: "sign",
          number: 2,
          title: "Communication feels natural",
          description: "You can talk openly without fear of judgment. Mercury, the planet of communication, flows freely between you. Silence is comfortable, and words come effortlessly.",
          icon: "star"
        },
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&h=500&fit=crop",
          caption: "True communication transcends words"
        },
        {
          type: "sign",
          number: 3,
          title: "There is mutual respect",
          description: "Both partners value each other's opinions and boundaries. This reflects the balanced energy of Libra — fair, harmonious, and equal in all ways.",
          icon: "sparkles"
        },
        {
          type: "sign",
          number: 4,
          title: "Growth happens together",
          description: "You inspire each other to become better. Like Jupiter's expansive energy, you both evolve and reach for higher consciousness together.",
          icon: "sun"
        },
        {
          type: "sign",
          number: 5,
          title: "Trust is strong",
          description: "There is no constant doubt or insecurity. Saturn's stability grounds your relationship, creating a foundation of unwavering faith.",
          icon: "moon"
        },
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&h=500&fit=crop",
          caption: "Trust forms the foundation of cosmic love"
        },
        {
          type: "sign",
          number: 6,
          title: "You support each other",
          description: "In both success and failure, you stand together. This mirrors the Sun and Moon's eternal dance — always present, always supportive.",
          icon: "heart"
        },
        {
          type: "sign",
          number: 7,
          title: "It feels peaceful",
          description: "Love is not chaos — it is comfort. Like Neptune's dreamy waters, true love brings serenity and a sense of coming home.",
          icon: "star"
        },
        {
          type: "divider"
        },
        {
          type: "conclusion",
          text: "True love is not about perfection. It's about choosing each other every day, honoring the cosmic bond that brought you together. The stars may guide, but it's your actions that create lasting love."
        },
        {
          type: "callout",
          text: "Want to know your love compatibility? Consult your birth chart and discover which zodiac signs align with your soul's journey."
        }
      ],
    },

    2: {
      title: "How to Fix Communication in a Relationship",
      subtitle: "Mercury retrograde and the art of understanding",
      author: "Relationship Coach",
      date: "February 2026",
      readTime: "6 min read",
      category: "Communication",
      heroImage: "https://images.unsplash.com/photo-1516589091380-5d8e87df6999?w=1200&h=600&fit=crop",
      authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      zodiacFocus: ["Gemini", "Virgo", "Aquarius"],
      content: [
        {
          type: "intro",
          text: "Communication is the backbone of any successful relationship. Many relationships fail not because of lack of love, but because of misunderstandings and misaligned energies."
        },
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=500&fit=crop",
          caption: "Words carry energy — choose them wisely"
        },
        {
          type: "heading",
          text: "The Five Pillars of Cosmic Communication"
        },
        {
          type: "sign",
          number: 1,
          title: "Listen to understand, not to reply",
          description: "Most people listen just to respond. Instead, truly hear your partner with the depth of Scorpio's intuition.",
          icon: "heart"
        },
        {
          type: "sign",
          number: 2,
          title: "Avoid blaming language",
          description: "Don't say: 'You never care' — Say: 'I feel hurt when...' This shift honors both Venusian compassion and Martian honesty.",
          icon: "star"
        },
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1521791055366-0d553872125f?w=800&h=500&fit=crop",
          caption: "Honesty delivered with kindness heals all wounds"
        },
        {
          type: "sign",
          number: 3,
          title: "Be honest but kind",
          description: "Truth matters, but delivery matters more. Channel the diplomatic grace of Libra in every conversation.",
          icon: "sparkles"
        },
        {
          type: "sign",
          number: 4,
          title: "Stay calm during arguments",
          description: "Anger blocks understanding. Take a pause if needed. Let the cooling waters of Cancer soothe heated emotions.",
          icon: "moon"
        },
        {
          type: "sign",
          number: 5,
          title: "Express needs clearly",
          description: "Your partner is not a mind reader. Even if you're with a Pisces, clear Mercury energy is essential for healthy bonds.",
          icon: "sun"
        },
        {
          type: "conclusion",
          text: "Good communication turns problems into solutions instead of fights. When Mercury is direct in your relationship, love flows effortlessly."
        }
      ],
    },

    3: {
      title: "Top 5 Relationship Red Flags You Should Never Ignore",
      subtitle: "Warning signs written in the stars",
      author: "Astrologer",
      date: "January 2026",
      readTime: "7 min read",
      category: "Relationships",
      heroImage: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=600&fit=crop",
      authorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      zodiacFocus: ["Aries", "Scorpio", "Capricorn"],
      content: [
        {
          type: "intro",
          text: "Not every relationship is healthy. Sometimes, we ignore warning signs because of emotions or the intoxicating fog of Neptune. The cosmos sends us signals — we must learn to read them."
        },
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1455218873509-8097305ee378?w=800&h=500&fit=crop",
          caption: "The universe warns us — we must listen"
        },
        {
          type: "heading",
          text: "Major Cosmic Red Flags"
        },
        {
          type: "sign",
          number: 1,
          title: "Lack of respect",
          description: "If your partner disrespects you, it's a serious issue. No planetary alignment can justify mistreatment.",
          icon: "heart"
        },
        {
          type: "sign",
          number: 2,
          title: "Constant manipulation",
          description: "Making you feel guilty or confused is emotional control. This is Plutonian shadow work at its darkest.",
          icon: "star"
        },
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1485178575877-1a13bf489dfe?w=800&h=500&fit=crop",
          caption: "Trust your intuition — it's your inner guide"
        },
        {
          type: "sign",
          number: 3,
          title: "No trust",
          description: "Checking phones, constant suspicion — unhealthy behavior that blocks Venus and creates karmic debt.",
          icon: "moon"
        },
        {
          type: "sign",
          number: 4,
          title: "Controlling nature",
          description: "Restricting your freedom or decisions. Even Saturn demands structure with respect, not imprisonment.",
          icon: "sparkles"
        },
        {
          type: "sign",
          number: 5,
          title: "Emotional instability",
          description: "Extreme mood swings affecting your peace. When chaos replaces cosmic harmony, it's time to reassess.",
          icon: "sun"
        },
        {
          type: "conclusion",
          text: "Ignoring red flags can lead to toxic relationships. Remember: Love should feel safe, not stressful. The stars guide us toward what serves our highest good."
        }
      ],
    },

    4: {
      title: "Zodiac Compatibility: Does It Really Matter?",
      subtitle: "The ancient science of cosmic connections",
      author: "Astro Guru",
      date: "January 2026",
      readTime: "9 min read",
      category: "Astrology",
      heroImage: "https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?w=1200&h=600&fit=crop",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      zodiacFocus: ["All Signs"],
      content: [
        {
          type: "intro",
          text: "Astrology plays an important role in understanding relationship compatibility. Each zodiac sign has unique traits, and some signs naturally connect better through cosmic resonance."
        },
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&h=500&fit=crop",
          caption: "The zodiac wheel guides our connections"
        },
        {
          type: "heading",
          text: "The Four Elemental Forces"
        },
        {
          type: "sign",
          number: 1,
          title: "Fire signs (Aries, Leo, Sagittarius)",
          description: "Passionate, energetic, and bold. Fire signs need partners who can match their intensity or balance their flame.",
          icon: "sun"
        },
        {
          type: "sign",
          number: 2,
          title: "Earth signs (Taurus, Virgo, Capricorn)",
          description: "Practical, stable, and grounded. Earth signs create lasting foundations and value loyalty above all.",
          icon: "heart"
        },
        {
          type: "image",
          url: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&h=500&fit=crop",
          caption: "Elements shape our love language"
        },
        {
          type: "sign",
          number: 3,
          title: "Air signs (Gemini, Libra, Aquarius)",
          description: "Intellectual, social, and curious. Air signs thrive on mental stimulation and freedom of expression.",
          icon: "sparkles"
        },
        {
          type: "sign",
          number: 4,
          title: "Water signs (Cancer, Scorpio, Pisces)",
          description: "Emotional, intuitive, and deep. Water signs feel everything intensely and need emotional safety.",
          icon: "moon"
        },
        {
          type: "conclusion",
          text: "Astrology doesn't decide your fate, but it helps you understand differences better. Love + understanding = strong relationship. The cosmos offers guidance, but free will creates destiny."
        }
      ],
    },
  };

  const relatedBlogs = [
    { id: 2, title: "How to Fix Communication in a Relationship", image: "https://images.unsplash.com/photo-1516589091380-5d8e87df6999?w=400&h=300&fit=crop" },
    { id: 3, title: "Top 5 Relationship Red Flags", image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop" },
    { id: 4, title: "Zodiac Compatibility Guide", image: "https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?w=400&h=300&fit=crop" },
  ].filter(b => b.id !== parseInt(id));

  const blog = blogs[id];

  if (!blog) {
    return <div className="p-10 text-center">Blog not found</div>;
  }

  const shareUrl = window.location.href;
  const shareText = `${blog.title} - ${blog.subtitle}`;

  const handleShare = (platform) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(shareText);
    
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    };
    
    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  const getIcon = (iconName) => {
    const icons = {
      heart: Heart,
      star: Star,
      sparkles: Sparkles,
      moon: Moon,
      sun: Sun,
    };
    return icons[iconName] || Star;
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen">

      {/* 🔥 HERO SECTION */}
      <div className="relative h-[70vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${blog.heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
        </div>
        
        <div className="relative h-full flex items-end">
          <div className="max-w-4xl mx-auto px-6 pb-16 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md text-white text-xs font-semibold rounded-full border border-white/30">
                  {blog.category}
                </span>
                <span className="text-white/80 text-sm flex items-center gap-1">
                  <Clock size={14} /> {blog.readTime}
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                {blog.title}
              </h1>
              
              <p className="text-xl text-white/90 font-light mb-6 italic">
                {blog.subtitle}
              </p>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={blog.authorImage} 
                    alt={blog.author}
                    className="w-12 h-12 rounded-full border-2 border-white/50"
                  />
                  <div>
                    <p className="text-white font-semibold">{blog.author}</p>
                    <p className="text-white/70 text-sm">{blog.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`p-3 rounded-full backdrop-blur-md transition ${
                      isBookmarked ? 'bg-pink-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />
                  </button>
                  
                  <button
                    onClick={() => handleShare('twitter')}
                    className="p-3 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition"
                  >
                    <Twitter size={18} />
                  </button>
                  
                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="p-3 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition"
                  >
                    <MessageCircle size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 🔥 CONTENT */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        
        {blog.content.map((block, index) => {
          const Icon = block.icon ? getIcon(block.icon) : null;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="mb-8"
            >
              {block.type === "intro" && (
                <p className="text-xl leading-relaxed text-gray-700 font-serif first-letter:text-6xl first-letter:font-bold first-letter:text-pink-600 first-letter:mr-3 first-letter:float-left">
                  {block.text}
                </p>
              )}

              {block.type === "text" && (
                <p className="text-lg leading-relaxed text-gray-700">
                  {block.text}
                </p>
              )}

              {block.type === "heading" && (
                <h2 className="text-4xl font-bold text-gray-900 mt-12 mb-6 flex items-center gap-3">
                  <Sparkles className="text-pink-500" size={32} />
                  {block.text}
                </h2>
              )}

              {block.type === "image" && (
                <div className="my-12 rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={block.url} 
                    alt={block.caption}
                    className="w-full h-auto"
                  />
                  {block.caption && (
                    <p className="text-center text-sm text-gray-500 mt-4 italic">
                      {block.caption}
                    </p>
                  )}
                </div>
              )}

              {block.type === "quote" && (
                <div className="my-12 border-l-4 border-pink-500 pl-8 py-6 bg-gradient-to-r from-pink-50 to-transparent rounded-r-xl">
                  <p className="text-2xl font-serif italic text-gray-800 mb-3">
                    "{block.text}"
                  </p>
                  {block.author && (
                    <p className="text-sm text-gray-600">— {block.author}</p>
                  )}
                </div>
              )}

              {block.type === "sign" && (
                <div className="flex gap-6 items-start my-8 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition border border-gray-100">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      {block.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                      {Icon && <Icon className="text-pink-500" size={24} />}
                      {block.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {block.description}
                    </p>
                  </div>
                </div>
              )}

              {block.type === "divider" && (
                <div className="flex items-center justify-center my-16">
                  <div className="flex items-center gap-4">
                    <Star className="text-pink-400" size={20} />
                    <Star className="text-pink-500" size={24} />
                    <Star className="text-pink-600" size={28} />
                    <Star className="text-pink-500" size={24} />
                    <Star className="text-pink-400" size={20} />
                  </div>
                </div>
              )}

              {block.type === "conclusion" && (
                <div className="my-12 p-8 bg-gradient-to-br from-purple-100 via-pink-50 to-orange-50 rounded-2xl border border-pink-200">
                  <p className="text-xl leading-relaxed text-gray-800 font-serif">
                    ✨ {block.text}
                  </p>
                </div>
              )}

              {block.type === "callout" && (
                <div className="my-12 p-8 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl text-white shadow-2xl">
                  <p className="text-lg leading-relaxed flex items-start gap-3">
                    <Sparkles className="flex-shrink-0 mt-1" size={24} />
                    <span>{block.text}</span>
                  </p>
                </div>
              )}
            </motion.div>
          );
        })}

        {/* 🔥 SHARE SECTION */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4 font-semibold">Share this cosmic wisdom:</p>
          <div className="flex gap-4">
            <button
              onClick={() => handleShare('twitter')}
              className="flex-1 px-6 py-3 bg-[#1DA1F2] text-white rounded-full hover:scale-105 transition flex items-center justify-center gap-2 font-semibold shadow-lg"
            >
              <Twitter size={20} />
              Share on Twitter
            </button>
            
            <button
              onClick={() => handleShare('whatsapp')}
              className="flex-1 px-6 py-3 bg-[#25D366] text-white rounded-full hover:scale-105 transition flex items-center justify-center gap-2 font-semibold shadow-lg"
            >
              <MessageCircle size={20} />
              Share on WhatsApp
            </button>
          </div>
        </div>

        {/* 🔥 RELATED BLOGS */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Sparkles className="text-pink-500" />
            Continue Your Journey
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {relatedBlogs.map((related) => (
              <motion.div
                key={related.id}
                whileHover={{ y: -8 }}
                onClick={() => navigate(`/blog/${related.id}`)}
                className="cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition group"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={related.image} 
                    alt={related.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-gray-900 group-hover:text-pink-600 transition">
                    {related.title}
                  </h4>
                  <p className="text-sm text-pink-600 mt-2 flex items-center gap-1">
                    Read more <span className="group-hover:translate-x-1 transition">→</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 🔙 BACK BUTTON */}
        <div className="mt-16 text-center">
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full hover:scale-105 transition font-semibold shadow-xl inline-flex items-center gap-2"
          >
            ← Back to All Blogs
          </button>
        </div>

      </div>
    </div>
  );
}