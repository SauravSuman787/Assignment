import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Button } from '../Button'
import { PasswordInput } from '../PasswordInput'
import { ProgressBar } from '../ProgressBar'

interface PasswordStepProps {
  password: string
  confirmPassword: string
  onPasswordChange: (val: string) => void
  onConfirmPasswordChange: (val: string) => void
  onContinue: () => void
  onBack: () => void
  progress: number
  isLoading?: boolean
}

interface PasswordFormValues {
  password: string
  confirmPassword: string
}

function getStrength(password: string): { score: number; label: string; color: string } {
  if (!password) return { score: 0, label: '', color: '#E2E8F0' }
  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score <= 1) return { score: 1, label: 'Weak', color: '#EF4444' }
  if (score === 2) return { score: 2, label: 'Fair', color: '#F59E0B' }
  if (score === 3) return { score: 3, label: 'Good', color: '#3B82F6' }
  return { score: 4, label: 'Strong', color: '#22C55E' }
}

export const PasswordStep: React.FC<PasswordStepProps> = ({
  password,
  confirmPassword,
  onPasswordChange,
  onConfirmPasswordChange,
  onContinue,
  onBack,
  progress,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    defaultValues: { password, confirmPassword },
    mode: 'onBlur',
  })

  const watchedPassword = watch('password', password)
  const strength = getStrength(watchedPassword)

  const onSubmit = (data: PasswordFormValues) => {
    onPasswordChange(data.password)
    onConfirmPasswordChange(data.confirmPassword)
    onContinue()
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <ProgressBar progress={progress} />

      <motion.form
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.35 }}
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', flexDirection: 'column', flex: 1 }}
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
          Create Password for your account
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
          <div>
            <PasswordInput
              label="Enter new password"
              placeholder="Enter new password"
              error={errors.password?.message}
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Must be at least 6 characters' },
                onChange: (e) => onPasswordChange(e.target.value),
              })}
            />
            {!errors.password && (
              <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 4 }}>
                Must be atleast 6 characters
              </p>
            )}

            {/* Password strength indicator */}
            <AnimatePresence>
              {watchedPassword && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ marginTop: 10 }}
                >
                  <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                    {[1, 2, 3, 4].map((level) => (
                      <motion.div
                        key={level}
                        animate={{ background: level <= strength.score ? strength.color : '#E2E8F0' }}
                        transition={{ duration: 0.25 }}
                        style={{ flex: 1, height: 3, borderRadius: 2 }}
                      />
                    ))}
                  </div>
                  {strength.label && (
                    <p style={{ fontSize: 12, color: strength.color, fontWeight: 500 }}>
                      {strength.label} password
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div>
            <PasswordInput
              label="Confirm password"
              placeholder="Confirm password"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (val) => val === watchedPassword || 'Passwords do not match',
                onChange: (e) => onConfirmPasswordChange(e.target.value),
              })}
            />
            {!errors.confirmPassword && (
              <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 4 }}>
                Both passwords must match
              </p>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
          <Button type="button" variant="secondary" onClick={onBack} fullWidth>
            Back
          </Button>
          <Button type="submit" fullWidth isLoading={isLoading}>
            Continue
          </Button>
        </div>
      </motion.form>
    </motion.div>
  )
}
