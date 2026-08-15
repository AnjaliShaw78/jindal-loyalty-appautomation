const BasePage = require('./base.page');
const fs = require('fs');

class LoginPage extends BasePage {
  get appPackage() { return 'com.extension.jindal_india'; }
  get appActivity() { return '.MainActivity'; }
  get emailInput() { return '//android.widget.EditText[1]'; }
  get passwordInput() { return '//android.widget.EditText[2]'; }
  get loginButton() { return '//*[@content-desc="Continue"]'; }
  get appLogo() { return '//*[@content-desc="Welcome Back,"]'; }

  async openApp() {
    try {
      await driver.activateApp(this.appPackage);
    } catch (err) {
      await driver.startActivity({
        appPackage: this.appPackage,
        appActivity: this.appActivity,
      });
    }

    await browser.pause(2000);
    await this.waitForElement(this.emailInput, 15000);
  }

  async loginAsRetailer(email, password) {
    await this.type(this.emailInput, email);
    await browser.pause(400);
    await this.type(this.passwordInput, password);
    await browser.pause(400);
    await this.click(this.loginButton);
  }

  async clickOkOnSuccessPopup() {
    const selectors = [
      '//*[@content-desc="OK"]',
      '//*[@text="OK"]',
      '//*[contains(@text,"OK")]',
      '//android.widget.Button[@content-desc="OK"]'
    ];

    for (const selector of selectors) {
      try {
        const element = await $(selector);
        await element.waitForDisplayed({ timeout: 8000 });
        await element.click();
        return true;
      } catch (err) {
        // keep trying with other selectors
      }
    }

    throw new Error('Success popup OK button not found after login.');
  }

  async clickUploadDocumentButton() {
    const selectors = [
      '//*[@content-desc="Upload Document"]',
      '//*[@text="Upload Document"]',
      '//*[contains(@text,"Upload Document")]',
      '//*[@content-desc="Upload an Invoice"]',
      '//*[@text="Upload an Invoice"]'
    ];

    for (const selector of selectors) {
      try {
        const element = await $(selector);
        await element.waitForDisplayed({ timeout: 10000 });
        await element.click();
        return true;
      } catch (err) {
        // keep trying
      }
    }

    throw new Error('Upload Document button not found.');
  }

  async typePointOfSales(searchText = 'Test') {
    const selectors = [
      '//android.widget.EditText[@hint="Select Point of Sales"]',
      '//android.widget.EditText[@text="Select Point of Sales"]',
      '//android.widget.EditText[@placeholder="Select Point of Sales"]',
      '//*[@content-desc="Select Point of Sales"]',
      '//*[contains(@text,"Select Point of Sales")]',
      '//android.widget.EditText'
    ];

    for (const selector of selectors) {
      try {
        const field = await $(selector);
        await field.waitForDisplayed({ timeout: 10000 });

        for (let taps = 1; taps <= 3; taps++) {
          await field.click();
          await browser.pause(500);
        }

        await browser.pause(800);
        try {
          await field.clearValue();
        } catch (err) {}

        await field.setValue(searchText);
        await browser.pause(1000);
        return true;
      } catch (err) {
        // keep trying
      }
    }

    throw new Error('Select Point of Sales input field not found or did not accept focus.');
  }

  async selectPointOfSalesInUploadForm(optionText = 'TEST@GMAIL.COM') {
    // Skip the dropdown interaction. The device flow expects the user to upload the document manually,
    // then wait and click Proceed from the upload modal.
    await browser.pause(13000);

    const proceedSelectors = [
      '//*[@content-desc="Proceed"]',
      '//*[@text="Proceed"]',
      '//*[contains(@text,"Proceed")]'
    ];

    for (const selector of proceedSelectors) {
      try {
        const proceed = await $(selector);
        await proceed.waitForDisplayed({ timeout: 20000 });
        await proceed.click();
        return true;
      } catch (err) {
        // keep retrying
      }
    }

    throw new Error('Proceed button did not appear after upload.');
  }

  async selectPointOfSalesOption(optionText = 'Test Pvt Ltd') {
    const selectors = [
      `//*[@text="${optionText}"]`,
      `//*[@content-desc="${optionText}"]`,
      `//*[contains(@text,"${optionText}")]`,
      `//*[@text="Test Pvt Ltd"]`,
      `//*[@text="TEST@GMAIL.COM"]`,
      `//*[contains(@text,"TEST@GMAIL.COM")]`
    ];

    for (const selector of selectors) {
      try {
        const element = await $(selector);
        await element.waitForDisplayed({ timeout: 10000 });
        await element.click();
        return true;
      } catch (err) {
        // keep trying
      }
    }

    throw new Error(`Point of Sales option '${optionText}' was not found in the dropdown.`);
  }

  async waitForManualUploadAndProceed() {
    const proceedSelectors = [
      '//*[@content-desc="Proceed"]',
      '//*[@text="Proceed"]',
      '//*[contains(@text,"Proceed")]'
    ];

    // The user uploads the document manually from the device. Wait until the app shows the Proceed button.
    for (const selector of proceedSelectors) {
      try {
        const proceed = await $(selector);
        await proceed.waitForDisplayed({ timeout: 300000 });
        await proceed.click();
        return true;
      } catch (err) {
        // keep trying
      }
    }

    throw new Error('Proceed button did not appear after manual upload.');
  }

  async waitAfterProceedAndClickSave() {
    // After Proceed, the app processes the uploaded invoice and eventually shows a Save button.
    //await browser.pause(120000);

    const saveSelectors = [
      '//*[@content-desc="Save"]',
      '//*[@text="Save"]',
      '//*[contains(@text,"Save")]'
    ];

    for (const selector of saveSelectors) {
      try {
        const saveButton = await $(selector);
        await saveButton.waitForDisplayed({ timeout: 120000 });
        await saveButton.click();
        return true;
      } catch (err) {
        // keep trying
      }
    }

    throw new Error('Save button did not appear after 3 minutes of waiting.');
  }

  async waitForInvoiceSuccessMessage(expectedMessage = 'Invoice Created Successfully!') {
    const selectors = [
      `//*[@text="${expectedMessage}"]`,
      `//*[@content-desc="${expectedMessage}"]`,
      `//*[contains(@text,"submitted")]`,
      `//*[contains(@text,"success")]`
    ];

    for (const selector of selectors) {
      try {
        const element = await $(selector);
        await element.waitForDisplayed({ timeout: 15000 });
        return true;
      } catch (err) {
        // keep trying
      }
    }

    throw new Error(`Invoice success message was not displayed: ${expectedMessage}`);
  }async clickOkOnInvoiceSuccessPopup() {
  const selectors = [
    '//*[@content-desc="OK"]',
    '//*[@text="OK"]',
    '//android.widget.Button[@content-desc="OK"]',
    '//*[contains(@text,"OK")]'
  ];

  for (const selector of selectors) {
    try {
      const element = await $(selector);

      await element.waitForDisplayed({
        timeout: 10000
      });

      await element.click();

      console.log('Invoice success popup OK clicked.');
      return true;

    } catch (err) {
      // try next selector
    }
  }

  throw new Error('OK button on invoice success popup was not found.');
}async clickSwipe() {
  const selectors = [
    '//*[@text="Swipe"]',
    '//*[@content-desc="Swipe"]',
    '//*[contains(@text,"Swipe")]',
    '//*[contains(@content-desc,"Swipe")]'
  ];

  for (const selector of selectors) {
    try {
      const element = await $(selector);
      await element.waitForDisplayed({ timeout: 10000 });
      await element.click();

      console.log('Swipe clicked.');
      return true;
    } catch (err) {
      // try next selector
    }
  }
  throw new Error('Swipe button/text was not found.');
}async clickRedeemNow() {
  const selectors = [
    '//*[@content-desc="Redeem Now"]',
    '//*[@text="Redeem Now"]',
    '//*[contains(@content-desc,"Redeem Now")]',
    '//*[contains(@text,"Redeem Now")]'
  ];

  for (const selector of selectors) {
    try {
      const element = await $(selector);

      await element.waitForDisplayed({
        timeout: 20000
      });

      await element.click();

      console.log('Redeem Now clicked.');
      return true;

    } catch (err) {
      // Try next selector
    }
  }

  throw new Error('Redeem Now button was not found.');
}
async clickLoyaltyMenu() {
  const selectors = [
    '//*[@content-desc="Loyalty"]',
    '//*[@text="Loyalty"]',
    '//*[contains(@content-desc,"Loyalty")]',
    '//*[contains(@text,"Loyalty")]'
  ];

  for (const selector of selectors) {
    try {
      const loyaltyMenu = await $(selector);

      await loyaltyMenu.waitForDisplayed({
        timeout: 15000
      });

      await loyaltyMenu.click();

      console.log('Loyalty menu clicked.');

      return true;
    } catch (err) {
      // Try next selector
    }
  }

  throw new Error('Loyalty menu was not found.');
}
async verifyLoyaltyPointsPage() {

  const expectedTexts = [
    'Loyalty Points',
    'Loyalty Points History',
    'TXN Type : Credit',
    'Points Type : Provisional',
    'Status: Done',
    'Credit'
  ];

  for (const expectedText of expectedTexts) {

    const selectors = [
      `//*[@text="${expectedText}"]`,
      `//*[@content-desc="${expectedText}"]`,
      `//*[contains(@text,"${expectedText}")]`,
      `//*[contains(@content-desc,"${expectedText}")]`
    ];

    let found = false;

    for (const selector of selectors) {
      try {

        const element = await $(selector);

        await element.waitForDisplayed({
          timeout: 10000
        });

        await expect(element).toBeDisplayed();

        console.log(`Verified text: ${expectedText}`);

        found = true;
        break;

      } catch (err) {
        // Try next selector
      }
    }

    if (!found) {
      throw new Error(
        `Expected text was not found on Loyalty page: ${expectedText}`
      );
    }
  }

  console.log('All Loyalty Points page texts verified successfully.');
}async clickProfileIcon() {
  const selectors = [
    '//*[@content-desc="Profile"]',
    '//*[@content-desc="profile"]',
    '//*[contains(@content-desc,"Profile")]',
    '//*[contains(@content-desc,"profile")]',
    '//*[@resource-id="profile"]'
  ];

  for (const selector of selectors) {
    try {
      const profileIcon = await $(selector);

      await profileIcon.waitForDisplayed({
        timeout: 15000
      });

      await profileIcon.click();

      console.log('Profile icon clicked.');
      return true;

    } catch (err) {
      // Try next selector
    }
  }

  throw new Error('Profile icon was not found.');
}async scrollToLogout() {
  try {
    const element = await $(
      'android=new UiScrollable(new UiSelector().scrollable(true))' +
      '.scrollIntoView(new UiSelector().textContains("Logout"))'
    );
    await element.waitForDisplayed({ timeout: 10000 });
    return element;
  } catch (err) {
    const element = await $(
      'android=new UiScrollable(new UiSelector().scrollable(true))' +
      '.scrollIntoView(new UiSelector().textContains("Log Out"))'
    );
    await element.waitForDisplayed({ timeout: 10000 });
    return element;
  }
}

async clickLogout() {
  const element = await this.scrollToLogout();
  await element.click();
  console.log('Logout button clicked after scrolling.');
  return true;
}
async loginAsDealer(email, password) {
    await this.type(this.emailInput, email);
    await browser.pause(400);
    await this.type(this.passwordInput, password);
    await browser.pause(400);
    await this.click(this.loginButton);
  }
  async clickOkOnSuccessPopup2() {
    const selectors = [
      '//*[@content-desc="OK"]',
      '//*[@text="OK"]',
      '//*[contains(@text,"OK")]',
      '//android.widget.Button[@content-desc="OK"]'
    ];

    for (const selector of selectors) {
      try {
        const element = await $(selector);
        await element.waitForDisplayed({ timeout: 8000 });
        await element.click();
        return true;
      } catch (err) {
        // keep trying with other selectors
      }
    }

    throw new Error('Success popup OK button not found after login.');
  }

  async waitForPendingApprovalStatus(statusText = 'Pending for Dealer Approval') {
    const selectors = [
      `//*[@text="${statusText}"]`,
      `//*[@content-desc="${statusText}"]`,
      `//*[contains(@text,"Pending")]`,
      `//*[contains(@text,"Dealer Approval")]`
    ];

    for (const selector of selectors) {
      try {
        const element = await $(selector);
        await element.waitForDisplayed({ timeout: 20000 });
        return true;
      } catch (err) {
        // keep trying
      }
    }

    throw new Error(`Invoice status did not change to '${statusText}'.`);
  }
}

module.exports = new LoginPage();
