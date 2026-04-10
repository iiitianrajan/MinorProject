import React from 'react';

/**
 * PrivacyPolicy Component
 * 
 * This component renders the Privacy Policy page using the refined Celestial Prism 
 * design system tokens (CSS variables) provided in the user's latest index.css.
 */
const PrivacyPolicy = () => {
  const sections = [
    { id: 'transparency', label: 'Transparency' },
    { id: 'data-collection', label: 'Data Collection' },
    { id: 'usage', label: 'How We Use Data' },
    { id: 'cookies', label: 'Spiritual Tracking' },
    { id: 'rights', label: 'Your Rights' },
  ];

  return (
    <div className="min-h-screen selection:bg-[var(--primary-light)] selection:text-white px-8 py-10 mb-16" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] rounded-full opacity-20 blur-[120px]" style={{ background: 'radial-gradient(circle, var(--primary-light), transparent 70%)' }}></div>
        <div className="absolute bottom-[30%] right-[10%] w-[30%] h-[30%] rounded-full opacity-10 blur-[100px]" style={{ background: 'radial-gradient(circle, var(--primary), transparent 70%)' }}></div>
      </div>

   

      <main className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pb-32">
        {/* Header */}
        <header className="mb-20 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[1px] w-12" style={{ backgroundColor: 'var(--primary)' }}></span>
            <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--primary)' }}>Transparency First</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-[1.1]" style={{ color: 'var(--text-heading)' }}>
            Privacy <span className="italic font-light">Policy</span>
          </h1>
          <p className="text-lg lg:text-xl leading-relaxed max-w-2xl" style={{ color: 'var(--text-muted)' }}>
            At Celestial Prism, we treat your spiritual data with the same reverence as the stars themselves. This policy outlines how we protect your cosmic journey in the digital realm.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Quick Links Sidebar */}
          <aside className="lg:col-span-3">
            <div className="sticky top-32 space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-widest mb-6 opacity-40">Jump to Section</p>
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
                <p className="mt-1 text-sm font-bold" style={{ color: 'var(--text-heading)' }}>November 14, 2024</p>
              </div>
            </div>
          </aside>

          {/* Policy Content */}
          <div className="lg:col-span-9 space-y-24">
            
            {/* Overview Cards */}
            <section id="transparency" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card">
                <span className="material-icons text-[var(--primary)] mb-4">visibility_off</span>
                <h3 className="font-bold mb-2" style={{ color: 'var(--text-heading)' }}>Zero Sales</h3>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>We never sell your personal or astrological data to third parties. Ever.</p>
              </div>
              <div className="card">
                <span className="material-icons text-[var(--primary)] mb-4">lock</span>
                <h3 className="font-bold mb-2" style={{ color: 'var(--text-heading)' }}>Encrypted Soul</h3>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Your readings and personal notes are end-to-end encrypted for your eyes only.</p>
              </div>
              <div className="card">
                <span className="material-icons text-[var(--primary)] mb-4">person_search</span>
                <h3 className="font-bold mb-2" style={{ color: 'var(--text-heading)' }}>Total Control</h3>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Download or permanently delete your entire spiritual history at any time.</p>
              </div>
            </section>

            {/* Detailed Content Sections */}
            <section id="data-collection" className="scroll-mt-32">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-4" style={{ color: 'var(--text-heading)' }}>
                <span className="material-icons" style={{ color: 'var(--primary)' }}>fingerprint</span>
                Information We Collect
              </h2>
              <div className="space-y-10">
                <div>
                  <h4 className="font-bold mb-3" style={{ color: 'var(--text-heading)' }}>Account Essentials</h4>
                  <p style={{ color: 'var(--text-muted)' }}>To create your digital sanctuary, we collect basic identifiers: name, email address, and astrological birth details (date, time, and location). This is the foundation of your Celestial Identity.</p>
                </div>
                <div>
                  <h4 className="font-bold mb-3" style={{ color: 'var(--text-heading)' }}>Astrological Artifacts</h4>
                  <p style={{ color: 'var(--text-muted)' }}>We store the readings you generate, your saved horoscopes, and any personal reflections you input into the Sanctuary Journal. This data is stored to personalize your experience across devices.</p>
                </div>
              </div>
            </section>

            <section id="usage" className="scroll-mt-32">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-4" style={{ color: 'var(--text-heading)' }}>
                <span className="material-icons" style={{ color: 'var(--primary)' }}>auto_awesome</span>
                How We Use Your Cosmic Data
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card-soft">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-icons text-sm" style={{ color: 'var(--primary)' }}>settings_input_component</span>
                    <h4 className="font-bold" style={{ color: 'var(--text-heading)' }}>Algorithm Personalization</h4>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>We use your birth data to calculate precise planetary positions. These are processed through our proprietary AI engine to deliver readings that resonate with your unique path.</p>
                </div>
                <div className="card-soft">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-icons text-sm" style={{ color: 'var(--primary)' }}>security</span>
                    <h4 className="font-bold" style={{ color: 'var(--text-heading)' }}>Safety & Integrity</h4>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>Data is used to monitor for fraudulent behavior, ensuring the Sanctuary remains a safe and authentic space for all seekers.</p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>

     
    </div>
  );
};

export default PrivacyPolicy;