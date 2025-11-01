/**
 * Solar Term Timeline Component
 *
 * Interactive timeline visualization showing all 12 major solar terms for a birth year.
 * Helps users understand where their birth date falls relative to solar term boundaries.
 *
 * Features:
 * - Horizontal timeline (vertical on mobile)
 * - All 12 solar terms with dates
 * - User's birth date prominently highlighted
 * - Distance indicators (e.g., "11 days after Li Chun")
 * - Clickable terms with educational tooltips
 * - Responsive design
 */

'use client'

import { useState } from 'react'
import { getSolarTermsForYear, SOLAR_TERM_NAMES } from '@/lib/data/solar-terms-data'
import { formatDate } from '@/lib/utils/date-utils'
import { getStarMetadata } from '@/lib/data'
import type { StarNumber } from '@/types'

interface SolarTermTimelineProps {
  birthDate: Date
  solarYear: number
  principalStar: StarNumber
}

interface TermInfo {
  name: string
  chineseName: string
  date: Date
  isPast: boolean
  isNearest: boolean
  daysFromBirth: number
  color?: string
}

export default function SolarTermTimeline({ birthDate, solarYear, principalStar }: SolarTermTimelineProps) {
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null)
  const [showTooltip, setShowTooltip] = useState<string | null>(null)

  // Get solar terms for the year
  const terms = getSolarTermsForYear(solarYear)

  // Get star color for visual theming
  const starMeta = getStarMetadata(principalStar)

  // Build timeline data
  const timelineTerms: TermInfo[] = [
    { name: 'Li Chun', chineseName: SOLAR_TERM_NAMES.liChun.zh, date: terms.liChun, isPast: false, isNearest: false, daysFromBirth: 0 },
    { name: 'Jing Zhe', chineseName: SOLAR_TERM_NAMES.jingZhe.zh, date: terms.jingZhe, isPast: false, isNearest: false, daysFromBirth: 0 },
    { name: 'Qing Ming', chineseName: SOLAR_TERM_NAMES.qingMing.zh, date: terms.qingMing, isPast: false, isNearest: false, daysFromBirth: 0 },
    { name: 'Li Xia', chineseName: SOLAR_TERM_NAMES.liXia.zh, date: terms.liXia, isPast: false, isNearest: false, daysFromBirth: 0 },
    { name: 'Mang Zhong', chineseName: SOLAR_TERM_NAMES.mangZhong.zh, date: terms.mangZhong, isPast: false, isNearest: false, daysFromBirth: 0 },
    { name: 'Xiao Shu', chineseName: SOLAR_TERM_NAMES.xiaoShu.zh, date: terms.xiaoShu, isPast: false, isNearest: false, daysFromBirth: 0 },
    { name: 'Li Qiu', chineseName: SOLAR_TERM_NAMES.liQiu.zh, date: terms.liQiu, isPast: false, isNearest: false, daysFromBirth: 0 },
    { name: 'Bai Lu', chineseName: SOLAR_TERM_NAMES.baiLu.zh, date: terms.baiLu, isPast: false, isNearest: false, daysFromBirth: 0 },
    { name: 'Han Lu', chineseName: SOLAR_TERM_NAMES.hanLu.zh, date: terms.hanLu, isPast: false, isNearest: false, daysFromBirth: 0 },
    { name: 'Li Dong', chineseName: SOLAR_TERM_NAMES.liDong.zh, date: terms.liDong, isPast: false, isNearest: false, daysFromBirth: 0 },
    { name: 'Da Xue', chineseName: SOLAR_TERM_NAMES.daXue.zh, date: terms.daXue, isPast: false, isNearest: false, daysFromBirth: 0 },
    { name: 'Xiao Han', chineseName: SOLAR_TERM_NAMES.xiaoHan.zh, date: terms.xiaoHan, isPast: false, isNearest: false, daysFromBirth: 0 },
  ]

  // Calculate relative positions and find nearest terms
  let nearestPastIndex = -1
  let nearestFutureIndex = -1
  let minPastDiff = Infinity
  let minFutureDiff = Infinity

  timelineTerms.forEach((term, index) => {
    const diffMs = birthDate.getTime() - term.date.getTime()
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))
    term.daysFromBirth = diffDays

    if (diffMs >= 0) {
      // Birth is after this term
      term.isPast = true
      if (diffMs < minPastDiff) {
        minPastDiff = diffMs
        nearestPastIndex = index
      }
    } else {
      // Birth is before this term
      term.isPast = false
      if (-diffMs < minFutureDiff) {
        minFutureDiff = -diffMs
        nearestFutureIndex = index
      }
    }
  })

  // Mark nearest terms
  if (nearestPastIndex >= 0) {
    timelineTerms[nearestPastIndex].isNearest = true
  }
  if (nearestFutureIndex >= 0) {
    timelineTerms[nearestFutureIndex].isNearest = true
  }

  // Calculate position percentage for birth marker
  const getBirthPositionPercent = (): number => {
    if (nearestPastIndex < 0 || nearestFutureIndex < 0) return 0

    const pastTerm = timelineTerms[nearestPastIndex]
    const futureTerm = timelineTerms[nearestFutureIndex]

    const totalRange = futureTerm.date.getTime() - pastTerm.date.getTime()
    const birthOffset = birthDate.getTime() - pastTerm.date.getTime()
    const percentInSegment = (birthOffset / totalRange) * 100

    // Map to position in the 12-segment timeline
    const segmentWidth = 100 / 12
    const basePosition = nearestPastIndex * segmentWidth
    const finalPosition = basePosition + (percentInSegment * segmentWidth / 100)

    return Math.max(0, Math.min(100, finalPosition))
  }

  const birthPosition = getBirthPositionPercent()

  // Get term descriptions
  const getTermDescription = (name: string): string => {
    const descriptions: Record<string, string> = {
      'Li Chun': 'Start of Spring - The beginning of the solar year. This marks the first solar term and the start of the spring season.',
      'Jing Zhe': 'Awakening of Insects - Spring thunder awakens hibernating insects. Nature begins to stir with new life.',
      'Qing Ming': 'Clear and Bright - A time of clarity and brightness, when the weather becomes clear and warm.',
      'Li Xia': 'Start of Summer - The beginning of summer. Plants grow vigorously and temperatures rise.',
      'Mang Zhong': 'Grain in Ear - Time to plant grain seeds. The wheat harvest begins in this period.',
      'Xiao Shu': 'Lesser Heat - Minor heat arrives. Temperatures rise but the hottest days are still ahead.',
      'Li Qiu': 'Start of Autumn - The beginning of autumn. Crops begin to mature and temperatures start to cool.',
      'Bai Lu': 'White Dew - Morning dew becomes more visible as temperatures drop, signaling cooler autumn weather.',
      'Han Lu': 'Cold Dew - Dew turns cold. This marks the transition from cool to cold weather.',
      'Li Dong': 'Start of Winter - The beginning of winter. Crops are harvested and stored for the cold months ahead.',
      'Da Xue': 'Greater Snow - Heavy snow begins to fall. This is the coldest period of the year.',
      'Xiao Han': 'Lesser Cold - Minor cold arrives, though the coldest days of winter are still coming.',
    }
    return descriptions[name] || ''
  }

  // Format distance text for display
  const formatDistance = (days: number): string => {
    if (days === 0) return 'Today'
    if (days === 1) return '1 day'
    if (days < 7) return `${days} days`
    const weeks = Math.floor(days / 7)
    const remainingDays = days % 7
    if (remainingDays === 0) return `${weeks} week${weeks > 1 ? 's' : ''}`
    return `${weeks} week${weeks > 1 ? 's' : ''} ${remainingDays} day${remainingDays > 1 ? 's' : ''}`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="mb-2 font-serif text-xl font-medium text-sumi-900">
          Solar Year {solarYear} Timeline
        </h3>
        <p className="text-sm text-sumi-600">
          {formatDate(terms.liChun, 'MMM d, yyyy')} - {formatDate(terms.xiaoHan, 'MMM d, yyyy')}
        </p>
      </div>

      {/* Summary cards - show nearest boundaries */}
      <div className="grid gap-4 sm:grid-cols-2">
        {nearestPastIndex >= 0 && (
          <div className="rounded-lg border-2 border-ai-200 bg-ai-50 p-4">
            <div className="mb-1 flex items-center gap-2">
              <svg className="h-5 w-5 text-ai-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-xs font-medium text-ai-700">Previous Boundary</span>
            </div>
            <p className="mb-1 font-serif text-lg font-semibold text-sumi-900">
              {timelineTerms[nearestPastIndex].name}
            </p>
            <div className="space-y-1">
              <p className="text-sm text-sumi-600">
                {formatDistance(Math.abs(timelineTerms[nearestPastIndex].daysFromBirth))} before birth
              </p>
              <p className="text-xs text-sumi-500">
                {formatDate(timelineTerms[nearestPastIndex].date, 'MMMM d, yyyy')}
              </p>
            </div>
          </div>
        )}

        {nearestFutureIndex >= 0 && (
          <div className="rounded-lg border-2 border-shu-200 bg-shu-50 p-4">
            <div className="mb-1 flex items-center gap-2">
              <svg className="h-5 w-5 text-shu-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-xs font-medium text-shu-700">Next Boundary</span>
            </div>
            <p className="mb-1 font-serif text-lg font-semibold text-sumi-900">
              {timelineTerms[nearestFutureIndex].name}
            </p>
            <div className="space-y-1">
              <p className="text-sm text-sumi-600">
                {formatDistance(Math.abs(timelineTerms[nearestFutureIndex].daysFromBirth))} after birth
              </p>
              <p className="text-xs text-sumi-500">
                {formatDate(timelineTerms[nearestFutureIndex].date, 'MMMM d, yyyy')}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Desktop: Horizontal Timeline */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Timeline bar */}
          <div className="relative h-2 rounded-full bg-gradient-to-r from-ai-100 via-sumi-100 to-ai-100">
            {/* Birth marker */}
            <div
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
              style={{ left: `${birthPosition}%` }}
            >
              <div className="timeline-birth-marker" style={{ backgroundColor: starMeta.color }}>
                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="mt-2 text-center">
                <p className="whitespace-nowrap text-xs font-semibold text-sumi-900">
                  Your Birth
                </p>
                <p className="whitespace-nowrap text-xs text-sumi-600">
                  {formatDate(birthDate, 'MMM d')}
                </p>
              </div>
            </div>
          </div>

          {/* Solar term markers */}
          <div className="mt-16 flex justify-between">
            {timelineTerms.map((term) => (
              <button
                key={term.name}
                onClick={() => setSelectedTerm(selectedTerm === term.name ? null : term.name)}
                onMouseEnter={() => setShowTooltip(term.name)}
                onMouseLeave={() => setShowTooltip(null)}
                className={`timeline-term-marker group relative ${term.isNearest ? 'timeline-term-nearest' : ''}`}
              >
                {/* Marker dot */}
                <div
                  className={`mx-auto mb-2 h-3 w-3 rounded-full transition-all duration-200 ${
                    term.isPast
                      ? 'bg-ai-500 group-hover:scale-125'
                      : 'bg-sumi-300 group-hover:scale-125'
                  } ${term.isNearest ? 'h-4 w-4 ring-2 ring-offset-2' : ''}`}
                  style={term.isNearest ? { backgroundColor: starMeta.color } : {}}
                />

                {/* Term info */}
                <div className="text-center">
                  <p className="text-xs font-medium text-sumi-700 group-hover:text-sumi-900">
                    {term.name}
                  </p>
                  <p className="mt-0.5 text-xs text-sumi-500">{term.chineseName}</p>
                  <p className="mt-0.5 text-xs text-sumi-400">
                    {formatDate(term.date, 'MMM d')}
                  </p>
                </div>

                {/* Hover tooltip */}
                {showTooltip === term.name && (
                  <div className="timeline-tooltip">
                    <p className="mb-2 font-semibold">{term.name} ({term.chineseName})</p>
                    <p className="text-xs">{getTermDescription(term.name)}</p>
                    <p className="mt-2 text-xs font-medium text-ai-700">
                      {term.isPast
                        ? `${formatDistance(Math.abs(term.daysFromBirth))} before your birth`
                        : `${formatDistance(Math.abs(term.daysFromBirth))} after your birth`}
                    </p>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: Vertical Timeline */}
      <div className="md:hidden">
        <div className="space-y-4">
          {timelineTerms.map((term, index) => {

            return (
              <div key={term.name}>
                {/* Show birth marker between appropriate terms */}
                {index === nearestPastIndex && nearestFutureIndex >= 0 && (
                  <div className="my-4 flex items-center gap-4 rounded-lg border-2 p-4" style={{ borderColor: starMeta.color, backgroundColor: `${starMeta.color}15` }}>
                    <div
                      className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: starMeta.color }}
                    >
                      <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-sumi-900">Your Birth Date</p>
                      <p className="text-sm text-sumi-600">{formatDate(birthDate, 'MMMM d, yyyy')}</p>
                    </div>
                  </div>
                )}

                {/* Solar term card */}
                <button
                  onClick={() => setSelectedTerm(selectedTerm === term.name ? null : term.name)}
                  className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                    term.isNearest
                      ? 'border-ai-300 bg-ai-50'
                      : term.isPast
                      ? 'border-ai-200 bg-white hover:border-ai-300'
                      : 'border-sumi-200 bg-white hover:border-sumi-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            term.isPast ? 'bg-ai-500' : 'bg-sumi-300'
                          }`}
                        />
                        <p className="font-serif font-semibold text-sumi-900">{term.name}</p>
                      </div>
                      <p className="mb-1 text-sm text-sumi-600">{term.chineseName}</p>
                      <p className="text-sm text-sumi-500">
                        {formatDate(term.date, 'MMMM d, yyyy')}
                      </p>
                      <p className="mt-2 text-xs text-sumi-600">
                        {term.isPast
                          ? `${formatDistance(Math.abs(term.daysFromBirth))} before birth`
                          : `${formatDistance(Math.abs(term.daysFromBirth))} after birth`}
                      </p>
                    </div>
                    <svg
                      className={`h-5 w-5 flex-shrink-0 text-sumi-400 transition-transform ${
                        selectedTerm === term.name ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {/* Expanded description */}
                  {selectedTerm === term.name && (
                    <div className="mt-4 animate-slide-up border-t border-sumi-200 pt-4">
                      <p className="text-sm text-sumi-700">{getTermDescription(term.name)}</p>
                    </div>
                  )}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Educational note */}
      <div className="rounded-lg bg-sumi-50 p-4 text-center">
        <p className="text-sm text-sumi-600">
          The 24 Solar Terms (二十四节气) divide the solar year into 24 periods based on the sun&apos;s position.
          The 12 major terms shown here mark the beginning of each solar month.
        </p>
      </div>
    </div>
  )
}
