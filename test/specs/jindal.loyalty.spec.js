const LoginPage = require('../pageobjects/e2e.page');
const allureReporter = require('@wdio/allure-reporter');

describe('Jindal Loyalty mobile flow', () => {
  it('should login, upload document, select point of sales, and proceed after manual upload', async () => {
    allureReporter.startStep('Retailer Flow');
      // -----------------------------------------------------
    // Step 1 - Login as Retailer
    // -----------------------------------------------------
    allureReporter.startStep('Login as Retailer');
    await LoginPage.openApp();
    await browser.takeScreenshot();
    await LoginPage.loginAsRetailer('rohitarora15820@gmail.com', 'Rohit123@');
    await browser.takeScreenshot();
    await browser.pause(3000);

    try {
      await LoginPage.clickOkOnSuccessPopup();
    } catch (err) {
      console.log('Success popup not found or already dismissed');
    }
    allureReporter.endStep();
    // -----------------------------------------------------
    // Step 2 - Upload Invoice
    // -----------------------------------------------------
    await browser.pause(2000);
    await browser.takeScreenshot();
    allureReporter.startStep('Upload Invoice');
    await LoginPage.clickUploadDocumentButton();
    await LoginPage.selectPointOfSalesInUploadForm();
    await browser.pause(13000);
    await browser.takeScreenshot();
    // -----------------------------------------------------
    // Step 3 - Submit Invoice
    // -----------------------------------------------------
    await browser.pause(18000);
    await LoginPage.waitAfterProceedAndClickSave();
    await browser.pause(1000);
    allureReporter.endStep();

    allureReporter.startStep(
    'Verify Invoice Successfully Submitted'
    );
    await LoginPage.waitForInvoiceSuccessMessage();
    await browser.takeScreenshot();
    await LoginPage.clickOkOnInvoiceSuccessPopup();// Click OK on success popup
    await browser.pause(1000);
    await browser.takeScreenshot();
    allureReporter.endStep();
    // -----------------------------------------------------
    // Step 4 - Reward Redemption Flow
    // -----------------------------------------------------
    allureReporter.startStep('click on Swipe Button');
    await LoginPage.clickSwipe();
    allureReporter.endStep();
    await browser.takeScreenshot();
    allureReporter.startStep('Verify Actual and Provisional Points and Redeem Now');
    await LoginPage.verifyActualAndProvisionalPoints();
    await LoginPage.clickRedeemNow();
    await LoginPage.verifyProductSectionVisibleAndClickable();
    await LoginPage.goBack();
    await LoginPage.goBack();
    
    allureReporter.endStep();
    
    // -----------------------------------------------------
    // Step 5 - Loyalty Points Validation
    // -----------------------------------------------------
    allureReporter.startStep('Verify Loyalty Page Details');
    await LoginPage.clickLoyaltyMenu();
    await browser.takeScreenshot();
    allureReporter.endStep();
    await LoginPage.ClickOnHomePageMenu();
    
    await  LoginPage.clickProfileIcon();
    await LoginPage.scrollToLogout();
    await LoginPage.ClickOnLogout();
    await LoginPage.ClickOnLogoutConfirmation();
    await browser.pause(2000);

    // -----------------------------------------------------
    // Step 6 - Dealer Flow
    // -----------------------------------------------------
    
    allureReporter.startStep('Login as Dealer');
    await browser.takeScreenshot();
    await LoginPage.loginAsRetailer('TEST@GMAIL.COM', 'HZBO2T');
    await browser.takeScreenshot();
    await browser.pause(3000);
    allureReporter.endStep();
    
    await LoginPage.clickOkOnSuccessPopup2()
    await LoginPage.InvoiceMenu();
    await LoginPage.ViewDetails();
    await LoginPage.ApprovedByDealer();
    await LoginPage.goBack();
    await LoginPage.verifyInvoiceUnderAdmin();

    
  });
});
