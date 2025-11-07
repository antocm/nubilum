# Nubilum Color Scheme - HL7 Portugal Branding

## Color Palette

### Primary HL7 Portugal Colors

```css
--hl7-red:    #ec2227  /* Primary accent - vibrant red */
--hl7-blue:   #2f5aae  /* Secondary accent - deep blue */
--hl7-purple: #9463ae  /* Tertiary accent - purple */
```

### Supporting Colors

```css
--hl7-bg-light: #f4f5f7  /* Light background */
--hl7-bg-dark:  #121212  /* Dark background */
--hl7-text:     #272626  /* Primary text */
--hl7-text-light: #666666  /* Secondary text */
--hl7-border:   #e2e8f0  /* Border color */
```

## Usage in Application

### Background Gradient
- Main body: Blue to Purple gradient
  ```css
  background: linear-gradient(135deg, #2f5aae 0%, #9463ae 100%);
  ```

### Buttons
- **Primary Button**: Red to Blue gradient
  ```css
  background: linear-gradient(135deg, #ec2227 0%, #2f5aae 100%);
  ```
- **Secondary Button**: Blue border and text on white
- **Version Badge**: Red background

### HL7 Segment Highlighting

| Segment | Color | Opacity | Description |
|---------|-------|---------|-------------|
| MSH | Blue #2f5aae | 12% | Message Header |
| PID | Red #ec2227 | 12% | Patient Identification |
| PV1 | Purple #9463ae | 12% | Patient Visit |
| OBR | Blue #2f5aae | 18% | Observation Request |
| OBX | Purple #9463ae | 18% | Observation Result |
| NK1 | Red #ec2227 | 18% | Next of Kin |
| EVN/ORC | Blue #2f5aae | 8% | Event/Order Common |

### Field Separators
- **Field Separator (|)**: Blue #2f5aae
- **Component Separator (^)**: Red #ec2227

## Full-Screen Layout Changes

### Before
- Fixed max-width: 1400px
- Fixed heights: 400px min, 600px max
- Large padding: 20-24px
- Scrolling body

### After
- Full viewport height utilization
- Flexbox layout with `flex: 1` for content areas
- Compact padding: 12-16px
- No body scrolling - content scrolls within panels
- `overflow: hidden` on html/body
- All panels use available space dynamically

## Design Philosophy

1. **HL7 Portugal Brand Identity**: Uses official colors from hl7.pt
2. **Medical Context**: Clean, professional appearance suitable for healthcare
3. **Space Efficiency**: Maximizes usable area for HL7 message viewing
4. **Visual Hierarchy**: Color coding helps identify segment types quickly
5. **Accessibility**: High contrast ratios for text readability

## Comparison

### Old Colors
- Primary: Generic purple #667eea
- Secondary: Generic purple #764ba2
- Segments: Random pastel colors

### New Colors
- Primary: HL7 Red #ec2227 ✓
- Secondary: HL7 Blue #2f5aae ✓
- Segments: Coordinated blue/red/purple scheme ✓

---

**Updated**: January 2025
**Based on**: HL7 Portugal official branding (https://hl7.pt)
