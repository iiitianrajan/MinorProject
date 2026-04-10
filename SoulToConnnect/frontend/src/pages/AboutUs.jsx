import React from 'react';

/**
 * AboutUs Component
 * 
 * This component renders the 'About Us' page for Celestial Prism using the refined
 * design system tokens (CSS variables) provided. It features an editorial layout,
 * glassmorphic elements, and smooth transitions.
 */
const AboutUs = () => {
  const values = [
    {
      title: 'Unwavering Trust',
      desc: 'In a world of vague predictions, we commit to the highest ethical standards of astrological practice.',
      icon: 'verified_user'
    },
    {
      title: 'Empathetic Guidance',
      desc: 'Our readings are designed to empower your personal sovereignty, not to dictate your destiny.',
      icon: 'psychology'
    },
    {
      title: 'Radiant Clarity',
      desc: 'Complexity made simple. We strip away the jargon to deliver insights that resonate with your lived experience.',
      icon: 'auto_awesome'
    }
  ];

  return (
    <div className="min-h-screen selection:bg-[var(--primary-light)] selection:text-white" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
      {/* Dynamic Tonal Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[20%] w-[50%] h-[50%] rounded-full opacity-20 blur-[120px]" style={{ background: 'radial-gradient(circle, var(--primary-light), transparent 70%)' }}></div>
        <div className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] rounded-full opacity-10 blur-[100px]" style={{ background: 'radial-gradient(circle, var(--primary), transparent 70%)' }}></div>
      </div>

      

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="section max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[1px] w-12" style={{ backgroundColor: 'var(--primary)' }}></span>
              <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--primary)' }}>Our Celestial Mission</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-[1.1] font-['Poppins']" style={{ color: 'var(--text-heading)' }}>
              Deciphering the <br />
              <span className="italic font-light" style={{ color: 'var(--primary)' }}>Language</span> of Light.
            </h1>
            <p className="text-lg lg:text-xl leading-relaxed max-w-xl" style={{ color: 'var(--text-muted)' }}>
              Celestial Prism was born at the intersection of ancient wisdom and modern clarity. We curate the universe's whispers into actionable guidance for the modern seeker.
            </p>
          </div>
          <div className="relative group">
            <div className="glow absolute inset-0"></div>
            <img 
              src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=2000" 
              alt="Ethereal Universe" 
              className="rounded-[2.5rem] shadow-[var(--shadow-lg)] object-cover aspect-[4/5] transform transition-transform group-hover:scale-[1.02] duration-500"
            />
            <div className="glass absolute -bottom-8 -left-8 p-8 max-w-xs">
              <span className="material-icons text-[var(--primary)] mb-4">format_quote</span>
              <p className="text-sm italic font-medium leading-relaxed" style={{ color: 'var(--text-heading)' }}>
                "The cosmos is within us. We are made of star-stuff. We are a way for the cosmos to know itself."
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="section bg-[var(--bg-soft)]">
          <div className="max-w-7xl mx-auto text-center mb-20">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mb-4 block">Foundations</span>
            <h2 className="text-4xl font-bold font-['Poppins']" style={{ color: 'var(--text-heading)' }}>Our Divine Values</h2>
          </div>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="card group">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors group-hover:bg-[var(--primary)] group-hover:text-white" style={{ backgroundColor: 'var(--accent-bg)', color: 'var(--primary)' }}>
                  <span className="material-icons">{value.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-4 font-['Poppins']" style={{ color: 'var(--text-heading)' }}>{value.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="section max-w-5xl mx-auto">
          <div className="rounded-[3rem] p-16 text-center relative overflow-hidden gradient-primary shadow-[var(--shadow-lg)]">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8 font-['Poppins']">Your Cosmic Blueprints Await.</h2>
              <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
                Join over 2 million seekers who use Celestial Prism to align their daily lives with the rhythm of the stars.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="bg-white text-[var(--primary)] px-8 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-transform">Get Your Reading</button>
                <button className="bg-transparent border border-white/30 text-white px-8 py-4 rounded-full font-bold backdrop-blur-sm hover:bg-white/10 transition-colors">Explore Membership</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      
    </div>
  );
};

export default AboutUs;