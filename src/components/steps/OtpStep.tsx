import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../Button'
import { ProgressBar } from '../ProgressBar'
import { useOtpInput } from '../../hooks/useOtpInput'
import { useCountdown } from '../../hooks/useCountdown'

interface OtpStepProps {
  otp: string[]
  mobile: string
  countryCode: string
  onChange: (otp: string[]) => void
  onContinue: () => void
  onBack: () => void
  progress: number
  isLoading?: boolean
  error?: string
}

export const OtpStep: React.FC<OtpStepProps> = ({
  otp,
  mobile,
  countryCode,
  onChange,
  onContinue,
  onBack,
  progress,
  isLoading,
  error: externalError,
}) => {
  const { handleChange, handleKeyDown, handlePaste, setRef, focusInput } = useOtpInput(otp, onChange)
  const { formatted, canResend, reset: resetCountdown } = useCountdown(30)

  useEffect(() => {
    focusInput(0)
  }, [focusInput])

  const isFilled = otp.every((d) => d !== '')

  const handleResend = () => {
    onChange(['', '', '', ''])
    resetCountdown()
    setTimeout(() => focusInput(0), 50)
  }

  const maskedMobile = mobile
    ? `${countryCode} ${mobile.slice(0, 2)}****${mobile.slice(-2)}`
    : ''

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
            marginBottom: 8,
          }}
        >
          OTP Verification
        </h2>
        <p
          style={{
            fontSize: 13,
            color: 'var(--color-text-muted)',
            marginBottom: 28,
            letterSpacing: '-0.01em',
          }}
        >
          An OTP has been sent to your mobile number{maskedMobile ? ` ${maskedMobile}` : ''}
        </p>

        <div
          onPaste={handlePaste}
          style={{ display: 'flex', gap: 12, marginBottom: 16 }}
        >
          {otp.map((digit, index) => (
            <OtpBox
              key={index}
              value={digit}
              inputRef={(el) => setRef(el, index)}
              onChange={(val) => handleChange(index, val)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              hasError={!!externalError}
            />
          ))}
        </div>

        <AnimatePresence>
          {externalError && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                fontSize: 12,
                color: 'var(--color-error)',
                fontWeight: 500,
                marginBottom: 12,
              }}
            >
              {externalError}
            </motion.p>
          )}
        </AnimatePresence>

        <p style={{ fontSize: 13, color: 'var(--color-text-muted)' }}>
          Did not receive OTP?{' '}
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-primary)',
                fontWeight: 600,
                fontSize: 13,
                padding: 0,
                textDecoration: 'underline',
              }}
            >
              Resend OTP
            </button>
          ) : (
            <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
              Resend in {formatted}
            </span>
          )}
        </p>
      </motion.div>

      <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
        <Button variant="secondary" onClick={onBack} fullWidth>
          Back
        </Button>
        <Button onClick={onContinue} fullWidth isLoading={isLoading} disabled={!isFilled && !isLoading}>
          Continue
        </Button>
      </div>
    </motion.div>
  )
}

interface OtpBoxProps {
  value: string
  inputRef: (el: HTMLInputElement | null) => void
  onChange: (val: string) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  hasError: boolean
}

const OtpBox: React.FC<OtpBoxProps> = ({ value, inputRef, onChange, onKeyDown, hasError }) => {
  const [isFocused, setIsFocused] = React.useState(false)

  return (
    <motion.input
      ref={inputRef}
      type="text"
      inputMode="numeric"
      maxLength={1}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      animate={{
        borderColor: hasError
          ? 'var(--color-error)'
          : isFocused
            ? 'var(--color-primary)'
            : value
              ? 'var(--color-primary)'
              : 'var(--color-border)',
        scale: isFocused ? 1.05 : 1,
      }}
      transition={{ duration: 0.15 }}
      style={{
        width: 56,
        height: 60,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 600,
        color: hasError ? 'var(--color-error)' : 'var(--color-primary)',
        background: hasError
          ? 'var(--color-error-light)'
          : value
            ? 'var(--color-primary-light)'
            : 'var(--color-white)',
        border: `1.5px solid`,
        borderRadius: 'var(--radius-sm)',
        outline: 'none',
        cursor: 'text',
        transition: 'background var(--transition-fast)',
        boxShadow: isFocused ? '0 0 0 3px rgba(37, 99, 235, 0.12)' : 'none',
      }}
    />
  )
}
