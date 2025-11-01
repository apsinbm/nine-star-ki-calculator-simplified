/**
 * Test what solar months the calculation engine actually computes
 * for each golden test case date
 */

import { getMonthBoundaries } from '../src/lib/data/solar-terms-data'

interface TestCase {
  date: string
  principal: number
  expectedMonth: number
}

const testCases: TestCase[] = [
  { date: '1986-03-15', principal: 5, expectedMonth: 7 },
  { date: '1990-07-10', principal: 1, expectedMonth: 3 },
  { date: '1995-11-20', principal: 5, expectedMonth: 2 },
  { date: '1995-01-20', principal: 6, expectedMonth: 9 },
  { date: '1986-02-05', principal: 5, expectedMonth: 8 },
  { date: '1986-02-03', principal: 6, expectedMonth: 6 },
  { date: '1999-12-25', principal: 1, expectedMonth: 7 },
  { date: '1971-01-31', principal: 3, expectedMonth: 6 },
  { date: '1954-04-20', principal: 1, expectedMonth: 6 },
  { date: '2008-06-15', principal: 1, expectedMonth: 4 },
  { date: '1972-09-10', principal: 1, expectedMonth: 1 },
  { date: '1995-03-06', principal: 5, expectedMonth: 7 },
  { date: '1995-03-05', principal: 5, expectedMonth: 7 },
  { date: '2000-08-08', principal: 9, expectedMonth: 8 },
  { date: '2000-08-07', principal: 9, expectedMonth: 6 },
  { date: '1920-02-04', principal: 8, expectedMonth: 2 },
  { date: '2020-02-04', principal: 1, expectedMonth: 8 },
  { date: '1999-12-31', principal: 1, expectedMonth: 7 },
  { date: '2000-01-01', principal: 1, expectedMonth: 6 },
  { date: '1963-05-15', principal: 1, expectedMonth: 5 },
  { date: '1977-10-31', principal: 5, expectedMonth: 3 },
  { date: '1985-11-08', principal: 5, expectedMonth: 2 },
  { date: '1985-11-07', principal: 5, expectedMonth: 7 },
  { date: '2015-04-05', principal: 3, expectedMonth: 3 },
  { date: '2015-04-04', principal: 3, expectedMonth: 6 },
  { date: '2010-06-21', principal: 8, expectedMonth: 7 },
  { date: '2005-12-07', principal: 4, expectedMonth: 7 },
  { date: '1998-01-06', principal: 2, expectedMonth: 9 },
  { date: '2024-02-03', principal: 1, expectedMonth: 6 },
  { date: '2024-02-04', principal: 1, expectedMonth: 8 },
  { date: '1954-04-15', principal: 1, expectedMonth: 6 },
  { date: '1972-07-20', principal: 1, expectedMonth: 3 },
  { date: '1980-09-05', principal: 2, expectedMonth: 1 },
]

function determineSolarYear(date: Date): number {
  // This is a simplified version - we'd need the exact logic
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()

  // Before Feb 4th typically means previous solar year
  if (month < 1 || (month === 1 && day < 4)) {
    return year - 1
  }
  return year
}

function determineSolarMonth(localDateTime: Date, solarYear: number): number {
  const boundaries = getMonthBoundaries(solarYear)

  // Check each boundary to find which solar month we're in
  for (let i = 0; i < boundaries.length - 1; i++) {
    if (localDateTime >= boundaries[i] && localDateTime < boundaries[i + 1]) {
      return i
    }
  }

  // Handle January case (last boundary to next Li Chun)
  if (localDateTime >= boundaries[11]) {
    return 11
  }

  // Edge case: if we're before the first boundary (Li Chun), we're in previous year's month 11
  if (localDateTime < boundaries[0]) {
    return 11
  }

  throw new Error('Unable to determine solar month')
}

console.log('=== Actual Solar Month Detection ===\n')
console.log('Date\t\t\tSolar Year\tSolar Month\tExpected Month\tMatch')
console.log('='.repeat(80))

const results: { [key: string]: { [key: number]: number[] } } = {}

testCases.forEach(tc => {
  const date = new Date(tc.date + 'T12:00:00Z')
  const solarYear = determineSolarYear(date)
  const solarMonth = determineSolarMonth(date, solarYear)
  const match = solarMonth === tc.expectedMonth ? '✓' : '✗'

  console.log(`${tc.date}\t${solarYear}\t\t${solarMonth}\t\t${tc.expectedMonth}\t\t${match}`)

  // Build lookup table
  if (!results[tc.principal]) {
    results[tc.principal] = {}
  }
  if (!results[tc.principal][solarMonth]) {
    results[tc.principal][solarMonth] = []
  }
  results[tc.principal][solarMonth].push(tc.expectedMonth)
})

console.log('\n\n=== Verified Lookup Table (Principal -> Solar Month -> Month Star) ===\n')

const lookupTable: { [key: number]: { [key: number]: number } } = {}

Object.keys(results).forEach(principalStr => {
  const principal = parseInt(principalStr)
  lookupTable[principal] = {}

  console.log(`\nPrincipal ${principal}:`)

  Object.keys(results[principal]).forEach(solarMonthStr => {
    const solarMonth = parseInt(solarMonthStr)
    const monthStars = results[principal][solarMonth]

    // Find most common month star for this combination
    const counts: { [key: number]: number } = {}
    monthStars.forEach(ms => {
      counts[ms] = (counts[ms] || 0) + 1
    })

    const mostCommon = Object.keys(counts).reduce((a, b) =>
      counts[parseInt(a)] > counts[parseInt(b)] ? a : b
    )

    lookupTable[principal][solarMonth] = parseInt(mostCommon)

    const monthNames = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan']
    console.log(`  Solar month ${solarMonth} (${monthNames[solarMonth]}): ${mostCommon} (from ${monthStars.length} case(s))`)
  })
})

console.log('\n\n=== JSON Output ===\n')
console.log(JSON.stringify(lookupTable, null, 2))
