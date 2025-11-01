/**
 * Profile Result Component
 *
 * Displays a calculated Nine Star Ki profile with beautiful,
 * culturally-inspired visual design.
 *
 * Features (per Research Section 8):
 * - Three stars display (principal, month, energetic)
 * - Solar year and month information
 * - Boundary warnings for Feb 3-5 births
 * - Calculation method indicator
 * - Detailed calculation view (expandable)
 * - Element associations and colors
 * - Educational tooltips
 */

'use client'

import { useState } from 'react'
import type { NineStarKiProfile } from '@/types'
import { getStarMetadata } from '@/lib/data'
import { formatDate } from '@/lib/utils/date-utils'
import StarCard from './StarCard'
import EducationalModal from './EducationalModal'
import ConfidenceIndicator from './ConfidenceIndicator'
import WhatIfCalculator from './WhatIfCalculator'
import SolarTermTimeline from './SolarTermTimeline'
import BirthChartPDF from './BirthChartPDF'

interface ProfileResultProps {
  profile: NineStarKiProfile
  birthDate: string
  birthTime: string
  timezone: string
  proximityWarning?: {
    level: 'safe' | 'caution' | 'high'
    message: string
    term: string
    hours: number
    minutes: number
    direction: 'before' | 'after'
  } | null
}

export default function ProfileResult({ profile, birthDate, birthTime, timezone }: ProfileResultProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [showHelp, setShowHelp] = useState<'why-time-matters' | 'time-sensitivity' | 'hemisphere' | 'boundary' | null>(null)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const yearStarMeta = getStarMetadata(profile.yearStar)
  const monthStarMeta = getStarMetadata(profile.monthStar)
  const energeticStarMeta = getStarMetadata(profile.energeticStar)

  const solarYear = profile.solarYearStart.getFullYear()
  const gregorianYear = profile.birthDate.getFullYear()

  return (
    <div className="animate-fade-in space-y-8">
      {/* Profile header with three stars */}
      <div className="card text-center">
        <h2 className="mb-4 font-serif text-3xl font-medium text-sumi-900">
          Your Nine Star Ki Profile
        </h2>

        {/* Three stars display - prominent */}
        <div className="mb-6 flex items-center justify-center gap-4">
          <div className="text-center">
            <div
              className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full shadow-soft"
              style={{ backgroundColor: yearStarMeta.color }}
            >
              <span className="font-serif text-3xl font-bold text-white">{profile.yearStar}</span>
            </div>
            <p className="text-xs font-medium text-sumi-600">Principal</p>
          </div>

          <span className="text-2xl text-sumi-300">·</span>

          <div className="text-center">
            <div
              className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full shadow-soft"
              style={{ backgroundColor: monthStarMeta.color }}
            >
              <span className="font-serif text-3xl font-bold text-white">{profile.monthStar}</span>
            </div>
            <p className="text-xs font-medium text-sumi-600">Month</p>
          </div>

          <span className="text-2xl text-sumi-300">·</span>

          <div className="text-center">
            <div
              className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full shadow-soft"
              style={{ backgroundColor: energeticStarMeta.color }}
            >
              <span className="font-serif text-3xl font-bold text-white">{profile.energeticStar}</span>
            </div>
            <p className="text-xs font-medium text-sumi-600">Energetic</p>
          </div>
        </div>

        {/* Birth information */}
        <div className="space-y-1 text-sm text-sumi-600">
          <p>Born on {formatDate(profile.birthDate, 'MMMM d, yyyy')} at {birthTime} {timezone}</p>
          <p className="text-xs text-sumi-500">
            Solar year {solarYear} {solarYear !== gregorianYear && `(Gregorian: ${gregorianYear})`}
          </p>
          <p className="text-xs text-sumi-500">
            Li Chun began on {formatDate(profile.solarYearStart, 'MMMM d, yyyy')}
          </p>
        </div>

        {/* Calculation method indicator */}
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-ai-50 px-4 py-2 text-xs font-medium text-ai-700">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Traditional Method
        </div>
      </div>

      {/* Confidence Indicator */}
      {profile.confidence && (
        <ConfidenceIndicator confidence={profile.confidence} />
      )}

      {/* What-If Calculator */}
      <WhatIfCalculator
        originalProfile={profile}
        birthDate={birthDate}
        timezone={timezone}
      />

      {/* PDF Export */}
      <div className="card">
        <h3 className="mb-4 font-serif text-lg font-medium text-sumi-900">
          Export Your Birth Chart
        </h3>
        <p className="mb-4 text-sm text-sumi-600">
          Download a complete birth chart PDF with all your star information, birth details, and explanations.
        </p>
        <BirthChartPDF
          profile={profile}
          birthDate={birthDate}
          birthTime={birthTime}
          timezone={timezone}
        />
      </div>

      {/* Enhanced Boundary Warnings */}
      {profile.warnings && profile.warnings.length > 0 && (
        <div className="space-y-4">
          {profile.warnings.map((warning, index) => {
            const sensitivity = warning.impactZone || (warning.hoursToTerm <= 24 ? 'high' : warning.hoursToTerm <= 72 ? 'medium' : 'low')
            const bgColor = sensitivity === 'high' ? 'bg-shu-50 border-shu-300' : sensitivity === 'medium' ? 'bg-yellow-50 border-yellow-300' : 'bg-green-50 border-green-300'
            const iconColor = sensitivity === 'high' ? 'text-shu-600' : sensitivity === 'medium' ? 'text-yellow-600' : 'text-green-600'
            const textColor = sensitivity === 'high' ? 'text-shu-900' : sensitivity === 'medium' ? 'text-yellow-900' : 'text-green-900'

            return (
              <div key={index} className={`animate-slide-up card border-2 ${bgColor}`}>
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <svg className={`h-6 w-6 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className={`mb-2 font-semibold ${textColor}`}>
                      {sensitivity === 'high' ? 'HIGH SENSITIVITY' : sensitivity === 'medium' ? 'MEDIUM SENSITIVITY' : 'LOW SENSITIVITY'} - Solar Term Boundary
                    </h3>
                    <div className="mb-3 space-y-2 text-sm">
                      <p className={textColor}>
                        {warning.message}
                      </p>
                      <div className={`rounded-lg bg-white p-3 ${textColor}`}>
                        <p className="mb-1 font-semibold">Boundary Details:</p>
                        <ul className="ml-4 list-disc space-y-1 text-xs">
                          <li>Term: {warning.term}</li>
                          <li>Occurred at: {warning.termTime}</li>
                          <li>Your birth: {warning.hoursToTerm} hour{warning.hoursToTerm !== 1 ? 's' : ''} and {warning.minutesToTerm} minute{warning.minutesToTerm !== 1 ? 's' : ''} {warning.direction.toUpperCase()}</li>
                          <li>Impact: {warning.type === 'li_chun_boundary' ? 'Could affect your principal star' : 'Could affect your month star'}</li>
                        </ul>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowHelp('boundary')}
                      className={`text-sm font-medium hover:underline ${sensitivity === 'high' ? 'text-shu-700 hover:text-shu-900' : sensitivity === 'medium' ? 'text-yellow-700 hover:text-yellow-900' : 'text-green-700 hover:text-green-900'}`}
                    >
                      Learn more about solar term boundaries →
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Three stars grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Principal/Year Star */}
        <StarCard
          star={yearStarMeta}
          title="Principal Star (本命星)"
          subtitle="Main Character"
          description="Your outward personality and the way you present yourself to the world. This is your primary star determined by your solar birth year."
          isPrimary
        />

        {/* Month Star */}
        <StarCard
          star={monthStarMeta}
          title="Month Star (月命星)"
          subtitle="Inner Nature"
          description="Your emotional tendencies, inner world, and how you process feelings and relationships. Determined by your solar birth month."
        />

        {/* Energetic Star */}
        <StarCard
          star={energeticStarMeta}
          title="Energetic Star"
          subtitle="Action & Energy"
          description="How you express your energy, take action, and engage with life's challenges. Derived from your principal and month stars."
        />
      </div>

      {/* Solar Term Timeline */}
      <div className="card">
        <SolarTermTimeline
          birthDate={profile.birthDate}
          solarYear={profile.solarYear}
          principalStar={profile.principalStar}
        />
      </div>

      {/* Element associations */}
      <div className="card bg-gradient-to-br from-sumi-50 to-ai-50">
        <h3 className="mb-4 font-serif text-lg font-medium text-sumi-900">
          Your Elemental Profile
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-white p-4 shadow-subtle">
            <div className="mb-2 flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: yearStarMeta.color }}
              />
              <span className="text-sm font-medium text-sumi-700">Principal</span>
            </div>
            <p className="text-lg font-semibold text-sumi-900">{yearStarMeta.element}</p>
            <p className="text-xs text-sumi-500">{yearStarMeta.polarity}</p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-subtle">
            <div className="mb-2 flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: monthStarMeta.color }}
              />
              <span className="text-sm font-medium text-sumi-700">Month</span>
            </div>
            <p className="text-lg font-semibold text-sumi-900">{monthStarMeta.element}</p>
            <p className="text-xs text-sumi-500">{monthStarMeta.polarity}</p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-subtle">
            <div className="mb-2 flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: energeticStarMeta.color }}
              />
              <span className="text-sm font-medium text-sumi-700">Energetic</span>
            </div>
            <p className="text-lg font-semibold text-sumi-900">{energeticStarMeta.element}</p>
            <p className="text-xs text-sumi-500">{energeticStarMeta.polarity}</p>
          </div>
        </div>
      </div>

      {/* Educational Content Sections */}
      <div className="card space-y-6">
        <h3 className="mb-4 font-serif text-lg font-medium text-sumi-900">
          Understanding Your Results
        </h3>

        {/* Why Time Matters Section */}
        <div className="border-l-4 border-ai-400 bg-ai-50 p-4">
          <button
            onClick={() => setExpandedSection(expandedSection === 'time-matters' ? null : 'time-matters')}
            className="flex w-full items-center justify-between text-left"
          >
            <h4 className="font-semibold text-ai-900">
              Why Does Birth Time Matter?
            </h4>
            <svg
              className={`h-5 w-5 text-ai-600 transition-transform ${expandedSection === 'time-matters' ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {expandedSection === 'time-matters' && (
            <div className="mt-4 animate-slide-up space-y-3 text-sm text-ai-800">
              <p>
                Nine Star Ki uses the <strong>solar calendar</strong>, where the year begins at Li Chun (around Feb 4), not January 1st.
                Solar terms mark precise astronomical moments based on Earth&apos;s position around the Sun.
              </p>
              <p>
                <strong>Example:</strong> Li Chun 1986 occurred at 2:50 AM UTC. Someone born at 1:50 AM (1 hour before) would have principal star 6,
                while someone born at 3:50 AM (1 hour after) would have principal star 5.
              </p>
              <button
                onClick={() => setShowHelp('why-time-matters')}
                className="font-medium text-ai-700 hover:text-ai-900 hover:underline"
              >
                Learn more →
              </button>
            </div>
          )}
        </div>

        {/* Time Sensitivity Section */}
        <div className="border-l-4 border-shu-400 bg-shu-50 p-4">
          <button
            onClick={() => setExpandedSection(expandedSection === 'time-sensitivity' ? null : 'time-sensitivity')}
            className="flex w-full items-center justify-between text-left"
          >
            <h4 className="font-semibold text-shu-900">
              When Is Time Most Critical?
            </h4>
            <svg
              className={`h-5 w-5 text-shu-600 transition-transform ${expandedSection === 'time-sensitivity' ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {expandedSection === 'time-sensitivity' && (
            <div className="mt-4 animate-slide-up space-y-3 text-sm text-shu-800">
              <div className="grid gap-2 md:grid-cols-3">
                <div className="rounded-lg border-2 border-shu-300 bg-white p-3">
                  <p className="mb-1 font-semibold text-shu-900">HIGH</p>
                  <p className="text-xs">Within 24 hours of solar term. Time precision critical.</p>
                </div>
                <div className="rounded-lg border-2 border-yellow-300 bg-white p-3">
                  <p className="mb-1 font-semibold text-yellow-900">MEDIUM</p>
                  <p className="text-xs">1-3 days from solar term. Time still matters.</p>
                </div>
                <div className="rounded-lg border-2 border-green-300 bg-white p-3">
                  <p className="mb-1 font-semibold text-green-900">LOW</p>
                  <p className="text-xs">7+ days away. Time not critical.</p>
                </div>
              </div>
              <p className="text-xs italic">
                Note: 80%+ of people are not near boundaries and don&apos;t need to worry about exact birth time.
              </p>
              <button
                onClick={() => setShowHelp('time-sensitivity')}
                className="font-medium text-shu-700 hover:text-shu-900 hover:underline"
              >
                Learn more →
              </button>
            </div>
          )}
        </div>

        {/* Hemisphere Section */}
        <div className="border-l-4 border-green-400 bg-green-50 p-4">
          <button
            onClick={() => setExpandedSection(expandedSection === 'hemisphere' ? null : 'hemisphere')}
            className="flex w-full items-center justify-between text-left"
          >
            <h4 className="font-semibold text-green-900">
              Does My Hemisphere Affect the Calculation?
            </h4>
            <svg
              className={`h-5 w-5 text-green-600 transition-transform ${expandedSection === 'hemisphere' ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {expandedSection === 'hemisphere' && (
            <div className="mt-4 animate-slide-up space-y-3 text-sm text-green-800">
              <p>
                <strong>Short answer: No.</strong> Nine Star Ki is based on Earth&apos;s orbital position around the Sun,
                not seasonal weather. The system applies equally to all hemispheres.
              </p>
              <p>
                While the calendar uses Northern Hemisphere seasonal names (like &quot;Start of Spring&quot;),
                the calculations are based on universal astronomical measurements (solar longitude, UTC)
                that apply everywhere on Earth.
              </p>
              <button
                onClick={() => setShowHelp('hemisphere')}
                className="font-medium text-green-700 hover:text-green-900 hover:underline"
              >
                Learn more →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Detailed calculation view (expandable) */}
      <div className="card">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex w-full items-center justify-between text-left"
        >
          <h3 className="font-serif text-lg font-medium text-sumi-900">
            How Your Profile Was Calculated
          </h3>
          <svg
            className={`h-5 w-5 text-sumi-500 transition-transform ${showDetails ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showDetails && (
          <div className="mt-6 animate-slide-up space-y-6 border-t border-sumi-100 pt-6">
            {/* Step 1: Solar Year */}
            <div className="flex gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-ai-100 font-semibold text-ai-700">
                1
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-sumi-800">Solar Year Determination</h4>
                <ul className="space-y-1 text-sm text-sumi-600">
                  <li>• Birth date: {formatDate(profile.birthDate, 'MMMM d, yyyy')}</li>
                  <li>• Li Chun (Start of Spring) {solarYear}: {formatDate(profile.solarYearStart, 'MMMM d, yyyy')}</li>
                  <li>
                    • {profile.birthDate >= profile.solarYearStart
                      ? `Born after Li Chun → Solar Year = ${solarYear}`
                      : `Born before Li Chun → Solar Year = ${solarYear}`}
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 2: Principal Star */}
            <div className="flex gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-ai-100 font-semibold text-ai-700">
                2
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-sumi-800">Principal Star Calculation</h4>
                <ul className="space-y-1 text-sm text-sumi-600">
                  <li>• Solar Year: {solarYear}</li>
                  <li>• Digit Sum: {solarYear.toString().split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0)}</li>
                  <li>• Formula: (11 - digit sum - 1) mod 9 + 1</li>
                  <li>• Principal Star: <span className="font-semibold text-sumi-900">{profile.yearStar}</span> ({yearStarMeta.element})</li>
                </ul>
              </div>
            </div>

            {/* Step 3: Month Star */}
            <div className="flex gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-ai-100 font-semibold text-ai-700">
                3
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-sumi-800">Month Star Calculation</h4>
                <ul className="space-y-1 text-sm text-sumi-600">
                  <li>• Birth falls in solar month {profile.birthDate.getMonth() + 1}</li>
                  <li>• Principal Star {profile.yearStar} belongs to group [{[1,4,7].includes(profile.yearStar) ? '1,4,7' : [2,5,8].includes(profile.yearStar) ? '2,5,8' : '3,6,9'}]</li>
                  <li>• Month Star: <span className="font-semibold text-sumi-900">{profile.monthStar}</span> ({monthStarMeta.element})</li>
                </ul>
              </div>
            </div>

            {/* Step 4: Energetic Star */}
            <div className="flex gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-ai-100 font-semibold text-ai-700">
                4
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-sumi-800">Energetic Star Calculation</h4>
                <ul className="space-y-1 text-sm text-sumi-600">
                  <li>• Principal Star: {profile.yearStar}, Month Star: {profile.monthStar}</li>
                  <li>• Using 81-combination table lookup</li>
                  <li>• Energetic Star: <span className="font-semibold text-sumi-900">{profile.energeticStar}</span> ({energeticStarMeta.element})</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Educational Modal */}
      {showHelp && (
        <EducationalModal
          isOpen={true}
          onClose={() => setShowHelp(null)}
          topic={showHelp}
        />
      )}

      {/* Calculation timestamp */}
      <div className="text-center text-xs text-sumi-400">
        Calculated on {formatDate(profile.calculatedAt, 'MMMM d, yyyy \'at\' h:mm a')}
      </div>
    </div>
  )
}
