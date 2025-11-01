/**
 * Calculator Component (Simplified)
 *
 * Main interactive calculator for Nine Star Ki profile calculation.
 * Simplified version - no birth time or timezone required.
 *
 * This is a client component to handle form interactivity.
 */

'use client'

import { useState } from 'react'
import type { NineStarKiProfile } from '@/types'
import { calculateProfile, validateInput } from '@/lib/calculator'
import { validateDateString } from '@/lib/utils/date-utils'
import ProfileResult from './ProfileResult'

export default function Calculator() {
  // Form state
  const [birthDate, setBirthDate] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [profile, setProfile] = useState<NineStarKiProfile | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  /**
   * Handle form submission
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setProfile(null)

    // Validate date string
    const dateValidation = validateDateString(birthDate)
    if (!dateValidation.isValid) {
      setError(dateValidation.error || 'Invalid date')
      return
    }

    if (!dateValidation.date) {
      setError('Unable to parse date')
      return
    }

    // Use default time (simplified version doesn't require user input)
    const timeToUse = '12:00'
    const timezone = 'UTC'

    // Validate calculation input
    const inputValidation = validateInput({
      date: dateValidation.date,
      time: timeToUse,
      timezone: timezone
    })
    if (!inputValidation.isValid) {
      setError(inputValidation.error || 'Invalid input')
      return
    }

    // Calculate profile
    setIsCalculating(true)
    try {
      const calculatedProfile = calculateProfile({
        date: dateValidation.date,
        time: timeToUse,
        timezone: timezone
      })
      setProfile(calculatedProfile)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An error occurred during calculation. Please try again.'
      )
    } finally {
      setIsCalculating(false)
    }
  }

  /**
   * Handle input change
   */
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDate(e.target.value)
    // Clear error when user starts typing
    if (error) setError(null)
  }

  /**
   * Reset calculator
   */
  const handleReset = () => {
    setBirthDate('')
    setError(null)
    setProfile(null)
  }

  return (
    <div className="space-y-8">
      {/* Calculator form */}
      <div className="card">
        <h2 className="mb-6 font-serif text-2xl font-medium text-sumi-900">
          Calculate Your Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date input */}
          <div>
            <label htmlFor="birthDate" className="label">
              Birth Date
            </label>
            <input
              type="date"
              id="birthDate"
              value={birthDate}
              onChange={handleDateChange}
              className="input"
              placeholder="YYYY-MM-DD"
              required
              max={new Date().toISOString().split('T')[0]}
              min="1900-01-01"
            />
            <p className="mt-2 text-sm text-sumi-500">
              Enter your birth date. The calculator uses the traditional solar calendar with a fixed February 4 boundary.
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="animate-slide-up rounded-lg border border-shu-200 bg-shu-50 p-4">
              <p className="text-sm text-shu-800">{error}</p>
            </div>
          )}

          {/* Submit button */}
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={isCalculating || !birthDate}
              className="btn-primary flex-1"
            >
              {isCalculating ? 'Calculating...' : 'Calculate Profile'}
            </button>

            {profile && (
              <button
                type="button"
                onClick={handleReset}
                className="btn-secondary"
              >
                Reset
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Results */}
      {profile && <ProfileResult profile={profile} birthDate={birthDate} birthTime="" timezone="UTC" />}
    </div>
  )
}
