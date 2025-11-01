/**
 * Nine Star Ki Calculator - Core Calculation Engine
 *
 * This module provides the primary calculation logic for determining
 * a person's complete Nine Star Ki profile based on their birth date.
 *
 * Implementation based on RESEARCH_SYNTHESIS.md Appendix B.
 *
 * The calculation process:
 * 1. Parse and validate input (date, time, timezone)
 * 2. Adjust birth date to solar year (using Li Chun boundary)
 * 3. Calculate principal star from solar year using digit sum formula
 * 4. Determine solar month using 24 solar terms
 * 5. Calculate month star from principal star and solar month
 * 6. Derive energetic star from 81-combination table
 * 7. Generate boundary warnings and assemble complete profile
 */

import type {
  NineStarKiProfile,
  CalculationInput,
} from '@/types'
import {
  calculateNineStarKiProfile,
  validateCalculationInput,
  formatProfileShorthand,
} from './calculation-engine'

/**
 * Calculate complete Nine Star Ki profile for a given birth date
 *
 * This is the main entry point for profile calculation.
 *
 * @param input - Calculation input with date, optional time and timezone
 * @returns Complete Nine Star Ki profile with all three stars and metadata
 * @throws Error if input is invalid or calculation fails
 *
 * @example
 * ```typescript
 * // Simple calculation with just a date
 * const profile = calculateProfile({
 *   date: new Date('1986-03-15'),
 * })
 * console.log(profile.principalStar) // 5
 * console.log(profile.monthStar) // 7
 * console.log(profile.energeticStar) // 3
 *
 * // Calculation with time and timezone
 * const profile2 = calculateProfile({
 *   date: '2024-02-04',
 *   time: '18:00',
 *   timezone: 'America/Los_Angeles',
 *   method: 'traditional',
 * })
 * ```
 */
export function calculateProfile(input: CalculationInput): NineStarKiProfile {
  // Validate input
  const validation = validateCalculationInput(input)
  if (!validation.isValid) {
    throw new Error(validation.error)
  }

  // Calculate profile using the complete engine
  return calculateNineStarKiProfile(input)
}

/**
 * Format a profile as shorthand notation (e.g., "5.7.3")
 *
 * @param profile - The Nine Star Ki profile
 * @returns Shorthand string notation
 *
 * @example
 * ```typescript
 * const profile = calculateProfile({ date: new Date('1986-03-15') })
 * const shorthand = formatProfile(profile)
 * console.log(shorthand) // "5.7.3"
 * ```
 */
export function formatProfile(profile: NineStarKiProfile): string {
  return formatProfileShorthand(profile)
}

/**
 * Validate calculation input
 *
 * @param input - Calculation input to validate
 * @returns Validation result with error message if invalid
 *
 * @example
 * ```typescript
 * const validation = validateInput({ date: '2024-02-04' })
 * if (!validation.isValid) {
 *   console.error(validation.error)
 * }
 * ```
 */
export function validateInput(input: CalculationInput): {
  isValid: boolean
  error?: string
} {
  return validateCalculationInput(input)
}
