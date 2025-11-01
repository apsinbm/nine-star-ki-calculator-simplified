/**
 * Analyze Solar Months for Golden Test Cases
 *
 * Determines which solar month (0-11) each test case falls into
 * and builds a verified lookup table
 */

const fs = require('fs');
const path = require('path');

// Solar month boundaries (approximate)
// 0=Feb (Li Chun), 1=Mar (Jing Zhe), 2=Apr (Qing Ming), 3=May (Li Xia),
// 4=Jun (Mang Zhong), 5=Jul (Xiao Shu), 6=Aug (Li Qiu), 7=Sep (Bai Lu),
// 8=Oct (Han Lu), 9=Nov (Li Dong), 10=Dec (Da Xue), 11=Jan (Xiao Han)

function getSolarMonthIndex(dateStr) {
  const date = new Date(dateStr);
  const month = date.getMonth(); // 0-11
  const day = date.getDate();

  // Rough approximation based on solar term dates (typically 4th-8th of each month)
  // January: month 11 (Xiao Han)
  if (month === 0) return 11;

  // February after ~4th: month 0 (Li Chun)
  if (month === 1) {
    return day >= 4 ? 0 : 11;
  }

  // March after ~6th: month 1 (Jing Zhe)
  if (month === 2) {
    return day >= 6 ? 1 : 0;
  }

  // April after ~5th: month 2 (Qing Ming)
  if (month === 3) {
    return day >= 5 ? 2 : 1;
  }

  // May after ~6th: month 3 (Li Xia)
  if (month === 4) {
    return day >= 6 ? 3 : 2;
  }

  // June after ~6th: month 4 (Mang Zhong)
  if (month === 5) {
    return day >= 6 ? 4 : 3;
  }

  // July after ~7th: month 5 (Xiao Shu)
  if (month === 6) {
    return day >= 7 ? 5 : 4;
  }

  // August after ~8th: month 6 (Li Qiu)
  if (month === 7) {
    return day >= 8 ? 6 : 5;
  }

  // September after ~8th: month 7 (Bai Lu)
  if (month === 8) {
    return day >= 8 ? 7 : 6;
  }

  // October after ~8th: month 8 (Han Lu)
  if (month === 9) {
    return day >= 8 ? 8 : 7;
  }

  // November after ~7th: month 9 (Li Dong)
  if (month === 10) {
    return day >= 7 ? 9 : 8;
  }

  // December after ~7th: month 10 (Da Xue)
  if (month === 11) {
    return day >= 7 ? 10 : 9;
  }

  return 0; // fallback
}

// Parse CSV file
const csvPath = path.join(__dirname, '../Research/golden-test-cases.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');
const lines = csvContent.split('\n').filter(line => line.trim());

// Skip header
const data = lines.slice(1).map(line => {
  const parts = line.split(',');
  if (parts.length < 7) return null;

  const birthDate = parts[1];
  const solarMonth = getSolarMonthIndex(birthDate);

  return {
    testId: parts[0],
    birthDate,
    principal: parseInt(parts[4]),
    monthStar: parseInt(parts[5]),
    energetic: parseInt(parts[6]),
    solarMonthIndex: solarMonth,
  };
}).filter(Boolean);

// Build pattern lookup: principal -> [month stars for each solar month 0-11]
const patterns = {};
for (let p = 1; p <= 9; p++) {
  patterns[p] = Array(12).fill(null);
}

data.forEach(row => {
  const { principal, solarMonthIndex, monthStar } = row;

  // Store the month star for this principal + solar month combination
  if (patterns[principal][solarMonthIndex] === null) {
    patterns[principal][solarMonthIndex] = monthStar;
  } else if (patterns[principal][solarMonthIndex] !== monthStar) {
    console.log(`WARNING: Conflict for principal ${principal}, solar month ${solarMonthIndex}`);
    console.log(`  Existing: ${patterns[principal][solarMonthIndex]}, New: ${monthStar}`);
  }
});

console.log('=== Solar Month Analysis ===\n');
console.log('Date\t\t\tPrincipal\tSolar Month\tMonth Star');
console.log('='.repeat(70));

data.forEach(row => {
  const monthNames = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'];
  console.log(`${row.birthDate}\t${row.principal}\t\t${row.solarMonthIndex} (${monthNames[row.solarMonthIndex]})\t\t${row.monthStar}`);
});

console.log('\n\n=== Month Star Patterns by Principal ===\n');
console.log('Solar months: 0=Feb, 1=Mar, 2=Apr, 3=May, 4=Jun, 5=Jul, 6=Aug, 7=Sep, 8=Oct, 9=Nov, 10=Dec, 11=Jan\n');

Object.keys(patterns).forEach(principal => {
  const pattern = patterns[principal];
  console.log(`Principal ${principal}: [${pattern.map(m => m === null ? '?' : m).join(', ')}]`);
});

// Output to JSON
const outputPath = path.join(__dirname, '../Research/verified-month-star-patterns.json');
fs.writeFileSync(outputPath, JSON.stringify({
  description: 'Verified month star patterns extracted from golden test cases',
  solarMonths: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
  patterns,
  testCases: data,
}, null, 2));

console.log(`\n\nExported to: ${outputPath}`);
