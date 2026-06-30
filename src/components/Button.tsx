import React from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  isLoading?: boolean
  fullWidth?: boolean
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  isLoading = false,
  fullWidth = false,
  children,
  disabled,
  className,
  ...props
}) => {
  const isPrimary = variant === 'primary'

  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.01 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      transition={{ duration: 0.15 }}
      disabled={disabled || isLoading}
      className={clsx(className)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: '14px 28px',
        borderRadius: 'var(--radius-full)',
        fontWeight: 600,
        fontSize: 15,
        letterSpacing: '-0.01em',
        lineHeight: 1,
        width: fullWidth ? '100%' : undefined,
        cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
        transition: 'background var(--transition-fast), color var(--transition-fast), box-shadow var(--transition-fast)',
        border: isPrimary ? 'none' : '1.5px solid var(--color-border)',
        background: isPrimary
          ? disabled || isLoading
            ? '#93C5FD'
            : 'var(--color-primary)'
          : 'var(--color-white)',
        color: isPrimary ? '#fff' : 'var(--color-text-secondary)',
        boxShadow: isPrimary && !disabled && !isLoading
          ? '0 2px 8px rgba(37, 99, 235, 0.3)'
          : 'none',
      }}
      {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
    >
      {isLoading ? (
        <>
          <Spinner color={isPrimary ? '#fff' : 'var(--color-primary)'} />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  )
}

const Spinner: React.FC<{ color: string }> = ({ color }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    style={{ animation: 'spin 0.7s linear infinite' }}
  >
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    <circle cx="8" cy="8" r="6" stroke={color} strokeOpacity="0.3" strokeWidth="2" />
    <path
      d="M14 8a6 6 0 0 0-6-6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)
