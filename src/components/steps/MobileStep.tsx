import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../Button'
import { ProgressBar } from '../ProgressBar'
import { COUNTRY_OPTIONS } from '../../types'

interface MobileStepProps {
  countryCode: string
  mobile: string
  onCountryChange: (code: string) => void
  onMobileChange: (mobile: string) => void
  onContinue: () => void
  onBack: () => void
  progress: number
  isLoading?: boolean
  error?: string
}

const ChevronIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const MobileStep: React.FC<MobileStepProps> = ({
  countryCode,
  mobile,
  onCountryChange,
  onMobileChange,
  onContinue,
  onBack,
  progress,
  isLoading,
  error: externalError,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedCountry = COUNTRY_OPTIONS.find((c) => c.dialCode === countryCode) || COUNTRY_OPTIONS[0]

  const validate = () => {
    const digits = mobile.replace(/\D/g, '')
    if (!mobile) {
      setError('Mobile number is required')
      return false
    }
    if (digits.length < 7 || digits.length > 15) {
      setError('Please enter a valid mobile number')
      return false
    }
    setError('')
    return true
  }

  const handleContinue = () => {
    if (validate()) onContinue()
  }

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^\d\s\-()]/g, '')
    onMobileChange(val)
    if (error) setError('')
  }

  const displayError = externalError || error

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
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.35 }}
        style={{ flex: 1 }}
      >
        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.03em',
            marginBottom: 24,
          }}
        >
          OTP Verification
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: displayError ? 'var(--color-error)' : 'var(--color-text-secondary)',
              letterSpacing: '-0.01em',
            }}
          >
            Mobile Number*
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            {/* Country code selector */}
            <div ref={dropdownRef} style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '13px 12px',
                  border: `1.5px solid ${displayError ? 'var(--color-error)' : isOpen ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--color-white)',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'var(--color-text-primary)',
                  whiteSpace: 'nowrap',
                  transition: 'border-color var(--transition-fast)',
                  boxShadow: isOpen ? '0 0 0 3px rgba(37, 99, 235, 0.1)' : 'none',
                }}
              >
                <span style={{ fontSize: 18 }}>{selectedCountry.flag}</span>
                <span>{selectedCountry.dialCode}</span>
                <span style={{ color: 'var(--color-text-muted)', transition: `transform var(--transition-fast)`, transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <ChevronIcon />
                </span>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 4px)',
                      left: 0,
                      zIndex: 100,
                      background: 'white',
                      border: '1.5px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      boxShadow: '0 8px 32px rgba(15, 23, 42, 0.12)',
                      minWidth: 200,
                      maxHeight: 240,
                      overflowY: 'auto',
                    }}
                  >
                    {COUNTRY_OPTIONS.map((country) => (
                      <button
                        key={`${country.code}-${country.dialCode}`}
                        type="button"
                        onClick={() => {
                          onCountryChange(country.dialCode)
                          setIsOpen(false)
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          width: '100%',
                          padding: '10px 14px',
                          background: country.dialCode === countryCode ? 'var(--color-primary-light)' : 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: 14,
                          color: 'var(--color-text-primary)',
                          transition: 'background var(--transition-fast)',
                          textAlign: 'left',
                        }}
                        onMouseEnter={(e) => {
                          if (country.dialCode !== countryCode) {
                            e.currentTarget.style.background = '#F8FAFC'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (country.dialCode !== countryCode) {
                            e.currentTarget.style.background = 'transparent'
                          }
                        }}
                      >
                        <span style={{ fontSize: 18 }}>{country.flag}</span>
                        <span style={{ fontWeight: 500 }}>{country.name}</span>
                        <span style={{ marginLeft: 'auto', color: 'var(--color-text-muted)', fontSize: 13 }}>
                          {country.dialCode}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Phone number input */}
            <input
              ref={inputRef}
              type="tel"
              placeholder="Enter mobile number"
              value={mobile}
              onChange={handleMobileChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={(e) => e.key === 'Enter' && handleContinue()}
              style={{
                flex: 1,
                padding: '13px 14px',
                fontSize: 15,
                fontWeight: 400,
                color: 'var(--color-text-primary)',
                background: 'var(--color-white)',
                border: `1.5px solid ${
                  displayError
                    ? 'var(--color-error)'
                    : isFocused
                      ? 'var(--color-primary)'
                      : 'var(--color-border)'
                }`,
                borderRadius: 'var(--radius-sm)',
                outline: 'none',
                transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
                boxShadow: isFocused
                  ? displayError
                    ? '0 0 0 3px rgba(239, 68, 68, 0.12)'
                    : '0 0 0 3px rgba(37, 99, 235, 0.1)'
                  : 'none',
              }}
            />
          </div>

          <AnimatePresence>
            {displayError && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                style={{
                  fontSize: 12,
                  color: 'var(--color-error)',
                  fontWeight: 500,
                }}
              >
                {displayError}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
        <Button variant="secondary" onClick={onBack} fullWidth>
          Back
        </Button>
        <Button onClick={handleContinue} fullWidth isLoading={isLoading}>
          Continue
        </Button>
      </div>
    </motion.div>
  )
}
