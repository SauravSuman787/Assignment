import React from 'react'
import { motion } from 'framer-motion'

interface ProgressBarProps {
  progress: number
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div
      style={{
        width: '100%',
        height: 4,
        background: '#E2E8F0',
        borderRadius: 2,
        overflow: 'hidden',
        marginBottom: 32,
      }}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress * 100}%` }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        style={{
          height: '100%',
          background: 'var(--color-primary)',
          borderRadius: 2,
        }}
      />
    </div>
  )
}
