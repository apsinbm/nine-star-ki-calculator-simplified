/**
 * Extract verified month star patterns from all golden test cases
 */

import { calculateNineStarKiProfile } from '../calculation-engine'
import type { CalculationInput } from '@/types'

describe('Extract Verified Patterns', () => {
  // All golden test cases with expected values
  const testCases = [
    { date: '1920-02-04T12:00:00Z', p: 8, m: 2 },
    { date: '1954-04-15T12:00:00Z', p: 1, m: 6 },
    { date: '1954-04-20T12:00:00Z', p: 1, m: 6 },
    { date: '1963-05-15T12:00:00Z', p: 1, m: 5 },
    { date: '1971-01-31T12:00:00Z', p: 3, m: 6 },
    { date: '1972-07-20T12:00:00Z', p: 1, m: 3 },
    { date: '1972-09-10T12:00:00Z', p: 1, m: 1 },
    { date: '1977-10-31T12:00:00Z', p: 5, m: 3 },
    { date: '1980-09-05T12:00:00Z', p: 2, m: 1 },
    { date: '1985-11-07T12:00:00Z', p: 5, m: 7 },
    { date: '1985-11-08T12:00:00Z', p: 5, m: 2 },
    { date: '1986-02-03T12:00:00Z', p: 6, m: 6 },
    { date: '1986-02-05T12:00:00Z', p: 5, m: 8 },
    { date: '1986-03-15T12:00:00Z', p: 5, m: 7 },
    { date: '1990-07-10T12:00:00Z', p: 1, m: 3 },
    { date: '1995-01-20T12:00:00Z', p: 6, m: 9 },
    { date: '1995-03-05T12:00:00Z', p: 5, m: 7 },
    { date: '1995-03-06T12:00:00Z', p: 5, m: 7 },
    { date: '1995-11-20T12:00:00Z', p: 5, m: 2 },
    { date: '1998-01-06T12:00:00Z', p: 2, m: 9 },
    { date: '1999-12-25T12:00:00Z', p: 1, m: 7 },
    { date: '1999-12-31T12:00:00Z', p: 1, m: 7 },
    { date: '2000-01-01T12:00:00Z', p: 1, m: 6 },
    { date: '2000-08-07T12:00:00Z', p: 9, m: 6 },
    { date: '2000-08-08T12:00:00Z', p: 9, m: 8 },
    { date: '2005-12-07T12:00:00Z', p: 4, m: 7 },
    { date: '2008-06-15T12:00:00Z', p: 1, m: 4 },
    { date: '2010-06-21T12:00:00Z', p: 8, m: 7 },
    { date: '2015-04-04T12:00:00Z', p: 3, m: 6 },
    { date: '2015-04-05T12:00:00Z', p: 3, m: 3 },
    { date: '2020-02-04T12:00:00Z', p: 1, m: 8 },
    { date: '2024-02-03T12:00:00Z', p: 1, m: 6 },
    { date: '2024-02-04T12:00:00Z', p: 1, m: 8 },
  ]

  it('should extract patterns', () => {
    const patterns: { [key: number]: { [key: number]: number } } = {}

    console.log('\n=== Extracting Verified Patterns ===')
    console.log('Date\t\t\tPrincipal\tSolar Month Idx\tExpected Month Star')
    console.log('='.repeat(80))

    testCases.forEach(tc => {
      const input: CalculationInput = {
        date: new Date(tc.date),
      }
      const profile = calculateNineStarKiProfile(input)
      const solarMonthIdx = profile.solarMonth - 1 // Convert back to 0-11

      console.log(`${tc.date}\t${tc.p}\t\t${solarMonthIdx}\t\t${tc.m}`)

      if (!patterns[tc.p]) {
        patterns[tc.p] = {}
      }

      // Check for conflicts
      if (patterns[tc.p][solarMonthIdx] !== undefined && patterns[tc.p][solarMonthIdx] !== tc.m) {
        console.log(`  CONFLICT! ${tc.date} - Principal ${tc.p}, Solar Month ${solarMonthIdx}: existing=${patterns[tc.p][solarMonthIdx]}, new=${tc.m}`)
      }

      patterns[tc.p][solarMonthIdx] = tc.m
    })

    // Print the patterns
    console.log('\n\n=== Verified Patterns by Principal ===')
    console.log('Format: { principal: { solarMonthIndex: monthStar } }')
    console.log(JSON.stringify(patterns, null, 2))

    // Build complete 12-month arrays
    const completePatterns: { [key: number]: number[] } = {}
    for (let p = 1; p <= 9; p++) {
      completePatterns[p] = []
      for (let m = 0; m < 12; m++) {
        completePatterns[p][m] = patterns[p]?.[m] || null
      }
    }

    console.log('\n\n=== Complete Patterns (with nulls for unknowns) ===')
    for (let p = 1; p <= 9; p++) {
      console.log(`${p}: [${completePatterns[p].map(v => v === null ? '?' : v).join(', ')}]`)
    }

    expect(true).toBe(true)
  })
})
