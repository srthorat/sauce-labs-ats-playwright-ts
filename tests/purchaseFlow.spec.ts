import { test } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage';
import { CartPage } from '../src/pages/CartPage';
import { CheckoutPage } from '../src/pages/CheckoutPage';

let username: string;
let password: string;

test.beforeEach(async () => {
  username = process.env.SAUCE_USERNAME || '';
  password = process.env.SAUCE_PASSWORD || '';
  console.log(`Username: ${username}, Password: ${password}`);

  if (username === '' || password === '') {
    console.log('Username or password is not provided');
  }
});

test('Customer flow: selecting 3 random items and completing the checkout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  console.log('\tStep 1: Navigate to the login page and log in');
  await loginPage.navigate();
  await loginPage.login(username, password);

  console.log('\tStep 2: Add 3 random items to the cart');
  const selectedPricesOnInvPage = await inventoryPage.addRandomItemsToCart(3);
  console.log(`\t\t==>selectedPricesOnInvPage = ${selectedPricesOnInvPage}`);
  let totalPrice = 0;
  for (const price of selectedPricesOnInvPage) {
    totalPrice = price + totalPrice;
  }
  console.log(`\t\t==>totalPrice = ${totalPrice}`);

  console.log('\tStep 3: Go to the cart and proceed to checkout');
  await inventoryPage.goToCart();
  await cartPage.proceedToCheckout();

  console.log('\tStep 4: Fill out checkout information and finish checkout');
  await checkoutPage.fillCheckoutInformation('Sakharam', 'Thorat', '411015');

  console.log('\tStep 5: Verify order completion');
  await checkoutPage.verifyCheckoutTotals(totalPrice);
  await checkoutPage.finishCheckout();
  await checkoutPage.verifyCompleteMessage();
});
