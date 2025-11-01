/**
 * Calculator Component
 *
 * Main interactive calculator for Nine Star Ki profile calculation.
 * Handles user input, validation, and displays results.
 *
 * This is a client component to handle form interactivity.
 */

'use client'

import { useState, useEffect } from 'react'
import type { NineStarKiProfile } from '@/types'
import { calculateProfile, validateInput } from '@/lib/calculator'
import { validateDateString } from '@/lib/utils/date-utils'
import { getLiChunForYear, getSolarTermsForYear } from '@/lib/data/solar-terms-data'
import { checkDSTTransition, type DSTWarning } from '@/lib/calculator/dst-utils'
import { detectDSTIssues, type DSTIssueDetection } from '@/lib/calculator/calculation-engine'
import ProfileResult from './ProfileResult'

interface ProximityWarning {
  level: 'safe' | 'caution' | 'high'
  message: string
  term: string
  hours: number
  minutes: number
  direction: 'before' | 'after'
}

export default function Calculator() {
  // Form state
  const [birthDate, setBirthDate] = useState('')
  const [birthTime, setBirthTime] = useState('')
  const [timezone, setTimezone] = useState('UTC')
  const [error, setError] = useState<string | null>(null)
  const [profile, setProfile] = useState<NineStarKiProfile | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [proximityWarning, setProximityWarning] = useState<ProximityWarning | null>(null)
  const [dstWarning, setDstWarning] = useState<DSTWarning | null>(null)
  const [dstIssueWarning, setDstIssueWarning] = useState<DSTIssueDetection | null>(null)
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)
  const [birthSeconds, setBirthSeconds] = useState('')

  /**
   * Check for DST transitions when date, time, or timezone changes
   */
  useEffect(() => {
    if (!birthDate || !birthTime || !timezone) {
      setDstWarning(null)
      setDstIssueWarning(null)
      return
    }

    const dateValidation = validateDateString(birthDate)
    if (!dateValidation.isValid || !dateValidation.date) {
      setDstWarning(null)
      setDstIssueWarning(null)
      return
    }

    try {
      // Check for traditional DST transition warnings
      const warning = checkDSTTransition({
        date: dateValidation.date,
        time: birthTime,
        timezone: timezone,
      })

      if (warning.isTransitionDate && warning.transition) {
        setDstWarning(warning)
      } else {
        setDstWarning(null)
      }

      // Check for DST issues (spring forward/fall back)
      const timeParts = birthTime.split(':').map(Number)
      const hours = timeParts[0]
      const minutes = timeParts[1] || 0
      const seconds = timeParts[2] || 0
      const dateWithTime = new Date(dateValidation.date)
      dateWithTime.setHours(hours, minutes, seconds, 0)

      const issueDetection = detectDSTIssues(dateWithTime, timezone)
      if (issueDetection.hasDSTIssue) {
        setDstIssueWarning(issueDetection)
      } else {
        setDstIssueWarning(null)
      }
    } catch {
      setDstWarning(null)
      setDstIssueWarning(null)
    }
  }, [birthDate, birthTime, timezone])

  /**
   * Check proximity to solar term boundaries in real-time
   */
  useEffect(() => {
    if (!birthDate) {
      setProximityWarning(null)
      return
    }

    const dateValidation = validateDateString(birthDate)
    if (!dateValidation.isValid || !dateValidation.date) {
      setProximityWarning(null)
      return
    }

    const date = dateValidation.date
    const timeToUse = birthTime || '12:00'

    try {
      // Parse the date/time (support HH:MM and HH:MM:SS format)
      const timeParts = timeToUse.split(':').map(Number)
      const hours = timeParts[0]
      const minutes = timeParts[1] || 0
      const seconds = timeParts[2] || 0
      const localDateTime = new Date(date)
      localDateTime.setHours(hours, minutes, seconds, 0)

      const year = localDateTime.getFullYear()
      const threeDaysMs = 3 * 24 * 60 * 60 * 1000

      // Check Li Chun
      const liChunDate = getLiChunForYear(year)
      const liChunDiffMs = localDateTime.getTime() - liChunDate.getTime()
      const liChunDiffAbs = Math.abs(liChunDiffMs)

      if (liChunDiffAbs <= threeDaysMs) {
        const totalMinutes = Math.floor(liChunDiffAbs / (60 * 1000))
        const hours = Math.floor(totalMinutes / 60)
        const mins = totalMinutes % 60
        const direction: 'before' | 'after' = liChunDiffMs < 0 ? 'before' : 'after'

        let level: 'safe' | 'caution' | 'high' = 'safe'
        if (hours <= 24) level = 'high'
        else if (hours <= 72) level = 'caution'

        setProximityWarning({
          level,
          message: `Distance to Li Chun: ${hours} hour${hours !== 1 ? 's' : ''} ${mins} minute${mins !== 1 ? 's' : ''} ${direction}`,
          term: 'Li Chun',
          hours,
          minutes: mins,
          direction,
        })
        return
      }

      // Check other solar terms
      const solarYear = localDateTime < liChunDate ? year - 1 : year
      const terms = getSolarTermsForYear(solarYear)
      const majorTerms = [
        { name: 'Jing Zhe', date: terms.jingZhe },
        { name: 'Qing Ming', date: terms.qingMing },
        { name: 'Li Xia', date: terms.liXia },
        { name: 'Mang Zhong', date: terms.mangZhong },
        { name: 'Xiao Shu', date: terms.xiaoShu },
        { name: 'Li Qiu', date: terms.liQiu },
        { name: 'Bai Lu', date: terms.baiLu },
        { name: 'Han Lu', date: terms.hanLu },
        { name: 'Li Dong', date: terms.liDong },
        { name: 'Da Xue', date: terms.daXue },
        { name: 'Xiao Han', date: terms.xiaoHan },
      ]

      for (const term of majorTerms) {
        const termDiffMs = localDateTime.getTime() - term.date.getTime()
        const termDiffAbs = Math.abs(termDiffMs)

        if (termDiffAbs <= threeDaysMs) {
          const totalMinutes = Math.floor(termDiffAbs / (60 * 1000))
          const hours = Math.floor(totalMinutes / 60)
          const mins = totalMinutes % 60
          const direction: 'before' | 'after' = termDiffMs < 0 ? 'before' : 'after'

          let level: 'safe' | 'caution' | 'high' = 'safe'
          if (hours <= 24) level = 'high'
          else if (hours <= 72) level = 'caution'

          setProximityWarning({
            level,
            message: `Distance to ${term.name}: ${hours} hour${hours !== 1 ? 's' : ''} ${mins} minute${mins !== 1 ? 's' : ''} ${direction}`,
            term: term.name,
            hours,
            minutes: mins,
            direction,
          })
          return
        }
      }

      setProximityWarning(null)
    } catch {
      setProximityWarning(null)
    }
  }, [birthDate, birthTime])

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

    // Build time string with optional seconds
    let timeToUse = birthTime || '12:00'
    if (showAdvancedOptions && birthSeconds) {
      const parts = timeToUse.split(':')
      if (parts.length === 2) {
        timeToUse = `${parts[0]}:${parts[1]}:${birthSeconds}`
      } else if (parts.length === 3) {
        timeToUse = `${parts[0]}:${parts[1]}:${birthSeconds}`
      }
    }

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
    setBirthTime('')
    setBirthSeconds('')
    setTimezone('UTC')
    setError(null)
    setProfile(null)
    setDstWarning(null)
    setDstIssueWarning(null)
    setShowAdvancedOptions(false)
    setProximityWarning(null)
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
              max={new Date().toISOString().split('T')[0]} // Prevent future dates
              min="1900-01-01"
            />
            <p className="mt-2 text-sm text-sumi-500">
              Enter your birth date. The calculator uses the solar calendar with Li Chun
              adjustments.
            </p>
          </div>

          {/* Time input */}
          <div>
            <label htmlFor="birthTime" className="label">
              Birth Time <span className="text-sumi-400">(optional)</span>
            </label>
            <input
              type="time"
              id="birthTime"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              className="input"
            />
            <p className="mt-2 text-sm text-sumi-500">
              Optional. Defaults to 12:00 (noon) if not provided. For dates near solar term boundaries
              (Feb 3-5 or around the 5th-8th of each month), the exact birth time may affect your results.
            </p>
          </div>

          {/* Timezone selector */}
          <div>
            <label htmlFor="timezone" className="label">
              Timezone <span className="text-sumi-400">(optional)</span>
            </label>
            <select
              id="timezone"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="input"
            >
              <option value="UTC">UTC</option>

              <optgroup label="Americas - North">
                <option value="America/New_York">Eastern Time (New York)</option>
                <option value="America/Chicago">Central Time (Chicago)</option>
                <option value="America/Denver">Mountain Time (Denver)</option>
                <option value="America/Phoenix">Mountain Time - Arizona (Phoenix)</option>
                <option value="America/Los_Angeles">Pacific Time (Los Angeles)</option>
                <option value="America/Anchorage">Alaska Time (Anchorage)</option>
                <option value="Pacific/Honolulu">Hawaii Time (Honolulu)</option>
                <option value="America/Toronto">Toronto</option>
                <option value="America/Vancouver">Vancouver</option>
                <option value="America/Montreal">Montreal</option>
                <option value="America/Edmonton">Calgary/Edmonton</option>
                <option value="America/Halifax">Halifax</option>
                <option value="America/Winnipeg">Winnipeg</option>
              </optgroup>

              <optgroup label="Caribbean & British Territories">
                <option value="Atlantic/Bermuda">Bermuda</option>
                <option value="America/Jamaica">Jamaica</option>
                <option value="America/Barbados">Barbados</option>
                <option value="America/St_Lucia">St. Lucia</option>
                <option value="America/Cayman">Cayman Islands</option>
                <option value="America/Tortola">British Virgin Islands</option>
                <option value="America/Anguilla">Anguilla</option>
                <option value="America/Antigua">Antigua and Barbuda</option>
                <option value="America/Montserrat">Montserrat</option>
                <option value="America/Grand_Turk">Turks and Caicos</option>
                <option value="America/Dominica">Dominica</option>
                <option value="America/Grenada">Grenada</option>
                <option value="America/Port_of_Spain">Trinidad and Tobago</option>
                <option value="America/Nassau">Bahamas</option>
                <option value="America/Aruba">Aruba</option>
                <option value="America/Curacao">Curaçao</option>
                <option value="Atlantic/Stanley">Falkland Islands</option>
                <option value="Europe/Gibraltar">Gibraltar</option>
                <option value="Atlantic/St_Helena">Saint Helena</option>
              </optgroup>

              <optgroup label="Americas - Central & South">
                <option value="America/Mexico_City">Mexico City</option>
                <option value="America/Buenos_Aires">Buenos Aires</option>
                <option value="America/Sao_Paulo">São Paulo</option>
                <option value="America/Lima">Lima</option>
                <option value="America/Bogota">Bogotá</option>
                <option value="America/Santiago">Santiago</option>
                <option value="America/Caracas">Caracas</option>
              </optgroup>

              <optgroup label="Europe">
                <option value="Europe/London">London</option>
                <option value="Europe/Paris">Paris</option>
                <option value="Europe/Berlin">Berlin</option>
                <option value="Europe/Rome">Rome</option>
                <option value="Europe/Madrid">Madrid</option>
                <option value="Europe/Amsterdam">Amsterdam</option>
                <option value="Europe/Brussels">Brussels</option>
                <option value="Europe/Stockholm">Stockholm</option>
                <option value="Europe/Vienna">Vienna</option>
                <option value="Europe/Prague">Prague</option>
                <option value="Europe/Warsaw">Warsaw</option>
                <option value="Europe/Athens">Athens</option>
                <option value="Europe/Istanbul">Istanbul</option>
                <option value="Europe/Moscow">Moscow</option>
              </optgroup>

              <optgroup label="Africa">
                <option value="Africa/Cairo">Cairo</option>
                <option value="Africa/Johannesburg">Johannesburg</option>
                <option value="Africa/Lagos">Lagos</option>
                <option value="Africa/Nairobi">Nairobi</option>
                <option value="Africa/Casablanca">Casablanca</option>
              </optgroup>

              <optgroup label="Middle East">
                <option value="Asia/Dubai">Dubai</option>
                <option value="Asia/Tel_Aviv">Tel Aviv</option>
                <option value="Asia/Riyadh">Riyadh</option>
                <option value="Asia/Tehran">Tehran</option>
              </optgroup>

              <optgroup label="Asia">
                <option value="Asia/Tokyo">Tokyo</option>
                <option value="Asia/Shanghai">Shanghai</option>
                <option value="Asia/Hong_Kong">Hong Kong</option>
                <option value="Asia/Singapore">Singapore</option>
                <option value="Asia/Bangkok">Bangkok</option>
                <option value="Asia/Kolkata">Mumbai/Delhi</option>
                <option value="Asia/Seoul">Seoul</option>
                <option value="Asia/Taipei">Taipei</option>
                <option value="Asia/Manila">Manila</option>
                <option value="Asia/Jakarta">Jakarta</option>
                <option value="Asia/Kuala_Lumpur">Kuala Lumpur</option>
              </optgroup>

              <optgroup label="Oceania">
                <option value="Australia/Sydney">Sydney</option>
                <option value="Australia/Melbourne">Melbourne</option>
                <option value="Pacific/Auckland">Auckland</option>
                <option value="Australia/Perth">Perth</option>
                <option value="Australia/Brisbane">Brisbane</option>
              </optgroup>
            </select>
            <p className="mt-2 text-sm text-sumi-500">
              Your profile is calculated using your local time zone for accurate solar term
              boundaries.
            </p>
          </div>

          {/* DST Issue Warning */}
          {dstIssueWarning && dstIssueWarning.hasDSTIssue && (
            <div className="animate-slide-up rounded-lg border-2 border-shu-200 bg-shu-50 p-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-shu-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4v2m0 5v1m0-14V3m0 14v1m0 0v1" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 font-semibold text-shu-900">
                    {dstIssueWarning.issueType === 'spring_forward_missing'
                      ? 'Non-Existent Birth Time (DST Spring Forward)'
                      : 'Ambiguous Birth Time (DST Fall Back)'}
                  </h3>
                  <p className="mb-3 text-sm text-shu-800">
                    {dstIssueWarning.warning}
                  </p>

                  {dstIssueWarning.issueType === 'spring_forward_missing' && (
                    <div className="mb-3 rounded-lg bg-white p-3">
                      <p className="mb-2 text-sm font-medium text-shu-900">This time doesn&apos;t exist in your timezone on this date.</p>
                      <p className="text-xs text-shu-700">
                        During the spring forward transition, clocks jump from before 2:00 AM directly to 3:00 AM.
                      </p>
                    </div>
                  )}

                  {dstIssueWarning.issueType === 'fall_back_ambiguous' && (
                    <div className="mb-3 rounded-lg bg-white p-3">
                      <p className="mb-2 text-sm font-medium text-shu-900">This time occurred twice on this date.</p>
                      <p className="text-xs text-shu-700">
                        During the fall back transition, clocks fall back and this hour is repeated.
                      </p>
                    </div>
                  )}

                  {dstIssueWarning.alternatives && dstIssueWarning.alternatives.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-shu-900">Which time did you mean?</p>
                      {dstIssueWarning.alternatives.map((alt, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setBirthTime(alt.time)}
                          className="w-full rounded-lg border border-shu-300 bg-white p-2 text-left transition-colors hover:bg-shu-50"
                        >
                          <p className="text-sm font-medium text-shu-900">{alt.time}</p>
                          <p className="text-xs text-shu-600">{alt.description}</p>
                        </button>
                      ))}
                    </div>
                  )}

                  <p className="mt-3 text-xs text-shu-600">
                    Selecting the correct time ensures accurate calculation of your principal star.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Advanced Options Toggle */}
          <div className="border-t border-sumi-100 pt-6">
            <button
              type="button"
              onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
              className="flex items-center gap-2 text-sm font-medium text-sumi-700 hover:text-sumi-900"
            >
              <svg
                className={`h-5 w-5 transition-transform ${showAdvancedOptions ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              Advanced Options
            </button>

            {showAdvancedOptions && (
              <div className="mt-4 animate-slide-up space-y-4 rounded-lg bg-ai-50 p-4">
                {/* Seconds precision input */}
                <div>
                  <label htmlFor="birthSeconds" className="label text-sm">
                    Birth Seconds <span className="text-sumi-400">(optional)</span>
                  </label>
                  <input
                    type="number"
                    id="birthSeconds"
                    min="0"
                    max="59"
                    value={birthSeconds}
                    onChange={(e) => setBirthSeconds(e.target.value)}
                    className="input max-w-xs"
                    placeholder="0-59"
                  />
                  <p className="mt-2 text-xs text-ai-700">
                    Birth time precision to the second. Rarely needed - birth time to minute precision is sufficient for accurate calculations.
                  </p>
                </div>

                {/* Info box */}
                <div className="rounded-lg border border-ai-300 bg-white p-3">
                  <p className="text-xs font-medium text-ai-900">
                    Why seconds precision matters:
                  </p>
                  <ul className="mt-2 ml-4 list-disc space-y-1 text-xs text-ai-800">
                    <li>Most births are not near solar term boundaries</li>
                    <li>For 99% of people, minute precision is sufficient</li>
                    <li>Seconds precision only helps within hours of a solar term</li>
                    <li>Historical birth records typically don&apos;t include seconds</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* DST Transition Warning */}
          {dstWarning && dstWarning.transition && (
            <div className="dst-warning animate-slide-up">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 font-semibold text-amber-900">
                    DST Transition Detected
                  </h3>
                  <p className="mb-2 text-sm text-amber-800">
                    {dstWarning.transition.message}
                  </p>
                  <p className="mb-3 text-sm text-amber-700">
                    {dstWarning.transition.suggestion}
                  </p>

                  {dstWarning.transition.alternatives && dstWarning.transition.alternatives.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-amber-900">Which time did you mean?</p>
                      {dstWarning.transition.alternatives.map((alt, index) => (
                        <div key={index} className="rounded-lg border border-amber-300 bg-amber-50 p-3">
                          <p className="text-sm font-medium text-amber-900">{alt.description}</p>
                          <p className="mt-1 text-xs text-amber-700">
                            Time: {alt.time} → Solar Year: {alt.solarYear}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="mt-3 text-xs text-amber-600">
                    If your birth time is approximate, this may affect your calculation.
                  </p>
                </div>
              </div>
            </div>
          )}

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
      {profile && <ProfileResult profile={profile} birthDate={birthDate} birthTime={birthTime} timezone={timezone} proximityWarning={proximityWarning} />}
    </div>
  )
}
