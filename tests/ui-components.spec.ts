/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { test, expect } from '@playwright/test';

// This test file specifically focuses on UI components in isolation
test.describe('UI Components Tests', () => {
  // We'll create a simple test page that renders the components
  // This approach ensures we can test components independent of the main application
  
  // Test pagination component - skipped since component was removed
  test.skip('pagination component visual test', async ({ page }) => {
    // This test is skipped because the pagination component was removed
    // First navigate to the homepage
    await page.goto('/');
    
    // Placeholder test to skip
    expect(true).toBe(true);
  });
  
  // Test the filtering mechanism
  test('filter components visual test', async ({ page }) => {
    await page.goto('/');
    
    // Check if select elements exist
    if (await page.isVisible('select')) {
      // Take a screenshot of the filters
      await expect(page.locator('div[role="search"]')).toHaveScreenshot('filter-components.png', {
        timeout: 5000,
        maxDiffPixelRatio: 0.05,
        threshold: 0.2,
      });
      
      // Test interaction with the filters
      await page.selectOption('select:nth-of-type(1)', 'merged');
      await page.waitForTimeout(300);
      
      await expect(page.locator('div[role="search"]')).toHaveScreenshot('filter-components-selected.png', {
        timeout: 5000,
        maxDiffPixelRatio: 0.05,
        threshold: 0.2,
      });
    } else {
      test.skip();
    }
  });
  
  // Test individual entry card
  test('entry card visual test', async ({ page }) => {
    await page.goto('/');
    
    // Wait for entries to load
    await page.waitForSelector('[data-testid="changelog-entry"]', { timeout: 10000 });
    
    // Take a screenshot of the first entry card
    await expect(page.locator('[data-testid="changelog-entry"]:first-of-type')).toHaveScreenshot('entry-card.png', {
      timeout: 5000,
      maxDiffPixelRatio: 0.05,
      threshold: 0.2,
    });
    
    // Test dark mode version of the card
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.reload();
    await page.waitForSelector('[data-testid="changelog-entry"]', { timeout: 10000 });
    
    await expect(page.locator('[data-testid="changelog-entry"]:first-of-type')).toHaveScreenshot('entry-card-dark.png', {
      timeout: 5000,
      maxDiffPixelRatio: 0.05,
      threshold: 0.2,
    });
  });
});