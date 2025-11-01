/**
 * Rebuild month star patterns from golden test data
 */

const fs = require('fs');
const csv = fs.readFileSync('./Research/golden-test-cases.csv', 'utf-8');
const lines = csv.trim().split('\n');

// Build data structure with solar month information
const testData = [];

for (let i = 1; i < lines.length; i++) {
  const parts = lines[i].split(',');
  if (!parts[1] || parts.length < 7) continue;

  const id = parts[0];
  const dateStr = parts[1];
  const principal = parseInt(parts[4]);
  const monthStar = parseInt(parts[5]);
  const notes = parts[8] || '';

  const date = new Date(dateStr + 'T12:00:00Z');
  const greg_month = date.getMonth();
  const greg_month_name = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][greg_month];

  testData.push({
    id,
    date: dateStr,
    greg_month,
    greg_month_name,
    principal,
    monthStar,
    notes
  });
}

console.log('=== MONTH STAR PATTERN RECONSTRUCTION ===\n');

// For principal 5, let's manually figure out the pattern
console.log('Principal 5 test cases:');
const p5 = testData.filter(t => t.principal === 5);
p5.forEach(t => {
  console.log(`  ${t.date} (${t.greg_month_name}): month star ${t.monthStar} - ${t.notes}`);
});

console.log('\n=== GROUPING BY EXPECTED MONTH STAR ===');
const p5byMS = {};
p5.forEach(t => {
  if (!p5byMS[t.monthStar]) p5byMS[t.monthStar] = [];
  p5byMS[t.monthStar].push(t);
});

Object.keys(p5byMS).sort((a,b) => parseInt(a) - parseInt(b)).forEach(ms => {
  console.log(`Month star ${ms}:`);
  p5byMS[ms].forEach(t => {
    console.log(`  ${t.date} (${t.greg_month_name})`);
  });
});

console.log('\n=== ANALYSIS ===');
console.log('Month star 8: Feb (1986-02-05)');
console.log('Month star 7: Mar (1986-03-15, 1995-03-06, 1995-03-05), Nov (1985-11-07)');
console.log('Month star 3: Oct (1977-10-31)');
console.log('Month star 2: Nov (1995-11-20, 1985-11-08)');
console.log('');
console.log('WAIT - Nov has BOTH 7 and 2!');
console.log('  1985-11-07: month star 7 (notes say "Before Li Dong")');
console.log('  1985-11-08: month star 2 (notes say "Li Dong boundary")');
console.log('  1995-11-20: month star 2 (late Nov)');
console.log('');
console.log('So 1985-11-07 should actually be in Oct solar month (before Li Dong)!');
console.log('But our code detects it as Nov solar month.');
console.log('');
console.log('The solar term dates might be slightly off, OR');
console.log('The test is using a different timezone/interpretation.');
console.log('');
console.log('SOLUTION: We need to adjust Li Dong 1985 to be AFTER 12:00 UTC on Nov 7');
console.log('Or interpret boundaries differently (e.g., use > instead of >=)');
