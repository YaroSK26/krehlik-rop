'use client';

import { motion } from 'framer-motion';

interface HeroProps {
  title: string;
  subtitle: string;
}

export default function Hero({ title, subtitle }: HeroProps) {
  return (
    <section className="container" style={{ paddingTop: '10rem', paddingBottom: '6rem' }}>
      <div className="hero-grid">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="hero-content"
        >
          <motion.h1 
            className="text-gradient shimmer"
            initial={{ backgroundPosition: '-200% 0' }}
            animate={{ backgroundPosition: '200% 0' }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            style={{ 
              fontSize: '4.5rem', 
              fontWeight: 900, 
              lineHeight: 1, 
              marginBottom: '2rem',
              backgroundImage: 'linear-gradient(90deg, #fff, var(--primary), #fff)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {title}
          </motion.h1>
          
          <p style={{ fontSize: '1.4rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '600px' }}>
            {subtitle}
          </p>

          <div className="hero-buttons">
            <motion.a
              href="#features"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px var(--primary-glow)' }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
              style={{ display: 'inline-block', textAlign: 'center' }}
            >
              Preskúmať funkcie
            </motion.a>
            <motion.a
              target='_blank'
              href="http://192.168.0.120:8080/stream"
              whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.95 }}
              className="glass"
              style={{ 
                padding: '0.75rem 2rem', 
                borderRadius: '0.75rem', 
                color: 'white', 
                fontWeight: 600,
                display: 'inline-block',
                textAlign: 'center'
              }}
            >
              Live demo
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            rotateY: 0,
            y: [0, -15, 0] 
          }}
          transition={{ 
            duration: 1.2, 
            ease: 'easeOut', 
            delay: 0.1,
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="sketchfab-wrapper"
          style={{ perspective: '1000px' }}
        >
          <iframe
            title="Raspberry Pi 5"
            allowFullScreen
            allow="autoplay; fullscreen; xr-spatial-tracking"
            src="https://sketchfab.com/models/aa1652bd5f344b2baae8d239c8fe4bda/embed"
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        </motion.div>
      </div>
      
      <style jsx>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 5rem;
          align-items: center;
        }
        .hero-buttons {
          display: flex;
          gap: 1.5rem;
        }
        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 4rem;
          }
          .hero-content {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-buttons {
            width: 100%;
            justify-content: center;
          }
          h1 {
            font-size: 3.5rem !important;
          }
        }
        @media (max-width: 640px) {
          .hero-buttons {
            flex-direction: column;
            width: 100%;
          }
          h1 {
            font-size: 2.8rem !important;
          }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </section>
  );
}
