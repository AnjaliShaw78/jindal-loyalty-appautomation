# 📱 Jindal Loyalty Programme — Mobile Automation

![Appium](https://img.shields.io/badge/Appium-2.x-662D91?logo=appium\&logoColor=white)
![WebdriverIO](https://img.shields.io/badge/WebdriverIO-9.x-EA5906?logo=webdriverio\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript\&logoColor=black)
![Android](https://img.shields.io/badge/Platform-Android-3DDC84?logo=android\&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js\&logoColor=white)
![POM](https://img.shields.io/badge/Framework-Page%20Object%20Model-blue)
![Allure](https://img.shields.io/badge/Report-Allure-purple)

> 🚀 A real-device Android mobile automation framework built using **Appium + WebDriverIO + JavaScript**, following the **Page Object Model (POM)** design pattern.

---

## 📌 Project Overview

This project automates the **Jindal Loyalty Programme Android application** using a **physical Android device** connected through USB.

The framework is designed to automate and validate important user journeys within the application, including:

* 🔐 User Login
* 📄 Document Upload
* 🏪 Point of Sale Selection
* 🏠 Home Screen Navigation
* 🎁 Loyalty Programme Navigation
* 💰 Loyalty Points Validation
* 🎁 Rewards Navigation
* 📊 Application Content Validation

The automation framework uses **Appium 2.x**, **UiAutomator2**, and **WebDriverIO** to interact with the Android application.

---

## ✨ Key Features

* 📱 Real Android device automation
* 🤖 Appium 2.x integration
* 🚗 WebDriverIO automation framework
* 🟨 JavaScript-based test scripts
* 🧱 Page Object Model architecture
* 🔐 Login flow automation
* 📄 Document upload automation
* 🏪 Point of Sale selection
* 🎁 Loyalty Programme validation
* 💰 Loyalty points validation
* 🎁 Rewards navigation and validation
* 📸 Screenshot capture for debugging
* 📊 Allure test reporting
* 🔍 Failure debugging support
* ♻️ Reusable page objects and methods
* ⚙️ Configurable Appium capabilities

---

## 🔄 Automation Flow

```text
📱 Launch Application
        ↓
🔐 Login
        ↓
📄 Upload Document
        ↓
🏪 Select Point of Sale
        ↓
🏠 Navigate to Home Screen
        ↓
🎁 Open Loyalty Programme
        ↓
💰 Validate Loyalty Points
        ↓
🎁 Navigate to Rewards
        ↓
📊 Validate Reward Information
        ↓
✅ Test Completed
```

---

## 🏗️ Framework Architecture

The project follows the **Page Object Model (POM)** design pattern.

```text
                    ┌──────────────────┐
                    │   Test Scripts   │
                    │   tests/*.spec   │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   Page Objects   │
                    │    pages/*.js    │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Mobile Elements  │
                    │  & App Actions   │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Appium + WDIO    │
                    │ UiAutomator2     │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │  Android Device  │
                    └──────────────────┘
```

---

## 📂 Project Structure Explained

### 🧱 `pages/`

Contains the **Page Object Model files**.

Each page contains:

* Mobile element locators
* Page-specific actions
* Reusable methods
* Screen interaction logic

Example:

```text
pages/
├── LoginPage.js
├── HomePage.js
├── LoyaltyPage.js
└── RewardsPage.js
```

This approach keeps the test scripts clean and improves maintainability.

---

### 🧪 `tests/`

Contains all automation test scenarios.

Each `.spec.js` file focuses on a specific application feature.

```text
tests/
├── login.spec.js
├── loyalty.spec.js
└── rewards.spec.js
```

---

### 🛠️ `utils/`

Contains reusable helper functions used across multiple test cases.

Examples include:

* Waiting for elements
* Screenshot utilities
* Common reusable actions
* Data generation helpers

---

### 📊 `allure-results/`

Stores the raw results generated after test execution.

These results are used to generate the Allure report.

---

### 📈 `allure-report/`

Contains the generated HTML report with information such as:

* Total test cases
* Passed tests
* Failed tests
* Test duration
* Error details
* Screenshots and attachments

---

### 📸 `screenshots/`

Stores screenshots captured during test execution, especially when a test fails.

---

### 🔄 `.github/workflows/`

Contains GitHub Actions workflow files used for CI/CD automation.

The workflow can be configured to run tests automatically when:

* Code is pushed to the repository
* A pull request is created
* A workflow is manually triggered

---

## 🛠️ Tech Stack

| Technology      | Purpose                           |
| --------------- | --------------------------------- |
| 📱 Android      | Mobile application platform       |
| 🤖 Appium       | Mobile automation                 |
| 🚗 WebDriverIO  | Automation framework              |
| 🟨 JavaScript   | Programming language              |
| 🟢 Node.js      | Runtime environment               |
| 🧱 POM          | Framework architecture            |
| 📊 Allure       | Test reporting                    |
| 🔧 ADB          | Android device communication      |
| 🐙 Git & GitHub | Version control and collaboration |

---

## 📋 Prerequisites

Before running the automation framework, ensure that the following are installed and configured:

* Java JDK
* Node.js
* Android SDK
* Android Platform Tools
* Appium 2.x
* UiAutomator2 driver
* Allure Commandline
* Git

You also need:

* 📱 A physical Android device
* 🔌 A USB cable
* 🐞 USB Debugging enabled
* 📲 Jindal Loyalty Programme app installed on the device

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone <your-repository-url>
cd JINDAL_LOYALTY_AUTOMATION
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Install Appium UiAutomator2 Driver

```bash
appium driver install uiautomator2
```

Verify the installed drivers:

```bash
appium driver list
```

### 4️⃣ Connect Your Android Device

Enable **Developer Options** and **USB Debugging** on your Android device.

Connect the device via USB and run:

```bash
adb devices
```

Expected output:

```text
List of devices attached
XXXXXXXXXXXX    device
```

If the device appears with the status `device`, it is successfully connected.

---

## 📲 Application Configuration

The application should already be installed on the connected Android device.

Set the application package and activity if required:

### macOS / Linux

```bash
export APP_PACKAGE=com.jindalindia.loyalty
export APP_ACTIVITY=.MainActivity
```

### Windows PowerShell

```powershell
$env:APP_PACKAGE="com.jindalindia.loyalty"
$env:APP_ACTIVITY=".MainActivity"
```

> **Note:** Verify the correct package name and activity from the installed application before execution.

---

## ▶️ Running the Tests

### Start the Appium Server

```bash
appium
```

### Verify the Connected Device

```bash
adb devices
```

### Run the Complete Test Suite

```bash
npm test
```

---

## 🎯 Run a Specific Test

You can execute an individual test file using:

```bash
npx wdio run wdio.conf.js --spec tests/login.spec.js
```

Example:

```bash
npx wdio run wdio.conf.js --spec tests/loyalty.spec.js
```

---

## 📊 Allure Reports

After test execution, generate and open the Allure report:

```bash
allure serve allure-results
```

Alternatively:

```bash
allure generate allure-results --clean
allure open allure-report
```

The Allure report provides:

* ✅ Passed test cases
* ❌ Failed test cases
* ⏭️ Skipped tests
* ⏱️ Execution duration
* 📸 Screenshots
* 🐛 Error details
* 📊 Test execution summary

---

## 🐛 Troubleshooting

### Device Not Detected

Restart the ADB server:

```bash
adb kill-server
adb start-server
adb devices
```

### Check Appium Installation

```bash
appium -v
```

### Check Installed Appium Drivers

```bash
appium driver list
```

### Check Android Device Details

```bash
adb devices
adb shell getprop ro.build.version.release
```

### Find the Installed Application Package

```bash
adb shell pm list packages | grep jindal
```

---

## 📌 Important Notes

* This project is configured for **real Android device automation**.
* The framework does not require an emulator unless specifically configured.
* The Jindal Loyalty Programme application must already be installed on the device.
* App locators should be inspected and validated using **Appium Inspector** or another compatible Android UI inspection tool.
* Sensitive information such as real mobile numbers, OTPs, passwords, API keys, and credentials should not be committed to GitHub.
* Environment-specific values should preferably be managed using environment variables.

---

## 🔮 Future Improvements

Possible enhancements for this framework include:

* 🌐 Cross-platform Android and iOS support
* 🔄 Data-driven testing
* 📱 Parallel device execution
* 🤖 Automated CI/CD execution
* 📧 Test result notifications
* 🐳 Docker-based test execution
* 📊 Advanced Allure reporting
* 🔐 Secure environment variable management

---

## 👩‍💻 Author

**Anjali**

QA Engineer | Automation Tester

### Skills

`Appium` • `WebDriverIO` • `Playwright` • `Cypress` • `Selenium` • `JavaScript` • `Java` • `API Testing` • `Manual Testing`

---

## 📁 Project Structure

```text
APPAUTOMATION/
│
├── allure-report/
├── allure-results/
├── node_modules/
│
├── test/
│   ├── pageobjects/
│   │   ├── basepage.js
│   │   ├── e2e.page.js
│   │   ├── page.js
│   │   └── secure.page.js
│   │
│   └── specs/
│       ├── jindal.loyalty.spec.js
│       └── test.e2e.js
│
├── test-data/
│   └── testCases.xlsx
│
├── package-lock.json
├── package.json
├── README.md
├── ui_after_login.xml
├── ui_login_result.xml
├── ui.xml
└── wdio.conf.js
```
