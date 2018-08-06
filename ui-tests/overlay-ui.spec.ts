import { browser, element, by, Key } from 'protractor';

describe('Overlay', () => {
  beforeEach(async () => browser.get('/overlay'));

  describe('opening/closing', () => {
    it('should open the overlay when not disabled', async () => {
      await browser.actions().mouseMove(await element(by.id('trigger'))).perform();
      expect(await browser.isElementPresent(by.css('.dt-overlay-container'))).toBeTruthy();
    });

    it('should not open when disabled', async () => {
      element(by.id('disable-toggle')).click();
      await browser.actions().mouseMove(await element(by.id('trigger'))).perform();
      expect(await browser.isElementPresent(by.css('.dt-overlay-container'))).toBeFalsy();
    });
  });

  describe('focus behaviour', () => {
    it('should trap the focus inside the overlay', async () => {
      element(by.id('trigger')).click();
      await browser.isElementPresent(by.css('.dt-overlay-container'));
      expect(await browser.driver.switchTo().activeElement().getText()).toEqual('Focus me');
      await browser.actions().sendKeys(Key.TAB).perform();
      expect(await browser.driver.switchTo().activeElement().getText()).toEqual('Focus me next');
      await browser.actions().sendKeys(Key.TAB).perform();
      expect(await browser.driver.switchTo().activeElement().getText()).toEqual('Focus me');
    });
  });
});
