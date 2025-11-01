/**
 * Final analysis - maybe the test data has errors OR there's a special rule
 */

// From the test data, here are the FACTS:
const facts = [
  { date: '1985-11-07', gregorianYear: 1985, solarYear: 1985, principal: 5 },
  { date: '1985-11-08', gregorianYear: 1985, solarYear: 1985, principal: 5 },
  { date: '1986-02-03', gregorianYear: 1986, solarYear: 1985, principal: 6 },  // BEFORE Li Chun
  { date: '1986-02-05', gregorianYear: 1986, solarYear: 1986, principal: 5 },  // AFTER Li Chun
];

console.log('=== KEY OBSERVATION ===\n');
console.log('Dates in 1985 (solar year 1985) -> Principal 5');
console.log('Date 1986-02-03 (solar year 1985, before Li Chun) -> Principal 6');
console.log('Date 1986-02-05 (solar year 1986, after Li Chun) -> Principal 5');
console.log('');
console.log('This is INCONSISTENT if principal is based purely on solar year!');
console.log('');
console.log('TWO POSSIBILITIES:');
console.log('1. The test data has an error for 1986-02-03');
console.log('2. Principal star formula uses GREGORIAN year, NOT solar year');
console.log('');

console.log('=== TESTING POSSIBILITY 2 ===\n');

// If principal uses GREGORIAN year:
const cycle = [8,7,6,5,4,3,2,1,9];

facts.forEach(f => {
  const offset = (f.gregorianYear - 1920) % 9;
  const predicted = cycle[offset];
  const match = predicted === f.principal ? '✓' : '✗';

  console.log(`${f.date}:`);
  console.log(`  Gregorian year: ${f.gregorianYear}, offset ${offset} -> predicts ${predicted} ${match}`);
  console.log(`  Solar year: ${f.solarYear}`);
  console.log(`  Expected principal: ${f.principal}`);
  console.log('');
});

console.log('=== CONCLUSION ===\n');
console.log('YES! If we use GREGORIAN year for principal star:');
console.log('  1985 (gregorian) -> offset 2 -> principal 6 ✗ (but test says 5)');
console.log('  1986 (gregorian) -> offset 3 -> principal 5 ✓');
console.log('');
console.log('Still doesn\'t work! Let me try the OTHER direction of the cycle...');

console.log('\n=== TRYING ASCENDING CYCLE ===');
const cycleAsc = [8,9,1,2,3,4,5,6,7]; // Ascending from 1920=8

facts.forEach(f => {
  const offset = (f.gregorianYear - 1920) % 9;
  const predicted = cycleAsc[offset];
  const match = predicted === f.principal ? '✓' : '✗';

  console.log(`${f.date}: Gregorian ${f.gregorianYear} -> offset ${offset} -> ${predicted} ${match} (expected ${f.principal})`);
});

console.log('\n=== MAYBE USE SOLAR YEAR BUT DIFFERENT BASE? ===');

// Try starting from different years
for (let base = 1980; base <= 1990; base++) {
  let allMatch = true;
  const results = [];

  facts.forEach(f => {
    const offset = (f.solarYear - base) % 9;
    const predicted = cycle[offset];
    if (predicted !== f.principal) allMatch = false;
    results.push({date: f.date, predicted, expected: f.principal});
  });

  if (allMatch) {
    console.log(`\nFOUND MATCH with base ${base}!`);
    results.forEach(r => {
      console.log(`  ${r.date}: ${r.predicted} ✓`);
    });
  }
}

console.log('\n=== ALTERNATIVE: MAYBE 1986-02-03 TEST IS WRONG? ===');
console.log('If 1986-02-03 should be principal 5 (not 6):');
console.log('  Then all 1985 solar year dates would be principal 5 ✓');
console.log('  And the cycle would work perfectly.');
console.log('');
console.log('Let me check other sources for 1986-02-03...');
