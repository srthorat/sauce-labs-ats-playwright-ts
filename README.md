# Automated Test Suite Documentation for Sauce Labs Demo Website

## Problem Statement

Develop an automated test suite for the Sauce Labs demo website. The test suite should automate the customer flow of selecting three random items from the inventory, adding them to the cart, and completing the checkout process. The automation should ensure thorough coverage of this flow, validating key functionalities and user interactions throughout the process.

## Table of Contents

1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Setup Instructions](#setup-instructions)
4. [Test Flow](#test-flow)
5. [Assertions](#assertions)
6. [Reporting](#reporting)
7. [Page Object Model](#page-object-model)
8. [Running the Tests](#running-the-tests)
9. [Writing New Test Cases](#writing-new-test-cases)
10. [CI/CD Using GitHub Actions](#cicd-using-github-actions)

## Introduction

This project comprises an automated test suite developed for the Sauce Labs demo website. Its primary objective is to automate the customer journey of selecting three random items from the inventory, adding them to the cart, and completing the checkout process. The tests are implemented using Playwright with TypeScript, ensuring a robust and maintainable codebase.

Key features of this project include:

- Design Pattern - Page Object Model (POM): Enhances code maintainability and readability by organizing test interactions in separate classes for different pages.
- ESLint and Prettier Integration: Ensures code quality and consistency. ESLint helps in identifying and fixing problems in the JavaScript code, while Prettier automatically formats the code to maintain a consistent style.
- Cross-browser Testing: The CI workflow supports running test cases on four browsers: Chromium, Chrome, Firefox, Edge, Webkit and some mobile browsers.

## Project Structure

```shell
.
├── .eslintrc.json              # ESLint configuration file for JavaScript/TypeScript linting rules
├── .github
│   └── workflows
│       ├── quality.yml         # GitHub Actions workflow for running quality checks
│       └── sauce-demo-ui-playwright.yml # GitHub Actions workflow for running end-to-end tests using Playwright
├── .gitignore                   # Specifies files and directories to ignore in Git version control
├── .nvmrc                      # Specifies the Node.js version to use with nvm
├── .prettierrc.json            # Prettier configuration file for code formatting options
├── README.md                    # Project documentation and overview
├── package-lock.json            # Auto-generated file that locks dependencies to specific versions
├── package.json                 # Contains metadata and dependencies for the project
├── playwright-report            # Directory containing Playwright test run reports
│   ├── data
│   │   └── c0ada15af5d24609bc40df8c6bf917e708e46b3c.webm # Test video recording
│   └── index.html               # HTML report generated from Playwright test results
├── playwright.config.ts         # Playwright configuration file defining test settings and projects
├── src
│   └── pages
│       ├── CartPage.ts         # Page Object Model for the shopping cart page
│       ├── CheckoutPage.ts     # Page Object Model for the checkout page
│       ├── InventoryPage.ts     # Page Object Model for the inventory page
│       └── LoginPage.ts         # Page Object Model for the login page
├── test-results                 # Directory containing video recordings and logs of test runs
│   ├── .last-run.json           # Metadata for the last test run
│   └── purchaseFlow-Customer-flow-c412d-and-completing-the-checkout-chromium
│       └── video.webm           # Video of the test run for the customer flow on Chromium
├── tests
│   └── purchaseFlow.spec.ts     # Test suite for the customer flow and checkout process
└── tsconfig.json                # TypeScript configuration file for compiler options and project setup

```

### Key Folders and Files:

1. .github/workflows: Contains GitHub Actions workflows for CI/CD processes.
2. src/pages: Contains Page Object Models that abstract page functionalities for easier test management.
3. tests: Contains the test suites that execute the defined user flows using the Page Object Models.
4. playwright-report: Stores results and reports from Playwright test executions, including videos and HTML reports.
5. package.json: Defines project dependencies, scripts, and configurations essential for project setup and execution.
6. .eslintrc.json: Configuration file for ESLint, enforcing code quality and style rules to maintain consistency across the codebase.
7. .prettierrc.json: Configuration file for Prettier, managing code formatting standards to ensure uniform code style throughout the project.
8. tsconfig.json: TypeScript configuration file that defines compiler options, project structure, and module resolution settings, facilitating type checking and transpilation of TypeScript code.
9. .nvmrc: Specifies the Node.js version required for the project, ensuring a consistent development environment.

## Setup Instructions

### Clone the Repository

```shell
    git clone https://github.com/srthorat/sauce-lab-ats-puppeteer-typescript.git
    cd sauce-lab-ats-puppeteer-typescript
```

### Install Playwright Browsers(First Time only)

```shell
    npx playwright install
```

### Install Dependencies

```shell
    npm install
```

### Open Playwright Tests

```shell
    npm run test:all
```

## Test Flow

The test suite automates the following flow:

1. Login to the Sauce Labs demo website.
2. Navigate to the inventory page.
3. Select three random items from the inventory.
4. Add selected items to the cart.
5. Proceed to checkout.
6. Fill in the checkout information.
7. Verify the prices and complete the checkout.

## Assertions

The test suite includes assertions to verify:

1. The prices of the selected items.
2. The total price and tax on the checkout page.
3. The successful completion message after checkout.

## Reporting

Playwright Reporting: The project utilizes Playwright's built-in reporting capabilities, which include:

- List Reporter: Provides a concise output of the test results in the console, showing pass/fail statuses for each test case.
- HTML Reporter: Generates an HTML report that includes detailed information about the test runs, which is saved in the **_playwright-report_** directory. This report includes screenshots, logs, and overall test execution summaries.
- Videos: Video recordings of each test run are saved in the **_test-result_** directory, with separate folders for each browser. This enables easy review of test executions and assists in debugging any issues encountered during testing.

## Page Object Model

The Page Object Model (POM) design pattern is implemented to enhance code maintainability and readability. Key page objects include:

- BasePage: Contains common methods used by other page objects.
- LoginPage: Methods to interact with the login page.
- InventoryPage: Methods to interact with the inventory page.
- CartPage: Methods to interact with the cart page.
- CheckoutPage: Methods to interact with the checkout page.

### example - LoginPage

```shell
//src/pages/LoginPage.ts
import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
    await this.page.fill('#user-name', username);
    await this.page.fill('#password', password);
    await this.page.click('#login-button');
  }
}
```

## Running the Tests

The following npm scripts are defined to run tests:

```shell
"scripts": {
      "test:all": "playwright test --all",
      "test:chromium": "npx playwright test --project=chromium",
      "test:firefox": "npx playwright test --project=firefox",
      "test:webkit": "npx playwright test --project=webkit",
      "test:google-chrome": "npx playwright test --project=Google Chrome",
      "test:microsoft-edge": "npx playwright test --project=Microsoft Edge",
      "test:iphone-15": "npx playwright test --project=iPhone 15",
      "test:pixel-8": "npx playwright test --project=Pixel 8",
  }
```

- Set Environment Variables: This is must do step else all test will fail

  ```shell
  export SAUCE_USERNAME=username
  export SAUCE_PASSWORD=password
  ```

  Note: Replace username and password with your actual credentials.

  or

  To run tests with environment variables:

  ```shell
     SAUCE_USERNAME=username SAUCE_PASSWORD=password npm run test:all
  ```

- Run All Tests: This will run test on all four browser sequentially

  ```
  npm run test:all
  ```

- Run Tests in Specific Browser:

  ```shell
  npm run test:chromium
  npm run test:firefox
  npm run test:microsoft-edge
  npm run test:google-chrome
  ```

## Writing New Test Cases

When writing new test cases, follow these steps:

1. Create a new spec file: Add a new .spec.ts file in the tests directory.
2. Use Page Objects: Leverage existing page objects to interact with the application.
3. Add Assertions: Ensure appropriate assertions are in place to validate the test flow.
4. Run and Validate: Execute the test locally to ensure it works as expected.

### Example - Adding a new test case:

```shell
// tests/newTest.spec.ts
import LoginPage from '../src/pages/LoginPage';
import InventoryPage from '../src/pages/InventoryPage';
import CartPage from '../src/pages/CartPage';
import CheckoutPage from '../src/pages/CheckoutPage';

describe('New Test Suite', () => {
    const loginPage = new LoginPage();
    const inventoryPage = new InventoryPage();
    const cartPage = new CartPage();
    const checkoutPage = new CheckoutPage();

    it('should complete a new test flow', async () => {
        await page.goto('https://www.saucedemo.com/');
        await loginPage.login('username', 'password');
        await inventoryPage.addThreeRandomItemsToCart();
        await cartPage.proceedToCheckout();
        await checkoutPage.fillInCheckoutInformation('First', 'Last', '12345');
        await checkoutPage.completeCheckout();
        await expect(page).toHaveText('Thank you for your order');
    });
});
```

## CI/CD Using GitHub Actions

This project uses GitHub Actions for Continuous Integration and Continuous Deployment (CI/CD) to ensure that the automated tests run smoothly and efficiently with every code change.

### Setting Up GitHub Actions

GitHub Actions are defined in YAML files located in the .github/workflows/ directory. The workflows are triggered on specific events, such as pushes to the repository or pull requests.

### Workflow Files

#### Add Secrets:

1. Go to your GitHub repository.
2. Navigate to Settings > Secrets and variables > Actions.
3. Click on New repository secret and add the following secrets:
   - username: Your Sauce Labs demo website username.
   - password: Your Sauce Labs demo website password.

Note: I have all redy addy in my GitHub Repo

#### Quality Workflow

The quality.yml workflow ensures code quality by running linting and formatting checks using ESLint and Prettier.

```shell
name: Quality Checks

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v2

    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18.x'

    - name: Install dependencies
      run: npm install

    - name: Run ESLint
      run: npm run lint

    - name: Run Prettier
      run: npm run format
```

### E2E UI Testing Workflow

The sauce-demo-ui-playwright.yml workflow runs the Playwright end-to-end tests across multiple browsers.

```shell
name: Sauce Demo UI Playwright Tests

on:
  workflow_dispatch:
  pull_request:
    branches:
      - develop

jobs:
  sauce-demo-ui-playwright:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./

    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup NodeJS 18
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install Playwright browsers
        run: npx playwright install

      - name: Install
        run: npm ci

      - name: Run Sauce Demo UI Playwright Tests
        run: SAUCE_USERNAME=${{ secrets.SAUCE_USERNAME }} SAUCE_PASSWORD=${{ secrets.SAUCE_PASSWORD }}  npm run test:all

      - name: Upload Playwright Videos
        if: always()
        uses: actions/upload-artifact@v2
        with:
          name: test-results
          path: test-results/

      - name: Upload Playwright Reports
        if: always()
        uses: actions/upload-artifact@v2
        with:
          name: playwright-report
          path: playwright-report/index.html
```

#### Key Steps in the Workflow

- Triggers: The workflow runs on any push or pull request to the develop branch.
- Environment Variables: SAUCE_USERNAME and SAUCE_PASSWORD environment variables are set using the secrets added to the GitHub repository.
- Checkout: The code is checked out from the repository.
- Setup Node.js: Node.js version 18.7.0 is set up.
- Install Dependencies: The required dependencies are installed using npm install.
- Run Playwright Tests: The Playwright tests are executed across all specified browsers using the npm run test:all script.

#### Running the Tests using Github action and Viewing Reports

- No Need to Clone: There is no need to clone the code and run it - on your computer. You can directly go to the repository and run the GitHub Action.
- Run the Action: Once the action is completed, go to the workflow run tab.
- Download Reports: Download the report to see the results.

#### Configuring Environment Variables

Environment variables for your tests can be set up in the GitHub Actions workflow file to securely manage sensitive information such as usernames and passwords.

#### Running Workflows

The workflows are automatically triggered based on the events specified. You can also manually trigger workflows from the GitHub Actions tab in your repository.

By integrating GitHub Actions into your CI/CD pipeline, you ensure that your test suite is executed consistently with every change, maintaining code quality and reliability.
