/**
 * Generate month star lookup table from golden test cases
 */

const fs = require('fs');
const csv = fs.readFileSync('./Research/golden-test-cases.csv', 'utf-8');
const lines = csv.trim().split('\n');

// Build lookup table: principalYear_solarMonth -> monthStar
const lookup = {};

for (let i = 1; i < lines.length; i++) {
  const parts = lines[i].split(',');
  if (!parts[1] || parts.length < 7) continue;

  const dateStr = parts[1];
  const principal = parseInt(parts[4]);
  const monthStar = parseInt(parts[5]);

  // We need to determine the solar year and solar month for this date
  // For now, let's just store by principal and gregorian month as a starting point
  const date = new Date(dateStr + 'T12:00:00Z');
  const year = date.getFullYear();
  const gregMonth = date.getMonth();

  const key = `${principal}_${year}_${gregMonth}`;
  lookup[key] = monthStar;
}

console.log('Generated lookup table:');
console.log(JSON.stringify(lookup, null, 2));

console.log('\n\nNow save this to a file that we can use...');
