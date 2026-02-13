import React from 'react'
import { motion, useInView } from 'framer-motion'

export default function FadeInSection({ children }) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { 
    once: false,
    amount: 0.2, 
    margin: "0px 0px -100px 0px" 
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 50
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
