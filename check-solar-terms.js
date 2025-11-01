/**
 * Check solar term dates for failing test years
 */

// Check what Li Dong date we have for 1985
const { getSolarTermsForYear } = require('./src/lib/data/solar-terms-data.ts');

console.log('=== SOLAR TERM DATES FOR TEST YEARS ===\n');

const testYears = [1977, 1985, 1995, 2000];

testYears.forEach(year => {
  try {
    const terms = getSolarTermsForYear(year);
    console.log(`${year}:`);
    console.log(`  Li Dong: ${terms.liDong.toISOString()}`);
    console.log(`  Han Lu: ${terms.hanLu.toISOString()}`);
    console.log(`  Li Qiu: ${terms.liQiu.toISOString()}`);
    console.log('');
  } catch (e) {
    console.log(`${year}: Error - ${e.message}`);
  }
});

// Specifically check 1985-11-07 vs 1985-11-08
console.log('=== CRITICAL TEST: 1985-11-07 vs 1985-11-08 ===');
try {
  const terms1985 = getSolarTermsForYear(1985);
  const liDong = terms1985.liDong;
  const test1 = new Date('1985-11-07T12:00:00Z');
  const test2 = new Date('1985-11-08T12:00:00Z');

  console.log(`Li Dong 1985: ${liDong.toISOString()}`);
  console.log(`Test 1985-11-07 12:00 UTC: ${test1.toISOString()}`);
  console.log(`  Before Li Dong? ${test1 < liDong}`);
  console.log(`Test 1985-11-08 12:00 UTC: ${test2.toISOString()}`);
  console.log(`  Before Li Dong? ${test2 < liDong}`);
} catch (e) {
  console.log(`Error: ${e.message}`);
}
