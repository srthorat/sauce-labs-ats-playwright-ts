import { Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  private checkoutButton = '#checkout';
  private firstNameInput = '#first-name';
  private lastNameInput = '#last-name';
  private postalCodeInput = '#postal-code';
  private continueButton = '#continue';
  private finishButton = '#finish';
  private completeHeader = '.complete-header';
  private subtotalLabel = '.summary_subtotal_label';
  private taxLabel = '.summary_tax_label';
  private totalLabel = '.summary_total_label';

  constructor(page: Page) {
    this.page = page;
  }

  async proceedToCheckout() {
    await this.page.click(this.checkoutButton);
    console.log('==> Successfully proceeded to checkout');
  }

  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.postalCodeInput, postalCode);
    console.log(
      `\t\t==> Filled checkout information for ${firstName} ${lastName}, Postal Code: ${postalCode}`,
    );
    await this.page.click(this.continueButton);
  }

  async verifyCheckoutTotals(totalPrice: number) {
    const subtotalText = await this.page.textContent(this.subtotalLabel);
    if (!subtotalText) {
      throw new Error('Subtotal text not found');
    }
    const subtotal = parseFloat(subtotalText.replace('Item total: $', ''));
    console.log(`\t\t==>Subtotal: ${subtotal.toFixed(2)}`);
    if (subtotal.toFixed(2) !== totalPrice.toFixed(2)) {
      throw new Error(
        `Subtotal does not match expected total price. Expected: ${totalPrice.toFixed(
          2,
        )}, Found: ${subtotal.toFixed(2)}`,
      );
    }

    const taxText = await this.page.textContent(this.taxLabel);
    if (!taxText) {
      throw new Error('Tax text not found');
    }
    const tax = parseFloat(taxText.replace('Tax: $', ''));
    console.log(`\t\t==>Tax: ${tax.toFixed(2)}`);

    const totalText = await this.page.textContent(this.totalLabel);
    if (!totalText) {
      throw new Error('Total text not found');
    }
    const total = parseFloat(totalText.replace('Total: $', ''));
    console.log(`\t\t==>Total: ${total.toFixed(2)}`);
    const expectedTotal = (subtotal + tax).toFixed(2);

    if (total.toFixed(2) !== expectedTotal) {
      throw new Error(
        `Total does not match expected total. Expected: ${expectedTotal}, Found: ${total.toFixed(
          2,
        )}`,
      );
    }
    console.log(`\t\t==>Expected total: ${expectedTotal}`);
    console.log(
      `\t\t==>Sucessfully verified totalprice(${subtotal.toFixed(
        2,
      )}) on checkout page same as totalPrice(${totalPrice.toFixed(2)}) on Inverntory Page`,
    );
    console.log(
      `\t\t==>Sucessfully verified expected price(${expectedTotal}) = totalprice(${totalPrice}+Tax(${tax}))`,
    );
  }

  async finishCheckout() {
    await this.page.click(this.finishButton);
    console.log('\t\t==> Finishing the checkout');
  }

  async verifyCompleteMessage() {
    const completeHeader = await this.page.textContent(this.completeHeader);
    if (!completeHeader || !completeHeader.includes('Thank you for your order!')) {
      throw new Error('Order completion message not found');
    }
    console.log('\t\t==> Successfully verified the complete message');
  }
}
