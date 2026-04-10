import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Clock, ArrowRight, Star, CheckCircle,
  Mail, Instagram, ExternalLink, BookOpen
} from 'lucide-react';
import { ALL_ARTICLES, TagBadge, NewsletterSection } from './BlogPage';

/* ─── Page Container ─── */
const PageContainer = ({ children, className = '' }) => (
  <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

/* ─── Article body content generator (per article) ─── */
function getArticleContent(id) {
  const contents = {
    'great-conjunction': {
      heroImage: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1400&h=600&fit=crop',
      lede: 'As the cosmic clock strikes its most significant hour of the decade, we find ourselves at the precipice of a profound shift. The alignment of Jupiter and Saturn marks not just a meeting of planets, but the birth of a twenty-year cycle that promises to reshape our societal structures and individual destinies.',
      sections: [
        {
          heading: 'The Architecture of Fate',
          body: 'Historically, these conjunctions have heralded periods of immense architectural and philosophical growth. Unlike the chaotic energy of Uranus or the dissolving influence of Neptune, the Jupiter–Saturn union provides a structured framework for expansion. It is the "Celestial Prism" through which raw ambition is refracted into tangible reality.',
          quote: '"The stars do not compel us; they invite us to dance with the rhythms of a universe that is both ancient and ever-renewing."',
          afterQuote: 'We must look toward the element of Air. For the last 200 years, these conjunctions have primarily occurred in Earth signs—Capricorn, Taurus, Virgo—focusing our global attention on industry, physical borders, and material wealth. Now, as we transition into the era of Air, the currency of our world shifts toward ideas, communication, and decentralized networks.',
        },
        {
          heading: 'Individual Impact: Navigating Your Chart',
          body: 'To understand how this shift affects you personally, one must locate where the degree of the conjunction falls within their birth chart. For those with significant placements in Gemini, Libra, or Aquarius, this period may feel like a sudden surge of intellectual clarity and social opportunity.',
          image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=400&fit=crop',
          imageCaption: 'The nebula of creation: Where form meets frequency',
          bullets: [
            { label: 'Spiritual Grounding', text: 'Despite the airy nature of the current transit, maintaining a physical practice is essential to prevent burnout.' },
            { label: 'Digital Detox', text: 'As connectivity increases, the quality of our focus becomes our most sacred asset.' },
          ],
        },
      ],
      relatedIds: ['moon-phase-manifestation', 'scorpio-alchemists', 'venus-retrograde'],
    },
    'moon-phase-manifestation': {
      heroImage: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=1400&h=600&fit=crop',
      lede: 'The moon has guided human ritual since the dawn of civilization. By learning to work consciously with its waxing and waning cycles, you unlock one of nature\'s most powerful timing tools for manifestation and release.',
      sections: [
        {
          heading: 'The Eight Lunar Gates',
          body: 'Each lunation cycle contains eight distinct phases, each carrying a unique energetic signature. The New Moon is the seed phase — a time of silence, intention, and inner clarity. As the moon waxes toward fullness, so too does our capacity for outward action and visible growth.',
          quote: '"The moon does not fight. It watches. It waits. Then, in perfect timing, it pulls the tides of your life toward destiny."',
          afterQuote: 'The Full Moon is the culmination point — a moment of peak energy, revelation, and emotional intensity. What you planted at the New Moon begins to bear fruit, for better or worse, under this luminous sky.',
        },
        {
          heading: 'Practical Ritual Framework',
          body: 'Creating a sustainable moon practice doesn\'t require elaborate ceremony. Begin simply: light a candle, write your intentions on paper, and spend ten minutes in quiet reflection at each New and Full Moon.',
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
          imageCaption: 'The moon at its zenith: A mirror for our intentions',
          bullets: [
            { label: 'New Moon Practice', text: 'Write 3–5 intentions in the present tense. Bury them or place them under moonlight.' },
            { label: 'Full Moon Practice', text: 'Review your intentions. Release what no longer serves with gratitude.' },
          ],
        },
      ],
      relatedIds: ['crystals-solstice', 'planetary-hours', 'chiron-aries'],
    },
  };

  // Default content for articles without specific content
  const defaultContent = (article) => ({
    heroImage: article?.image?.replace('w=400&h=260', 'w=1400&h=600') || 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1400&h=600&fit=crop',
    lede: `${article?.excerpt} In this in-depth exploration, we journey through the celestial mechanics and spiritual significance of this profound cosmic phenomenon, offering practical guidance for navigating its energies with wisdom and grace.`,
    sections: [
      {
        heading: 'The Cosmic Context',
        body: 'Every planetary configuration carries within it the seeds of both challenge and opportunity. The key lies not in avoiding these energies, but in learning to work with them consciously — to ride the cosmic wave rather than be swept beneath it.',
        quote: '"The universe speaks in the language of symbols; astrology teaches us how to listen."',
        afterQuote: 'Ancient sky-watchers understood that the movements of celestial bodies mirrored the great cycles of human experience. This wisdom, refined over millennia, forms the foundation of our modern astrological practice.',
      },
      {
        heading: 'Practical Applications',
        body: 'Understanding these energies is only the first step. The real transformation happens when we integrate this knowledge into our daily decisions, our relationships, and our long-term vision for our lives.',
        image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop',
        imageCaption: 'Where cosmic meets personal: The moment of integration',
        bullets: [
          { label: 'Daily Reflection', text: 'Take five minutes each morning to consider how today\'s cosmic weather may influence your energy and choices.' },
          { label: 'Journal Practice', text: 'Document synchronicities and insights as they arise — pattern recognition deepens over time.' },
        ],
      },
    ],
    relatedIds: ALL_ARTICLES.filter(a => a.id !== id).slice(0, 3).map(a => a.id),
  });

  const article = ALL_ARTICLES.find(a => a.id === id);
  return contents[id] || defaultContent(article);
}

/* ─── Sidebar: Chart CTA ─── */
function ChartCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative rounded-[1.5rem] overflow-hidden p-6 mb-6"
      style={{ background: 'var(--gradient-primary)' }}
    >
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute pointer-events-none inset-0"
        style={{ background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.15) 0%, transparent 60%)' }}
      />
      <div className="relative z-10">
        <h3 className="font-bold text-lg text-white mb-2 tracking-tight">Chart Your Destiny</h3>
        <p className="text-sm mb-5 leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
          Get a personalized reading from our master astrologers and discover what the stars have in store for you.
        </p>
        <motion.button
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="w-full font-semibold text-sm py-3 rounded-full cursor-pointer transition-all duration-300"
          style={{ background: 'var(--bg-elevated)', color: 'var(--primary)' }}
        >
          Book a Reading
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ─── Sidebar: Related Articles ─── */
function RelatedArticles({ ids, onNavigate }) {
  const articles = ids.map(id => ALL_ARTICLES.find(a => a.id === id)).filter(Boolean);
  return (
    <div className="card mb-6">
      <h3 className="font-bold text-xs uppercase tracking-widest mb-5" style={{ color: 'var(--text-heading)' }}>
        Related Articles
      </h3>
      <div className="flex flex-col gap-4">
        {articles.map((article, i) => (
          <motion.div
            key={article.id}
            whileHover={{ x: 3 }}
            onClick={() => onNavigate(article.id)}
            className="cursor-pointer group"
          >
            <div
              className="overflow-hidden rounded-2xl mb-2"
              style={{ height: 90 }}
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
              />
            </div>
            <TagBadge tag={article.tag} small />
            <p
              className="text-sm font-semibold mt-1.5 leading-snug group-hover:text-[var(--primary)] transition-colors duration-200"
              style={{ color: 'var(--text-heading)' }}
            >
              {article.title}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Sidebar: Weekly Oracle Newsletter ─── */
function SidebarNewsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  return (
    <div className="card-soft">
      <h4 className="font-bold text-sm mb-1.5 tracking-tight" style={{ color: 'var(--text-heading)' }}>The Weekly Oracle</h4>
      <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
        Receive cosmic insights directly in your inbox every Monday morning.
      </p>
      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full text-xs px-4 py-3 rounded-full mb-3 outline-none transition-all duration-300"
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-soft)', color: 'var(--text)' }}
              onKeyDown={(e) => e.key === 'Enter' && email.trim() && setDone(true)}
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => email.trim() && setDone(true)}
              className="w-full btn-primary text-xs py-3 font-semibold cursor-pointer uppercase tracking-wider"
            >
              Subscribe Now
            </motion.button>
          </motion.div>
        ) : (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 py-2">
            <CheckCircle size={16} color="#86efac" />
            <span className="text-xs font-semibold" style={{ color: 'var(--text-heading)' }}>You're subscribed! ✨</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Author Bio ─── */
function AuthorBio({ author }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card flex items-start gap-5 mt-12"
    >
      <img
        src={author.avatar?.replace('40', '80') || 'https://i.pravatar.cc/80?img=47'}
        alt={author.name}
        className="w-16 h-16 rounded-2xl object-cover flex-shrink-0"
        style={{ border: '2px solid var(--accent-border)' }}
      />
      <div className="flex-1">
        <h4 className="font-bold text-base mb-1.5 tracking-tight" style={{ color: 'var(--text-heading)' }}>{author.name}</h4>
        <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>{author.bio}</p>
        <div className="flex items-center gap-3">
          <motion.a
            href="#"
            whileHover={{ x: 2 }}
            className="inline-flex items-center gap-1.5 text-xs font-bold"
            style={{ color: 'var(--primary)' }}
          >
            <Instagram size={13} /> Follow on Instagram
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ x: 2 }}
            className="inline-flex items-center gap-1.5 text-xs font-bold"
            style={{ color: 'var(--primary)' }}
          >
            <ExternalLink size={13} /> View Portfolio
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Article Detail Page ─── */
export default function ArticleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const article = ALL_ARTICLES.find(a => a.id === id) || ALL_ARTICLES[0];
  const content = getArticleContent(id || article.id);

  return (
    <div className="overflow-x-hidden" style={{ minHeight: '100vh', background: 'var(--bg-soft)' }}>
      

      {/* ── Hero Image ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative w-full overflow-hidden"
        style={{ height: 'clamp(260px, 38vw, 480px)' }}
      >
        <img
          src={content.heroImage}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(10,8,6,0.25) 0%, rgba(244,243,241,1) 98%)' }}
        />
        {/* Animated glow */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute pointer-events-none"
          style={{ top: '10%', right: '10%', width: '40%', height: '60%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,98,0,0.15) 0%, transparent 70%)', filter: 'blur(50px)' }}
        />
      </motion.div>

      {/* ── Back Button ── */}
      <PageContainer>
        <motion.button
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ x: -4 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-semibold mt-6 mb-4 cursor-pointer"
          style={{ color: 'var(--text-muted)' }}
        >
          <ArrowLeft size={16} /> Back to Articles
        </motion.button>
      </PageContainer>

      {/* ── Article Header ── */}
      <PageContainer>
        <div className="mb-3 flex items-center gap-3">
          <TagBadge tag={article.tag} />
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-bold leading-tight mb-4 tracking-tight"
          style={{ fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', color: 'var(--text-heading)', maxWidth: 700 }}
        >
          {article.title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center gap-4 mb-10 pb-6"
          style={{ borderBottom: '1px solid var(--border-soft)' }}
        >
          <div className="flex items-center gap-2">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-8 h-8 rounded-full object-cover"
              style={{ border: '2px solid var(--accent-border)' }}
            />
            <span className="text-sm font-semibold" style={{ color: 'var(--text-heading)' }}>{article.author.name}</span>
          </div>
          <span className="text-xs" style={{ color: 'var(--text-soft)' }}>{article.date}</span>
          <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-soft)' }}>
            <Clock size={11} /> {article.readTime}
          </span>
        </motion.div>
      </PageContainer>

      {/* ── Main Content + Sidebar ── */}
      <PageContainer>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">

          {/* LEFT: Article Body */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2"
          >
            {/* Lede paragraph — large drop-cap style */}
            <p
              className="mb-8 leading-relaxed"
              style={{
                fontSize: '1.05rem',
                color: 'var(--text)',
                borderLeft: '3px solid var(--primary)',
                paddingLeft: '1.25rem',
              }}
            >
              {content.lede}
            </p>

            {content.sections.map((section, si) => (
              <div key={si} className="mb-10">
                {/* Section heading */}
                <h2
                  className="font-bold mb-4 tracking-tight"
                  style={{ fontSize: '1.25rem', color: 'var(--primary)' }}
                >
                  {section.heading}
                </h2>

                <p className="mb-6 leading-relaxed" style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                  {section.body}
                </p>

                {/* Pull quote */}
                {section.quote && (
                  <motion.blockquote
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="my-8 px-6 py-5 rounded-2xl relative"
                    style={{
                      background: 'var(--accent-bg)',
                      borderLeft: '4px solid var(--primary)',
                    }}
                  >
                    <p
                      className="font-semibold leading-relaxed italic"
                      style={{ fontSize: '1.05rem', color: 'var(--text-heading)', fontStyle: 'italic' }}
                    >
                      {section.quote}
                    </p>
                  </motion.blockquote>
                )}

                {section.afterQuote && (
                  <p className="mb-6 leading-relaxed" style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                    {section.afterQuote}
                  </p>
                )}

                {/* Inline image */}
                {section.image && (
                  <motion.figure
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="my-8"
                  >
                    <div className="overflow-hidden rounded-2xl" style={{ height: 260 }}>
                      <img src={section.image} alt={section.imageCaption} className="w-full h-full object-cover" />
                    </div>
                    {section.imageCaption && (
                      <figcaption className="text-center text-xs mt-2 italic" style={{ color: 'var(--text-soft)' }}>
                        {section.imageCaption}
                      </figcaption>
                    )}
                  </motion.figure>
                )}

                {/* Bullet points */}
                {section.bullets && (
                  <ul className="mt-6 flex flex-col gap-4">
                    {section.bullets.map((bullet, bi) => (
                      <motion.li
                        key={bi}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: bi * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div
                          className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                          style={{ background: 'var(--primary)' }}
                        />
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                          <span className="font-bold" style={{ color: 'var(--text-heading)' }}>{bullet.label}: </span>
                          {bullet.text}
                        </p>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* Author Bio */}
            <AuthorBio author={article.author} />
          </motion.div>

          {/* RIGHT: Sticky Sidebar */}
          <div>
            <div className="sticky top-24 flex flex-col gap-0">
              <ChartCTA />
              <RelatedArticles ids={content.relatedIds} onNavigate={(id) => navigate(`/blog/${id}`)} />
              <SidebarNewsletter />
            </div>
          </div>
        </div>

        {/* ── More from the blog ── */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen size={18} style={{ color: 'var(--primary)' }} />
            <h2 className="font-bold text-xl tracking-tight" style={{ color: 'var(--text-heading)' }}>Continue Reading</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_ARTICLES.filter(a => a.id !== id).slice(0, 3).map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => navigate(`/blog/${a.id}`)}
                className="card group cursor-pointer overflow-hidden"
                style={{ padding: 0 }}
              >
                <div className="overflow-hidden rounded-t-[1.5rem]" style={{ height: 160 }}>
                  <img src={a.image} alt={a.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <TagBadge tag={a.tag} small />
                  <h3 className="font-bold text-sm mt-2 leading-snug tracking-tight group-hover:text-[var(--primary)] transition-colors duration-300" style={{ color: 'var(--text-heading)' }}>{a.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <NewsletterSection />
      </PageContainer>

     
    </div>
  );
}