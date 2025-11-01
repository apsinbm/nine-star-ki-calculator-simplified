/**
 * Investigate 1985 and why it has both principal 5 and 6
 */

const csv = require('fs').readFileSync('./Research/golden-test-cases.csv', 'utf-8');
const lines = csv.trim().split('\n');

console.log('=== ALL 1985/1986 TEST CASES ===\n');

for (let i = 1; i < lines.length; i++) {
  const parts = lines[i].split(',');
  if (!parts[1]) continue;

  const date = parts[1];
  const year = parseInt(date.split('-')[0]);

  if (year === 1985 || year === 1986) {
    const principal = parts[4];
    const notes = parts[8] || '';
    console.log(`${parts[0]}. ${date}: Principal ${principal} - ${notes}`);
  }
}

console.log('\n=== HYPOTHESIS ===');
console.log('Maybe 1985 uses principal 5, but dates in EARLY 1986 (before Li Chun) should use 1985 solar year with principal 6?');
console.log('This would mean the GREGORIAN year cycles, not the solar year!');

console.log('\n=== TESTING GREGORIAN YEAR CYCLE ===');

const cycle = [8,7,6,5,4,3,2,1,9];

const tests = [
  {year: 1920, expected: 8},
  {year: 1985, expected: 5},  // Most 1985 dates
  {year: 1986, expected: 5},  // After Feb 4, 1986 (solar year 1986)
  // BUT also:
  {year: 1986, expected: 6, note: 'Before Feb 4 (uses 1985 solar year but formula uses Gregorian 1986?)'},
  {year: 2020, expected: 1},
  {year: 2024, expected: 1},
];

console.log('\nIf cycle is based on GREGORIAN year (not solar year):');
tests.forEach(t => {
  const offset = (t.year - 1920) % 9;
  const predicted = cycle[offset];
  const match = predicted === t.expected ? '✓' : '✗';
  const note = t.note || '';
  console.log(`${t.year}: Expected ${t.expected}, Cycle ${predicted} ${match} ${note}`);
});

console.log('\n=== CHECKING IF FORMULA SHOULD USE GREGORIAN YEAR ===');
console.log('This would explain why 1986-02-03 (before Li Chun, solar year 1985) expects principal 6:');
console.log('  Formula uses GREGORIAN 1986 -> principal 5');
console.log('  But test expects 6...');
console.log('');
console.log('Wait! Let me check the CSV again for what principal 1986-02-03 actually expects...');

// Parse more carefully
console.log('\n=== DETAILED 1985-1986 DATA ===');
const test1985_1107 = lines.find(l => l.includes('1985-11-07'));
const test1985_1108 = lines.find(l => l.includes('1985-11-08'));
const test1986_0203 = lines.find(l => l.includes('1986-02-03'));
const test1986_0205 = lines.find(l => l.includes('1986-02-05'));

console.log('1985-11-07:', test1985_1107);
console.log('1985-11-08:', test1985_1108);
console.log('1986-02-03:', test1986_0203);
console.log('1986-02-05:', test1986_0205);

console.log('\n=== INTERPRETATION ===');
console.log('1985-11-07: Principal 5, Solar Year 1985');
console.log('1985-11-08: Principal 5, Solar Year 1985');
console.log('1986-02-03: Principal 6, Solar Year 1985 (before Li Chun)');
console.log('1986-02-05: Principal 5, Solar Year 1986 (after Li Chun)');
console.log('');
console.log('AH HA! The formula must use the GREGORIAN year, not the solar year!');
console.log('Then we adjust month/energetic based on the solar year.');
