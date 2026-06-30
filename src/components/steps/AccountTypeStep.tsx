import React from 'react'
import { motion, type Variants } from 'framer-motion'
import type { AccountType } from '../../types'
import { Button } from '../Button'
import { ProgressBar } from '../ProgressBar'

interface AccountTypeStepProps {
  selected: AccountType
  onSelect: (type: AccountType) => void
  onContinue: () => void
  onBack?: () => void
  progress: number
}

const PersonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const BusinessIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
)

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="8" fill="#2563EB" />
    <path d="M4.5 8L7 10.5L11.5 5.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const options: { type: AccountType; label: string; Icon: React.FC }[] = [
  { type: 'personal', label: 'Personal', Icon: PersonIcon },
  { type: 'business', label: 'Business', Icon: BusinessIcon },
]

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

export const AccountTypeStep: React.FC<AccountTypeStepProps> = ({
  selected,
  onSelect,
  onContinue,
  onBack,
  progress,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <ProgressBar progress={progress} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ flex: 1 }}
      >
        <motion.p
          variants={itemVariants}
          style={{
            fontSize: 15,
            color: 'var(--color-text-secondary)',
            marginBottom: 24,
            letterSpacing: '-0.01em',
            lineHeight: 1.6,
          }}
        >
          To join us tell us{' '}
          <strong style={{ color: 'var(--color-text-primary)', fontWeight: 700 }}>
            what type of account
          </strong>{' '}
          you are opening
        </motion.p>

        <motion.div
          variants={containerVariants}
          style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
        >
          {options.map(({ type, label, Icon }) => {
            const isSelected = selected === type
            return (
              <motion.button
                key={type}
                variants={itemVariants}
                onClick={() => onSelect(type)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 18px',
                  borderRadius: 'var(--radius-md)',
                  border: `1.5px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  background: isSelected ? 'var(--color-primary-light)' : 'var(--color-white)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  boxShadow: isSelected ? '0 0 0 3px rgba(37, 99, 235, 0.1)' : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span
                    style={{
                      color: isSelected ? 'var(--color-primary)' : 'var(--color-text-muted)',
                      display: 'flex',
                      transition: 'color var(--transition-fast)',
                    }}
                  >
                    <Icon />
                  </span>
                  <span
                    style={{
                      fontSize: 15,
                      fontWeight: isSelected ? 600 : 500,
                      color: isSelected ? 'var(--color-primary)' : 'var(--color-text-primary)',
                      transition: 'color var(--transition-fast)',
                    }}
                  >
                    {label}
                  </span>
                </div>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    <CheckIcon />
                  </motion.div>
                )}
              </motion.button>
            )
          })}
        </motion.div>
      </motion.div>

      <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
        {onBack && (
          <Button variant="secondary" onClick={onBack} fullWidth>
            Back
          </Button>
        )}
        <Button onClick={onContinue} fullWidth>
          Continue
        </Button>
      </div>
    </motion.div>
  )
}
