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

### Background Red Tones (HL7 International Inspired)

```css
--hl7-red-soft:    #d45d62  /* Soft red for backgrounds */
--hl7-red-lighter: #e89093  /* Lighter red accent */
--hl7-coral:       #e67378  /* Coral red tone */
```

## Usage in Application

### Background Gradient
- Main body: Warm red gradient (HL7 International inspired)
  ```css
  background: linear-gradient(135deg, #c85a5f 0%, #8b3a3e 50%, #5d2729 100%);
  ```
  - Start: Soft rose red (#c85a5f)
  - Middle: Deep burgundy (#8b3a3e)
  - End: Rich dark red (#5d2729)
  - Creates a professional, warm, eye-comfortable gradient

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

## Design Rationale

### Background Color Choice

The red-toned background gradient was chosen to:
1. **Align with HL7 International branding** - Red is the primary HL7 color globally
2. **Provide eye comfort** - Softer, desaturated reds (#c85a5f to #5d2729) instead of vibrant red
3. **Create professional warmth** - Burgundy and rose tones convey healthcare professionalism
4. **Ensure readability** - Dark red provides good contrast with white panels
5. **Match HL7 Portugal identity** - Incorporates the official red (#ec2227) in softer form

### Color Psychology in Healthcare
- **Red**: Energy, urgency, importance (appropriate for critical medical data)
- **Warm tones**: Trust, stability, professionalism
- **Gradient depth**: Sophistication and modern design

## Comparison

### Original Colors
- Background: Generic purple-blue gradient
- Primary: Purple #667eea
- Secondary: Purple #764ba2

### Updated Colors
- Background: HL7-inspired red gradient (rose to burgundy to dark red) ✓
- Primary: HL7 Red #ec2227 ✓
- Secondary: HL7 Blue #2f5aae ✓
- Segments: Coordinated red/blue/purple scheme ✓

---

**Updated**: January 2025
**Based on**: HL7 Portugal official branding (https://hl7.pt)
