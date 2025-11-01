// Quick debug script to understand solar month calculation

const { calculateNineStarKiProfile } = require('./dist/lib/calculator/calculation-engine.js');

const testCases = [
  { date: '1977-10-31T12:00:00Z', expected: { principal: 5, month: 3, solar_month: '?' } },
  { date: '1995-01-20T12:00:00Z', expected: { principal: 6, month: 9, solar_month: '?' } },
  { date: '1986-02-03T12:00:00Z', expected: { principal: 6, month: 6, solar_month: '?' } },
  { date: '1971-01-31T12:00:00Z', expected: { principal: 3, month: 6, solar_month: '?' } },
  { date: '2015-04-04T12:00:00Z', expected: { principal: 3, month: 6, solar_month: '?' } },
  { date: '1998-01-06T12:00:00Z', expected: { principal: 2, month: 9, solar_month: '?' } },
  { date: '1980-09-05T12:00:00Z', expected: { principal: 2, month: 1, solar_month: '?' } },
];

console.log('Date\t\t\tPrincipal\tMonth\tSolar Month\tExpected Month');
console.log('='.repeat(80));

testCases.forEach(tc => {
  try {
    const profile = calculateNineStarKiProfile({ date: new Date(tc.date) });
    const monthNames = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'];
    const solarMonthName = monthNames[profile.solarMonth - 1] || '?';

    console.log(`${tc.date}\t${profile.principalStar}\t\t${profile.monthStar}\t${profile.solarMonth} (${solarMonthName})\t\t${tc.expected.month}`);
  } catch (e) {
    console.log(`${tc.date}\tERROR: ${e.message}`);
  }
});
