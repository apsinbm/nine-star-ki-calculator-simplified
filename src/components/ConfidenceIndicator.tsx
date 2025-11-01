/**
 * Confidence Indicator Component
 *
 * Displays confidence levels for Nine Star Ki calculations
 * Shows overall confidence and per-star breakdown with visual indicators
 */

'use client'

import { useState } from 'react'
import type { ConfidenceBreakdown, ConfidenceScore } from '@/types'
import { formatDate } from '@/lib/utils/date-utils'

interface ConfidenceIndicatorProps {
  confidence: ConfidenceBreakdown
}

export default function ConfidenceIndicator({ confidence }: ConfidenceIndicatorProps) {
  const [showDetails, setShowDetails] = useState(false)

  const getColorClass = (level: string): string => {
    switch (level) {
      case 'very_high':
        return 'text-green-700 bg-green-50 border-green-200'
      case 'high':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'medium':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200'
      case 'low':
        return 'text-orange-700 bg-orange-50 border-orange-200'
      case 'very_low':
        return 'text-red-700 bg-red-50 border-red-200'
      default:
        return 'text-sumi-700 bg-sumi-50 border-sumi-200'
    }
  }

  const getProgressBarColor = (level: string): string => {
    switch (level) {
      case 'very_high':
      case 'high':
        return 'bg-green-500'
      case 'medium':
        return 'bg-yellow-500'
      case 'low':
        return 'bg-orange-500'
      case 'very_low':
        return 'bg-red-500'
      default:
        return 'bg-sumi-500'
    }
  }

  const getStatusIcon = (level: string): string => {
    switch (level) {
      case 'very_high':
      case 'high':
        return '✓'
      case 'medium':
        return '◐'
      case 'low':
      case 'very_low':
        return '⚠'
      default:
        return '○'
    }
  }

  const getLevelLabel = (level: string): string => {
    switch (level) {
      case 'very_high':
        return 'Very High'
      case 'high':
        return 'High'
      case 'medium':
        return 'Medium'
      case 'low':
        return 'Low'
      case 'very_low':
        return 'Very Low'
      default:
        return 'Unknown'
    }
  }

  const renderProgressBar = (score: ConfidenceScore) => {
    const percentage = score.percentage
    const filledBlocks = Math.round(percentage / 12.5) // 8 blocks total
    const emptyBlocks = 8 - filledBlocks
    const colorClass = getProgressBarColor(score.level)

    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: filledBlocks }, (_, i) => (
          <div key={`filled-${i}`} className={`h-2 w-4 rounded-sm ${colorClass}`} />
        ))}
        {Array.from({ length: emptyBlocks }, (_, i) => (
          <div key={`empty-${i}`} className="h-2 w-4 rounded-sm bg-sumi-100" />
        ))}
      </div>
    )
  }

  const renderConfidenceCard = (
    title: string,
    score: ConfidenceScore,
    showBoundary: boolean = true
  ) => {
    const colorClass = getColorClass(score.level)
    const icon = getStatusIcon(score.level)

    return (
      <div className={`rounded-lg border p-4 ${colorClass}`}>
        <div className="mb-2 flex items-center justify-between">
          <h4 className="font-semibold">{title}</h4>
          <span className="text-xl">{icon}</span>
        </div>
        <div className="mb-2 text-2xl font-bold">{score.percentage}%</div>
        <div className="mb-3">{renderProgressBar(score)}</div>
        <div className="text-sm">
          <p className="mb-1 font-medium">{getLevelLabel(score.level)} Confidence</p>
          {showBoundary && score.nearestBoundary && (
            <p className="text-xs opacity-80">
              {score.daysFromBoundary.toFixed(1)} days from {score.nearestBoundary.name}
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="card space-y-4">
      {/* Overall Confidence Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="mb-2 font-serif text-lg font-medium text-sumi-900">
            Calculation Confidence
          </h3>
          <div className="flex items-center gap-4">
            <div>
              <div className="text-3xl font-bold text-sumi-900">
                {confidence.overall.percentage}%
              </div>
              <div className={`text-sm font-medium ${getColorClass(confidence.overall.level).split(' ')[0]}`}>
                {getLevelLabel(confidence.overall.level)} Confidence
              </div>
            </div>
            <div className="flex-1">
              {renderProgressBar(confidence.overall)}
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="ml-4 text-sm font-medium text-ai-600 hover:text-ai-700 hover:underline"
          aria-label={showDetails ? 'Hide details' : 'Show details'}
        >
          {showDetails ? 'Hide details' : 'Show breakdown'}
        </button>
      </div>

      {/* Overall Recommendation */}
      <div className={`rounded-lg border p-3 ${getColorClass(confidence.overall.level)}`}>
        <div className="flex gap-2">
          <span className="text-lg">{getStatusIcon(confidence.overall.level)}</span>
          <div className="flex-1">
            <p className="font-medium">{confidence.overall.recommendation}</p>
            {confidence.overall.nearestBoundary && (
              <p className="mt-1 text-sm opacity-90">
                Your birth is {confidence.overall.daysFromBoundary.toFixed(1)} days from{' '}
                {confidence.overall.nearestBoundary.name} (
                {formatDate(confidence.overall.nearestBoundary.date, 'MMM d, yyyy')})
                {confidence.overall.nearestBoundary.affectedStar === 'principal'
                  ? ', which affects your principal star calculation'
                  : confidence.overall.nearestBoundary.affectedStar === 'month'
                  ? ', which affects your month star calculation'
                  : ', which affects both principal and month star calculations'
                }.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Detailed Breakdown */}
      {showDetails && (
        <div className="animate-slide-up space-y-4 border-t border-sumi-100 pt-4">
          <h4 className="font-semibold text-sumi-800">Confidence by Star</h4>

          <div className="grid gap-4 md:grid-cols-3">
            {renderConfidenceCard('Principal Star', confidence.principal)}
            {renderConfidenceCard('Month Star', confidence.month)}
            {renderConfidenceCard('Energetic Star', confidence.energetic, false)}
          </div>

          {/* Explanation */}
          <div className="rounded-lg bg-ai-50 p-4 text-sm text-sumi-700">
            <h5 className="mb-2 font-semibold text-sumi-900">How Confidence is Calculated</h5>
            <ul className="space-y-1">
              <li>
                <strong>Very High (95-100%):</strong> Birth is more than 7 days from any solar term boundary
              </li>
              <li>
                <strong>High (85-94%):</strong> Birth is 3-7 days from nearest boundary
              </li>
              <li>
                <strong>Medium (70-84%):</strong> Birth is 1-3 days from nearest boundary
              </li>
              <li>
                <strong>Low (50-69%):</strong> Birth is within 24 hours of a boundary
              </li>
              <li>
                <strong>Very Low (&lt;50%):</strong> Birth is within 6 hours of a boundary and birth time is unknown
              </li>
            </ul>
            <p className="mt-3 italic">
              Solar term boundaries are precise astronomical moments. If your birth is very close to a boundary,
              knowing your exact birth time is critical for accurate star calculation.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
