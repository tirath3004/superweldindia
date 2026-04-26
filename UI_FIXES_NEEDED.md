# UI/UX Fixes Required

## 1. Hero Section Video Visibility
**File:** `app/page.tsx` (lines 56-72)

**Issues:**
- Video has `opacity-70` making it dim
- Multiple dark gradient overlays (90%, 70%, 80% opacity) completely cover the video

**Fix:**
```tsx
// Remove opacity from video:
className="w-full h-full object-cover"  // Remove opacity-70

// Reduce overlay darkness:
<div className="absolute inset-0 bg-linear-to-r from-superweld-dark/80 via-superweld-dark/50 to-transparent" />
<div className="absolute inset-0 bg-linear-to-t from-superweld-dark/70 via-transparent to-superweld-dark/30" />
```

## 2. Section Transition - White Gap
**File:** `app/page.tsx` (lines 118-128)

**Issue:** SVG curve fill uses light background color but transitions to dark section

**Fix:**
```tsx
<path
  d="M0 120L1440 120L1440 60C1440 60 1200 0 720 0C240 0 0 60 0 60L0 120Z"
  fill="#0F0F0F"  // Change from var(--color-superweld-bg) to dark color
/>
```

## 3. Text Contrast Issues - Dark Text on Dark Backgrounds

### Dark Sections Using `section-dark` class need light text:

**File:** `app/page.tsx`

| Line | Current | Should Be |
|------|---------|-----------|
| 219 | `text-superweld-text` | `text-superweld-textLight` |
| 278 | `text-superweld-text` | `text-superweld-textLight` |
| 317 | `text-superweld-text` | `text-superweld-textLight` |
| 389 | `text-superweld-text` | `text-superweld-textLight` |
| 392 | `text-superweld-textMuted` | `text-superweld-textMutedLight` |
| 471 | `text-superweld-text` | `text-superweld-textLight` |
| 474 | `text-superweld-textMuted` | `text-superweld-textMutedLight` |
| 495 | `text-superweld-text` | `text-superweld-textLight` |
| 496 | `text-superweld-textMuted` | `text-superweld-textMutedLight` |
| 529 | `text-superweld-text` | `text-superweld-textLight` |
| 532 | `text-superweld-textMuted` | `text-superweld-textMutedLight` |
| 549 | `text-superweld-text` | `text-superweld-textLight` |
| 550 | `text-superweld-textMuted` | `text-superweld-textMutedLight` |

## 4. Menu Bar Text Color
**File:** `components/sections/navbar.tsx`

**Current:** Links use `text-white/90` 
**Status:** Should be visible on dark backgrounds

**If still not visible, ensure:**
- Nav links have `text-white` not `text-white/90` for full opacity
- Mobile menu uses `text-white` 

## 5. Old Orange Color References Still Present
Multiple files still use `superweld-orange` instead of new `superweld-primary` (maroon):
- Product cards
- Buttons
- Icons
- Section labels

**Quick Fix Command:**
Find and replace all `superweld-orange` → `superweld-primary` 
Find and replace all `superweld-orangeHover` → `superweld-primaryHover`

## Build Verification
After fixes, run:
```bash
npm run build
```

To test the site locally:
```bash
npm run dev
```
