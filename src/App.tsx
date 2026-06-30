import { useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Layout } from './components/Layout'
import { AccountTypeStep } from './components/steps/AccountTypeStep'
import { MobileStep } from './components/steps/MobileStep'
import { OtpStep } from './components/steps/OtpStep'
import { NameStep } from './components/steps/NameStep'
import { PasswordStep } from './components/steps/PasswordStep'
import { SuccessModal } from './components/SuccessModal'
import { useRegistration } from './hooks/useRegistration'

const SIMULATED_OTP = '8642'

function App() {
  const {
    state,
    stepProgress,
    nextStep,
    prevStep,
    updateData,
    setLoading,
    setErrors,
    setStep,
    setAccountType,
  } = useRegistration()

  const { currentStep, data, isLoading, errors } = state

  const handleOtpContinue = useCallback(async () => {
    const entered = data.otp.join('')
    if (entered !== SIMULATED_OTP) {
      setErrors({ otp: 'Invalid OTP. Please try again.' as unknown as undefined })
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    nextStep()
  }, [data.otp, nextStep, setErrors, setLoading])

  const handleMobileContinue = useCallback(async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    nextStep()
  }, [nextStep, setLoading])

  const handlePasswordContinue = useCallback(async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    setStep('success')
  }, [setLoading, setStep])

  const handleDashboard = useCallback(() => {
    alert('Redirecting to Dashboard! 🎉')
  }, [])

  return (
    <>
      <Layout>
        <AnimatePresence mode="wait">
          {currentStep === 'account-type' && (
            <AccountTypeStep
              key="account-type"
              selected={data.accountType}
              onSelect={setAccountType}
              onContinue={nextStep}
              progress={stepProgress}
            />
          )}

          {currentStep === 'mobile' && (
            <MobileStep
              key="mobile"
              countryCode={data.countryCode}
              mobile={data.mobile}
              onCountryChange={(code) => updateData({ countryCode: code })}
              onMobileChange={(mobile) => updateData({ mobile })}
              onContinue={handleMobileContinue}
              onBack={prevStep}
              progress={stepProgress}
              isLoading={isLoading}
              error={errors.mobile}
            />
          )}

          {currentStep === 'otp' && (
            <OtpStep
              key="otp"
              otp={data.otp}
              mobile={data.mobile}
              countryCode={data.countryCode}
              onChange={(otp) => updateData({ otp })}
              onContinue={handleOtpContinue}
              onBack={prevStep}
              progress={stepProgress}
              isLoading={isLoading}
              error={errors.otp as unknown as string}
            />
          )}

          {currentStep === 'name' && (
            <NameStep
              key="name"
              firstName={data.firstName}
              lastName={data.lastName}
              onFirstNameChange={(firstName) => updateData({ firstName })}
              onLastNameChange={(lastName) => updateData({ lastName })}
              onContinue={nextStep}
              onBack={prevStep}
              progress={stepProgress}
              isLoading={isLoading}
            />
          )}

          {currentStep === 'password' && (
            <PasswordStep
              key="password"
              password={data.password}
              confirmPassword={data.confirmPassword}
              onPasswordChange={(password) => updateData({ password })}
              onConfirmPasswordChange={(confirmPassword) => updateData({ confirmPassword })}
              onContinue={handlePasswordContinue}
              onBack={prevStep}
              progress={stepProgress}
              isLoading={isLoading}
            />
          )}
        </AnimatePresence>
      </Layout>

      <SuccessModal
        isVisible={currentStep === 'success'}
        data={data}
        onDashboard={handleDashboard}
      />
    </>
  )
}

export default App
