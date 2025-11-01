/**
 * Debug test to understand what solar months are being calculated
 */

import { calculateNineStarKiProfile } from '../calculation-engine'
import type { CalculationInput } from '@/types'

describe('Debug Solar Months', () => {
  const testCases = [
    { date: '1977-10-31T12:00:00Z', expectedPrincipal: 5, expectedMonth: 3 },
    { date: '1995-01-20T12:00:00Z', expectedPrincipal: 6, expectedMonth: 9 },
    { date: '1986-02-03T12:00:00Z', expectedPrincipal: 6, expectedMonth: 6 },
    { date: '1971-01-31T12:00:00Z', expectedPrincipal: 3, expectedMonth: 6 },
    { date: '2015-04-04T12:00:00Z', expectedPrincipal: 3, expectedMonth: 6 },
    { date: '1998-01-06T12:00:00Z', expectedPrincipal: 2, expectedMonth: 9 },
    { date: '1980-09-05T12:00:00Z', expectedPrincipal: 2, expectedMonth: 1 },
    { date: '1985-11-07T12:00:00Z', expectedPrincipal: 5, expectedMonth: 7 },
    { date: '1995-03-05T12:00:00Z', expectedPrincipal: 5, expectedMonth: 7 },
    { date: '2000-08-07T12:00:00Z', expectedPrincipal: 9, expectedMonth: 6 },
  ]

  it('should debug solar month calculations', () => {
    console.log('\n=== Solar Month Debug ===')
    console.log('Date\t\t\tPrincipal\tSolar Month\tMonth Star\tExpected Month')
    console.log('='.repeat(85))

    testCases.forEach(tc => {
      const input: CalculationInput = {
        date: new Date(tc.date),
      }
      const profile = calculateNineStarKiProfile(input)

      console.log(
        `${tc.date}\t${profile.principalStar}\t\t${profile.solarMonth}\t\t${profile.monthStar}\t\t${tc.expectedMonth}`
      )
    })
    // This test is just for debugging, always pass
    expect(true).toBe(true)
  })
})
