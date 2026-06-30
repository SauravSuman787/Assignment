import React from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Button } from '../Button'
import { Input } from '../Input'
import { ProgressBar } from '../ProgressBar'

interface NameStepProps {
  firstName: string
  lastName: string
  onFirstNameChange: (val: string) => void
  onLastNameChange: (val: string) => void
  onContinue: () => void
  onBack: () => void
  progress: number
  isLoading?: boolean
}

interface NameFormValues {
  firstName: string
  lastName: string
}

export const NameStep: React.FC<NameStepProps> = ({
  firstName,
  lastName,
  onFirstNameChange,
  onLastNameChange,
  onContinue,
  onBack,
  progress,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NameFormValues>({
    defaultValues: { firstName, lastName },
    mode: 'onBlur',
  })

  const onSubmit = (data: NameFormValues) => {
    onFirstNameChange(data.firstName)
    onLastNameChange(data.lastName)
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
          What is your name?
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
          <Input
            label="First Name"
            placeholder="Oliver"
            error={errors.firstName?.message}
            {...register('firstName', {
              required: 'First name is required',
              minLength: { value: 2, message: 'Must be at least 2 characters' },
              maxLength: { value: 50, message: 'Must be less than 50 characters' },
              pattern: { value: /^[a-zA-Z\s'-]+$/, message: 'Only letters, spaces, hyphens and apostrophes allowed' },
              onChange: (e) => onFirstNameChange(e.target.value),
            })}
          />
          <Input
            label="Last Name"
            placeholder="Last Name"
            error={errors.lastName?.message}
            {...register('lastName', {
              required: 'Last name is required',
              minLength: { value: 2, message: 'Must be at least 2 characters' },
              maxLength: { value: 50, message: 'Must be less than 50 characters' },
              pattern: { value: /^[a-zA-Z\s'-]+$/, message: 'Only letters, spaces, hyphens and apostrophes allowed' },
              onChange: (e) => onLastNameChange(e.target.value),
            })}
          />
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
