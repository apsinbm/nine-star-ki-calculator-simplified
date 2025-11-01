/**
 * Check 1977-10-31 test case
 */

const { calculateProfile } = require('./src/lib/calculator/nine-star-calculator.ts');
const { getSolarTermsForYear } = require('./src/lib/data/solar-terms-data.ts');

const date = new Date('1977-10-31T12:00:00Z');

console.log('=== 1977-10-31 (should be 5.3.7) ===\n');

const profile = calculateProfile({ date });
console.log(`Result: ${profile.principalStar}.${profile.monthStar}.${profile.energeticStar}`);
console.log(`Expected: 5.3.7`);
console.log(`Match: ${profile.principalStar === 5 && profile.monthStar === 3 ? 'YES ✓' : 'NO ✗'}`);
console.log('');

const terms = getSolarTermsForYear(1977);
console.log('Solar terms for 1977:');
console.log(`  Han Lu (Oct): ${terms.hanLu.toISOString()}`);
console.log(`  Li Dong (Nov): ${terms.liDong.toISOString()}`);
console.log('');

console.log(`Date: ${date.toISOString()}`);
console.log(`  After Han Lu? ${date >= terms.hanLu}`);
console.log(`  Before Li Dong? ${date < terms.liDong}`);
console.log('');
console.log(`Solar month: ${profile.solarMonth} (1-12), index ${profile.solarMonth - 1} (0-11)`);
console.log('');
console.log('Expected: Oct solar month (index 8) with month star 3');
console.log('So pattern[8] for principal 5 should be 3!');
console.log('But 1985-11-07 expects pattern[8] = 7');
console.log('');
console.log('CONTRADICTION! These can\'t both be right unless they\'re in different solar months.');
