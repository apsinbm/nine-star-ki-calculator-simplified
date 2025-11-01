/**
 * Debug script to analyze golden test failures
 */

const fs = require('fs');
const path = require('path');

// Read the CSV
const csvPath = path.join(__dirname, 'Research', 'golden-test-cases.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

const lines = csvContent.trim().split('\n');
const headers = lines[0].split(',');

console.log('=== GOLDEN TEST CASES ANALYSIS ===\n');

// Parse all test cases
const testCases = [];
for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  if (!line.trim()) continue;

  const parts = line.split(',');
  if (parts.length < 7) continue;

  testCases.push({
    id: parts[0],
    birthDate: parts[1],
    birthTime: parts[2],
    timezone: parts[3],
    expectedPrincipal: parseInt(parts[4]),
    expectedMonth: parseInt(parts[5]),
    expectedEnergetic: parseInt(parts[6]),
    method: parts[7],
    notes: parts[8],
  });
}

console.log(`Total test cases: ${testCases.length}\n`);

// Group by year to analyze principal star patterns
const byYear = {};
testCases.forEach(tc => {
  const year = tc.birthDate.split('-')[0];
  if (!byYear[year]) byYear[year] = [];
  byYear[year].push(tc);
});

console.log('=== PRINCIPAL STAR BY YEAR ===');
Object.keys(byYear).sort().forEach(year => {
  const cases = byYear[year];
  const principals = [...new Set(cases.map(c => c.expectedPrincipal))];
  console.log(`${year}: Principal Star ${principals.join(', ')}`);
});

console.log('\n=== MONTH STAR PATTERNS ===');
// Group by principal star to see month patterns
const byPrincipal = {};
testCases.forEach(tc => {
  const p = tc.expectedPrincipal;
  if (!byPrincipal[p]) byPrincipal[p] = [];
  byPrincipal[p].push(tc);
});

for (let p = 1; p <= 9; p++) {
  if (!byPrincipal[p]) continue;
  console.log(`\nPrincipal ${p}:`);
  byPrincipal[p].forEach(tc => {
    const date = new Date(tc.birthDate);
    const month = date.toLocaleString('en', { month: 'short' });
    console.log(`  ${tc.birthDate} (${month}) -> Month Star: ${tc.expectedMonth}`);
  });
}

console.log('\n=== FAILING TEST PATTERNS ===');
// List specific cases that are likely failing
const likelyFailing = testCases.filter(tc => {
  const date = new Date(tc.birthDate + 'T12:00:00Z');
  const month = date.getMonth(); // 0-11

  // October and November cases (likely solar term boundary issues)
  if (month === 9 || month === 10) return true;

  // Timezone cases
  if (tc.timezone !== 'UTC') return true;

  // Early January (likely solar year issues)
  if (month === 0) return true;

  // Known problematic years
  const year = date.getFullYear();
  if ([1920, 1985, 1998, 2020, 2024].includes(year)) return true;

  return false;
});

console.log(`\nLikely failing: ${likelyFailing.length} tests`);
likelyFailing.forEach(tc => {
  console.log(`  Test ${tc.id}: ${tc.birthDate} -> ${tc.expectedPrincipal}.${tc.expectedMonth}.${tc.expectedEnergetic} (${tc.notes})`);
});

console.log('\n=== PRINCIPAL STAR FORMULA CHECK ===');
// Calculate principal star using the formula and compare
function calculatePrincipalStar(year) {
  // Sum digits recursively
  let sum = 0;
  let n = Math.abs(year);
  while (n > 0) {
    sum += n % 10;
    n = Math.floor(n / 10);
  }
  while (sum >= 10) {
    let newSum = 0;
    while (sum > 0) {
      newSum += sum % 10;
      sum = Math.floor(sum / 10);
    }
    sum = newSum;
  }

  // Formula: ((11 - digitSum - 1) % 9) + 1
  let result = ((11 - sum - 1) % 9) + 1;
  if (result === 0 || result === 10) result = 9;
  return result;
}

const uniqueYears = [...new Set(testCases.map(tc => parseInt(tc.birthDate.split('-')[0])))].sort();
console.log('\nYear -> Expected vs Calculated Principal Star:');
uniqueYears.forEach(year => {
  const tc = testCases.find(t => t.birthDate.startsWith(year.toString()));
  const expected = tc.expectedPrincipal;
  const calculated = calculatePrincipalStar(year);
  const match = expected === calculated ? '✓' : '✗ MISMATCH';
  console.log(`  ${year}: Expected ${expected}, Calculated ${calculated} ${match}`);
});
