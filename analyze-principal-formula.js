/**
 * Analyze different principal star formulas
 */

// Known correct values from golden test cases
const knownValues = {
  1920: 8,
  1954: 1,
  1963: 1,
  1970: 3, // From 1971-01-31 test (solar year 1970)
  1971: 2, // This is the GREGORIAN year 1971 (but Jan 31 uses solar year 1970)
  1972: 1,
  1977: 5,
  1980: 2,
  1985: 5,
  1986: 5,
  1990: 1,
  1994: 6, // From 1995-01-20 test (solar year 1994)
  1995: 5,
  1998: 2,
  1999: 1,
  2000: 9,
  2005: 4,
  2008: 1,
  2010: 8,
  2015: 3,
  2020: 1,
  2023: 1, // From 2024-02-03 test (solar year 2023)
  2024: 1,
};

// Try different formulas
function formula1(year) {
  // Current formula: ((11 - digitSum - 1) % 9) + 1
  let sum = 0;
  let n = Math.abs(year);
  while (n > 0) {
    sum += n % 10;
    n = Math.floor(n / 10);
  }
  while (sum >= 10) {
    let newSum = 0;
    while (sum > 0) {
      newSum += sum % 10;
      sum = Math.floor(sum / 10);
    }
    sum = newSum;
  }
  let result = ((11 - sum - 1) % 9) + 1;
  if (result === 0 || result === 10) result = 9;
  return result;
}

function formula2(year) {
  // Try: 11 - (year % 9)
  let result = 11 - (year % 9);
  if (result > 9) result -= 9;
  if (result === 0) result = 9;
  return result;
}

function formula3(year) {
  // Try: (11 - (sum of last 2 digits)) % 9 + 1
  const lastTwo = year % 100;
  let sum = Math.floor(lastTwo / 10) + (lastTwo % 10);
  while (sum >= 10) {
    sum = Math.floor(sum / 10) + (sum % 10);
  }
  let result = ((11 - sum) % 9);
  if (result === 0) result = 9;
  return result;
}

function formula4(year) {
  // Simple modulo pattern
  let result = (10 - (year % 9));
  if (result === 0) result = 9;
  if (result === 10) result = 1;
  return result;
}

console.log('=== FORMULA TESTING ===\n');
console.log('Year | Expected | F1 | F2 | F3 | F4 | Notes');
console.log('-----|----------|----|----|----|----|------');

Object.keys(knownValues).sort((a, b) => parseInt(a) - parseInt(b)).forEach(year => {
  const y = parseInt(year);
  const expected = knownValues[year];
  const f1 = formula1(y);
  const f2 = formula2(y);
  const f3 = formula3(y);
  const f4 = formula4(y);

  const m1 = f1 === expected ? '✓' : f1;
  const m2 = f2 === expected ? '✓' : f2;
  const m3 = f3 === expected ? '✓' : f3;
  const m4 = f4 === expected ? '✓' : f4;

  console.log(`${year} | ${expected}        | ${m1}  | ${m2}  | ${m3}  | ${m4}  |`);
});

console.log('\n=== FORMULA ACCURACY ===');
let count1 = 0, count2 = 0, count3 = 0, count4 = 0;
Object.keys(knownValues).forEach(year => {
  const y = parseInt(year);
  const expected = knownValues[year];
  if (formula1(y) === expected) count1++;
  if (formula2(y) === expected) count2++;
  if (formula3(y) === expected) count3++;
  if (formula4(y) === expected) count4++;
});

const total = Object.keys(knownValues).length;
console.log(`Formula 1 (current): ${count1}/${total} correct (${(count1/total*100).toFixed(1)}%)`);
console.log(`Formula 2: ${count2}/${total} correct (${(count2/total*100).toFixed(1)}%)`);
console.log(`Formula 3: ${count3}/${total} correct (${(count3/total*100).toFixed(1)}%)`);
console.log(`Formula 4: ${count4}/${total} correct (${(count4/total*100).toFixed(1)}%)`);

// Check pattern
console.log('\n=== PATTERN ANALYSIS ===');
console.log('Looking for 9-year cycles...\n');

for (let start = 1920; start <= 1930; start++) {
  let matches = 0;
  let total = 0;
  for (const year in knownValues) {
    const y = parseInt(year);
    const expected = knownValues[year];
    const offset = (y - start) % 9;
    // Pattern would be: start at some value, go 9,8,7,6,5,4,3,2,1,9,8,7...
    // OR: 1,2,3,4,5,6,7,8,9,1,2,3...
    // Let's check descending from star at start year
    const cycle = [9,8,7,6,5,4,3,2,1];
    const hypothetical = cycle[offset];

    total++;
  }
}

// Try to find the actual pattern
console.log('Checking 9-year descending pattern:');
const base1920 = 8;
Object.keys(knownValues).sort((a, b) => parseInt(a) - parseInt(b)).forEach(year => {
  const y = parseInt(year);
  const expected = knownValues[year];
  const yearsSince1920 = y - 1920;
  const offset = yearsSince1920 % 9;

  // Descending: 8,7,6,5,4,3,2,1,9,8,7,6...
  const cycle = [8,7,6,5,4,3,2,1,9];
  const predicted = cycle[offset];

  const match = predicted === expected ? '✓' : '✗';
  console.log(`${year}: Expected ${expected}, Predicted ${predicted} ${match} (offset ${offset})`);
});
