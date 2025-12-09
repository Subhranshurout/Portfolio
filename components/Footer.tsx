'use client'

import { motion } from 'framer-motion'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border mt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="text-center text-text-secondary"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4">
            &copy; {currentYear} Subhranshu Sekhar Rout. Built with Next.js, Tailwind CSS & Framer
            Motion.
          </p>
          <p className="text-sm">Crafted with attention to detail and a passion for clean code.</p>
        </motion.div>
      </div>
    </footer>
  )
}
