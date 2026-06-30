import React from 'react'
import { Illustration } from './Illustration'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        background: '#F6F7F9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 24px',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 1120,
          minHeight: 620,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Left section — spans full container, background visible behind card */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            // background: '#FAEFE6',
            width: '100%',
            maxWidth: 990,
            minHeight: 660,
            borderRadius: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '56px 48px 40px',
            paddingRight: '52%',
            overflow: 'hidden',
          }}
        >
          <div style={{ maxWidth: 420 }}>
            <p
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: 'var(--color-text-secondary)',
                marginBottom: 12,
                letterSpacing: '-0.01em',
              }}
            >
              Let's get started
            </p>
            <h1
              style={{
                fontSize: 36,
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.03em',
                lineHeight: 1.2,
                marginBottom: 12,
              }}
            >
              Create your account
            </h1>
            <p
              style={{
                fontSize: 15,
                color: 'var(--color-text-secondary)',
                letterSpacing: '-0.01em',
              }}
            >
              Follow the steps to create your account
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              marginTop: 'auto',
              paddingTop: 24,
            }}
          >
            <Illustration />
          </div>
        </div>

        {/* Right card — floats on top of left section */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            marginLeft: 'auto',
            width: '100%',
            maxWidth: 670,
            minHeight: 660,
            background: 'var(--color-white)',
            borderRadius: 16,
            boxShadow: '0 8px 40px rgba(15, 23, 42, 0.1)',
            padding: '40px 44px 36px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
