import { useReducer, useCallback, useMemo } from 'react'
import type { Step, RegistrationData, AccountType } from '../types'
import { STEPS } from '../types'

interface RegistrationState {
  currentStep: Step
  data: RegistrationData
  isLoading: boolean
  errors: Partial<Record<keyof RegistrationData, string>>
}

type RegistrationAction =
  | { type: 'SET_STEP'; payload: Step }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'UPDATE_DATA'; payload: Partial<RegistrationData> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERRORS'; payload: Partial<Record<keyof RegistrationData, string>> }
  | { type: 'CLEAR_ERRORS' }

const initialData: RegistrationData = {
  accountType: 'personal',
  countryCode: '+1',
  mobile: '',
  otp: ['', '', '', ''],
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
}

const initialState: RegistrationState = {
  currentStep: 'account-type',
  data: initialData,
  isLoading: false,
  errors: {},
}

function registrationReducer(
  state: RegistrationState,
  action: RegistrationAction,
): RegistrationState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload, errors: {} }

    case 'NEXT_STEP': {
      const currentIndex = STEPS.indexOf(state.currentStep as (typeof STEPS)[number])
      if (currentIndex === -1 || currentIndex >= STEPS.length - 1) return state
      const nextStep = STEPS[currentIndex + 1]
      return { ...state, currentStep: nextStep, errors: {} }
    }

    case 'PREV_STEP': {
      const currentIndex = STEPS.indexOf(state.currentStep as (typeof STEPS)[number])
      if (currentIndex <= 0) return state
      const prevStep = STEPS[currentIndex - 1]
      return { ...state, currentStep: prevStep, errors: {} }
    }

    case 'UPDATE_DATA':
      return {
        ...state,
        data: { ...state.data, ...action.payload },
        errors: {},
      }

    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }

    case 'SET_ERRORS':
      return { ...state, errors: { ...state.errors, ...action.payload } }

    case 'CLEAR_ERRORS':
      return { ...state, errors: {} }

    default:
      return state
  }
}

export function useRegistration() {
  const [state, dispatch] = useReducer(registrationReducer, initialState)

  const setStep = useCallback((step: Step) => {
    dispatch({ type: 'SET_STEP', payload: step })
  }, [])

  const nextStep = useCallback(() => {
    dispatch({ type: 'NEXT_STEP' })
  }, [])

  const prevStep = useCallback(() => {
    dispatch({ type: 'PREV_STEP' })
  }, [])

  const updateData = useCallback((payload: Partial<RegistrationData>) => {
    dispatch({ type: 'UPDATE_DATA', payload })
  }, [])

  const setLoading = useCallback((loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading })
  }, [])

  const setErrors = useCallback(
    (errors: Partial<Record<keyof RegistrationData, string>>) => {
      dispatch({ type: 'SET_ERRORS', payload: errors })
    },
    [],
  )

  const clearErrors = useCallback(() => {
    dispatch({ type: 'CLEAR_ERRORS' })
  }, [])

  const setAccountType = useCallback(
    (accountType: AccountType) => {
      updateData({ accountType })
    },
    [updateData],
  )

  const stepProgress = useMemo(() => {
    const idx = STEPS.indexOf(state.currentStep as (typeof STEPS)[number])
    if (idx === -1) return 1
    return (idx + 1) / STEPS.length
  }, [state.currentStep])

  const stepIndex = useMemo(
    () => STEPS.indexOf(state.currentStep as (typeof STEPS)[number]),
    [state.currentStep],
  )

  return {
    state,
    stepProgress,
    stepIndex,
    setStep,
    nextStep,
    prevStep,
    updateData,
    setLoading,
    setErrors,
    clearErrors,
    setAccountType,
  }
}
