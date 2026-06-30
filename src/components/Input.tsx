import React, { useState } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  rightElement?: React.ReactNode
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  rightElement,
  id,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: error ? 'var(--color-error)' : 'var(--color-text-secondary)',
            letterSpacing: '-0.01em',
          }}
        >
          {label}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        <input
          id={inputId}
          onFocus={(e) => {
            setIsFocused(true)
            props.onFocus?.(e)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            props.onBlur?.(e)
          }}
          style={{
            width: '100%',
            padding: rightElement ? '13px 44px 13px 14px' : '13px 14px',
            fontSize: 15,
            fontWeight: 400,
            color: 'var(--color-text-primary)',
            background: 'var(--color-white)',
            border: `1.5px solid ${
              error
                ? 'var(--color-error)'
                : isFocused
                  ? 'var(--color-primary)'
                  : 'var(--color-border)'
            }`,
            borderRadius: 'var(--radius-sm)',
            outline: 'none',
            transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
            boxShadow: isFocused
              ? error
                ? '0 0 0 3px rgba(239, 68, 68, 0.12)'
                : '0 0 0 3px rgba(37, 99, 235, 0.1)'
              : 'none',
          }}
          {...props}
        />
        {rightElement && (
          <div
            style={{
              position: 'absolute',
              right: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
              color: 'var(--color-text-muted)',
            }}
          >
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <p
          style={{
            fontSize: 12,
            color: 'var(--color-error)',
            fontWeight: 500,
            letterSpacing: '-0.01em',
          }}
        >
          {error}
        </p>
      )}
      {hint && !error && (
        <p
          style={{
            fontSize: 12,
            color: 'var(--color-text-muted)',
            letterSpacing: '-0.01em',
          }}
        >
          {hint}
        </p>
      )}
    </div>
  )
}
