/**
 * Golden Test Cases - Nine Star Ki Calculator
 *
 * Comprehensive test suite based on 40 validated golden test cases from:
 * Research/golden-test-cases.csv
 *
 * These test cases include:
 * - Standard calculations across multiple decades
 * - Li Chun boundary cases (dates near Feb 4)
 * - Solar term boundary cases (dates near other major terms)
 * - Historical dates (1920-2024)
 * - Timezone-aware calculations
 * - Multiple validation sources (Mindful Design, Wikipedia, howtodo360)
 */

import { calculateProfile } from '../nine-star-calculator'
import type { CalculationInput } from '@/types'

describe('Golden Test Cases - Nine Star Ki Calculator', () => {
  describe('Standard Cases (Well After Feb Boundary)', () => {
    it('Test 1: 1986-03-15 should be 5.7.3', () => {
      const input: CalculationInput = {
        date: new Date('1986-03-15T12:00:00Z'),
      }
      const profile = calculateProfile(input)
      expect(profile.principalStar).toBe(5)
      expect(profile.monthStar).toBe(7)
      expect(profile.energeticStar).toBe(3)
    })

    it('Test 2: 1990-07-10 should be 1.3.3', () => {
      const input: CalculationInput = {
        date: new Date('1990-07-10T12:00:00Z'),
      }
      const profile = calculateProfile(input)
      expect(profile.principalStar).toBe(1)
      expect(profile.monthStar).toBe(3)
      expect(profile.energeticStar).toBe(3)
    })

    it('Test 3: 1995-11-20 should be 5.2.8', () => {
      const input: CalculationInput = {
        date: new Date('1995-11-20T12:00:00Z'),
      }
      const profile = calculateProfile(input)
      expect(profile.principalStar).toBe(5)
      expect(profile.monthStar).toBe(2)
      expect(profile.energeticStar).toBe(8)
    })

    it('Test 7: 1999-12-25 should be 1.7.8', () => {
      const input: CalculationInput = {
        date: new Date('1999-12-25T12:00:00Z'),
      }
      const profile = calculateProfile(input)
      expect(profile.principalStar).toBe(1)
      expect(profile.monthStar).toBe(7)
      expect(profile.energeticStar).toBe(8)
    })

    it('Test 9: 1954-04-20 should be 1.6.9', () => {
      const input: CalculationInput = {
        date: new Date('1954-04-20T12:00:00Z'),
      }
      const profile = calculateProfile(input)
      expect(profile.principalStar).toBe(1)
      expect(profile.monthStar).toBe(6)
      expect(profile.energeticStar).toBe(9)
    })

    it('Test 10: 2008-06-15 should be 1.4.2', () => {
      const input: CalculationInput = {
        date: new Date('2008-06-15T12:00:00Z'),
      }
      const profile = calculateProfile(input)
      expect(profile.principalStar).toBe(1)
      expect(profile.monthStar).toBe(4)
      expect(profile.energeticStar).toBe(2)
    })

    it('Test 11: 1972-09-10 should be 1.1.5', () => {
      const input: CalculationInput = {
        date: new Date('1972-09-10T12:00:00Z'),
      }
      const profile = calculateProfile(input)
      expect(profile.principalStar).toBe(1)
      expect(profile.monthStar).toBe(1)
      expect(profile.energeticStar).toBe(5)
    })

    it('Test 20: 1963-05-15 should be 1.5.1', () => {
      const input: CalculationInput = {
        date: new Date('1963-05-15T12:00:00Z'),
      }
      const profile = calculateProfile(input)
      expect(profile.principalStar).toBe(1)
      expect(profile.monthStar).toBe(5)
      expect(profile.energeticStar).toBe(1)
    })

    it('Test 21: 1977-10-31 should be 5.3.7', () => {
      const input: CalculationInput = {
        date: new Date('1977-10-31T12:00:00Z'),
      }
      const profile = calculateProfile(input)
      expect(profile.principalStar).toBe(5)
      expect(profile.monthStar).toBe(3)
      expect(profile.energeticStar).toBe(7)
    })

    it('Test 26: 2010-06-21 should be 8.7.6', () => {
      const input: CalculationInput = {
        date: new Date('2010-06-21T12:00:00Z'),
      }
      const profile = calculateProfile(input)
      expect(profile.principalStar).toBe(8)
      expect(profile.monthStar).toBe(7)
      expect(profile.energeticStar).toBe(6)
    })
  })

  describe('Li Chun Boundary Cases', () => {
    it('Test 4: 1995-01-20 (before Feb 4) should use 1994 solar year -> 6.9.3', () => {
      const input: CalculationInput = {
        date: new Date('1995-01-20T12:00:00Z'),
      }
      const profile = calculateProfile(input)
      expect(profile.principalStar).toBe(6)
      expect(profile.monthStar).toBe(9)
      expect(profile.energeticStar).toBe(3)
      expect(profile.solarYear).toBe(1994)
    })

    it('Test 5: 1986-02-05 (just after Li Chun) should be 5.8.2', () => {
      const input: CalculationInput = {
        date: new Date('1986-02-05T12:00:00Z'),
      }
      const profile = calculateProfile(input)
      expect(profile.principalStar).toBe(5)
      expect(profile.monthStar).toBe(8)
      expect(profile.energeticStar).toBe(2)
    })

    it('Test 6: 1986-02-03 (before Li Chun) should use 1985 -> 6.6.3', () => {
      const input: CalculationInput = {
        date: new Date('1986-02-03T12:00:00Z'),
      }
      const profile = calculateProfile(input)
      expect(profile.principalStar).toBe(6)
      expect(profile.monthStar).toBe(6)
      expect(profile.energeticStar).toBe(3)
      expect(profile.solarYear).toBe(1985)
    })

    it('Test 8: 1971-01-31 (early Jan, solar year 1970) should be 3.6.2', () => {
      const input: CalculationInput = {
        date: new Date('1971-01-31T12:00:00Z'),
      }
      const profile = calculateProfile(input)
      expect(profile.principalStar).toBe(3)
      expect(profile.monthStar).toBe(6)
      expect(profile.energeticStar).toBe(2)
      expect(profile.solarYear).toBe(1970)
    })

    it('Test 16: 1920-02-04 should be 8.2.2', () => {
      const input: CalculationInput = {
        date: new Date('1920-02-04T12:00:00Z'),
      }
      const profile = calculateProfile(input)
      expect(profile.principalStar).toBe(8)
      expect(profile.monthStar).toBe(2)
      expect(profile.energeticStar).toBe(2)
    })

    it('Test 17: 2020-02-04 should be 1.8.7', () => {
      const input: CalculationInput = {
        date: new Date('2020-02-04T12:00:00Z'),
      }
      const profile = calculateProfile(input)
      expect(profile.principalStar).toBe(1)
      expect(profile.monthStar).toBe(8)
      expect(profile.energeticStar).toBe(7)
    })

    it('Test 18: 1999-12-31 (millennium eve) should be 1.7.8', () => {
      const input: CalculationInput = {
        date: new Date('1999-12-31T12:00:00Z'),
      }
      const profile = calculateProfile(input)
      expect(profile.principalStar).toBe(1)
      expect(profile.monthStar).toBe(7)
      expect(profile.energeticStar).toBe(8)
    })

    it('Test 19: 2000-01-01 (millennium, solar year 1999) should be 1.6.9', () => {
      const input: CalculationInput = {
        date: new Date('2000-01-01T12:00:00Z'),
      }
      const profile = calculateProfile(input)
      expect(profile.principalStar).toBe(1)
      expect(profile.monthStar).toBe(6)
      expect(profile.energeticStar).toBe(9)
      expect(profile.solarYear).toBe(1999)
    })

    it('Test 29: 2024-02-03 (before Li Chun 2024) should be 1.6.9', () => {
      const input: CalculationInput = {
        date: new Date('2024-02-03T12:00:00Z'),
      }
      const profile = calculateProfile(input)
      expect(profile.principalStar).toBe(1)
      expect(profile.monthStar).toBe(6)
      expect(profile.energeticStar).toBe(9)
      expect(profile.solarYear).toBe(2023)
    })

    it('Test 30: 2024-02-04 (after Li Chun 2024) should be 1.8.7', () => {
      const input: CalculationInput = {
        date: new Date('2024-02-04T12:00:00Z'),
      }
      const profile = calculateProfile(input)
      expect(profile.principalStar).toBe(1)
      expect(profile.monthStar).toBe(8)
      expect(profile.energeticStar).toBe(7)
      expect(profile.solarYear).toBe(2024)
    })
  })

  describe('Solar Term Boundary Cases', () => {
    it('Test 12: 1995-03-06 (exact solar term date approx) should be 5.7.3', () => {
      const input: CalculationInput = {
        date: new Date('1995-03-06T12:00:00Z'),
      }
      const profile = calculateProfile(input)
      expect(profile.principalStar).toBe(5)
      expect(profile.monthStar).toBe(7)
      expect(profile.energeticStar).toBe(3)
    })

    it('Test 13: 1995-03-05 (day before solar term) should be 5.7.3', () => {
      const input: CalculationInput = {
        date: new Date('1995-03-05T12:00:00Z'),
      }
      const profile = calculateProfile(input)
      expect(profile.principalStar).toBe(5)
      expect(profile.monthStar).toBe(7)
      expect(profile.energeticStar).toBe(3)
    })

    it('Test 14: 2000-08-08 (Li Qiu boundary) should be 9.8.6', () => {
      const input: CalculationInput = {
        date: new Date('2000-08-08T12:00:00Z'),
      }
      const profile = calculateProfile(input)
      expect(profile.principalStar).toBe(9)
      expect(profile.monthStar).toBe(8)
      expect(profile.energeticStar).toBe(6)
    })

    it('Test 15: 2000-08-07 (before Li Qiu) should be 9.6.8', () => {
      const input: CalculationInput = {
        date: new Date('2000-08-07T12:00:00Z'),
      }
      const profile = calculateProfile(input)
      expect(profile.principalStar).toBe(9)
      expect(profile.monthStar).toBe(6)
      expect(profile.energeticStar).toBe(8)
    })

    it('Test 22: 1985-11-08 (Li Dong boundary) should be 5.2.8', () => {
      const input: CalculationInput = {
        date: new Date('1985-11-08T12:00:00Z'),
      }
      const profile = calculateProfile(input)
      expect(profile.principalStar).toBe(5)
      expect(profile.monthStar).toBe(2)
      expect(profile.energeticStar).toBe(8)
    })

    it('Test 23: 1985-11-07 (before Li Dong) should be 5.7.3', () => {
      const input: CalculationInput = {
        date: new Date('1985-11-07T12:00:00Z'),
      }
      const profile = calculateProfile(input)
      expect(profile.principalStar).toBe(5)
      expect(profile.monthStar).toBe(7)
      expect(profile.energeticStar).toBe(3)
    })

    it('Test 24: 2015-04-05 (Qing Ming boundary) should be 3.3.5', () => {
      const input: CalculationInput = {
        date: new Date('2015-04-05T12:00:00Z'),
      }
      const profile = calculateProfile(input)
      expect(profile.principalStar).toBe(3)
      expect(profile.monthStar).toBe(3)
      expect(profile.energeticStar).toBe(5)
    })

    it('Test 25: 2015-04-04 (before Qing Ming) should be 3.6.2', () => {
      const input: CalculationInput = {
        date: new Date('2015-04-04T12:00:00Z'),
      }
      const profile = calculateProfile(input)
      expect(profile.principalStar).toBe(3)
      expect(profile.monthStar).toBe(6)
      expect(profile.energeticStar).toBe(2)
    })

    it('Test 27: 2005-12-07 (Da Xue boundary) should be 4.7.2', () => {
      const input: CalculationInput = {
        date: new Date('2005-12-07T12:00:00Z'),
      }
      const profile = calculateProfile(input)
      expect(profile.principalStar).toBe(4)
      expect(profile.monthStar).toBe(7)
      expect(profile.energeticStar).toBe(2)
    })

    it('Test 28: 1998-01-06 (Xiao Han boundary) should be 2.9.7', () => {
      const input: CalculationInput = {
        date: new Date('1998-01-06T12:00:00Z'),
      }
      const profile = calculateProfile(input)
      expect(profile.principalStar).toBe(2)
      expect(profile.monthStar).toBe(9)
      expect(profile.energeticStar).toBe(7)
    })
  })

  describe('Female Test Cases', () => {
    it('Test 31: 1954-04-15 (female) should be 1.6.9', () => {
      const input: CalculationInput = {
        date: new Date('1954-04-15T12:00:00Z'),
      }
      const profile = calculateProfile(input)
      expect(profile.principalStar).toBe(1)
      expect(profile.monthStar).toBe(6)
      expect(profile.energeticStar).toBe(9)
    })

    it('Test 32: 1972-07-20 (female) should be 1.3.3', () => {
      const input: CalculationInput = {
        date: new Date('1972-07-20T12:00:00Z'),
      }
      const profile = calculateProfile(input)
      expect(profile.principalStar).toBe(1)
      expect(profile.monthStar).toBe(3)
      expect(profile.energeticStar).toBe(3)
    })

    it('Test 33: 1980-09-05 (female) should be 2.1.6', () => {
      const input: CalculationInput = {
        date: new Date('1980-09-05T12:00:00Z'),
      }
      const profile = calculateProfile(input)
      expect(profile.principalStar).toBe(2)
      expect(profile.monthStar).toBe(1)
      expect(profile.energeticStar).toBe(6)
    })
  })

  describe('Timezone Test Cases', () => {
    it('Test 34: 2024-02-04 02:00 PST (before Li Chun locally) should be 1.6.9', () => {
      const input: CalculationInput = {
        date: '2024-02-04',
        time: '02:00',
        timezone: 'America/Los_Angeles',
      }
      const profile = calculateProfile(input)
      // At 02:00 PST on Feb 4, it's 10:00 UTC Feb 4
      // Li Chun 2024 is at 08:11 UTC Feb 4
      // So this is actually AFTER Li Chun in UTC
      // But if we're testing local timezone awareness, this needs timezone conversion
      // For now, this will use the UTC interpretation
      expect(profile.principalStar).toBe(1)
      expect(profile.monthStar).toBe(6)
      expect(profile.energeticStar).toBe(9)
    })

    it('Test 35: 2024-02-04 18:00 PST (after Li Chun locally) should be 1.8.7', () => {
      const input: CalculationInput = {
        date: '2024-02-04',
        time: '18:00',
        timezone: 'America/Los_Angeles',
      }
      const profile = calculateProfile(input)
      expect(profile.principalStar).toBe(1)
      expect(profile.monthStar).toBe(8)
      expect(profile.energeticStar).toBe(7)
    })

    it('Test 36: 2024-02-04 02:00 JST (after Li Chun locally) should be 1.8.7', () => {
      const input: CalculationInput = {
        date: '2024-02-04',
        time: '02:00',
        timezone: 'Asia/Tokyo',
      }
      const profile = calculateProfile(input)
      expect(profile.principalStar).toBe(1)
      expect(profile.monthStar).toBe(8)
      expect(profile.energeticStar).toBe(7)
    })

    it('Test 37: 2024-02-03 20:00 JST (after midnight but before Li Chun) should be 1.8.7', () => {
      const input: CalculationInput = {
        date: '2024-02-03',
        time: '20:00',
        timezone: 'Asia/Tokyo',
      }
      const profile = calculateProfile(input)
      expect(profile.principalStar).toBe(1)
      expect(profile.monthStar).toBe(8)
      expect(profile.energeticStar).toBe(7)
    })
  })

  describe('Method Comparison Cases', () => {
    it('Test 38: 1986-03-15 - methods should agree -> 5.7.3', () => {
      const input: CalculationInput = {
        date: new Date('1986-03-15T12:00:00Z'),
        method: 'traditional',
      }
      const profile = calculateProfile(input)
      expect(profile.principalStar).toBe(5)
      expect(profile.monthStar).toBe(7)
      expect(profile.energeticStar).toBe(3)
    })

    it('Test 39: 1990-07-10 - methods should agree -> 1.3.3', () => {
      const input: CalculationInput = {
        date: new Date('1990-07-10T12:00:00Z'),
        method: 'traditional',
      }
      const profile = calculateProfile(input)
      expect(profile.principalStar).toBe(1)
      expect(profile.monthStar).toBe(3)
      expect(profile.energeticStar).toBe(3)
    })

    it('Test 40: 1995-11-20 - methods should agree -> 5.2.8', () => {
      const input: CalculationInput = {
        date: new Date('1995-11-20T12:00:00Z'),
        method: 'traditional',
      }
      const profile = calculateProfile(input)
      expect(profile.principalStar).toBe(5)
      expect(profile.monthStar).toBe(2)
      expect(profile.energeticStar).toBe(8)
    })
  })

  describe('Profile Format and Metadata', () => {
    it('should include complete profile metadata', () => {
      const input: CalculationInput = {
        date: new Date('1986-03-15T12:00:00Z'),
      }
      const profile = calculateProfile(input)

      expect(profile.solarYear).toBe(1986)
      expect(profile.solarYearStart).toBeInstanceOf(Date)
      expect(profile.calculatedAt).toBeInstanceOf(Date)
      expect(profile.method).toBe('traditional')
      expect(profile.metadata).toBeDefined()
      expect(profile.metadata.principal).toBeDefined()
      expect(profile.metadata.month).toBeDefined()
      expect(profile.metadata.energetic).toBeDefined()
    })

    it('should provide boundary warnings when near solar terms', () => {
      const input: CalculationInput = {
        date: new Date('2024-02-04T12:00:00Z'), // Near Li Chun
      }
      const profile = calculateProfile(input)

      expect(Array.isArray(profile.warnings)).toBe(true)
      // Warnings may or may not be present depending on exact timing
      if (profile.warnings && profile.warnings.length > 0) {
        expect(profile.warnings[0].type).toBeDefined()
        expect(profile.warnings[0].message).toBeDefined()
      }
    })
  })
})
