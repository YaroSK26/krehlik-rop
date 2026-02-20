'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import { motion } from 'framer-motion';

interface Content {
  title: string;
  subtitle: string;
  creators: string[];
  techShowcase: string[];
  features: string[];
  benefits: string[];
  securityText: string;
}

export default function Home() {
  const [content, setContent] = useState<Content | null>(null);

  useEffect(() => {
    fetch('/api/content')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch content');
        return res.json();
      })
      .then(data => setContent(data))
      .catch(err => {
        console.error('Error loading content:', err);
        // We could set a retry or show a static fallback here if needed
      });
  }, []);

  if (!content) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--background)' }}>
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} 
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-gradient"
        style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.05em' }}
      >
        NAČÍTAVANIE...
      </motion.div>
    </div>
  );

  return (
    <main>
      <Navbar />
      
      <Hero title={content.title} subtitle={content.subtitle} />

      <Section id="features" title="Pre koho to je?">
        <div className="features-grid">
          {content.features.map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, rotateZ: i % 2 === 0 ? 1 : -1 }}
              className="glass"
              style={{ padding: '2.5rem', borderTop: '2px solid var(--primary-glow)' }}
            >
              <div style={{ width: '40px', height: '40px', background: 'var(--primary-glow)', borderRadius: '10px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                {i + 1}
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, lineHeight: 1.3 }}>{feature}</h3>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="tech" title="Využité technológie" alternate>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '2rem', justifyContent: 'flex-end' }}>
          {content.techShowcase.map((tech, i) => (
            <motion.span
              key={i}
              whileHover={{ scale: 1.1 }}
              className="glass"
              style={{ 
                padding: '0.8rem 1.8rem', 
                borderRadius: '3rem', 
                fontWeight: 600, 
                fontSize: '1rem',
                border: '1px solid var(--primary-glow)' 
              }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
        <div style={{ marginTop: '3rem', fontSize: '1.2rem', color: 'var(--text-muted)', textAlign: 'right', maxWidth: '700px', marginLeft: 'auto' }}>
          <p style={{ lineHeight: 1.8 }}>Projekt využíva najnovší <span className="text-gradient" style={{ fontWeight: 800 }}>Raspberry Pi 5</span>, ktorý vďaka vylepšenému výkonu procesora a grafiky umožňuje plynulý video stream vo vysokom rozlíšení s minimálnym oneskorením.</p>
        </div>
      </Section>

      <Section id="security" title="Maximálna Bezpečnosť">
        <div className="glass security-card" style={{ padding: '4rem', position: 'relative', overflow: 'hidden' }}>
          <div className="glow-orb" />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontSize: '1.3rem', lineHeight: 1.8, marginBottom: '3rem', fontWeight: 300 }}>
              {content.securityText}
            </p>
            <div className="benefits-grid">
              {content.benefits.map((benefit, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}
                >
                  <div style={{ 
                    minWidth: '24px', 
                    height: '24px', 
                    borderRadius: '50%', 
                    background: 'var(--accent)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    boxShadow: '0 0 15px var(--accent)'
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="4">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <footer className="container">
        <div className="glass" style={{ padding: '4rem', textAlign: 'center', marginTop: '6rem', marginBottom: '4rem', borderBottom: 'none' }}>
          <h2 className="text-gradient" style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem' }}>Pripravení začať?</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Pridajte sa k stovkám spokojných používateľov nášho systému.</p>
          <div style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
            Projekt vytvorili <span style={{ color: 'white', fontWeight: 700 }}>{content.creators.join(' a ')}</span>
          </div>
          <div style={{ marginTop: '3rem', fontSize: '0.85rem', opacity: 0.4 }}>
            © {new Date().getFullYear()} Sledovací Systém v Reálnom Čase. Všetky práva vyhradené.
          </div>
        </div>
      </footer>

      <style jsx>{`
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2.5rem;
        }
        .glow-orb {
          position: absolute;
          top: -150px;
          right: -150px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, var(--primary-glow) 0%, transparent 70%);
          opacity: 0.3;
          pointer-events: none;
        }
        @media (max-width: 768px) {
          .security-card {
            padding: 2.5rem !important;
          }
          .benefits-grid {
            gap: 1.5rem;
          }
        }
      `}</style>
    </main>
  );
}
