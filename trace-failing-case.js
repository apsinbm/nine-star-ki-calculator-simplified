/**
 * Trace failing Nov 7 case
 */

const { calculateProfile } = require('./src/lib/calculator/nine-star-calculator.ts');
const { getSolarTermsForYear, getMonthBoundaries } = require('./src/lib/data/solar-terms-data.ts');

// Failing test: 1985-11-07 should be 5.7.3 but we're getting something else
const date = new Date('1985-11-07T12:00:00Z');

console.log('=== TRACING 1985-11-07 (should be 5.7.3) ===\n');

const profile = calculateProfile({ date });
console.log(`Result: ${profile.principalStar}.${profile.monthStar}.${profile.energeticStar}`);
console.log(`Expected: 5.7.3`);
console.log(`Match: ${profile.principalStar === 5 && profile.monthStar === 7 && profile.energeticStar === 3 ? 'YES ✓' : 'NO ✗'}`);
console.log('');
console.log(`Solar year: ${profile.solarYear}`);
console.log(`Solar month: ${profile.solarMonth} (1-12 notation)`);
console.log(`Solar month index: ${profile.solarMonth - 1} (0-11 notation)`);
console.log('');

// Get solar terms for 1985
const terms = getSolarTermsForYear(1985);
const boundaries = getMonthBoundaries(1985);

console.log('Solar terms for 1985:');
console.log(`  Han Lu (Oct): ${terms.hanLu.toISOString()}`);
console.log(`  Li Dong (Nov): ${terms.liDong.toISOString()}`);
console.log(`  Da Xue (Dec): ${terms.daXue.toISOString()}`);
console.log('');

console.log(`Date: ${date.toISOString()}`);
console.log(`  After Han Lu? ${date >= terms.hanLu}`);
console.log(`  After Li Dong? ${date >= terms.liDong}`);
console.log(`  Before Da Xue? ${date < terms.daXue}`);
console.log('');

console.log('Month boundaries array:');
boundaries.forEach((b, i) => {
  const monthNames = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'];
  console.log(`  ${i}: ${monthNames[i]} - ${b.toISOString()}`);
});
console.log('');

// Check which boundary range our date falls into
for (let i = 0; i < boundaries.length - 1; i++) {
  if (date >= boundaries[i] && date < boundaries[i + 1]) {
    const monthNames = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'];
    console.log(`Date falls in range ${i} (${monthNames[i]}): ${boundaries[i].toISOString()} to ${boundaries[i + 1].toISOString()}`);
  }
}

console.log('');
console.log('Pattern for principal 5: [8, 7, 6, 5, 4, 3, 2, 1, 9, 8, 7, 6]');
console.log(`Current solar month index ${profile.solarMonth - 1}: pattern[${profile.solarMonth - 1}] = ${profile.monthStar}`);
console.log(`Expected month star: 7`);
console.log(`Pattern indices with 7: 1 (Mar), 10 (Dec)`);
console.log('');
console.log('ISSUE: We\'re detecting wrong solar month index!');
console.log('Test notes say "Before Li Dong" so it should be Oct solar month (index 8)');
console.log(`But pattern[8] = 9, not 7`);
console.log('');
console.log('This means the PATTERN is wrong, not the solar month detection!');
