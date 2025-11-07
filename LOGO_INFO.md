# HL7 Portugal Logo Information

## Logo File

**Location**: `nubilum/static/hl7pt_logo.png`

**Source**: https://www.hl7.pt/wp-content/uploads/2021/04/HL7-logo.png

**Specifications**:
- Format: PNG with transparency (RGBA)
- Dimensions: 134 x 68 pixels
- File size: 2.1 KB
- Aspect ratio: ~2:1 (wider than tall)

## CSS Styling

The logo is displayed in the application header with the following CSS:

```css
.logo {
    height: 50px;
    width: auto;
    max-width: 120px;
    object-fit: contain;
}
```

This ensures:
- Logo maintains its aspect ratio
- Height is fixed at 50px (good for header consistency)
- Width adjusts automatically but won't exceed 120px
- Logo scales proportionally

## Display

The logo appears in the top-left corner of the application header, next to the "Nubilum" title and "HL7 Portugal Message Anonymization Tool" subtitle.

## License

The HL7 Portugal logo is the property of HL7 Portugal. This application uses it for branding purposes to indicate official affiliation with HL7 Portugal.

## Fallback Behavior

If the logo fails to load for any reason, it will be hidden from display (via onError handler in React), and the application title will still be visible.

---

**Last Updated**: January 2025
**Logo Downloaded**: November 7, 2025
