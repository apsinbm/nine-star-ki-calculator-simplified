# Phase 2 Roadmap

## Overview

Phase 1 has established a solid foundation with complete project scaffolding, type-safe architecture, and a beautiful UI. Phase 2 focuses on integrating accurate research data, refining calculations, and adding enhanced features.

## Critical Path: Research Integration

### 1. Li Chun Date Integration ⭐ **HIGHEST PRIORITY**

**Current State**: Placeholder dates for 2020-2025

**Phase 2 Goal**: Comprehensive historical and future Li Chun dates

**Tasks**:

- [ ] Extract Li Chun dates from research document
- [ ] Extend date range to 1900-2100 minimum
- [ ] Include precise times (hour and minute)
- [ ] Consider time zone implications
- [ ] Update `src/lib/data/solar-calendar.ts`
- [ ] Add validation tests for boundary dates

**Acceptance Criteria**:
- Accurate Li Chun dates for at least 200 years
- Precision to the minute (or astronomical calculation)
- Verified against reference sources

**Files to Update**:
- `src/lib/data/solar-calendar.ts` (LI_CHUN_DATES object)

---

### 2. Year Star Mapping ⭐ **HIGHEST PRIORITY**

**Current State**: Placeholder mappings for 2020-2025

**Phase 2 Goal**: Complete year star lookup table

**Tasks**:

- [ ] Extract year star patterns from research document
- [ ] Map solar years to year stars (1900-2100+)
- [ ] Verify 9-year cycle pattern
- [ ] Update `src/lib/data/star-tables.ts`
- [ ] Add regression tests with known profiles

**Pattern Expected**:
```
Year stars follow a 9-year cycle, typically:
..., 9, 8, 7, 6, 5, 4, 3, 2, 1, 9, 8, ...
```

**Files to Update**:
- `src/lib/data/star-tables.ts` (YEAR_STAR_TABLE object)

---

### 3. Month Star Pattern Verification ⭐ **HIGH PRIORITY**

**Current State**: Placeholder patterns (may be accurate or not)

**Phase 2 Goal**: Verify and correct month star patterns

**Tasks**:

- [ ] Review month star patterns from research document
- [ ] Verify each year star's month pattern
- [ ] Test against known accurate profiles
- [ ] Update if patterns differ from current implementation
- [ ] Document the pattern logic

**Current Implementation**:
```typescript
// Each year star has a specific pattern for 12 solar months
// Example for Year Star 1: [8,7,6,5,4,3,2,1,9,8,7,6]
```

**Files to Update**:
- `src/lib/data/star-tables.ts` (MONTH_STAR_TABLE object)

---

### 4. Solar Month Calculation ⭐ **HIGH PRIORITY**

**Current State**: Approximate Gregorian month mapping

**Phase 2 Goal**: Accurate solar month based on 24 solar terms

**Background**:
Solar months are defined by the 24 solar terms (节气):
- Month 1: Li Chun to Jing Zhe (Feb 4/5 - Mar 5/6)
- Month 2: Jing Zhe to Qing Ming (Mar 5/6 - Apr 4/5)
- ... and so on

**Tasks**:

- [ ] Extract solar term dates from research document
- [ ] Implement solar month determination function
- [ ] Replace `getSolarMonthApproximate()` in calculator
- [ ] Create lookup table or calculation algorithm
- [ ] Add comprehensive tests

**Implementation Options**:

**Option A**: Lookup Table (Recommended for Phase 2)
```typescript
// Store precise dates for each solar term per year
const SOLAR_TERMS_2024 = {
  liChun: new Date('2024-02-04'),
  jingZhe: new Date('2024-03-05'),
  qingMing: new Date('2024-04-04'),
  // ... etc
}
```

**Option B**: Astronomical Calculation
- Implement algorithm for calculating solar terms
- More complex but extends to any year
- Consider for Phase 3

**Files to Update**:
- `src/lib/data/solar-calendar.ts` (new solar terms data)
- `src/lib/calculator/nine-star-calculator.ts` (replace approximate function)

---

### 5. Energetic Star Formula Verification 🔹 **MEDIUM PRIORITY**

**Current State**: Using formula `10 - (yearStar + monthStar)`

**Phase 2 Goal**: Verify accuracy against research document

**Tasks**:

- [ ] Confirm energetic star calculation formula
- [ ] Test against multiple known profiles
- [ ] Update if formula differs
- [ ] Document the verified formula

**Current Formula**:
```typescript
energeticStar = 10 - (yearStar + monthStar)
// Normalized to 1-9 range
```

**Files to Update**:
- `src/lib/data/star-tables.ts` (calculateEnergeticStar function)

---

### 6. Star Metadata Enhancement 🔹 **MEDIUM PRIORITY**

**Current State**: Placeholder descriptions and characteristics

**Phase 2 Goal**: Authentic, culturally accurate star information

**Tasks**:

- [ ] Extract accurate star descriptions from research
- [ ] Update characteristics and keywords
- [ ] Add detailed interpretations
- [ ] Verify element and trigram associations
- [ ] Update direction mappings
- [ ] Consider adding:
  - Seasonal associations
  - Compatible/incompatible stars
  - Career tendencies
  - Relationship styles

**Files to Update**:
- `src/lib/data/star-metadata.ts` (STAR_METADATA object)

---

## Testing & Validation

### 7. Comprehensive Test Suite 🔹 **MEDIUM PRIORITY**

**Tasks**:

- [ ] Add test cases with known accurate profiles
  - Historical figures with documented profiles
  - Test cases from research document
  - Personal verified profiles
- [ ] Test Li Chun boundary dates
  - Born day before Li Chun
  - Born on Li Chun day
  - Born day after Li Chun
- [ ] Test edge cases
  - First supported year
  - Last supported year
  - Each month of the year
- [ ] Add integration tests
  - Full profile calculation flow
  - UI component rendering with real data
- [ ] Performance tests
  - Bulk calculation speed
  - Memory usage

**Files to Create/Update**:
- `src/lib/calculator/__tests__/` (add more test files)
- `src/lib/data/__tests__/` (new test directory)

---

## UI/UX Enhancements

### 8. Enhanced Star Information Display 🔸 **LOW PRIORITY**

**Tasks**:

- [ ] Add expandable star detail sections
- [ ] Show element relationships and cycles
- [ ] Visualize trigram symbols
- [ ] Add star compatibility information
- [ ] Show keywords and associations

**New Components**:
- `StarDetail.tsx` (expanded star information)
- `ElementCycle.tsx` (five elements visualization)
- `TrigramDisplay.tsx` (I Ching trigram visual)

---

### 9. Profile Export & Sharing 🔸 **LOW PRIORITY**

**Tasks**:

- [ ] Add print-friendly profile view
- [ ] PDF export functionality
- [ ] Shareable link generation
- [ ] Copy profile to clipboard
- [ ] Social media share buttons (optional)

**New Components**:
- `ExportProfile.tsx`
- `ShareButtons.tsx`

---

### 10. Advanced Features 🔸 **LOW PRIORITY / FUTURE**

**Potential Features**:

- [ ] **Profile Comparison**: Compare two profiles for compatibility
- [ ] **Historical Timeline**: Show star transitions over time
- [ ] **Element Balance**: Visualize element distribution in profile
- [ ] **Lucky/Unlucky Directions**: Based on current year
- [ ] **Annual Forecast**: Nine star positions for current year
- [ ] **Profile History**: Save and view past calculations (requires backend)

---

## Technical Improvements

### 11. Performance Optimization 🔸 **LOW PRIORITY**

**Tasks**:

- [ ] Memoize calculation results
- [ ] Implement caching for repeat queries
- [ ] Optimize bundle size
- [ ] Add loading states and skeleton screens
- [ ] Lazy load non-critical components

---

### 12. Accessibility Audit 🔹 **MEDIUM PRIORITY**

**Tasks**:

- [ ] Screen reader testing
- [ ] Keyboard navigation audit
- [ ] Color contrast verification
- [ ] ARIA label improvements
- [ ] Focus management
- [ ] Automated accessibility tests

**Tools**:
- axe-core
- Lighthouse audit
- NVDA/JAWS testing

---

### 13. Internationalization (i18n) 🔸 **FUTURE**

**Tasks**:

- [ ] Add i18n framework (next-intl)
- [ ] Support English, Japanese, Chinese
- [ ] Locale-aware date formatting
- [ ] Translate star descriptions
- [ ] RTL support consideration

---

## Documentation Updates

### 14. User Guide 🔹 **MEDIUM PRIORITY**

**Tasks**:

- [ ] Create comprehensive user guide
- [ ] Explain Nine Star Ki concepts
- [ ] Interpret each star's meaning
- [ ] Provide usage examples
- [ ] FAQ section

**New Files**:
- `docs/user-guide.md`
- `docs/faq.md`

---

### 15. API Documentation 🔸 **FUTURE**

If adding API layer:

- [ ] Document all endpoints
- [ ] Request/response examples
- [ ] Authentication guide
- [ ] Rate limiting info

---

## Deployment & Infrastructure

### 16. Production Deployment 🔹 **MEDIUM PRIORITY**

**Tasks**:

- [ ] Deploy to Vercel/Netlify
- [ ] Set up custom domain
- [ ] Configure environment variables
- [ ] Set up analytics (privacy-friendly)
- [ ] Add error tracking (Sentry, optional)
- [ ] Configure CSP headers
- [ ] Set up monitoring

---

### 17. CI/CD Pipeline 🔸 **LOW PRIORITY**

**Tasks**:

- [ ] GitHub Actions for testing
- [ ] Automated deployment on merge
- [ ] TypeScript type checking in CI
- [ ] Lint checking in CI
- [ ] Test coverage requirements
- [ ] Preview deployments for PRs

---

## Phase 2 Execution Plan

### Sprint 1: Research Integration (Week 1-2)

**Focus**: Data accuracy

1. Li Chun dates integration
2. Year star mapping
3. Month star verification
4. Solar month calculation

**Deliverable**: Accurate calculations for wide date range

---

### Sprint 2: Testing & Validation (Week 3)

**Focus**: Verification

1. Add comprehensive test cases
2. Test against known profiles
3. Boundary condition testing
4. Fix any discovered issues

**Deliverable**: High confidence in calculation accuracy

---

### Sprint 3: Enhancement & Polish (Week 4)

**Focus**: User experience

1. Star metadata enhancement
2. UI improvements
3. Accessibility audit
4. Documentation updates

**Deliverable**: Beautiful, accurate, accessible application

---

### Sprint 4: Deployment (Week 5)

**Focus**: Production readiness

1. Production deployment
2. Performance optimization
3. Monitoring setup
4. User guide completion

**Deliverable**: Live, production-ready application

---

## Success Metrics

### Phase 2 Goals

- [ ] ✅ 100% accurate calculations verified against reference data
- [ ] ✅ Li Chun dates for 200+ year range
- [ ] ✅ Authentic star descriptions and characteristics
- [ ] ✅ Comprehensive test coverage (>80%)
- [ ] ✅ Deployed to production with custom domain
- [ ] ✅ Full documentation (user guide + architecture)
- [ ] ✅ Accessibility score >90 (Lighthouse)

---

## Research Document Integration Checklist

When you receive the Nine Star Ki research document, extract:

### Required Data

- [ ] **Li Chun Dates**
  - Date range
  - Precision (day/hour/minute)
  - Time zone reference

- [ ] **Year Star Mappings**
  - Pattern explanation
  - Historical year examples
  - Verification method

- [ ] **Month Star Patterns**
  - 12-month pattern for each year star
  - Solar month definitions
  - Example calculations

- [ ] **Solar Terms**
  - 24 solar term dates
  - Calculation method or lookup table
  - Date range coverage

- [ ] **Star Characteristics**
  - Element associations
  - Personality traits
  - Keywords and themes
  - Direction mappings
  - Trigram associations

- [ ] **Calculation Formulas**
  - Energetic star formula
  - Any adjustment rules
  - Edge case handling

- [ ] **Verification Examples**
  - Known accurate profiles
  - Test cases with expected results
  - Historical figure examples

---

## Questions for Research Document

Have these questions ready when reviewing the research:

1. **Li Chun**: Is time zone considered? UTC or local time?
2. **Solar Months**: Are they fixed dates or calculated astronomically?
3. **Energetic Star**: Confirm the calculation formula
4. **Gender Differences**: Are there gender-specific calculations?
5. **Leap Years**: Any special handling for leap years?
6. **Historical Range**: How far back can calculations go?
7. **Element Cycle**: Confirm element relationships (生克 shēng/kè)
8. **Star Meanings**: Source of authentic descriptions?

---

## Phase 3 Preview (Future Vision)

Potential features for Phase 3:

- User authentication and profile saving
- Compatibility analysis between two people
- Annual forecasting based on current year
- Personalized insights and recommendations
- Element balancing suggestions
- Mobile native app (React Native/Capacitor)
- API for third-party integrations
- Community features (optional)

---

**Ready to Begin Phase 2**: Upload research document to proceed with data integration.
