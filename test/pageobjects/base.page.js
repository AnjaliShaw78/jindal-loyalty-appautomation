class BasePage {
  async waitForElement(selector, timeout = 20000) {
    const element = await $(selector);
    await element.waitForDisplayed({ timeout });
    return element;
  }

  async click(selector, timeout = 20000) {
    const element = await this.waitForElement(selector, timeout);
    await element.click();
  }

  async type(selector, value, timeout = 20000) {
    const element = await this.waitForElement(selector, timeout);

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        await element.click();
        await browser.pause(400);
        await element.clearValue();
        await browser.pause(400);
        await element.setValue(value);
        await browser.pause(400);
        return;
      } catch (err) {
        if (attempt === 3) throw err;
        await browser.pause(600);
      }
    }
  }

  async getText(selector, timeout = 20000) {
    const element = await this.waitForElement(selector, timeout);
    return element.getText();
  }

  async isDisplayed(selector, timeout = 20000) {
    try {
      const element = await $(selector);
      await element.waitForDisplayed({ timeout });
      return true;
    } catch (err) {
      return false;
    }
  }
  async goBack() {
  await driver.back();
}
}

module.exports = BasePage;
