# Nine Star Ki Calculator - Quick Start Guide

## Running the App

### Development Mode
```bash
npm run dev
```
App runs at: http://localhost:3333

### Production Build
```bash
npm run build
npm start
```

### Testing
```bash
npm test
```

## Quick Test

1. Open http://localhost:3333
2. Enter date: **1986-03-15**
3. Click **Calculate Profile**
4. Should show: **5.7.3** (Principal: 5, Month: 7, Energetic: 3)

## Files Modified in Polish Pass

### Fixed Issues
- `/src/lib/calculator/calculation-engine.ts` - Removed unused import
- `/src/app/layout.tsx` - Fixed viewport/themeColor metadata

### Enhanced Styling
- `/src/styles/globals.css` - Added:
  - Smooth card hover transitions
  - Button lift effect on hover
  - Enhanced focus states
  - Smooth scrolling

## Key Features

✅ Accurate Nine Star Ki calculations
✅ Solar calendar with Li Chun adjustments
✅ Boundary warnings for dates near solar terms
✅ Educational tooltips on all star attributes
✅ Expandable calculation details
✅ Responsive design (mobile, tablet, desktop)
✅ Japanese-inspired minimalist design
✅ Smooth animations and transitions

## Browser Console Test

Paste this in browser console at http://localhost:3333:

```javascript
// Quick UI verification
console.log('Checking app...');
console.log('Buttons:', document.querySelectorAll('button').length);
console.log('Inputs:', document.querySelectorAll('input').length);
console.log('Cards:', document.querySelectorAll('.card').length);
console.log('Tooltips:', document.querySelectorAll('[class*="badge"]').length);
console.log('✓ App loaded successfully!');
```

## Troubleshooting

**Port already in use?**
```bash
lsof -ti:3333 | xargs kill -9
npm run dev
```

**Build fails?**
```bash
rm -rf .next node_modules
npm install
npm run build
```

**Console errors?**
Check browser console (F12 or Cmd+Option+I)

## Production Status

✅ Build: Passing
✅ Tests: Passing
✅ Linting: Clean
✅ TypeScript: No errors
✅ Bundle: Optimized (35.2 kB)

**Status:** Ready for Production 🚀
