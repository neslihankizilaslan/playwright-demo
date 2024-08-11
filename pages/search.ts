import { Locator, Page } from "@playwright/test";

export class SearchPage {
  readonly page: Page;
  readonly getSearchButton: Locator;
  readonly getEmployeeNameInput: Locator;
  readonly getEmployeeIdInput: Locator;
  readonly getTable: Locator;
  readonly getResetButton: Locator;
  readonly getRecordsFound: Locator
  readonly getNoRecordsFound: Locator

  constructor(page: Page) {
    this.page = page;
    this.getSearchButton = page.getByRole('button', { name: 'Search' });
    this.getResetButton = page.getByRole('button', { name: 'Reset' });
    this.getEmployeeNameInput = page.getByPlaceholder('Type for hints...').first();
    this.getEmployeeIdInput = page.locator('input').nth(2);
    this.getTable = page.getByRole('table');
    this.getRecordsFound = page.getByText(/^\(\d+\) Records Found$/);
    this.getNoRecordsFound = page.getByText('No Records Found');
  }

  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList');
  }
}

