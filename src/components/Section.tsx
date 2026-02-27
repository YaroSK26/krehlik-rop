'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  title: string;
  children: ReactNode;
  alternate?: boolean;
}

export default function Section({ id, title, children, alternate }: SectionProps) {
  return (
    <section id={id} className="container" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="section-title text-gradient" style={{ textAlign: alternate ? 'right' : 'left' }}>
          {title}
        </h2>
        {children}
      </motion.div>
    </section>
  );
}
