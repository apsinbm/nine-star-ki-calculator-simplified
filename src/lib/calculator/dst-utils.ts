/**
 * DST (Daylight Saving Time) Utilities
 *
 * Handles detection and warnings for DST transitions that may affect
 * Nine Star Ki calculations.
 *
 * Features:
 * - Detect if a timezone observes DST
 * - Find DST transition dates (spring forward, fall back)
 * - Warn about non-existent times (spring forward 2:00-3:00 AM)
 * - Warn about ambiguous times (fall back 1:00-2:00 AM occurs twice)
 * - Provide alternative time interpretations
 */

import { getTimezoneOffset } from 'date-fns-tz'
import type { CalculationInput } from '@/types'

/**
 * DST Transition Information
 */
export interface DSTTransition {
  type: 'spring_forward' | 'fall_back'
  transitionDate: Date
  message: string
  suggestion: string
  affectedHours: { start: number; end: number }
  alternatives?: Array<{
    description: string
    time: string
    solarYear: number
  }>
}

/**
 * DST Warning
 */
export interface DSTWarning {
  hasDST: boolean
  isTransitionDate: boolean
  transition?: DSTTransition
}

/**
 * Check if a timezone observes DST
 *
 * This is a simplified check - it compares offset in January vs July
 * to detect DST. More sophisticated detection would use timezone databases.
 */
export function timeZoneObservesDST(timezone: string, year: number): boolean {
  try {
    // Check offset in winter (January) vs summer (July)
    const winterDate = new Date(year, 0, 15) // Jan 15
    const summerDate = new Date(year, 6, 15) // Jul 15

    const winterOffset = getTimezoneOffset(timezone, winterDate)
    const summerOffset = getTimezoneOffset(timezone, summerDate)

    return winterOffset !== summerOffset
  } catch {
    // If timezone is invalid or not supported, assume no DST
    return false
  }
}

/**
 * Detect DST transition dates for a given year and timezone
 *
 * This function finds the spring forward and fall back dates by checking
 * when the UTC offset changes throughout the year.
 */
export function getDSTTransitions(timezone: string, year: number): {
  springForward?: Date
  fallBack?: Date
} {
  const transitions: { springForward?: Date; fallBack?: Date } = {}

  try {
    // Check each day of the year for offset changes
    let previousOffset = getTimezoneOffset(timezone, new Date(year, 0, 1))

    for (let month = 0; month < 12; month++) {
      const daysInMonth = new Date(year, month + 1, 0).getDate()

      for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(year, month, day)
        const currentOffset = getTimezoneOffset(timezone, currentDate)

        if (currentOffset !== previousOffset) {
          // Offset changed - DST transition detected
          if (currentOffset < previousOffset) {
            // Spring forward (offset becomes smaller/more positive)
            transitions.springForward = new Date(year, month, day)
          } else {
            // Fall back (offset becomes larger/more negative)
            transitions.fallBack = new Date(year, month, day)
          }

          previousOffset = currentOffset
        }
      }
    }
  } catch {
    // If timezone is invalid, return empty transitions
  }

  return transitions
}

/**
 * Calculate solar year for a given input (helper for DST checking)
 * This is a simplified version that doesn't perform full profile calculation
 */
function calculateSolarYearSimple(date: Date): number {
  const gregorianYear = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()

  // Simple Li Chun approximation (Feb 4)
  // If before Feb 4, use previous year
  if (month < 1 || (month === 1 && day < 4)) {
    return gregorianYear - 1
  }

  return gregorianYear
}

/**
 * Check if a specific date/time falls within a DST transition
 * and generate appropriate warnings and alternatives
 */
export function checkDSTTransition(
  input: CalculationInput
): DSTWarning {
  // Default: no DST warning
  const noWarning: DSTWarning = {
    hasDST: false,
    isTransitionDate: false,
  }

  // Only check if timezone and time are provided
  if (!input.timezone || !input.time) {
    return noWarning
  }

  try {
    const birthDate = typeof input.date === 'string' ? new Date(input.date) : input.date
    const year = birthDate.getFullYear()
    const month = birthDate.getMonth()
    const day = birthDate.getDate()

    // Parse time
    const [hours, minutes] = input.time.split(':').map(Number)
    if (isNaN(hours) || isNaN(minutes)) {
      return noWarning
    }

    // Check if timezone observes DST
    const observesDST = timeZoneObservesDST(input.timezone, year)

    if (!observesDST) {
      return { hasDST: false, isTransitionDate: false }
    }

    // Get DST transitions for the year
    const transitions = getDSTTransitions(input.timezone, year)

    // Check if birth date matches a transition date
    let transitionType: 'spring_forward' | 'fall_back' | null = null
    let transitionDate: Date | null = null

    if (transitions.springForward) {
      const sfDate = transitions.springForward
      if (sfDate.getMonth() === month && sfDate.getDate() === day) {
        transitionType = 'spring_forward'
        transitionDate = sfDate
      }
    }

    if (transitions.fallBack) {
      const fbDate = transitions.fallBack
      if (fbDate.getMonth() === month && fbDate.getDate() === day) {
        transitionType = 'fall_back'
        transitionDate = fbDate
      }
    }

    if (!transitionType || !transitionDate) {
      return { hasDST: true, isTransitionDate: false }
    }

    // We have a DST transition on this date
    // Check if the specific time is affected

    if (transitionType === 'spring_forward') {
      // Spring forward: typically 2:00 AM -> 3:00 AM
      // The hour from 2:00-2:59 doesn't exist
      if (hours >= 2 && hours < 3) {
        // Generate alternatives
        const beforeTime = `${String(hours - 1).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
        const afterTime = `${String(hours + 1).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`

        // Calculate what solar year each alternative would give
        let beforeYear = year
        let afterYear = year

        try {
          // Create dates for before and after the transition
          const beforeDate = new Date(year, month, day, hours - 1, minutes)
          beforeYear = calculateSolarYearSimple(beforeDate)

          const afterDate = new Date(year, month, day, hours + 1, minutes)
          afterYear = calculateSolarYearSimple(afterDate)
        } catch {
          // If calculation fails, use the birth year
        }

        return {
          hasDST: true,
          isTransitionDate: true,
          transition: {
            type: 'spring_forward',
            transitionDate,
            message: `Your birth time (${input.time}) falls during the "spring forward" hour that doesn't exist in ${input.timezone}.`,
            suggestion: 'This time never occurred on this date due to DST. Please verify which time you meant.',
            affectedHours: { start: 2, end: 3 },
            alternatives: [
              {
                description: `${beforeTime} Standard Time (before DST transition)`,
                time: beforeTime,
                solarYear: beforeYear,
              },
              {
                description: `${afterTime} Daylight Time (after DST transition)`,
                time: afterTime,
                solarYear: afterYear,
              },
            ],
          },
        }
      }
    } else if (transitionType === 'fall_back') {
      // Fall back: typically 2:00 AM -> 1:00 AM
      // The hour from 1:00-1:59 occurs twice
      if (hours >= 1 && hours < 2) {
        // Generate alternatives for first and second occurrence
        const timeStr = input.time

        // Calculate solar years for both occurrences
        const occurrenceDate = new Date(year, month, day, hours, minutes)
        const solarYear = calculateSolarYearSimple(occurrenceDate)

        return {
          hasDST: true,
          isTransitionDate: true,
          transition: {
            type: 'fall_back',
            transitionDate,
            message: `Your birth time (${input.time}) occurred twice on this date due to DST "fall back".`,
            suggestion: 'This time happened twice. Please verify if you were born during the first or second occurrence.',
            affectedHours: { start: 1, end: 2 },
            alternatives: [
              {
                description: `First ${timeStr} (Daylight Time, before fall back)`,
                time: timeStr,
                solarYear,
              },
              {
                description: `Second ${timeStr} (Standard Time, after fall back)`,
                time: timeStr,
                solarYear,
              },
            ],
          },
        }
      }
    }

    // On a transition date but not during the affected hours
    return { hasDST: true, isTransitionDate: false }

  } catch (error) {
    // If any error occurs, return no warning
    console.error('Error checking DST transition:', error)
    return noWarning
  }
}
