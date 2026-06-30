import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { RegistrationData } from '../types'
import { Button } from './Button'

interface SuccessModalProps {
  isVisible: boolean
  data: RegistrationData
  onDashboard: () => void
}

const CheckCircleIcon = () => (
  <motion.svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
  >
    <circle cx="24" cy="24" r="24" fill="#EFF6FF" />
    <motion.path
      d="M14 24C14 18.477 18.477 14 24 14C29.523 14 34 18.477 34 24C34 29.523 29.523 34 24 34C18.477 34 14 29.523 14 24Z"
      stroke="#2563EB"
      strokeWidth="2"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    />
    <motion.path
      d="M18.5 24L22 27.5L29.5 20"
      stroke="#2563EB"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.4, delay: 0.6 }}
    />
  </motion.svg>
)

const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M8 1L2 3.5V8C2 11.3137 4.686 14 8 14C11.314 14 14 11.3137 14 8V3.5L8 1Z"
      stroke="#22C55E"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path
      d="M5.5 8L7 9.5L10.5 6"
      stroke="#22C55E"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

function maskEmail(email: string): string {
  const [local, domain] = email.split('@')
  if (!domain) return email
  const masked = local.slice(0, 2) + '••••'
  return `${masked}@${domain}`
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ isVisible, data, onDashboard }) => {
  const summaryRows = [
    { label: 'Account Type', value: capitalize(data.accountType) },
    { label: 'Email', value: data.mobile ? maskEmail(`${data.mobile}@example.com`) : '—' },
    { label: 'Name', value: [data.firstName, data.lastName].filter(Boolean).join(' ') || '—' },
    { label: 'Mobile Number', value: data.mobile ? `${data.countryCode} ${data.mobile}` : '—' },
  ]

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(15, 23, 42, 0.4)',
              backdropFilter: 'blur(4px)',
              zIndex: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 24,
            }}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 16 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              style={{
                background: 'var(--color-white)',
                borderRadius: 20,
                padding: '40px 36px',
                maxWidth: 380,
                width: '100%',
                boxShadow: 'var(--shadow-modal)',
                textAlign: 'center',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                <CheckCircleIcon />
              </div>

              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  letterSpacing: '-0.03em',
                  marginBottom: 6,
                }}
              >
                You're all set!
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{
                  fontSize: 14,
                  color: 'var(--color-text-muted)',
                  marginBottom: 24,
                }}
              >
                Here's a quick summary of your account details
              </motion.p>

              {/* Summary card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                style={{
                  background: '#F8FAFC',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px 20px',
                  marginBottom: 16,
                  textAlign: 'left',
                }}
              >
                {summaryRows.map((row, i) => (
                  <div
                    key={row.label}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px 0',
                      borderBottom: i < summaryRows.length - 1 ? '1px solid var(--color-border)' : 'none',
                    }}
                  >
                    <span style={{ fontSize: 13, color: 'var(--color-text-muted)', fontWeight: 400 }}>
                      {row.label}
                    </span>
                    <span style={{ fontSize: 13, color: 'var(--color-text-primary)', fontWeight: 600 }}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* Security notice */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  marginBottom: 24,
                  fontSize: 12,
                  color: '#16A34A',
                  fontWeight: 500,
                }}
              >
                <ShieldIcon />
                Your account is secured with bank-grade security
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
              >
                <Button onClick={onDashboard} fullWidth>
                  Go To Dashboard
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
