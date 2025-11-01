/**
 * Nine Star Ki Calculator - Usage Examples
 *
 * This file demonstrates various ways to use the calculation engine.
 * These examples are based on test cases from RESEARCH_SYNTHESIS.md Appendix D.
 */

import { calculateProfile, formatProfile } from './nine-star-calculator'

/**
 * Example 1: Basic Calculation
 *
 * Calculate profile for a standard mid-year birth
 */
export function example1_BasicCalculation() {
  console.log('\n=== Example 1: Basic Calculation ===')

  const profile = calculateProfile({
    date: new Date('1986-03-15'),
  })

  console.log('Birth Date:', profile.birthDate.toISOString().split('T')[0])
  console.log('Solar Year:', profile.solarYear)
  console.log('Solar Month:', profile.solarMonth)
  console.log('\nNine Star Ki Profile:')
  console.log('  Principal Star:', profile.principalStar)
  console.log('  Month Star:', profile.monthStar)
  console.log('  Energetic Star:', profile.energeticStar)
  console.log('  Shorthand:', formatProfile(profile))
  console.log('\nMetadata:')
  console.log('  Principal:', profile.metadata.principal.element, '-', profile.metadata.principal.description)
  console.log('  Month:', profile.metadata.month.element, '-', profile.metadata.month.description)
  console.log('  Energetic:', profile.metadata.energetic.element, '-', profile.metadata.energetic.description)

  return profile
}

/**
 * Example 2: Birth Before Li Chun
 *
 * For births in January or early February, the solar year is the previous Gregorian year
 */
export function example2_BeforeLiChun() {
  console.log('\n=== Example 2: Birth Before Li Chun ===')

  const profile = calculateProfile({
    date: '1990-01-15',
  })

  console.log('Birth Date:', '1990-01-15')
  console.log('Li Chun 1990:', profile.solarYearStart.toISOString())
  console.log('Birth is BEFORE Li Chun')
  console.log('Solar Year Used:', profile.solarYear, '(previous year)')
  console.log('Profile:', formatProfile(profile))

  return profile
}

/**
 * Example 3: Birth Right After Li Chun
 *
 * Births on or after Li Chun belong to the current solar year
 */
export function example3_AfterLiChun() {
  console.log('\n=== Example 3: Birth After Li Chun ===')

  const profile = calculateProfile({
    date: '1986-02-05',
  })

  console.log('Birth Date:', '1986-02-05')
  console.log('Li Chun 1986:', profile.solarYearStart.toISOString())
  console.log('Birth is AFTER Li Chun')
  console.log('Solar Year Used:', profile.solarYear, '(current year)')
  console.log('Profile:', formatProfile(profile))

  return profile
}

/**
 * Example 4: Boundary Warning
 *
 * When birth is near a solar term boundary, warnings are generated
 */
export function example4_BoundaryWarning() {
  console.log('\n=== Example 4: Boundary Warning ===')

  const profile = calculateProfile({
    date: '2024-02-04',
  })

  console.log('Birth Date:', '2024-02-04')
  console.log('Profile:', formatProfile(profile))

  if (profile.warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:')
    profile.warnings.forEach((warning, index) => {
      console.log(`\n${index + 1}. ${warning.type}`)
      console.log(`   Term: ${warning.term}`)
      console.log(`   Days Difference: ${warning.daysDifference}`)
      console.log(`   Message: ${warning.message}`)
    })
  } else {
    console.log('\nNo boundary warnings')
  }

  return profile
}

/**
 * Example 5: With Time and Timezone
 *
 * For maximum accuracy near boundaries, provide time and timezone
 */
export function example5_WithTimeAndTimezone() {
  console.log('\n=== Example 5: With Time and Timezone ===')

  const profile = calculateProfile({
    date: '2024-02-04',
    time: '18:00',
    timezone: 'America/Los_Angeles',
  })

  console.log('Birth Date:', '2024-02-04')
  console.log('Birth Time:', profile.birthTime)
  console.log('Timezone:', profile.timezone)
  console.log('Profile:', formatProfile(profile))
  console.log('Solar Year:', profile.solarYear)

  return profile
}

/**
 * Example 6: All Nine Principal Stars
 *
 * Demonstrate calculation for each of the 9 principal stars
 */
export function example6_AllPrincipalStars() {
  console.log('\n=== Example 6: All Nine Principal Stars ===\n')

  // These years produce principal stars 1-9
  const testYears = [
    { year: 1990, expectedPrincipal: 1 },
    { year: 1989, expectedPrincipal: 2 },
    { year: 1988, expectedPrincipal: 3 },
    { year: 1987, expectedPrincipal: 4 },
    { year: 1986, expectedPrincipal: 5 },
    { year: 1985, expectedPrincipal: 6 },
    { year: 1984, expectedPrincipal: 7 },
    { year: 1983, expectedPrincipal: 8 },
    { year: 1982, expectedPrincipal: 9 },
  ]

  testYears.forEach(({ year, expectedPrincipal }) => {
    const profile = calculateProfile({
      date: `${year}-03-15`, // Mid-March, safely after Li Chun
    })

    console.log(`Year ${year}: Principal Star ${profile.principalStar} (${profile.metadata.principal.element})`)

    if (profile.principalStar !== expectedPrincipal) {
      console.log(`  ⚠️  Expected ${expectedPrincipal}, got ${profile.principalStar}`)
    }
  })
}

/**
 * Example 7: Different Solar Months
 *
 * Show how month star changes throughout the year for the same principal star
 */
export function example7_DifferentSolarMonths() {
  console.log('\n=== Example 7: Different Solar Months ===')
  console.log('Principal Star 5 across different solar months:\n')

  const testDates = [
    '1986-02-15', // Solar month 1 (Feb)
    '1986-03-15', // Solar month 2 (Mar)
    '1986-04-15', // Solar month 3 (Apr)
    '1986-05-15', // Solar month 4 (May)
    '1986-06-15', // Solar month 5 (Jun)
    '1986-07-15', // Solar month 6 (Jul)
    '1986-08-15', // Solar month 7 (Aug)
    '1986-09-15', // Solar month 8 (Sep)
    '1986-10-15', // Solar month 9 (Oct)
    '1986-11-15', // Solar month 10 (Nov)
    '1986-12-15', // Solar month 11 (Dec)
    '1987-01-15', // Solar month 12 (Jan of next year, but solar year 1986)
  ]

  testDates.forEach(date => {
    const profile = calculateProfile({ date })
    const monthName = new Date(date).toLocaleDateString('en-US', { month: 'short' })

    console.log(`${date} (${monthName}): Principal ${profile.principalStar}, Month ${profile.monthStar}, Energetic ${profile.energeticStar}`)
  })
}

/**
 * Example 8: Validation
 *
 * Demonstrate input validation
 */
export function example8_Validation() {
  console.log('\n=== Example 8: Input Validation ===\n')

  const testCases = [
    { date: '2024-02-04', description: 'Valid date' },
    { date: 'invalid', description: 'Invalid date string' },
    { date: '1850-01-01', description: 'Year too early (< 1900)' },
    { date: '2150-01-01', description: 'Year too late (> 2100)' },
  ]

  testCases.forEach(({ date, description }) => {
    try {
      const profile = calculateProfile({ date })
      console.log(`✓ ${description}: ${formatProfile(profile)}`)
    } catch (error) {
      console.log(`✗ ${description}: ${(error as Error).message}`)
    }
  })
}

/**
 * Run all examples
 */
export function runAllExamples() {
  console.log('\n╔════════════════════════════════════════════════════════╗')
  console.log('║   Nine Star Ki Calculator - Usage Examples            ║')
  console.log('╚════════════════════════════════════════════════════════╝')

  example1_BasicCalculation()
  example2_BeforeLiChun()
  example3_AfterLiChun()
  example4_BoundaryWarning()
  example5_WithTimeAndTimezone()
  example6_AllPrincipalStars()
  example7_DifferentSolarMonths()
  example8_Validation()

  console.log('\n╔════════════════════════════════════════════════════════╗')
  console.log('║   All examples completed successfully!                 ║')
  console.log('╚════════════════════════════════════════════════════════╝\n')
}

// Uncomment to run when file is executed directly
// runAllExamples()
