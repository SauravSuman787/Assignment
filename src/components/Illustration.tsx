import React from 'react'
import artboard from '../assets/Artboard11.svg'

export const Illustration: React.FC = () => (
  <img
    src={artboard}
    alt="Registration illustration"
    style={{ width: '100%', maxWidth: 340, height: 'auto', display: 'block' }}
  />
)
