export type AccountType = 'personal' | 'business'

export type Step =
  | 'account-type'
  | 'mobile'
  | 'otp'
  | 'name'
  | 'password'
  | 'success'

export interface RegistrationData {
  accountType: AccountType
  countryCode: string
  mobile: string
  otp: string[]
  firstName: string
  lastName: string
  password: string
  confirmPassword: string
}

export interface CountryOption {
  code: string
  dialCode: string
  flag: string
  name: string
}

export const STEPS: Step[] = ['account-type', 'mobile', 'otp', 'name', 'password']

export const COUNTRY_OPTIONS: CountryOption[] = [
  { code: 'US', dialCode: '+1', flag: '🇺🇸', name: 'United States' },
  { code: 'IN', dialCode: '+91', flag: '🇮🇳', name: 'India' },
  { code: 'GB', dialCode: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  { code: 'CA', dialCode: '+1', flag: '🇨🇦', name: 'Canada' },
  { code: 'AU', dialCode: '+61', flag: '🇦🇺', name: 'Australia' },
  { code: 'DE', dialCode: '+49', flag: '🇩🇪', name: 'Germany' },
  { code: 'FR', dialCode: '+33', flag: '🇫🇷', name: 'France' },
  { code: 'SG', dialCode: '+65', flag: '🇸🇬', name: 'Singapore' },
  { code: 'AE', dialCode: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: 'JP', dialCode: '+81', flag: '🇯🇵', name: 'Japan' },
]
