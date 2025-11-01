/**
 * Test Helper Functions
 * Utilities for loading and parsing golden test cases
 */

import { readFileSync } from 'fs'
import { join } from 'path'

/**
 * Golden test case from CSV
 */
export interface GoldenTestCase {
  testId: number
  birthDate: string
  birthTime: string
  timezone: string
  expectedPrincipal: number
  expectedMonth: number
  expectedEnergetic: number
  method: string
  notes: string
  source: string
}

/**
 * Load golden test cases from CSV file
 */
export function loadGoldenTestCases(): GoldenTestCase[] {
  const csvPath = join(__dirname, '../../../../Research/golden-test-cases.csv')
  const csvContent = readFileSync(csvPath, 'utf-8')

  const lines = csvContent.split('\n')
  const testCases: GoldenTestCase[] = []

  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    const parts = line.split(',')
    if (parts.length < 10) continue

    testCases.push({
      testId: parseInt(parts[0]),
      birthDate: parts[1],
      birthTime: parts[2],
      timezone: parts[3],
      expectedPrincipal: parseInt(parts[4]),
      expectedMonth: parseInt(parts[5]),
      expectedEnergetic: parseInt(parts[6]),
      method: parts[7],
      notes: parts[8],
      source: parts[9],
    })
  }

  return testCases
}

/**
 * Parse date with timezone from test case
 */
export function parseDateWithTimezone(dateStr: string, timeStr: string, timezone: string): Date {
  // Combine date and time
  const dateTimeStr = `${dateStr} ${timeStr}`

  // For UTC timezone, parse directly
  if (timezone === 'UTC') {
    return new Date(`${dateTimeStr}:00Z`)
  }

  // For other timezones, we need to handle them properly
  // Note: This is a simplified version. In production, use a library like date-fns-tz
  const date = new Date(dateTimeStr)

  // Timezone offset adjustments (simplified for test cases)
  if (timezone === 'America/Los_Angeles') {
    // PST/PDT is UTC-8/-7
    // This is a simplification; proper timezone handling would be more complex
    return new Date(dateTimeStr + ' PST')
  } else if (timezone === 'Asia/Tokyo') {
    // JST is UTC+9
    return new Date(dateTimeStr + ' GMT+0900')
  }

  return date
}

/**
 * Group test cases by category
 */
export function groupTestCases(testCases: GoldenTestCase[]) {
  return {
    standard: testCases.filter(tc => tc.notes.includes('Standard') || tc.notes.includes('Mid-year')),
    liChunBoundary: testCases.filter(tc =>
      tc.notes.includes('Li Chun') ||
      tc.notes.includes('Before Feb') ||
      tc.notes.includes('After Feb')
    ),
    solarTermBoundary: testCases.filter(tc =>
      tc.notes.includes('boundary') &&
      !tc.notes.includes('Li Chun')
    ),
    timezone: testCases.filter(tc => tc.notes.includes('Timezone')),
    historical: testCases.filter(tc => tc.notes.includes('Historical')),
    endOfYear: testCases.filter(tc =>
      tc.notes.includes('End of year') ||
      tc.notes.includes('Millennium')
    ),
    methodComparison: testCases.filter(tc => tc.method === 'chinese_ascending'),
    allOther: testCases.filter(tc => {
      const n = tc.notes.toLowerCase()
      return !tc.notes.includes('Standard') &&
             !tc.notes.includes('Mid-year') &&
             !n.includes('li chun') &&
             !n.includes('before feb') &&
             !n.includes('boundary') &&
             !n.includes('timezone') &&
             !n.includes('historical') &&
             !n.includes('end of year') &&
             !n.includes('millennium') &&
             tc.method !== 'chinese_ascending'
    })
  }
}

/**
 * Format test name from test case
 */
export function formatTestName(testCase: GoldenTestCase): string {
  return `Test ${testCase.testId}: ${testCase.birthDate} - ${testCase.notes} (${testCase.source})`
}

/**
 * Create detailed error message for test failure
 */
export function createErrorMessage(
  testCase: GoldenTestCase,
  actual: { yearStar: number; monthStar: number; energeticStar: number },
  expected: { yearStar: number; monthStar: number; energeticStar: number }
): string {
  const errors: string[] = []

  if (actual.yearStar !== expected.yearStar) {
    errors.push(`Year Star: expected ${expected.yearStar}, got ${actual.yearStar}`)
  }

  if (actual.monthStar !== expected.monthStar) {
    errors.push(`Month Star: expected ${expected.monthStar}, got ${actual.monthStar}`)
  }

  if (actual.energeticStar !== expected.energeticStar) {
    errors.push(`Energetic Star: expected ${expected.energeticStar}, got ${actual.energeticStar}`)
  }

  return `
Test Case ${testCase.testId} Failed:
  Birth Date: ${testCase.birthDate} ${testCase.birthTime} ${testCase.timezone}
  Notes: ${testCase.notes}
  Source: ${testCase.source}

  Failures:
  ${errors.map(e => `  - ${e}`).join('\n')}

  Expected: Principal=${expected.yearStar}, Month=${expected.monthStar}, Energetic=${expected.energeticStar}
  Actual:   Principal=${actual.yearStar}, Month=${actual.monthStar}, Energetic=${actual.energeticStar}
  `
}

// Dummy test to satisfy Jest requirement
describe('Test Helpers', () => {
  it('should export helper functions', () => {
    expect(loadGoldenTestCases).toBeDefined()
    expect(parseDateWithTimezone).toBeDefined()
  })
})
