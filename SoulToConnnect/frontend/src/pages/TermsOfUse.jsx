import React from 'react';

/**
 * TermsOfUse 
 * 
 * This component renders the 'Terms of Use' page using the refined Celestial Ember
 * design system tokens (CSS variables) provided in the user's latest index.css.
 * It features a clean, professional layout with glassmorphic accents and tonal depth.
 */
const TermsOfUse = () => {
  const sections = [
    { id: 'acceptance ', label: 'Acceptance ' },
    { id: 'sacred-spaces', label: 'Sacred Spaces' },
    { id: 'insights-ip', label: 'Insights IP' },
    { id: 'disclaimers', label: 'Disclaimers' },
    { id: 'liability', label: 'Liability' },
  ];

  return (
    <div className="min-h-screen selection:bg-[var(--primary-light)] selection:text-white px-8 py-10 mb-16" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
      {/* Dynamic Tonal Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[20%] w-[50%] h-[50%] rounded-full opacity-20 blur-[120px]" style={{ background: 'radial-gradient(circle, var(--primary-light), transparent 70%)' }}></div>
        <div className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] rounded-full opacity-10 blur-[100px]" style={{ background: 'radial-gradient(circle, var(--primary), transparent 70%)' }}></div>
      </div>

      

      <main className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pb-32">
        <header className="mb-20 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[1px] w-12" style={{ backgroundColor: 'var(--primary)' }}></span>
            <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--primary)' }}>Legal Framework</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-[1.1] font-['Poppins']" style={{ color: 'var(--text-heading)' }}>
            Terms of <span className="italic font-light" style={{ color: 'var(--primary)' }}>Ethereal Use</span>
          </h1>
          <p className="text-lg lg:text-xl leading-relaxed max-w-2xl" style={{ color: 'var(--text-muted)' }}>
            Welcome to the digital sanctuary of Celestial Prism. By accessing our insights, you enter into a sacred agreement regarding our cosmic services and intellectual property.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="sticky top-32 space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-widest mb-6 opacity-40">Framework Sections</p>
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block px-4 py-3 rounded-xl text-sm font-semibold transition-all hover:translate-x-1"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {section.label}
                </a>
              ))}
              
              <div className="card-soft mt-12 p-6">
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Effective Date</span>
                <p className="mt-1 text-sm font-bold" style={{ color: 'var(--text-heading)' }}>January 12, 2024</p>
              </div>
            </div>
          </aside>

          {/* Policy Content */}
          <div className="lg:col-span-9 space-y-24">
            
            <section id="acceptance" className="scroll-mt-32">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-4 font-['Poppins']" style={{ color: 'var(--text-heading)' }}>
                <span className="material-icons" style={{ color: 'var(--primary)' }}>auto_awesome</span>
                Acceptance of Celestial Terms
              </h2>
              <div className="space-y-6 text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                <p>
                  By engaging with the Celestial Prism ecosystem, including our web application, mobile interfaces, and astrological API, you acknowledge that you have read, understood, and agreed to be bound by these terms.
                </p>
                <p>
                  If you do not agree to these terms, we humbly request that you depart from our digital sanctuary. Continued use constitutes a recurring acceptance of any updates we may manifest within this document.
                </p>
              </div>
            </section>

            <section id="sacred-spaces" className="scroll-mt-32">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-4 font-['Poppins']" style={{ color: 'var(--text-heading)' }}>
                <span className="material-icons" style={{ color: 'var(--primary)' }}>groups</span>
                User Conduct & Sacred Spaces
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card">
                  <h3 className="text-xl font-bold mb-6 font-['Poppins']" style={{ color: 'var(--text-heading)' }}>Harmony Rules</h3>
                  <ul className="space-y-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                    <li className="flex gap-3">
                      <span className="h-1.5 w-1.5 mt-2 rounded-full shrink-0" style={{ backgroundColor: 'var(--primary)' }}></span>
                      Maintain the sanctity of community forums and discussion circles.
                    </li>
                    <li className="flex gap-3">
                      <span className="h-1.5 w-1.5 mt-2 rounded-full shrink-0" style={{ backgroundColor: 'var(--primary)' }}></span>
                      Refrain from any automated scraping of astrological data or insights.
                    </li>
                  </ul>
                </div>
                <div className="card-soft">
                  <h3 className="text-xl font-bold mb-6 font-['Poppins']" style={{ color: 'var(--text-heading)' }}>Prohibited Vibrations</h3>
                  <ul className="space-y-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                    <li className="flex gap-3">
                      <span className="h-1.5 w-1.5 mt-2 rounded-full shrink-0" style={{ backgroundColor: 'var(--primary)' }}></span>
                      Harassment of fellow seekers or our resident celestial guides.
                    </li>
                    <li className="flex gap-3">
                      <span className="h-1.5 w-1.5 mt-2 rounded-full shrink-0" style={{ backgroundColor: 'var(--primary)' }}></span>
                      Reverse-engineering our proprietary destiny algorithms.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="insights-ip" className="scroll-mt-32">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-4 font-['Poppins']" style={{ color: 'var(--text-heading)' }}>
                <span className="material-icons" style={{ color: 'var(--primary)' }}>history_edu</span>
                Intellectual Property of Insights
              </h2>
              <div className="card mb-8 overflow-hidden p-0 rounded-[2.5rem]">
                <img 
                  src="https://images.unsplash.com/photo-1506318137071-a8e063b4bcc0?auto=format&fit=crop&q=80&w=2000" 
                  alt="Cosmic Insights" 
                  className="w-full aspect-video object-cover opacity-60"
                />
              </div>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                The "Celestial Prism" brand, including its logos, typefaces, custom icons, and editorial content, is protected by terrestrial and metaphysical intellectual property laws. Users are granted a limited, non-transferable license to view their personal readings for individual growth only.
              </p>
            </section>

            <section id="disclaimers" className="scroll-mt-32">
              <div className="rounded-[2.5rem] p-12 border-l-4" style={{ backgroundColor: 'var(--accent-bg)', borderColor: 'var(--primary)' }}>
                <h4 className="font-bold text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--primary)' }}>Essential Clarity</h4>
                <p className="text-xl font-medium leading-relaxed" style={{ color: 'var(--text-heading)' }}>
                  Celestial Prism provides astrological interpretations for entertainment purposes only. Our readings are not a substitute for professional legal, financial, or medical advice. The stars incline, but they do not compel; your free will remains the ultimate architect of your destiny.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

    </div>
  );
};

export default TermsOfUse;