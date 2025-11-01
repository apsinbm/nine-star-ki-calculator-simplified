/**
 * Trace a working test case to understand the correct mapping
 */

const { calculateProfile } = require('./src/lib/calculator/nine-star-calculator.ts');
const { getSolarTermsForYear } = require('./src/lib/data/solar-terms-data.ts');

// Known good test: 1986-03-15 should be 5.7.3
const date = new Date('1986-03-15T12:00:00Z');

console.log('=== TRACING 1986-03-15 (should be 5.7.3) ===\n');

const profile = calculateProfile({ date });
console.log(`Result: ${profile.principalStar}.${profile.monthStar}.${profile.energeticStar}`);
console.log(`Expected: 5.7.3`);
console.log(`Match: ${profile.principalStar === 5 && profile.monthStar === 7 && profile.energeticStar === 3 ? 'YES ✓' : 'NO ✗'}`);
console.log('');
console.log(`Solar year: ${profile.solarYear}`);
console.log(`Solar month: ${profile.solarMonth} (1-12 notation)`);
console.log('');

// Get solar terms for 1986
const terms = getSolarTermsForYear(1986);
console.log('Solar terms for 1986:');
console.log(`  Li Chun: ${terms.liChun.toISOString()}`);
console.log(`  Jing Zhe: ${terms.jingZhe.toISOString()}`);
console.log(`  Qing Ming: ${terms.qingMing.toISOString()}`);
console.log('');

// March 15 is between Jing Zhe and Qing Ming
console.log(`Date: ${date.toISOString()}`);
console.log(`  After Jing Zhe? ${date >= terms.jingZhe}`);
console.log(`  Before Qing Ming? ${date < terms.qingMing}`);
console.log('');

// If March 15 is in the solar month that starts at Jing Zhe (solar month index 1 = Mar)
// And the pattern for principal 5 is [8, 7, 6, 5, 4, 3, 2, 1, 9, 8, 7, 6]
// Then pattern[1] = 7 ✓

console.log('Pattern for principal 5: [8, 7, 6, 5, 4, 3, 2, 1, 9, 8, 7, 6]');
console.log('If solar month index is 1 (Mar): pattern[1] = 7 ✓');
console.log('');
console.log('This test PASSES, so our logic works for this case.');
console.log('Now let\'s check why Nov 7 fails...');
