/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { test, expect } from '@playwright/test';

// This test file specifically focuses on UI components in isolation
test.describe('UI Components Tests', () => {
  // We'll create a simple test page that renders the components
  // This approach ensures we can test components independent of the main application
  
  // Test pagination component
  test('pagination component visual test', async ({ page }) => {
    // First navigate to the homepage
    await page.goto('/');
    
    // Wait for the pagination component to be visible
    // This test will be skipped if pagination isn't shown (e.g., not enough entries)
    if (await page.isVisible('nav[aria-label="Pagination"]')) {
      // Take a screenshot of the pagination component
      await expect(page.locator('nav[aria-label="Pagination"]')).toHaveScreenshot('pagination-component.png', {
        timeout: 5000,
        maxDiffPixelRatio: 0.05,
        threshold: 0.2,
      });
      
      // Click the next page button to see styling changes
      const nextButton = page.locator('button[aria-label="Next page"]');
      if (await nextButton.isEnabled()) {
        await nextButton.click();
        await page.waitForTimeout(300); // Wait for any transitions
        
        await expect(page.locator('nav[aria-label="Pagination"]')).toHaveScreenshot('pagination-component-next.png', {
          timeout: 5000,
          maxDiffPixelRatio: 0.05,
          threshold: 0.2,
        });
      }
    } else {
      test.skip();
    }
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