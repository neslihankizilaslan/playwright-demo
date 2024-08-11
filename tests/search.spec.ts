import { test, expect, Page } from '@playwright/test';
import { createUser, login } from '../pages/helpers';
import { SearchPage } from '../pages/search';


test.describe.configure({ mode: 'serial' });

let page: Page;
let employeeId = (Math.floor(Math.random() * 100000));

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  await login(page);
  await createUser(page, employeeId);
});

test.afterAll(async () => {
  await page.close();
});

test('should reset to search form', async () => {
  const search = new SearchPage(page);
  await search.goto();
  await search.getEmployeeNameInput.fill('FMSS');
  expect(await search.getEmployeeNameInput.inputValue()).toBe('FMSS');
  await search.getResetButton.click();
  expect(await search.getEmployeeNameInput.inputValue()).toBe('');
})

test('should search non-case sensitive', async () => {
  const search = new SearchPage(page);
  await search.goto();
  await search.getEmployeeNameInput.fill('FmSs');
  await search.getSearchButton.click();
  await page.waitForLoadState('networkidle');
  expect(await search.getTable.isVisible()).toBeTruthy();
  const firstRow = search.getTable.getByText('FMSS').first()
  expect(firstRow).toHaveText('FMSS test');
})

test('should search and found by EmployeeId', async () => {
  const search = new SearchPage(page);
  await search.goto();
  await search.getEmployeeIdInput.fill(employeeId.toString());
  await search.getSearchButton.click();
  await page.waitForLoadState('networkidle');
  expect(await search.getTable.isVisible()).toBeTruthy();
  const firstRow = search.getTable.getByText(employeeId.toString()).first()
  expect(firstRow).toHaveText(employeeId.toString());

})

test('should search by employee name', async () => {
  const search = new SearchPage(page);
  await search.goto();
  await search.getEmployeeNameInput.fill('FMSS');
  await search.getSearchButton.click();
  await page.waitForLoadState('networkidle');
  await search.getTable.isVisible();
  const firstRow = search.getTable.getByText('FMSS').first()
  expect(firstRow).toHaveText('FMSS test');
})

test('should shown Records Found at page', async () => {
  const search = new SearchPage(page);
  await search.goto();
  await search.getEmployeeNameInput.fill('FMSS');
  await search.getSearchButton.click();
  await page.waitForLoadState('networkidle');
  expect(search.getRecordsFound.isVisible()).toBeTruthy();
})

test('should shown No Records Found at page', async () => {
  const search = new SearchPage(page);
  await search.goto();
  await search.getEmployeeNameInput.fill('kjadnccdwjncd');
  await search.getSearchButton.click();
  await page.waitForLoadState('networkidle');
  // bypass the infobox message
  await page.waitForTimeout(5000);
  expect(search.getNoRecordsFound.isVisible()).toBeTruthy();
})

test('should search both employee name and employee id', async () => {
  const search = new SearchPage(page);
  await search.goto();
  await search.getEmployeeNameInput.fill('FMSS');
  await search.getEmployeeIdInput.fill(employeeId.toString());
  await search.getSearchButton.click();
  await page.waitForLoadState('networkidle');
  const row = page.getByRole('row', { name: ` ${employeeId.toString()} Test FMSS test  ` });
  expect(row.isVisible()).toBeTruthy();
})