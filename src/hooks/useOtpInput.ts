import { useRef, useCallback } from 'react'

export function useOtpInput(
  otp: string[],
  onChange: (otp: string[]) => void,
  length = 4,
) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const focusInput = useCallback((index: number) => {
    const input = inputRefs.current[index]
    if (input) {
      input.focus()
      input.select()
    }
  }, [])

  const handleChange = useCallback(
    (index: number, value: string) => {
      const digit = value.replace(/\D/g, '').slice(-1)
      const newOtp = [...otp]
      newOtp[index] = digit

      onChange(newOtp)

      if (digit && index < length - 1) {
        focusInput(index + 1)
      }
    },
    [otp, onChange, length, focusInput],
  )

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        if (otp[index]) {
          const newOtp = [...otp]
          newOtp[index] = ''
          onChange(newOtp)
        } else if (index > 0) {
          focusInput(index - 1)
          const newOtp = [...otp]
          newOtp[index - 1] = ''
          onChange(newOtp)
        }
      } else if (e.key === 'ArrowLeft' && index > 0) {
        focusInput(index - 1)
      } else if (e.key === 'ArrowRight' && index < length - 1) {
        focusInput(index + 1)
      }
    },
    [otp, onChange, length, focusInput],
  )

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      e.preventDefault()
      const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
      if (!pasted) return

      const newOtp = Array(length).fill('')
      pasted.split('').forEach((char, i) => {
        newOtp[i] = char
      })
      onChange(newOtp)

      const lastFilledIndex = Math.min(pasted.length - 1, length - 1)
      focusInput(lastFilledIndex)
    },
    [onChange, length, focusInput],
  )

  const setRef = useCallback((el: HTMLInputElement | null, index: number) => {
    inputRefs.current[index] = el
  }, [])

  return { handleChange, handleKeyDown, handlePaste, setRef, focusInput }
}
