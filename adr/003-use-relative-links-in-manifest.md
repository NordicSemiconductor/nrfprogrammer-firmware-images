# ADR 003: use relative links in manifest JSON

The links to files in the `manifest.json` are relative, the full URL can be
constructed by combining the full URL of the `manifest.json` with the relative
link.

```javascript
console.log(
  new URL(
    // relative URL from manifest.json
    "peripheral_lbs_dfu_application.zip",
    // Absolute URL as base
    "https://nordicsemiconductor.github.io/nrfprogrammer-firmware-images/manifest.json"
  ).href
);
// https://nordicsemiconductor.github.io/nrfprogrammer-firmware-images/peripheral_lbs_dfu_application.zip
```
