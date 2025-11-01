# Phase 2 Component Specifications

## Visual Reference Guide

This document provides detailed specifications for the Phase 2 components.

---

## 1. Confidence Indicator Component

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│  Calculation Confidence                      [Show breakdown] │
│                                                                │
│  98.5%                    ████████░                           │
│  Very High Confidence                                         │
│                                                                │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ ✓ Very confident in this calculation                   │  │
│  │                                                         │  │
│  │ Your birth is 15.3 days from Li Chun (立春)            │  │
│  │ (Feb 4, 1986), which affects your principal star       │  │
│  │ calculation.                                            │  │
│  └────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Expanded View

```
┌─────────────────────────────────────────────────────────────┐
│  Calculation Confidence                      [Hide details]   │
│                                                                │
│  98.5%                    ████████░                           │
│  Very High Confidence                                         │
│                                                                │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ ✓ Very confident in this calculation                   │  │
│  │ Your birth is 15.3 days from Li Chun (立春)            │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                                │
│  Confidence by Star                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ Principal ✓  │  │ Month Star ✓ │  │ Energetic ✓  │       │
│  │   98.5%      │  │   99.2%      │  │   98.5%      │       │
│  │ ████████░    │  │ ████████░    │  │ ████████░    │       │
│  │ Very High    │  │ Very High    │  │ Very High    │       │
│  │ 15.3 days... │  │ 18.7 days... │  │ 15.3 days... │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                                │
│  How Confidence is Calculated                                 │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ • Very High (95-100%): >7 days from any boundary       │  │
│  │ • High (85-94%): 3-7 days from boundary                │  │
│  │ • Medium (70-84%): 1-3 days from boundary              │  │
│  │ • Low (50-69%): Within 24 hours of boundary            │  │
│  │ • Very Low (<50%): <6 hours + time unknown             │  │
│  │                                                         │  │
│  │ Solar term boundaries are precise astronomical         │  │
│  │ moments. If your birth is very close to a boundary,    │  │
│  │ knowing your exact birth time is critical.             │  │
│  └────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Color Schemes

#### Very High Confidence (95-100%)
- Background: `bg-green-50`
- Border: `border-green-200`
- Text: `text-green-700`
- Progress Bar: `bg-green-500`
- Icon: ✓

#### High Confidence (85-94%)
- Background: `bg-green-50`
- Border: `border-green-200`
- Text: `text-green-600`
- Progress Bar: `bg-green-500`
- Icon: ✓

#### Medium Confidence (70-84%)
- Background: `bg-yellow-50`
- Border: `border-yellow-200`
- Text: `text-yellow-700`
- Progress Bar: `bg-yellow-500`
- Icon: ◐

#### Low Confidence (50-69%)
- Background: `bg-orange-50`
- Border: `border-orange-200`
- Text: `text-orange-700`
- Progress Bar: `bg-orange-500`
- Icon: ⚠

#### Very Low Confidence (<50%)
- Background: `bg-red-50`
- Border: `border-red-200`
- Text: `text-red-700`
- Progress Bar: `bg-red-500`
- Icon: ⚠

### Progress Bar

**8 blocks total**, each representing 12.5%:
- Filled: Colored blocks matching confidence level
- Empty: Light gray (`bg-sumi-100`)

Example: 75% = 6 filled blocks, 2 empty
```
████████░░
```

---

## 2. What-If Calculator Component

### Collapsed State

```
┌─────────────────────────────────────────────────────────────┐
│  What If You Were Born at a Different Time?     [Try it]     │
│                                                                │
│  Explore how your profile might change with different         │
│  birth times                                                  │
└─────────────────────────────────────────────────────────────┘
```

### Expanded State - No Change

```
┌─────────────────────────────────────────────────────────────┐
│  What If You Were Born at a Different Time?      [Hide]      │
│                                                                │
│  Explore how your profile might change...                     │
│                                                                │
│  Time adjustment:                           +3h               │
│  ├──────────────●──────────────┤                             │
│  -12h        Original        +12h                             │
│                                                                │
│  Alternative time: Mar 15, 1986 at 17:30 America/Los_Angeles │
│                                                                │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ ✓  SAME PROFILE                                         │  │
│  │    Your profile remains the same at this time           │  │
│  │                                                         │  │
│  │  Star      Original  Alternative  Status                │  │
│  │  Principal    5          5        ✓ SAME               │  │
│  │  Month        7          7        ✓ SAME               │  │
│  │  Energetic    3          3        ✓ SAME               │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                                │
│  [ Reset to Original Time ]                                   │
│                                                                │
│  Why does this matter?                                        │
│  If you're unsure of your exact birth time, this tool helps  │
│  you understand whether small time differences could affect   │
│  your profile...                                              │
└─────────────────────────────────────────────────────────────┘
```

### Expanded State - With Changes

```
┌─────────────────────────────────────────────────────────────┐
│  What If You Were Born at a Different Time?      [Hide]      │
│                                                                │
│  Time adjustment:                           -8h               │
│  ├──●──────────────────────────┤                             │
│  -12h        Original        +12h                             │
│                                                                │
│  Alternative time: Mar 15, 1986 at 06:30 America/Los_Angeles │
│                                                                │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ ⚠  DIFFERENT PROFILE                                    │  │
│  │    Your profile would change at this time               │  │
│  │                                                         │  │
│  │  Star      Original  Alternative  Status                │  │
│  │  Principal    5          6        ⚠ DIFF               │  │
│  │  Month        7          8        ⚠ DIFF               │  │
│  │  Energetic    3          4        ⚠ DIFF               │  │
│  │                                                         │  │
│  │  Why the difference?                                    │  │
│  │  At this time, your birth would fall before the         │  │
│  │  Li Chun (立春) boundary, changing your calculated      │  │
│  │  star(s).                                               │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                                │
│  [ Reset to Original Time ]                                   │
│                                                                │
│  Why does this matter?                                        │
│  If you're unsure of your exact birth time...                │
└─────────────────────────────────────────────────────────────┘
```

### Color Schemes

#### Same Profile (Green)
- Background: `bg-green-50`
- Border: `border-green-200`
- Text: `text-green-900`
- Icon: ✓
- Status: `text-green-700`

#### Different Profile (Red)
- Background: `bg-red-50`
- Border: `border-red-200`
- Text: `text-red-900`
- Icon: ⚠
- Status: `text-red-700`

#### Row Highlights
- Different row: `bg-red-100`
- Same row: `bg-white`

---

## Component Props

### ConfidenceIndicator

```typescript
interface ConfidenceIndicatorProps {
  confidence: ConfidenceBreakdown
}
```

**Required Data:**
```typescript
confidence: {
  overall: {
    level: 'very_high' | 'high' | 'medium' | 'low' | 'very_low',
    percentage: number,
    daysFromBoundary: number,
    nearestBoundary: {
      name: string,
      date: Date,
      affectedStar: 'principal' | 'month' | 'both'
    },
    recommendation: string
  },
  principal: { /* same structure */ },
  month: { /* same structure */ },
  energetic: { /* same structure */ }
}
```

### WhatIfCalculator

```typescript
interface WhatIfCalculatorProps {
  originalProfile: NineStarKiProfile
  birthDate: string
  timezone: string
}
```

**Required Data:**
```typescript
originalProfile: {
  principalStar: number,
  monthStar: number,
  energeticStar: number,
  birthDate: Date,
  // ... other NineStarKiProfile fields
}
birthDate: "1986-03-15"
timezone: "America/Los_Angeles"
```

---

## Responsive Breakpoints

### Mobile (< 768px)
- Single column layout
- Full width components
- Stacked confidence cards
- Larger touch targets for slider

### Tablet (768px - 1024px)
- 2-column grid for confidence cards
- Optimized spacing
- Comfortable slider size

### Desktop (> 1024px)
- 3-column grid for confidence cards
- Maximum width container
- Optimal reading line length

---

## Accessibility Features

### Keyboard Navigation
- All interactive elements tabbable
- Enter/Space activate buttons
- Arrow keys control slider
- Escape closes expanded sections

### Screen Readers
- Semantic HTML structure
- ARIA labels on controls
- Status announcements for changes
- Progress bar values announced

### Visual
- High contrast ratios (WCAG AAA)
- Never rely on color alone
- Icons + text for all states
- Clear focus indicators

---

## Animation & Transitions

### Expand/Collapse
```css
.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}
```

### Progress Bar Fill
```css
transition: width 0.3s ease-out;
```

### Slider Movement
```css
transition: transform 0.2s ease-out;
```

### Color Changes
```css
transition: background-color 0.2s ease-out,
            border-color 0.2s ease-out;
```

---

## State Management

### ConfidenceIndicator States
1. **Collapsed**: Default view showing overall confidence
2. **Expanded**: Shows per-star breakdown and methodology

### WhatIfCalculator States
1. **Collapsed**: Initial state, invitation to try
2. **Expanded at 0**: Showing original profile
3. **Expanded with offset**: Showing alternative calculation
4. **Showing differences**: Red highlighting for changed stars
5. **Showing same**: Green highlighting for unchanged stars

---

## Error Handling

### ConfidenceIndicator
- Gracefully handles missing confidence data (optional field)
- Shows placeholder if calculation fails
- Logs errors to console for debugging

### WhatIfCalculator
- Catches calculation errors
- Displays user-friendly error message
- Allows reset to working state
- Validates time inputs

---

## Performance Optimization

### ConfidenceIndicator
- Renders only when confidence data exists
- Lazy loads expanded content
- Memoizes color calculations
- Efficient re-render with React hooks

### WhatIfCalculator
- Debounces rapid slider movements (optional)
- Caches calculation results
- Efficient diff detection
- Minimal re-renders

---

## Testing Checklist

### Visual Testing
- [ ] All confidence levels render correctly
- [ ] Progress bars scale properly
- [ ] Colors match specification
- [ ] Icons display correctly
- [ ] Responsive layout works on all sizes
- [ ] Slider moves smoothly
- [ ] Comparison table formats correctly

### Functional Testing
- [ ] Confidence calculates accurately
- [ ] What-if recalculates in real-time
- [ ] Differences detected correctly
- [ ] Boundary crossings identified
- [ ] Reset button works
- [ ] Expand/collapse animations smooth
- [ ] Keyboard navigation functional
- [ ] Screen reader accessible

### Edge Cases
- [ ] Birth on exact boundary
- [ ] Very high confidence (>99%)
- [ ] Very low confidence (<30%)
- [ ] No birth time provided
- [ ] Slider at extremes (±12h)
- [ ] Multiple boundary crossings
- [ ] Timezone edge cases

---

## File Locations

### Components
- `/src/components/ConfidenceIndicator.tsx`
- `/src/components/WhatIfCalculator.tsx`

### Types
- `/src/types/nine-star-ki.ts`
- `/src/types/index.ts`

### Logic
- `/src/lib/calculator/calculation-engine.ts`

### Integration
- `/src/components/ProfileResult.tsx`

### Exports
- `/src/components/index.ts`

---

**Last Updated**: October 31, 2025
**Component Version**: 1.0.0
