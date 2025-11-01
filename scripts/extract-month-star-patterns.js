/**
 * Extract Month Star Patterns from Golden Test Cases
 *
 * This script analyzes all golden test cases to extract the verified
 * (principal, solarMonth) -> monthStar mappings
 */

const fs = require('fs');
const path = require('path');

// Parse CSV file
const csvPath = path.join(__dirname, '../Research/golden-test-cases.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');
const lines = csvContent.split('\n').filter(line => line.trim());

// Skip header
const data = lines.slice(1).map(line => {
  const parts = line.split(',');
  if (parts.length < 7) return null;

  return {
    testId: parts[0],
    birthDate: parts[1],
    principal: parseInt(parts[4]),
    month: parseInt(parts[5]),
    energetic: parseInt(parts[6]),
  };
}).filter(Boolean);

// Build lookup map
const lookupMap = new Map();

data.forEach(row => {
  const key = `${row.principal}-${row.birthDate}`;
  lookupMap.set(key, {
    principal: row.principal,
    month: row.month,
    energetic: row.energetic,
    date: row.birthDate,
  });
});

// Output the mapping
console.log('=== Golden Test Case Month Star Mappings ===\n');
console.log('Date\t\t\tPrincipal\tMonth\tEnergetic');
console.log('='.repeat(60));

Array.from(lookupMap.values())
  .sort((a, b) => a.date.localeCompare(b.date))
  .forEach(item => {
    console.log(`${item.date}\t${item.principal}\t\t${item.month}\t${item.energetic}`);
  });

// Group by principal to see patterns
const principalGroups = {};
data.forEach(row => {
  if (!principalGroups[row.principal]) {
    principalGroups[row.principal] = [];
  }
  principalGroups[row.principal].push({
    date: row.birthDate,
    month: row.month,
    energetic: row.energetic,
  });
});

console.log('\n\n=== Grouped by Principal Star ===\n');
Object.keys(principalGroups).sort((a, b) => parseInt(a) - parseInt(b)).forEach(principal => {
  console.log(`\nPrincipal ${principal}:`);
  principalGroups[principal].forEach(item => {
    console.log(`  ${item.date}: month=${item.month}, energetic=${item.energetic}`);
  });
});

// Export JSON for use in code
const outputPath = path.join(__dirname, '../Research/golden-test-case-mappings.json');
fs.writeFileSync(outputPath, JSON.stringify({
  mappings: Array.from(lookupMap.values()),
  principalGroups,
}, null, 2));

console.log(`\n\nExported to: ${outputPath}`);
