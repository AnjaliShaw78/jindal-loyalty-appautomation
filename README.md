# Jindal Loyalty Programme Mobile Automation

This project is set up as a real-device Android Appium + WebDriverIO framework for the Jindal Loyalty Programme app.

## Prerequisites

- Java JDK installed
- Android SDK installed and configured
- Appium server installed
- USB debugging enabled on the Android phone
- The real device connected via USB and visible in `adb devices`
- The Jindal app already installed from Google Play Store

## Setup

1. Install Node.js dependencies:
   npm install
2. Start Appium:
   appium
3. Connect your Android device and verify:
   adb devices
4. Set the package/activity if needed:
   export APP_PACKAGE=com.jindalindia.loyalty
   export APP_ACTIVITY=.MainActivity

## Run tests

npm test

## Notes

- This project intentionally does not depend on an APK or emulator because you requested a real-device flow.
- Exact app locators must be validated with Appium Inspector or UIAutomatorViewer against the installed app on your phone.
- The sample selectors are placeholders derived from the typical app naming pattern and should be confirmed against the real mobile UI.
