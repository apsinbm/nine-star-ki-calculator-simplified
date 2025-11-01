/**
 * Build correct month star patterns from ALL golden test cases
 */

const fs = require('fs');
const csv = fs.readFileSync('./Research/golden-test-cases.csv', 'utf-8');
const lines = csv.trim().split('\n');

// Parse all test cases
const testCases = [];
for (let i = 1; i < lines.length; i++) {
  const parts = lines[i].split(',');
  if (!parts[1] || parts.length < 7) continue;

  const date = parts[1];
  const principal = parseInt(parts[4]);
  const monthStar = parseInt(parts[5]);

  // Parse date
  const d = new Date(date + 'T12:00:00Z');
  const gregorianMonth = d.getMonth(); // 0-11

  testCases.push({
    date,
    gregorianMonth,
    principal,
    monthStar,
    notes: parts[8] || '',
  });
}

console.log('=== BUILDING PATTERNS FROM TEST DATA ===\n');

// Group by principal star
const byPrincipal = {};
for (let p = 1; p <= 9; p++) {
  byPrincipal[p] = testCases.filter(tc => tc.principal === p);
}

// For each principal, try to map gregorian months to month stars
for (let p = 1; p <= 9; p++) {
  const cases = byPrincipal[p];
  if (cases.length === 0) continue;

  console.log(`Principal ${p}:`);

  // Group by gregorian month
  const byMonth = {};
  cases.forEach(tc => {
    const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][tc.gregorianMonth];
    if (!byMonth[monthName]) byMonth[monthName] = [];
    byMonth[monthName].push({ date: tc.date, monthStar: tc.monthStar, notes: tc.notes });
  });

  // Print sorted by month
  const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  monthOrder.forEach(month => {
    if (byMonth[month]) {
      const stars = byMonth[month].map(x => x.monthStar);
      const unique = [...new Set(stars)];
      console.log(`  ${month}: ${unique.join(', ')}  (from: ${byMonth[month].map(x => x.date).join(', ')})`);
    }
  });

  console.log('');
}

console.log('\n=== KEY FINDING ===');
console.log('November has MULTIPLE different month stars for the same principal!');
console.log('This confirms that solar term boundaries matter.');
console.log('We need to map Gregorian month + day to solar month correctly.');
