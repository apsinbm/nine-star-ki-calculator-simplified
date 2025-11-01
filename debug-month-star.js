/**
 * Debug month star calculations
 */

const testCases = [
  { id: 3, date: '1995-11-20', principal: 5, expected: 2, notes: 'Late November' },
  { id: 21, date: '1977-10-31', principal: 5, expected: 3, notes: 'Late October' },
  { id: 22, date: '1985-11-08', principal: 5, expected: 2, notes: 'Li Dong boundary' },
  { id: 23, date: '1985-11-07', principal: 5, expected: 7, notes: 'Before Li Dong' },
  { id: 15, date: '2000-08-07', principal: 9, expected: 6, notes: 'Before Li Qiu' },
  { id: 33, date: '1980-09-05', principal: 2, expected: 1, notes: 'September' },
];

// Current month star pattern for principal 5:
// [8, 7, 6, 5, 4, 3, 2, 1, 9, 8, 7, 6]
// Index:  0  1  2  3  4  5  6  7  8  9 10 11
// Month: Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec Jan

console.log('=== MONTH STAR PATTERN ANALYSIS ===\n');

testCases.forEach(tc => {
  const date = new Date(tc.date + 'T12:00:00Z');
  const month = date.getMonth(); // 0-11 (Jan=0)
  const monthName = date.toLocaleString('en', { month: 'long' });

  console.log(`Test ${tc.id}: ${tc.date} (${monthName})`);
  console.log(`  Gregorian month index: ${month}`);
  console.log(`  Principal: ${tc.principal}`);
  console.log(`  Expected month star: ${tc.expected}`);

  // Determine solar month index
  // The issue is: how do we map Gregorian month to solar month?
  // Solar months start with Feb (0), not Jan

  // Guess at solar month index based on date
  let solarMonthIndex;
  if (month === 1) { // Feb
    solarMonthIndex = 0;
  } else if (month >= 2) { // Mar-Dec
    solarMonthIndex = month - 1;
  } else { // Jan
    solarMonthIndex = 11;
  }

  console.log(`  Estimated solar month index: ${solarMonthIndex}`);

  // Get pattern for this principal
  const patterns = {
    1: [8, 7, 6, 5, 4, 3, 2, 1, 9, 8, 7, 6],
    2: [2, 1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 9],
    5: [8, 7, 6, 5, 4, 3, 2, 1, 9, 8, 7, 6],
    9: [5, 4, 3, 2, 1, 9, 8, 7, 6, 5, 4, 3],
  };

  const pattern = patterns[tc.principal];
  if (pattern) {
    const predicted = pattern[solarMonthIndex];
    const match = predicted === tc.expected ? '✓' : '✗';
    console.log(`  Pattern predicts: ${predicted} ${match}`);
  }

  console.log('');
});

console.log('\n=== KEY FINDINGS ===');
console.log('Tests 22 and 23 are both in November:');
console.log('  1985-11-07: expects month star 7');
console.log('  1985-11-08: expects month star 2');
console.log('These differ by only 1 day! This must be a solar term boundary (Li Dong).');
console.log('');
console.log('Li Dong (立冬) typically occurs around Nov 7-8.');
console.log('Before Li Dong: still in Oct solar month (month star 7 for principal 5)');
console.log('On/after Li Dong: in Nov solar month (month star 2 for principal 5)');
console.log('');
console.log('So the solar month boundaries are critical!');
