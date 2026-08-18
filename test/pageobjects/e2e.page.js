const BasePage = require('./base.page');
const fs = require('fs');

class LoginPage extends BasePage {
  get appPackage() { return 'com.extension.jindal_india'; }
  get appActivity() { return '.MainActivity'; }
  get emailInput() { return '//android.widget.EditText[1]'; }
  get passwordInput() { return '//android.widget.EditText[2]'; }
  get loginButton() { return '//*[@content-desc="Continue"]'; }
  get appLogo() { return '//*[@content-desc="Welcome Back,"]'; }
  constructor() {
    super();
    this.invoiceId = null;
  }


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

  async selectPointOfSalesInUploadForm() {
    // Skip the dropdown interaction. The device flow expects the user to upload the document manually,
    // then wait and click Proceed from the upload modal.
    const UploadInvoice = await $('android=new UiSelector().description("Please upload an invoice to continue.")');
  await UploadInvoice.click();
  const InvoiceDoc = await $('android=new UiSelector().text("Dealer_Aug_Invoice.pdf")');
  await InvoiceDoc.click();
    const SelectSales = await $('android=new UiSelector().className("android.view.View").instance(7)');
    await SelectSales.click();
    await $(
    'android=new UiScrollable(new UiSelector().scrollable(true)).scrollToEnd(10)'
  );

  console.log('Scrolled to the bottom of the page.');
  const SelectDealer = await $('//*[contains(@content-desc,"Test Pvt Ltd") or contains(@content-desc,"TEST@GMAIL.COM")]');
  await SelectDealer.click();


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

  async waitAfterProceedAndClickSave() {
    // After Proceed, the app processes the uploaded invoice and eventually shows a Save button.
    await browser.pause(120000);

    const saveSelectors = [
      '//android.widget.Button[@content-desc="Save"]',
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
  
}async verifyActualAndProvisionalPoints() {

    const elements = await $$('//android.view.View[@content-desc]');

    const values = [];

    for (const element of elements) {
        const desc = await element.getAttribute('content-desc');

        if (desc) {
            values.push(desc.trim());
        }
    }

    console.log('Actual Points:', values[4]);
    console.log('Provisional Points:', values[5]);

    expect(values[4]).toMatch(/^\d+(\.\d+)?$/);
    expect(values[5]).toMatch(/^\d+(\.\d+)?$/);

    return true;
}
async clickRedeemNow() {
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
async verifyProductSectionVisibleAndClickable() {

  const productSection = await $('//*[contains(@content-desc,"Lifelong Fit Pro Spin Fitness Bike for Home")]');
  await productSection.click();
  const AddToCart = await $('android=new UiSelector().description("Add to Cart")');
  await AddToCart.click();
  const CloseError = await $('android=new UiSelector().description("OK")');
  await CloseError.click();
}

async clickLoyaltyMenu() {
    const loyaltyMenu = await $(
        '//android.widget.ImageView[@content-desc="Loyalty"]'
    );

    await loyaltyMenu.waitForDisplayed({
        timeout: 15000
    });

    await loyaltyMenu.click();

    console.log('Loyalty menu clicked.');
}
async verifyUpdatedPointsOnLoyaltyPage() {
  const transaction = await $(
    '//android.view.View[contains(@content-desc,"TXN ID :") and contains(@content-desc,"Points Type : Provisional")]'
  );

  await transaction.waitForDisplayed({
    timeout: 15000
  });

  const transactionText = await transaction.getAttribute('content-desc');

  console.log('Loyalty Transaction:', transactionText);

  expect(transactionText).toContain('TXN ID :');
  expect(transactionText).toContain('TXN Type : Credit');
  expect(transactionText).toContain('Points Type : Provisional');
  expect(transactionText).toContain('Status: Done');
  expect(transactionText).toContain('Credit');

  // Extract and verify the updated points value
  const pointsMatch = transactionText.match(
    /Status : Done.*?([+-]?\d+(?:\.\d+)?)\s+Credit/
  );

  expect(pointsMatch).not.toBeNull();

  const updatedPoints = pointsMatch[1];

  console.log('Updated Points:', updatedPoints);

  return true;

}async ClickOnHomePageMenu(){
  const HomeMenu = await $('android=new UiSelector().description("Home")');
  await HomeMenu.click();

}

async clickProfileIcon() {
  const profileIcon = await $('android=new UiSelector().className("android.view.View").instance(4)');

      await profileIcon.click();

      console.log('Profile icon clicked.');
      return true
}async scrollToLogout() {
  await $(
    'android=new UiScrollable(new UiSelector().scrollable(true)).scrollToEnd(10)'
  );

  console.log('Scrolled to the bottom of the page.');
}
async ClickOnLogout(){
  const logoutButton = await $('android=new UiSelector().description("Logout")');
      await logoutButton.waitForDisplayed({
        timeout: 10000
      });
      await logoutButton.click();
      console.log('Logout button clicked.');
}
async ClickOnLogoutConfirmation() {
  const logoutConfirmButton = await $('android=new UiSelector().description("Logout")');
  await logoutConfirmButton.click();

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
  async InvoiceMenu(){
    const InvoiceButton = await $('android=new UiSelector().description("Invoice")');
    await InvoiceButton.click();
  }
  async ViewDetails(){
    const ViewDetailsButton = await $('android=new UiSelector().description("View Details").instance(0)');
    await ViewDetailsButton.click();
  }
  async ApprovedByDealer() {

  // Get Invoice ID
  const invoice = await $(
    '//android.view.View[starts-with(@content-desc,"IN")]'
  );

  const description = await invoice.getAttribute('content-desc');

  console.log('Invoice Details:', description);

  // Capture Invoice ID directly
  this.invoiceId = description;

  console.log('Captured Invoice ID:', this.invoiceId);

  // Click Approved By Dealer
  const ApprovedByDealerButton = await $(
    'android=new UiSelector().description("Approved By Dealer")'
  );

  await ApprovedByDealerButton.click();

  console.log('Approved By Dealer clicked.');
}


async verifyInvoiceUnderAdmin() {

  // Check that Invoice ID was captured
  if (!this.invoiceId) {
    throw new Error('Invoice ID was not captured.');
  }

  console.log('Looking for Invoice ID:', this.invoiceId);

  // Click Pending from Admin
  const AdminButton = await $(
    'android=new UiSelector().description("Pending from Admin")'
  );

  await AdminButton.click();
  await $(
    'android=new UiScrollable(new UiSelector().scrollable(true)).scrollToEnd(10)'
  );

  // Click View Details
  const ViewDetailsButton2 = await $(
    'android=new UiSelector().description("View Details").instance(0)'
  );

  await ViewDetailsButton2.click();

  // Find the same Invoice ID
  const invoice = await $(
     `//android.view.View[contains(@content-desc,"${this.invoiceId}")]`
  );

  await invoice.waitForDisplayed({
    timeout: 15000
  });

  const adminInvoiceId = await invoice.getAttribute('content-desc');

  console.log('Dealer Invoice ID:', this.invoiceId);
  console.log('Admin Invoice ID:', adminInvoiceId);

  // Verify both are equal
  expect(adminInvoiceId).toBe(this.invoiceId);

  console.log(
    `Invoice is being approved by the dealer: ${this.invoiceId}`
  );

  return true;
}
}

module.exports = new LoginPage();
