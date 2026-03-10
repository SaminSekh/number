# Business Marketing Tool - Number Generator

## Latest Update: Fix for "Could not determine format"
**Status: Fixed**
The generation logic now uses a "Smart Probe" strategy. It automatically tests for valid mobile number patterns (length and prefixes) for *any* selected country, ensuring generated numbers are mathematically valid even without internal metadata examples.

## Features
- **All Countries Supported**: Select any country from the dropdown.
- **Strict Validation**: Validates number format using Google's `libphonenumber`.
- **Social Checks**: Direct links to WhatsApp (`wa.me`) and Telegram (`t.me`).
- **Export**: Download as `.xlsx` with social links included.

## How to Uses
1.  Open `index.html`.
2.  Select a country.
3.  Enter quantity (standard mobile numbers are generated).
4.  Click **Generate**.
5.  Use **Export** to save the list.
