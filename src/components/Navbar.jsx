import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { name: 'ABOUT', href: '#about' },
  { name: 'CERTIFICATES', href: '#certificates' },
  { name: 'PROJECTS', href: '#projects' },
  { name: 'CONTACT', href: '#contact' },
]

export default function Navbar() {
  const [isLight, setIsLight] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'light'
    }
    return false
  })

  useEffect(() => {
    if (isLight) {
      document.body.classList.add('light-mode')
      localStorage.setItem('theme', 'light')
    } else {
      document.body.classList.remove('light-mode')
      localStorage.setItem('theme', 'dark')
    }
  }, [isLight])

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="navbar"
    >
      <div className="navbar-inner">
        <div className="nav-links-wrapper">
          {NAV_LINKS.map((link) => (
            <a key={link.name} href={link.href} className="nav-link">
              {link.name}
            </a>
          ))}
        </div>

        <button 
          className="theme-toggle-btn"
          onClick={() => setIsLight(!isLight)}
          aria-label="Toggle Theme"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={isLight ? 'light' : 'dark'}
              initial={{ y: 20, opacity: 0, rotate: 45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: -45 }}
              transition={{ duration: 0.3, ease: 'backOut' }}
              className="theme-toggle-icon"
            >
              {isLight ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              )}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>
    </motion.nav>
  )
}
