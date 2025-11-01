/**
 * Check if the failing years are actually due to dates before Li Chun
 */

const testCases = [
  // 1985 issue
  { testId: 6, date: '1986-02-03', expected: '6.6.3', solarYear: 1985 },
  { testId: 22, date: '1985-11-08', expected: '5.2.8', solarYear: 1985 },
  { testId: 23, date: '1985-11-07', expected: '5.7.3', solarYear: 1985 },

  // 2020 issue
  { testId: 17, date: '2020-02-04', expected: '1.8.7', solarYear: 2020 },

  // 2023 issue (from 2024-02-03 before Li Chun)
  { testId: 29, date: '2024-02-03', expected: '1.6.9', solarYear: 2023 },

  // 2024 issue
  { testId: 30, date: '2024-02-04', expected: '1.8.7', solarYear: 2024 },
];

console.log('=== CHECKING SOLAR YEAR EXPECTATIONS ===\n');

// 9-year cycle from 1920
const cycle = [8,7,6,5,4,3,2,1,9];

testCases.forEach(tc => {
  const yearsSince1920 = tc.solarYear - 1920;
  const offset = yearsSince1920 % 9;
  const predictedPrincipal = cycle[offset];
  const expectedPrincipal = parseInt(tc.expected.split('.')[0]);

  const match = predictedPrincipal === expectedPrincipal ? '✓' : '✗';

  console.log(`Test ${tc.testId}: ${tc.date}`);
  console.log(`  Solar Year: ${tc.solarYear}`);
  console.log(`  Expected principal: ${expectedPrincipal}`);
  console.log(`  Cycle predicts: ${predictedPrincipal} (offset ${offset}) ${match}`);
  console.log('');
});

// Let's check what 2020, 2023, 2024 should be
console.log('=== ANALYZING PROBLEM YEARS ===\n');

[2020, 2023, 2024].forEach(year => {
  const yearsSince1920 = year - 1920;
  const offset = yearsSince1920 % 9;
  const cyclePrediction = cycle[offset];

  console.log(`${year}: offset=${offset}, cycle=${cyclePrediction}`);
  console.log(`  But test expects: 1`);
  console.log(`  Years since 1920: ${yearsSince1920}`);
  console.log('');
});

// Maybe the cycle shifted? Let's try different base years
console.log('=== TRYING DIFFERENT CYCLE BASES ===\n');

const testYear2020 = {year: 2020, expected: 1};
const testYear2024 = {year: 2024, expected: 1};

console.log('Trying cycles starting from different years:');
for (let baseYear = 1900; baseYear <= 1930; baseYear++) {
  const offset2020 = (2020 - baseYear) % 9;
  const offset2024 = (2024 - baseYear) % 9;

  // Try different starting points in cycle
  for (let startNum = 1; startNum <= 9; startNum++) {
    const cycle2 = [];
    for (let i = 0; i < 9; i++) {
      let val = startNum - i;
      if (val < 1) val += 9;
      cycle2.push(val);
    }

    const pred2020 = cycle2[offset2020];
    const pred2024 = cycle2[offset2024];

    if (pred2020 === 1 && pred2024 === 1) {
      console.log(`Found match! Base ${baseYear}, start ${startNum}:`);
      console.log(`  2020 (offset ${offset2020}): ${pred2020}`);
      console.log(`  2024 (offset ${offset2024}): ${pred2024}`);

      // Verify with 1920
      const offset1920 = (1920 - baseYear) % 9;
      const pred1920 = cycle2[offset1920];
      console.log(`  1920 (offset ${offset1920}): ${pred1920} (expected 8)`);

      // Verify with 1985
      const offset1985 = (1985 - baseYear) % 9;
      const pred1985 = cycle2[offset1985];
      console.log(`  1985 (offset ${offset1985}): ${pred1985} (expected 5)`);
      console.log('');
    }
  }
}
