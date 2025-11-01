# Nine Star Ki Calculation Engine

Complete implementation of Nine Star Ki calculations based on the research documented in `Research/RESEARCH_SYNTHESIS.md`.

## Features

- **Complete Three-Star Calculation**: Principal (year), Month, and Energetic stars
- **Timezone Support**: Accurate calculations for any timezone
- **Li Chun Boundary Handling**: Precise solar year determination
- **Solar Term Month Boundaries**: Uses 24 solar terms for accurate month calculation
- **Boundary Warnings**: Alerts for births near solar term transitions
- **Type-Safe**: Full TypeScript support with comprehensive types
- **Research-Based**: Implementation follows documented algorithms from Appendix B

## Quick Start

```typescript
import { calculateProfile } from '@/lib/calculator'

// Simple calculation with just a date
const profile = calculateProfile({
  date: new Date('1986-03-15'),
})

console.log(profile.principalStar)  // 5
console.log(profile.monthStar)      // 7
console.log(profile.energeticStar)  // 3
console.log(profile.solarYear)      // 1986
console.log(profile.solarMonth)     // 2 (March solar month)
```

## Advanced Usage

### With Time and Timezone

For births near midnight or solar term boundaries, provide time and timezone for maximum accuracy:

```typescript
const profile = calculateProfile({
  date: '2024-02-04',
  time: '18:00',
  timezone: 'America/Los_Angeles',
})

console.log(profile.warnings) // Array of boundary warnings if applicable
```

### Handling Boundary Warnings

```typescript
const profile = calculateProfile({
  date: '2024-02-04', // Near Li Chun
})

if (profile.warnings.length > 0) {
  console.log('Warning: Birth date near solar term boundary')
  profile.warnings.forEach(warning => {
    console.log(`- ${warning.message}`)
    console.log(`  Days from ${warning.term}: ${warning.daysDifference}`)
  })
}
```

### Format Profile as Shorthand

```typescript
import { calculateProfile, formatProfile } from '@/lib/calculator'

const profile = calculateProfile({ date: '1986-03-15' })
const shorthand = formatProfile(profile)
console.log(shorthand) // "5.7.3"
```

## Calculation Algorithms

### 1. Principal Star (本命星 / Honmei)

The principal star is calculated from the solar year using a digit sum formula:

```
digitSum = recursive_sum_of_digits(solarYear)
principalStar = ((11 - digitSum - 1) mod 9) + 1
```

**Example for 1986:**
```
digitSum: 1 + 9 + 8 + 6 = 24 → 2 + 4 = 6
principal: (11 - 6 - 1) mod 9 + 1 = 4 mod 9 + 1 = 5
Result: Principal Star 5
```

### 2. Solar Year Determination

The solar year starts at Li Chun (立春), typically February 4-5:

- **Before Li Chun**: Use previous Gregorian year as solar year
- **On or after Li Chun**: Use current Gregorian year as solar year

**Example for January 15, 1990:**
```
Li Chun 1990: February 4, 1990
January 15 < February 4
Solar Year: 1989
```

### 3. Month Star (月命星 / Getsumei)

Month stars are determined by:
1. Solar month (based on 24 solar terms)
2. Principal star group pattern

**Three principal star groups:**
- Group [1, 4, 7]: Pattern [8, 7, 6, 5, 4, 3, 2, 1, 9, 8, 7, 6]
- Group [2, 5, 8]: Pattern [2, 1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 9]
- Group [3, 6, 9]: Pattern [5, 4, 3, 2, 1, 9, 8, 7, 6, 5, 4, 3]

Solar months (index 0-11):
- 0: February (Li Chun to Jing Zhe)
- 1: March (Jing Zhe to Qing Ming)
- 2: April (Qing Ming to Li Xia)
- ... and so on

### 4. Energetic Star (Third Star)

The energetic star is derived from an 81-combination table based on the principal and month stars.

```typescript
energeticStar = table[principalStar][monthStar]
```

**Example:**
```
Principal: 5
Month: 7
Table lookup: energeticTable[5][7] = 3
Result: Energetic Star 3
```

## Solar Terms (24 Jieqi)

The 12 major solar terms used for month boundaries:

| Term | Chinese | Gregorian Approx. | Solar Month |
|------|---------|-------------------|-------------|
| Li Chun | 立春 | Feb 4-5 | 1 (Feb) |
| Jing Zhe | 惊蛰 | Mar 5-6 | 2 (Mar) |
| Qing Ming | 清明 | Apr 4-5 | 3 (Apr) |
| Li Xia | 立夏 | May 5-6 | 4 (May) |
| Mang Zhong | 芒种 | Jun 5-6 | 5 (Jun) |
| Xiao Shu | 小暑 | Jul 7-8 | 6 (Jul) |
| Li Qiu | 立秋 | Aug 7-8 | 7 (Aug) |
| Bai Lu | 白露 | Sep 7-8 | 8 (Sep) |
| Han Lu | 寒露 | Oct 8-9 | 9 (Oct) |
| Li Dong | 立冬 | Nov 7-8 | 10 (Nov) |
| Da Xue | 大雪 | Dec 7-8 | 11 (Dec) |
| Xiao Han | 小寒 | Jan 5-6 | 12 (Jan) |

## API Reference

### calculateProfile(input: CalculationInput): NineStarKiProfile

Main calculation function. Returns a complete Nine Star Ki profile.

**Input:**
```typescript
interface CalculationInput {
  date: Date | string          // Birth date (required)
  time?: string                // Birth time in HH:MM format (optional)
  timezone?: string            // IANA timezone (optional)
  method?: CalculationMethod   // 'traditional' or 'chinese-ascending'
}
```

**Output:**
```typescript
interface NineStarKiProfile {
  principalStar: StarNumber    // 1-9
  monthStar: StarNumber        // 1-9
  energeticStar: StarNumber    // 1-9
  yearStar: StarNumber         // Alias for principalStar

  birthDate: Date
  birthTime?: string
  timezone?: string

  solarYear: number
  solarMonth: number           // 1-12
  solarYearStart: Date         // Li Chun date

  method: CalculationMethod
  warnings: BoundaryWarning[]
  calculatedAt: Date

  metadata: {
    principal: StarMetadata
    month: StarMetadata
    energetic: StarMetadata
  }
}
```

### formatProfile(profile: NineStarKiProfile): string

Format profile as shorthand notation (e.g., "5.7.3").

### validateInput(input: CalculationInput): ValidationResult

Validate input before calculation.

## Data Sources

- **Energetic Star Table**: `Research/energetic-star-81-combinations.json`
- **Month Star Patterns**: `Research/month-star-lookup-table.json`
- **Solar Terms**: Generated algorithmically with precise Li Chun dates for 2020-2030
- **Algorithm Documentation**: `Research/RESEARCH_SYNTHESIS.md` Appendix B

## Coverage

- **Years Supported**: 1900-2100
- **Timezone Support**: All IANA timezones (implementation uses standard Date objects)
- **Calculation Methods**: Traditional (default), Chinese ascending (future)

## Testing

Test cases from `Research/RESEARCH_SYNTHESIS.md` Appendix D:

```typescript
// Example test case
const testCase1 = calculateProfile({
  date: '1986-03-15',
  time: '12:00',
  timezone: 'UTC',
})

expect(testCase1.principalStar).toBe(5)
expect(testCase1.monthStar).toBe(7)
expect(testCase1.energeticStar).toBe(3)
expect(testCase1.solarYear).toBe(1986)
```

## Error Handling

The calculator throws errors for:
- Invalid dates
- Years outside 1900-2100 range
- Invalid time format (must be HH:MM)
- Invalid timezone strings

```typescript
try {
  const profile = calculateProfile({ date: 'invalid' })
} catch (error) {
  console.error(error.message) // "Invalid date"
}
```

## Implementation Notes

1. **Timezone Handling**: Currently uses standard JavaScript Date objects. For production, consider integrating a timezone library like `date-fns-tz` for more accurate timezone conversions.

2. **Solar Term Precision**: Li Chun dates for 2020-2030 are precise astronomical values. Other years use approximation formulas. For production use, replace with authoritative almanac data.

3. **Calculation Method**: Only "traditional" method is currently implemented. "Chinese ascending" method requires additional research (see RESEARCH_SYNTHESIS.md Section 5).

4. **Boundary Warnings**: Generated for dates within 3 days of any major solar term. Users should be informed when warnings are present.

## Future Enhancements

- [ ] Implement Chinese ascending calculation method
- [ ] Add precise solar term data for all years 1900-2100
- [ ] Integrate professional timezone library
- [ ] Add daily and hourly star calculations
- [ ] Support for custom almanac data imports

## References

- Research Synthesis: `Research/RESEARCH_SYNTHESIS.md`
- Pseudocode: RESEARCH_SYNTHESIS.md Appendix B
- Test Cases: RESEARCH_SYNTHESIS.md Appendix D
- 81-Combination Table: RESEARCH_SYNTHESIS.md Appendix C
