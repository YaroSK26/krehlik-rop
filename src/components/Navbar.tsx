'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Funkcie', href: '#features' },
    { name: 'Technológia', href: '#tech' },
    { name: 'Bezpečnosť', href: '#security' },
  ];

  return (
    <nav style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      zIndex: 1000, 
      padding: '1.2rem 0',
      background: 'rgba(5, 11, 24, 0.8)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border)'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.05em' }}
        >
          <span className="text-gradient">Sledovací Systém</span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="desktop-menu" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              whileHover={{ y: -2 }}
              style={{ 
                fontSize: '0.9rem', 
                fontWeight: 500, 
                color: 'var(--text-muted)',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              {link.name}
            </motion.a>
          ))}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary" 
            style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
          >
            Live Demo
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer', padding: '0.5rem', display: 'none' }}>
          <div style={{ width: '24px', height: '2px', background: 'white', marginBottom: '6px', transform: isOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none', transition: '0.3s' }} />
          <div style={{ width: '24px', height: '2px', background: 'white', marginBottom: '6px', opacity: isOpen ? 0 : 1, transition: '0.3s' }} />
          <div style={{ width: '24px', height: '2px', background: 'white', transform: isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none', transition: '0.3s' }} />
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ 
              background: 'rgba(5, 11, 24, 0.95)', 
              borderBottom: '1px solid var(--border)',
              overflow: 'hidden'
            }}
          >
            <div className="container" style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  style={{ fontSize: '1.1rem', color: 'white', padding: '0.5rem 0' }}
                >
                  {link.name}
                </a>
              ))}
              <button className="btn-primary" style={{ width: '100%' }}>Live Demo</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
}
