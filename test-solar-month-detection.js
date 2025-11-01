/**
 * Test what solar month our code detects for failing tests
 */

const { calculateProfile } = require('./src/lib/calculator/nine-star-calculator.ts');

const tests = [
  { date: '1985-11-07T12:00:00Z', expectedMonth: 7, expectedSolarMonth: 'Oct (index 8)' },
  { date: '1985-11-08T12:00:00Z', expectedMonth: 2, expectedSolarMonth: 'Nov (index 9)' },
  { date: '1995-11-20T12:00:00Z', expectedMonth: 2, expectedSolarMonth: 'Nov (index 9)' },
  { date: '1977-10-31T12:00:00Z', expectedMonth: 3, expectedSolarMonth: 'Oct (index 8)' },
];

console.log('=== SOLAR MONTH DETECTION TEST ===\n');

tests.forEach(t => {
  try {
    const profile = calculateProfile({ date: new Date(t.date) });
    console.log(`${t.date}:`);
    console.log(`  Solar year: ${profile.solarYear}`);
    console.log(`  Solar month: ${profile.solarMonth} (should be ${t.expectedSolarMonth})`);
    console.log(`  Principal: ${profile.principalStar}`);
    console.log(`  Month star: ${profile.monthStar} (expected ${t.expectedMonth})`);
    console.log('');
  } catch (e) {
    console.log(`${t.date}: Error - ${e.message}\n`);
  }
});
