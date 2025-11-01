/**
 * Date Utilities
 *
 * Helper functions for date formatting, parsing, and manipulation
 * specific to Nine Star Ki calculations.
 */

import { format, parseISO, isValid } from 'date-fns'

/**
 * Format a date for display in the UI
 *
 * @param date - Date to format
 * @param formatStr - Format string (date-fns format)
 * @returns Formatted date string
 */
export function formatDate(date: Date, formatStr: string = 'MMMM d, yyyy'): string {
  if (!isValid(date)) return 'Invalid date'
  return format(date, formatStr)
}

/**
 * Parse a date string into a Date object
 *
 * @param dateStr - Date string (ISO 8601 format recommended)
 * @returns Parsed Date object or null if invalid
 */
export function parseDate(dateStr: string): Date | null {
  try {
    const date = parseISO(dateStr)
    return isValid(date) ? date : null
  } catch {
    return null
  }
}

/**
 * Format Li Chun date for display
 *
 * Shows both the date and time in a readable format.
 *
 * @param date - Li Chun date
 * @returns Formatted string
 */
export function formatLiChunDate(date: Date): string {
  if (!isValid(date)) return 'Unknown'
  return format(date, 'MMMM d, yyyy \'at\' h:mm a')
}

/**
 * Get the current date without time component
 *
 * @returns Date at midnight (00:00:00)
 */
export function getTodayAtMidnight(): Date {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}

/**
 * Check if a date is in the future
 *
 * @param date - Date to check
 * @returns True if date is in the future
 */
export function isFutureDate(date: Date): boolean {
  return date > new Date()
}

/**
 * Check if a date is before Li Chun for its Gregorian year
 *
 * @param date - Date to check
 * @param liChunDate - Li Chun date for that year
 * @returns True if date is before Li Chun
 */
export function isBeforeLiChun(date: Date, liChunDate: Date): boolean {
  return date < liChunDate
}

/**
 * Get age from birth date
 *
 * @param birthDate - Birth date
 * @returns Age in years
 */
export function getAge(birthDate: Date): number {
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  return age
}

/**
 * Create a date from year, month, and day
 *
 * @param year - Year
 * @param month - Month (1-12)
 * @param day - Day of month
 * @returns Date object
 */
export function createDate(year: number, month: number, day: number): Date {
  // Month is 0-indexed in JavaScript Date
  return new Date(year, month - 1, day)
}

/**
 * Validate a date string and return helpful error message
 *
 * @param dateStr - Date string to validate
 * @returns Validation result with error message if invalid
 */
export function validateDateString(dateStr: string): {
  isValid: boolean
  error?: string
  date?: Date
} {
  if (!dateStr || dateStr.trim() === '') {
    return {
      isValid: false,
      error: 'Date is required',
    }
  }

  const date = parseDate(dateStr)
  if (!date) {
    return {
      isValid: false,
      error: 'Invalid date format. Please use YYYY-MM-DD',
    }
  }

  const year = date.getFullYear()
  if (year < 1900) {
    return {
      isValid: false,
      error: 'Year must be 1900 or later',
    }
  }

  if (year > 2100) {
    return {
      isValid: false,
      error: 'Year must be 2100 or earlier',
    }
  }

  if (isFutureDate(date)) {
    return {
      isValid: false,
      error: 'Birth date cannot be in the future',
    }
  }

  return {
    isValid: true,
    date,
  }
}
