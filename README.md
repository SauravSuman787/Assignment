# Registration Flow — React + TypeScript

A pixel-perfect multi-step account registration flow built with React, TypeScript, Framer Motion, and React Hook Form.

## Features

- **6-step onboarding flow**: Account Type → Mobile → OTP → Name → Password → Success
- **Animated transitions**: Smooth slide + fade between steps using Framer Motion
- **Interaction states**: Hover, focus, active, loading, and error states on all interactive elements
- **Form validation**: Real-time validation via React Hook Form with descriptive error messages
- **OTP input**: Keyboard-navigable OTP boxes with paste support and auto-advance
- **Password strength meter**: Visual indicator updating live as the user types
- **Country code selector**: Searchable dropdown with flags
- **Success modal**: Spring-animated modal with account summary and animated SVG checkmark
- **Optimized hooks**: `useReducer` for centralized state, `useCallback`/`useMemo` for performance, custom `useOtpInput` and `useCountdown` hooks

## Tech Stack

| Tool | Purpose |
|---|---|
| React 19 + TypeScript | UI framework + type safety |
| Vite | Build tool |
| Framer Motion | Animations & transitions |
| React Hook Form | Form state & validation |
| clsx | Conditional class names |

## Getting Started

```bash
npm install
npm run dev        # Dev server at http://localhost:5173
npm run build      # Production build
npm run preview    # Preview production build
```

## OTP for Testing

The simulated OTP code is **`8642`** — enter it on the OTP step to proceed.

## Project Structure

```
src/
├── components/
│   ├── steps/
│   │   ├── AccountTypeStep.tsx
│   │   ├── MobileStep.tsx
│   │   ├── OtpStep.tsx
│   │   ├── NameStep.tsx
│   │   └── PasswordStep.tsx
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── PasswordInput.tsx
│   ├── ProgressBar.tsx
│   ├── Layout.tsx
│   ├── Illustration.tsx
│   └── SuccessModal.tsx
├── hooks/
│   ├── useRegistration.ts   # useReducer-based central state
│   ├── useOtpInput.ts       # OTP keyboard navigation
│   └── useCountdown.ts      # Resend OTP countdown timer
├── types/
│   └── index.ts
├── App.tsx
├── main.tsx
└── index.css
```
