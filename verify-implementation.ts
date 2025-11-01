#!/usr/bin/env tsx
/**
 * Implementation Verification Script
 *
 * This script verifies that the Nine Star Ki calculation engine is working correctly
 * by running test cases from RESEARCH_SYNTHESIS.md Appendix D
 */

import { calculateProfile, formatProfile } from './src/lib/calculator'

console.log('╔════════════════════════════════════════════════════════╗')
console.log('║   Nine Star Ki Calculation Engine - Verification      ║')
console.log('╚════════════════════════════════════════════════════════╝\n')

// Test cases from RESEARCH_SYNTHESIS.md Appendix D
const testCases = [
  {
    id: 1,
    description: 'Standard mid-year birth',
    input: { date: '1986-03-15' },
    expected: { principal: 5, month: 7, energetic: 3, solarYear: 1986 },
  },
  {
    id: 4,
    description: 'Birth before Li Chun (January)',
    input: { date: '1995-01-20' },
    expected: { principal: 6, month: 9, energetic: 3, solarYear: 1994 },
  },
  {
    id: 6,
    description: 'Just before Li Chun',
    input: { date: '1986-02-03' },
    expected: { principal: 6, month: 6, energetic: 3, solarYear: 1985 },
  },
  {
    id: 7,
    description: 'Just after Li Chun',
    input: { date: '1986-02-05' },
    expected: { principal: 5, month: 8, energetic: 2, solarYear: 1986 },
  },
  {
    id: 29,
    description: 'Li Chun 2024 (before)',
    input: { date: '2024-02-03' },
    expected: { principal: 1, month: 6, energetic: 9, solarYear: 2023 },
  },
  {
    id: 30,
    description: 'Li Chun 2024 (after)',
    input: { date: '2024-02-04' },
    expected: { principal: 1, month: 8, energetic: 7, solarYear: 2024 },
  },
]

let passed = 0
let failed = 0

console.log('Running test cases...\n')

testCases.forEach((testCase) => {
  try {
    const profile = calculateProfile(testCase.input)
    const shorthand = formatProfile(profile)

    const matches = {
      principal: profile.principalStar === testCase.expected.principal,
      month: profile.monthStar === testCase.expected.month,
      energetic: profile.energeticStar === testCase.expected.energetic,
      solarYear: profile.solarYear === testCase.expected.solarYear,
    }

    const allMatch = Object.values(matches).every((m) => m)

    if (allMatch) {
      console.log(`✅ Test ${testCase.id}: ${testCase.description}`)
      console.log(`   Profile: ${shorthand} (Solar Year: ${profile.solarYear})`)
      passed++
    } else {
      console.log(`❌ Test ${testCase.id}: ${testCase.description}`)
      console.log(`   Expected: ${testCase.expected.principal}.${testCase.expected.month}.${testCase.expected.energetic} (Solar Year: ${testCase.expected.solarYear})`)
      console.log(`   Got:      ${shorthand} (Solar Year: ${profile.solarYear})`)

      if (!matches.principal) console.log(`   ⚠️  Principal star mismatch`)
      if (!matches.month) console.log(`   ⚠️  Month star mismatch`)
      if (!matches.energetic) console.log(`   ⚠️  Energetic star mismatch`)
      if (!matches.solarYear) console.log(`   ⚠️  Solar year mismatch`)

      failed++
    }

    // Show warnings if present
    if (profile.warnings.length > 0) {
      console.log(`   ⚠️  ${profile.warnings.length} boundary warning(s)`)
    }

    console.log('')
  } catch (error) {
    console.log(`❌ Test ${testCase.id}: ${testCase.description}`)
    console.log(`   Error: ${(error as Error).message}\n`)
    failed++
  }
})

// Summary
console.log('─────────────────────────────────────────────────────────')
console.log(`Total: ${testCases.length} tests`)
console.log(`Passed: ${passed} ✅`)
console.log(`Failed: ${failed} ❌`)
console.log('─────────────────────────────────────────────────────────\n')

if (failed === 0) {
  console.log('✨ All tests passed! Implementation is working correctly.\n')
  process.exit(0)
} else {
  console.log('⚠️  Some tests failed. Please review the implementation.\n')
  process.exit(1)
}
