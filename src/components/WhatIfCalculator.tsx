/**
 * What-If Calculator Component
 *
 * Interactive time slider to explore how profile changes with different birth times
 * Shows alternative profiles and highlights differences
 */

'use client'

import { useState, useEffect } from 'react'
import type { NineStarKiProfile } from '@/types'
import { calculateProfile } from '@/lib/calculator'
import { formatDate } from '@/lib/utils/date-utils'

interface WhatIfCalculatorProps {
  originalProfile: NineStarKiProfile
  birthDate: string
  timezone: string
}

interface AlternativeProfile {
  profile: NineStarKiProfile
  hourOffset: number
  timeString: string
  differences: {
    principal: boolean
    month: boolean
    energetic: boolean
  }
  boundaryInfo?: {
    crossed: string
    direction: 'earlier' | 'later'
  }
}

export default function WhatIfCalculator({
  originalProfile,
  birthDate,
  timezone,
}: WhatIfCalculatorProps) {
  const [hourOffset, setHourOffset] = useState(0)
  const [alternativeProfile, setAlternativeProfile] = useState<AlternativeProfile | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  // Calculate alternative profile based on hour offset
  useEffect(() => {
    if (hourOffset === 0) {
      setAlternativeProfile(null)
      return
    }

    try {
      // Calculate new time
      const originalDate = new Date(originalProfile.birthDate)
      const newDate = new Date(originalDate.getTime() + hourOffset * 60 * 60 * 1000)

      // Format time as HH:MM
      const hours = newDate.getHours().toString().padStart(2, '0')
      const minutes = newDate.getMinutes().toString().padStart(2, '0')
      const timeString = `${hours}:${minutes}`

      // Calculate new profile
      const newProfile = calculateProfile({
        date: birthDate,
        time: timeString,
        timezone,
      })

      // Detect differences
      const differences = {
        principal: newProfile.principalStar !== originalProfile.principalStar,
        month: newProfile.monthStar !== originalProfile.monthStar,
        energetic: newProfile.energeticStar !== originalProfile.energeticStar,
      }

      // Detect boundary crossings
      let boundaryInfo: AlternativeProfile['boundaryInfo'] = undefined
      if (differences.principal) {
        boundaryInfo = {
          crossed: 'Li Chun (立春)',
          direction: hourOffset < 0 ? 'earlier' : 'later',
        }
      } else if (differences.month) {
        // Try to determine which solar term was crossed
        boundaryInfo = {
          crossed: 'a solar term boundary',
          direction: hourOffset < 0 ? 'earlier' : 'later',
        }
      }

      setAlternativeProfile({
        profile: newProfile,
        hourOffset,
        timeString,
        differences,
        boundaryInfo,
      })
    } catch (error) {
      console.error('Error calculating alternative profile:', error)
      setAlternativeProfile(null)
    }
  }, [hourOffset, originalProfile, birthDate, timezone])

  const formatOffset = (hours: number): string => {
    const absHours = Math.abs(hours)
    const sign = hours < 0 ? '-' : '+'
    return `${sign}${absHours}h`
  }

  const hasDifferences =
    alternativeProfile &&
    (alternativeProfile.differences.principal ||
      alternativeProfile.differences.month ||
      alternativeProfile.differences.energetic)

  return (
    <div className="card space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="mb-1 font-serif text-lg font-medium text-sumi-900">
            What If You Were Born at a Different Time?
          </h3>
          <p className="text-sm text-sumi-600">
            Explore how your profile might change with different birth times
          </p>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm font-medium text-ai-600 hover:text-ai-700 hover:underline"
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
        >
          {isExpanded ? 'Hide' : 'Try it'}
        </button>
      </div>

      {isExpanded && (
        <div className="animate-slide-up space-y-4 border-t border-sumi-100 pt-4">
          {/* Time Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-sumi-700">Time adjustment:</span>
              <span className="font-mono font-semibold text-ai-700">
                {hourOffset === 0 ? 'Original time' : formatOffset(hourOffset)}
              </span>
            </div>

            <div className="relative">
              <input
                type="range"
                min="-12"
                max="12"
                step="1"
                value={hourOffset}
                onChange={(e) => setHourOffset(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-sumi-200"
                style={{
                  background: `linear-gradient(to right,
                    #e5e7eb 0%,
                    #e5e7eb ${((hourOffset + 12) / 24) * 100}%,
                    #3b82f6 ${((hourOffset + 12) / 24) * 100}%,
                    #3b82f6 50%,
                    #e5e7eb 50%,
                    #e5e7eb 100%
                  )`,
                }}
              />
              <div className="mt-2 flex justify-between text-xs text-sumi-500">
                <span>-12h</span>
                <span>Original</span>
                <span>+12h</span>
              </div>
            </div>

            {alternativeProfile && (
              <div className="rounded-lg bg-sumi-50 p-3 text-sm">
                <p className="text-sumi-700">
                  <strong>Alternative time:</strong>{' '}
                  {formatDate(alternativeProfile.profile.birthDate, 'MMM d, yyyy')} at{' '}
                  {alternativeProfile.timeString} {timezone}
                </p>
              </div>
            )}
          </div>

          {/* Results Display */}
          {alternativeProfile && (
            <div className="space-y-4">
              {/* Profile Comparison */}
              <div
                className={`rounded-lg border-2 p-4 ${
                  hasDifferences
                    ? 'border-red-200 bg-red-50'
                    : 'border-green-200 bg-green-50'
                }`}
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-2xl">
                    {hasDifferences ? '⚠' : '✓'}
                  </span>
                  <div>
                    <p
                      className={`font-semibold ${
                        hasDifferences ? 'text-red-900' : 'text-green-900'
                      }`}
                    >
                      {hasDifferences ? 'DIFFERENT PROFILE' : 'SAME PROFILE'}
                    </p>
                    <p
                      className={`text-sm ${
                        hasDifferences ? 'text-red-700' : 'text-green-700'
                      }`}
                    >
                      {hasDifferences
                        ? 'Your profile would change at this time'
                        : 'Your profile remains the same at this time'}
                    </p>
                  </div>
                </div>

                {/* Star Comparison Table */}
                <div className="space-y-2">
                  <div className="grid grid-cols-4 gap-2 text-xs font-semibold text-sumi-700">
                    <div>Star</div>
                    <div className="text-center">Original</div>
                    <div className="text-center">Alternative</div>
                    <div className="text-center">Status</div>
                  </div>

                  {/* Principal Star */}
                  <div
                    className={`grid grid-cols-4 gap-2 rounded p-2 text-sm ${
                      alternativeProfile.differences.principal
                        ? 'bg-red-100'
                        : 'bg-white'
                    }`}
                  >
                    <div className="font-medium">Principal</div>
                    <div className="text-center font-mono font-bold">
                      {originalProfile.principalStar}
                    </div>
                    <div className="text-center font-mono font-bold">
                      {alternativeProfile.profile.principalStar}
                    </div>
                    <div className="text-center">
                      {alternativeProfile.differences.principal ? (
                        <span className="text-red-700">⚠ DIFF</span>
                      ) : (
                        <span className="text-green-700">✓ SAME</span>
                      )}
                    </div>
                  </div>

                  {/* Month Star */}
                  <div
                    className={`grid grid-cols-4 gap-2 rounded p-2 text-sm ${
                      alternativeProfile.differences.month
                        ? 'bg-red-100'
                        : 'bg-white'
                    }`}
                  >
                    <div className="font-medium">Month</div>
                    <div className="text-center font-mono font-bold">
                      {originalProfile.monthStar}
                    </div>
                    <div className="text-center font-mono font-bold">
                      {alternativeProfile.profile.monthStar}
                    </div>
                    <div className="text-center">
                      {alternativeProfile.differences.month ? (
                        <span className="text-red-700">⚠ DIFF</span>
                      ) : (
                        <span className="text-green-700">✓ SAME</span>
                      )}
                    </div>
                  </div>

                  {/* Energetic Star */}
                  <div
                    className={`grid grid-cols-4 gap-2 rounded p-2 text-sm ${
                      alternativeProfile.differences.energetic
                        ? 'bg-red-100'
                        : 'bg-white'
                    }`}
                  >
                    <div className="font-medium">Energetic</div>
                    <div className="text-center font-mono font-bold">
                      {originalProfile.energeticStar}
                    </div>
                    <div className="text-center font-mono font-bold">
                      {alternativeProfile.profile.energeticStar}
                    </div>
                    <div className="text-center">
                      {alternativeProfile.differences.energetic ? (
                        <span className="text-red-700">⚠ DIFF</span>
                      ) : (
                        <span className="text-green-700">✓ SAME</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Boundary Explanation */}
                {alternativeProfile.boundaryInfo && hasDifferences && (
                  <div className="mt-4 rounded-lg bg-white p-3 text-sm text-sumi-700">
                    <p className="font-semibold text-sumi-900">Why the difference?</p>
                    <p className="mt-1">
                      At this time, your birth would fall{' '}
                      {alternativeProfile.boundaryInfo.direction === 'earlier'
                        ? 'before'
                        : 'after'}{' '}
                      the {alternativeProfile.boundaryInfo.crossed} boundary, changing
                      your calculated star(s).
                    </p>
                  </div>
                )}
              </div>

              {/* Reset Button */}
              {hourOffset !== 0 && (
                <button
                  onClick={() => setHourOffset(0)}
                  className="btn-secondary w-full"
                >
                  Reset to Original Time
                </button>
              )}
            </div>
          )}

          {/* Educational Note */}
          <div className="rounded-lg bg-ai-50 p-4 text-sm text-sumi-700">
            <p className="font-semibold text-sumi-900">Why does this matter?</p>
            <p className="mt-1">
              If you&apos;re unsure of your exact birth time, this tool helps you understand
              whether small time differences could affect your profile. If your profile
              changes with small time adjustments, it&apos;s especially important to verify
              your birth time.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
