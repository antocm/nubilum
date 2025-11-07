# Nubilum Header Layout

## Visual Structure

```
┌─────────────────────────────────────────────────────────────────────┐
│  [HL7 PT Logo]  Nubilum                                    [v1.0.0] │
│                 HL7 Portugal Message Anonymization Tool             │
└─────────────────────────────────────────────────────────────────────┘
```

## Components

### Left Section (`.header-left`)
1. **HL7 Portugal Logo** (`.logo`)
   - Official logo from hl7.pt
   - Dimensions: 134x68 native, displayed at 50px height
   - Auto-width with 120px max-width
   - Maintains aspect ratio

2. **Application Title** (`.header-text`)
   - **Main title**: "Nubilum" (24px, HL7 text color)
   - **Subtitle**: "HL7 Portugal Message Anonymization Tool" (13px, light gray)

### Right Section
- **Version Badge** (`.version`)
  - Shows "v1.0.0"
  - Red background (HL7 red: #ec2227)
  - White text
  - Pill shape (border-radius: 20px)

## CSS Layout

```css
.header {
    display: flex;
    justify-content: space-between;  /* Logo/title left, version right */
    align-items: center;
    background: white;
    padding: 16px 24px;
    gap: 20px between logo and title
}
```

## Spacing

- Header padding: 16px vertical, 24px horizontal
- Gap between logo and title: 20px
- Logo to title alignment: center
- Header margin-bottom: 12px

## Responsive Behavior

The header maintains its layout on all screen sizes:
- Logo always visible (unless load fails)
- Title and subtitle stack vertically
- Version badge stays on the right
- All elements aligned to center vertically

## Color Scheme

- Background: White (#ffffff)
- Logo: Original HL7 PT colors (red, blue, white)
- Title text: Dark gray (#272626)
- Subtitle text: Medium gray (#666666)
- Version badge: HL7 red background (#ec2227) with white text

## Professional Appearance

The header creates a professional, healthcare-appropriate appearance:
- ✓ Official branding (HL7 Portugal logo)
- ✓ Clear hierarchy (logo → name → description)
- ✓ Version visibility for transparency
- ✓ Clean, modern design
- ✓ Consistent with HL7 Portugal brand identity

---

**Layout Type**: Flexbox with space-between
**Total Height**: ~82px (with padding and logo)
**Mobile Friendly**: Yes
**Accessibility**: Logo has alt text, semantic header element
