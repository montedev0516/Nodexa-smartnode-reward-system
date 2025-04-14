import { useState, useEffect } from 'react'

export default function PasswordStrengthMeter({ password }: { password: string }) {
  const [strength, setStrength] = useState(0)
  const [message, setMessage] = useState('')

  useEffect(() => {
    let score = 0
    let msg = []

    // Length check
    if (password.length >= 8) score++
    if (password.length >= 12) score++
    
    // Complexity checks
    if (/[A-Z]/.test(password)) score++
    if (/[a-z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++
    
    // Determine strength level
    if (password.length === 0) {
      setStrength(0)
      setMessage('')
    } else if (password.length < 8) {
      setStrength(1)
      setMessage('Too short')
    } else if (score <= 3) {
      setStrength(2)
      setMessage('Weak')
    } else if (score <= 5) {
      setStrength(3)
      setMessage('Good')
    } else {
      setStrength(4)
      setMessage('Strong')
    }
  }, [password])

  const strengthColors = [
    'bg-gray-200',
    'bg-red-500',
    'bg-yellow-500',
    'bg-blue-500',
    'bg-green-500'
  ]

  return (
    <div className="mt-2">
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${strengthColors[strength]}`} 
          style={{ width: `${strength * 25}%` }}
        ></div>
      </div>
      {message && (
        <p className={`text-sm mt-1 ${
          strength === 1 ? 'text-red-500' : 
          strength === 2 ? 'text-yellow-500' : 
          strength === 3 ? 'text-blue-500' : 
          'text-green-500'
        }`}>
          {message}
        </p>
      )}
    </div>
  )
}