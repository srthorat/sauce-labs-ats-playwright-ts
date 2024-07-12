import { Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addRandomItemsToCart(count: number): Promise<number[]> {
    const items = await this.page.$$('.inventory_item');
    const selectedItems: number[] = [];
    const selectedPrices: number[] = [];

    while (selectedItems.length < count) {
      const randomIndex = Math.floor(Math.random() * items.length);
      if (!selectedItems.includes(randomIndex)) {
        selectedItems.push(randomIndex);
        const button = await items[randomIndex].$('button');
        const priceElement = await items[randomIndex].$('.inventory_item_price');
        if (button && priceElement) {
          await button.click();
          const priceText = await priceElement.innerText();
          const price = parseFloat(priceText.replace('$', ''));
          selectedPrices.push(price);
          console.log(`\t\t==> Added item ${randomIndex + 1} to cart with price $${price}`);
        }
      }
    }

    return selectedPrices;
  }

  async goToCart() {
    await this.page.click('.shopping_cart_link');
  }
}
