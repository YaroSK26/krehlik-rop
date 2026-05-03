'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import { motion, AnimatePresence } from 'framer-motion';

const PASSWORD = 'budka1234';
const SESSION_KEY = 'krehik_auth';

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1');
      onUnlock();
    } else {
      setError(true);
      setValue('');
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--background)',
      backgroundImage: 'radial-gradient(circle at 0% 0%, rgba(2, 202, 228, 0.15) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(167, 139, 250, 0.1) 0%, transparent 50%)',
    }}>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass"
        style={{ padding: '3rem', width: '100%', maxWidth: '420px', margin: '1.5rem' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔒</div>
          <h1 className="text-gradient" style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Sledovací Systém
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Zadajte heslo pre prístup</p>
        </div>

        <motion.div
          animate={error ? { x: [-8, 8, -8, 8, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <input
            type="password"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Heslo..."
            autoFocus
            style={{
              marginBottom: '1.2rem',
              borderColor: error ? '#ef4444' : undefined,
              boxShadow: error ? '0 0 15px rgba(239,68,68,0.3)' : undefined,
            }}
          />
        </motion.div>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' }}
          >
            Nesprávne heslo
          </motion.p>
        )}

        <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.9rem' }}>
          Vstúpiť
        </button>
      </motion.form>
    </div>
  );
}

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
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === '1') setUnlocked(true);
  }, []);

  useEffect(() => {
    if (!unlocked) return;
    fetch('/api/content')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch content');
        return res.json();
      })
      .then(data => setContent(data))
      .catch(err => {
        console.error('Error loading content:', err);
      });
  }, [unlocked]);

  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />;

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
        <div className="tech-tags">
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

        <div className="tech-cards">
          {[
            {
              icon: '🖥️',
              name: 'Raspberry Pi 5',
              desc: 'Srdce celého systému. Pi 5 beží na serveri, ovláda kameru a spracováva video v reálnom čase. Vďaka výkonnému procesoru zvládne kódovanie streamu s minimálnym oneskorením.',
            },
            {
              icon: '📡',
              name: 'WiFi 802.11',
              desc: 'Pi 5 sa pripája k lokálnej sieti cez WiFi. Video stream sa prenáša bezdrátovo — bez nutnosti ťahať káble cez celú miestnosť.',
            },
            {
              icon: '🔄',
              name: 'MJPEG Stream',
              desc: 'Video sa posiela ako séria JPEG obrázkov za sebou (Motion JPEG). Prehliadač ich zobrazuje jeden po druhom — jednoduchý protokol, žiadne špeciálne pluginy.',
            },
            {
              icon: '🎨',
              name: 'HTML5 Canvas',
              desc: 'Prijatý MJPEG stream sa kreslí priamo na Canvas element v prehliadači. Umožňuje spracovanie obrazu na strane klienta — filtrovanie, zoom, detekcia pohybu.',
            },
            {
              icon: '⚡',
              name: 'WebSocket',
              desc: 'Obojsmerný real-time kanál medzi Pi a prehliadačom. Slúži na odosielanie príkazov (napr. reštart kamery) a prijímanie stavových správ bez obnovy stránky.',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="glass tech-card-item"
            >
              <div className="tech-card-icon">{item.icon}</div>
              <div>
                <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>{item.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
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
        <div className="glass footer-card" style={{ padding: '4rem', textAlign: 'center', marginTop: '6rem', marginBottom: '4rem', borderBottom: 'none' }}>
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
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }
        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 2rem;
          justify-content: flex-end;
        }
        .tech-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-top: 3rem;
        }
        .tech-card-item {
          display: flex;
          gap: 1.2rem;
          align-items: flex-start;
          padding: 1.8rem;
          border-top: 2px solid var(--secondary-glow);
        }
        .tech-card-icon {
          font-size: 1.8rem;
          min-width: 2.5rem;
          text-align: center;
          margin-top: 0.1rem;
        }
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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
          .features-grid {
            grid-template-columns: 1fr;
          }
          .tech-tags {
            justify-content: center;
          }
          .tech-description {
            text-align: center;
            margin-left: 0;
            font-size: 1rem;
          }
          .security-card {
            padding: 2rem 1.5rem !important;
          }
          .benefits-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .footer-card {
            padding: 2.5rem 1.5rem !important;
            margin-top: 3rem !important;
            margin-bottom: 2rem !important;
          }
        }
        @media (max-width: 480px) {
          .features-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}</style>
    </main>
  );
}
