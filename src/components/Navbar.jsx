import React from 'react'
import { motion } from 'framer-motion'

const NAV_LINKS = [
  { name: 'ABOUT', href: '#about' },
  { name: 'CERTIFICATES', href: '#certificates' },
  { name: 'PROJECTS', href: '#projects' },
  { name: 'CONTACT', href: '#contact' },
]

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="navbar"
    >
      <div className="navbar-inner">
        {NAV_LINKS.map((link) => (
          <a key={link.name} href={link.href} className="nav-link">
            {link.name}
          </a>
        ))}
      </div>
    </motion.nav>
  )
}
