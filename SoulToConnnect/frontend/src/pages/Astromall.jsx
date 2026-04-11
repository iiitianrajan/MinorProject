import React, { useEffect, useState } from 'react';
import { ShoppingBag, Star, Sparkles, Zap, Tag, SlidersHorizontal, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from '../components/auth/AuthModal';

/* ─── Constants ─── */
const CATEGORIES = ['Crystals', 'Ritual Kits', 'Tarot', 'Astrology Tools'];
const ENERGIES = ['Love', 'Clarity', 'Protection', 'Abundance'];
const PRICE_MAX = 5000;
const ITEMS_PER_PAGE = 6;

const pageVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  show:   { opacity: 1, y: 0,  scale: 1,    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

const gridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

/* ─── Sidebar Filter Panel ─── */
function FilterSidebar({ selectedCategory, setSelectedCategory, selectedEnergies, toggleEnergy, priceRange, setPriceRange, onClear }) {
  return (
    <aside className="w-full lg:w-56 flex-shrink-0">
      <div className="card-soft sticky top-24 space-y-7">

        {/* Categories */}
        <div>
          <p
            className="text-[10px] font-bold uppercase tracking-[0.18em] mb-3"
            style={{ color: 'var(--text-soft)' }}
          >
            Categories
          </p>
          <div className="space-y-1">
            {['All Products', ...CATEGORIES].map((cat) => {
              const active = selectedCategory === cat;
              return (
                <motion.button
                  key={cat}
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedCategory(cat)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all border-0 text-left"
                  style={
                    active
                      ? { background: 'var(--accent-bg)', color: 'var(--primary)', fontWeight: 700 }
                      : { background: 'transparent', color: 'var(--text-muted)' }
                  }
                >
                  <span>{cat}</span>
                  {active && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: 'var(--primary)' }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Manifestation Energy */}
        <div>
          <p
            className="text-[10px] font-bold uppercase tracking-[0.18em] mb-3"
            style={{ color: 'var(--text-soft)' }}
          >
            Manifestation Energy
          </p>
          <div className="flex flex-wrap gap-2">
            {ENERGIES.map((e) => {
              const active = selectedEnergies.includes(e);
              return (
                <motion.button
                  key={e}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => toggleEnergy(e)}
                  className="px-3 py-1 rounded-full text-xs font-semibold transition-all border-0"
                  style={
                    active
                      ? { background: 'var(--gradient-primary)', color: '#fff', boxShadow: '0 3px 12px rgba(165,61,0,0.28)' }
                      : { background: 'var(--bg-elevated)', color: 'var(--text-muted)', border: '1px solid var(--border-soft)' }
                  }
                >
                  {e}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <p
            className="text-[10px] font-bold uppercase tracking-[0.18em] mb-3"
            style={{ color: 'var(--text-soft)' }}
          >
            Investment Range
          </p>
          <input
            type="range"
            min={25}
            max={PRICE_MAX}
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
            style={{ accentColor: 'var(--primary)' }}
          />
          <div className="flex justify-between mt-2 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
            <span>₹25</span>
            <span style={{ color: 'var(--primary)' }}>₹{priceRange.toLocaleString()}+</span>
          </div>
        </div>

        {/* Clear */}
        <motion.button
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.97 }}
          onClick={onClear}
          className="w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border-0"
          style={{
            background: 'var(--bg-elevated)',
            color: 'var(--text-muted)',
            border: '1px solid var(--border-soft)',
          }}
        >
          Clear Filters
        </motion.button>
      </div>
    </aside>
  );
}

/* ─── Product Card ─── */
function ProductCard({ item, onAddToCart }) {
  const [hovered, setHovered] = useState(false);
  const discount = item.originalPrice
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : null;

  return (
    <motion.div
      variants={cardVariant}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="card overflow-hidden cursor-pointer relative group"
      style={{ padding: 0 }}
    >
      {/* Hover glow */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0 pointer-events-none rounded-[1.5rem]"
            style={{ background: 'radial-gradient(circle at 50% 0%, rgba(255,98,0,0.07) 0%, transparent 65%)' }}
          />
        )}
      </AnimatePresence>

      {/* Image */}
      <div
        className="relative h-44 overflow-hidden flex items-center justify-center"
        style={{ background: 'var(--bg-soft)' }}
      >
        {/* Top accent */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5 z-10"
          style={{ background: 'var(--gradient-primary)' }}
        />

        {item.isBestseller && (
          <div
            className="absolute top-3 left-3 z-10 text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{ background: 'var(--gradient-primary)', boxShadow: '0 2px 10px rgba(165,61,0,0.35)' }}
          >
            Best Seller
          </div>
        )}
        {item.isLimited && (
          <div
            className="absolute top-3 left-3 z-10 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(99,102,241,0.15)', color: '#4f46e5', border: '1px solid rgba(99,102,241,0.2)' }}
          >
            Limited Edition
          </div>
        )}

        {/* Product image / emoji */}
        <motion.div
          animate={hovered ? { scale: 1.12, rotate: 4 } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-7xl select-none"
        >
          {/* {item.image || '🔮'} */}
          
          <img src={item.image} alt="" />
        </motion.div>

        {/* Add to cart overlay on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => { e.stopPropagation(); onAddToCart(item); }}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 btn-primary text-xs flex items-center gap-1.5 whitespace-nowrap z-20"
              style={{ padding: '0.5rem 1.2rem' }}
            >
              <ShoppingBag size={12} /> Add to Cart
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Body */}
      <div className="p-4 relative z-10">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, j) => (
            <Star
              key={j}
              size={11}
              style={
                j < Math.round(item.rating || 4.5)
                  ? { fill: '#facc15', color: '#facc15' }
                  : { fill: 'var(--bg-high)', color: 'var(--bg-high)' }
              }
            />
          ))}
          <span className="text-[10px] ml-1 font-semibold" style={{ color: 'var(--text-soft)' }}>
            ({item.reviews || 0})
          </span>
        </div>

        <h3
          className="font-semibold text-sm mb-3 line-clamp-1 leading-snug"
          style={{ color: 'var(--text-heading)' }}
        >
          {item.name}
        </h3>

        {/* Price */}
        <div className="flex items-end gap-2">
          <p className="text-base font-bold" style={{ color: 'var(--primary)' }}>
            ₹{item.price?.toLocaleString()}
          </p>
          {item.originalPrice && (
            <p className="text-xs line-through mb-0.5" style={{ color: 'var(--text-soft)' }}>
              ₹{item.originalPrice?.toLocaleString()}
            </p>
          )}
          {discount && (
            <span
              className="text-[9px] font-bold px-1.5 py-0.5 rounded-full ml-auto"
              style={{ background: 'var(--accent-bg)', color: 'var(--primary)' }}
            >
              -{discount}%
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Pagination ─── */
function Pagination({ current, total, onChange }) {
  const pages = [];
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || Math.abs(i - current) <= 1) pages.push(i);
    else if (pages[pages.length - 1] !== '...') pages.push('...');
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        className="w-9 h-9 rounded-full flex items-center justify-center transition-all border-0"
        style={{
          background: current === 1 ? 'var(--bg-soft)' : 'var(--bg-elevated)',
          color: current === 1 ? 'var(--text-soft)' : 'var(--text-heading)',
          boxShadow: current === 1 ? 'none' : 'var(--shadow-sm)',
        }}
      >
        <ChevronLeft size={15} />
      </motion.button>

      {pages.map((p, i) =>
        p === '...' ? (
          <span key={i} className="text-sm" style={{ color: 'var(--text-soft)' }}>…</span>
        ) : (
          <motion.button
            key={p}
            whileHover={{ scale: 1.12, y: -2 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => onChange(p)}
            className="w-9 h-9 rounded-full text-sm font-semibold flex items-center justify-center transition-all border-0"
            style={
              p === current
                ? { background: 'var(--gradient-primary)', color: '#fff', boxShadow: '0 4px 14px rgba(165,61,0,0.3)' }
                : { background: 'var(--bg-elevated)', color: 'var(--text-muted)', boxShadow: 'var(--shadow-sm)' }
            }
          >
            {p}
          </motion.button>
        )
      )}

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onChange(Math.min(total, current + 1))}
        disabled={current === total}
        className="w-9 h-9 rounded-full flex items-center justify-center transition-all border-0"
        style={{
          background: current === total ? 'var(--bg-soft)' : 'var(--bg-elevated)',
          color: current === total ? 'var(--text-soft)' : 'var(--text-heading)',
          boxShadow: current === total ? 'none' : 'var(--shadow-sm)',
        }}
      >
        <ChevronRight size={15} />
      </motion.button>
    </div>
  );
}

/* ─── Main Component ─── */
const Astromall = () => {
  const { currentUser } = useAuth();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [selectedEnergies, setSelectedEnergies] = useState([]);
  const [priceRange, setPriceRange] = useState(PRICE_MAX);
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/product`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, []);

  const toggleEnergy = (e) =>
    setSelectedEnergies((prev) =>
      prev.includes(e) ? prev.filter((x) => x !== e) : [...prev, e]
    );

  const clearFilters = () => {
    setSelectedCategory('All Products');
    setSelectedEnergies([]);
    setPriceRange(PRICE_MAX);
    setCurrentPage(1);
  };

  const handleAddToCart = (item) => {
    if (currentUser) {
      addToCart(item);
    } else {
      setIsModelOpen(true);
    }
  };

  const filtered = products.filter((p) => {
    const catMatch = selectedCategory === 'All Products' || p.category === selectedCategory;
    const priceMatch = !p.price || p.price <= priceRange;
    return catMatch && priceMatch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  useEffect(() => { setCurrentPage(1); }, [selectedCategory, selectedEnergies, priceRange]);

  return (
    <motion.div variants={pageVariant} initial="hidden" animate="visible" className="overflow-x-hidden">

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative pt-20 pb-10 overflow-hidden" style={{ background: 'var(--bg-soft)' }}>
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-24 -right-24 w-[440px] h-[440px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,98,0,0.09) 0%, transparent 65%)', filter: 'blur(60px)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute -bottom-16 -left-16 w-[360px] h-[360px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,140,58,0.07) 0%, transparent 65%)', filter: 'blur(55px)' }}
        />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-widest"
            style={{ background: 'var(--accent-bg)', color: 'var(--primary)', border: '1px solid var(--accent-border)' }}
          >
            <Sparkles size={11} /> 100% Authentic Products
          </motion.div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-5xl font-bold tracking-tight mb-2"
                style={{ color: 'var(--text-heading)' }}
              >
                Celestial Collections
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.28 }}
                className="text-sm max-w-sm leading-relaxed"
                style={{ color: 'var(--text-muted)' }}
              >
                From the dust of stars to the palm of your hand. Discover curated artifacts designed to align your spirit with the rhythmic dance of the cosmos.
              </motion.p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden btn-primary flex items-center gap-2 self-start"
            >
              <SlidersHorizontal size={14} /> Filters
            </motion.button>
          </div>
        </div>
      </section>

      {/* ═══════════════ BODY ═══════════════ */}
      <section className="section" style={{ paddingTop: '3rem' }}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 items-start">

            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
              <FilterSidebar
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedEnergies={selectedEnergies}
                toggleEnergy={toggleEnergy}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                onClear={clearFilters}
              />
            </div>

            {/* Mobile Sidebar Drawer */}
            <AnimatePresence>
              {sidebarOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 lg:hidden"
                    style={{ background: 'rgba(26,28,26,0.3)', backdropFilter: 'blur(4px)' }}
                  />
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '-100%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="fixed left-0 top-0 bottom-0 z-50 w-72 overflow-y-auto shadow-xl lg:hidden"
                    style={{ background: 'var(--bg)', padding: '1.5rem' }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-bold text-sm" style={{ color: 'var(--text-heading)' }}>Filters</span>
                      <button
                        onClick={() => setSidebarOpen(false)}
                        className="w-8 h-8 rounded-full flex items-center justify-center border-0"
                        style={{ background: 'var(--bg-soft)' }}
                      >
                        <X size={14} style={{ color: 'var(--text-muted)' }} />
                      </button>
                    </div>
                    <FilterSidebar
                      selectedCategory={selectedCategory}
                      setSelectedCategory={(c) => { setSelectedCategory(c); setSidebarOpen(false); }}
                      selectedEnergies={selectedEnergies}
                      toggleEnergy={toggleEnergy}
                      priceRange={priceRange}
                      setPriceRange={setPriceRange}
                      onClear={() => { clearFilters(); setSidebarOpen(false); }}
                    />
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Product Grid */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-6">
                <p className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                  <span style={{ color: 'var(--text-heading)' }}>{filtered.length}</span> products found
                </p>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedCategory}-${currentPage}`}
                  variants={gridContainer}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                >
                  {paginated.map((item) => (
                    <ProductCard key={item._id} item={item} onAddToCart={handleAddToCart} />
                  ))}
                </motion.div>
              </AnimatePresence>

              {filtered.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card-soft text-center py-20"
                >
                  <div className="text-5xl mb-4 select-none">🔮</div>
                  <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--text-heading)' }}>No products found</h3>
                  <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>Try adjusting your filters</p>
                  <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={clearFilters} className="btn-primary text-sm">
                    Clear All Filters
                  </motion.button>
                </motion.div>
              )}

              {totalPages > 1 && (
                <Pagination current={currentPage} total={totalPages} onChange={setCurrentPage} />
              )}
            </div>
          </div>
        </div>
      </section>

      <AuthModal isOpen={isModelOpen} onClose={() => setIsModelOpen(false)} />
    </motion.div>
  );
};

export default Astromall;