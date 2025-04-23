/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test('homepage visual test', async ({ page }) => {
    await page.goto('/');
    
    // Wait for content to be fully loaded
    await page.waitForSelector('h1');
    await page.waitForSelector('[data-testid="changelog-entry"]', { timeout: 10000 });
    
    // Compare the screenshot with a reference
    // Use updateSnapshots flag in CI to automate snapshot creation
    await expect(page).toHaveScreenshot('homepage.png', {
      timeout: 10000,
      maxDiffPixelRatio: 0.05, // Allow 5% difference
      threshold: 0.2, // More tolerant threshold for CI variations
    });
  });
  
  // Test different viewport sizes
  test('responsive design tests', async ({ page }) => {
    // Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForSelector('h1');
    await page.waitForSelector('[data-testid="changelog-entry"]', { timeout: 10000 });
    
    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      timeout: 10000,
      maxDiffPixelRatio: 0.05,
      threshold: 0.2,
    });
    
    // Tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForSelector('h1');
    await page.waitForSelector('[data-testid="changelog-entry"]', { timeout: 10000 });
    
    await expect(page).toHaveScreenshot('homepage-tablet.png', {
      timeout: 10000,
      maxDiffPixelRatio: 0.05,
      threshold: 0.2,
    });
    
    // Desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.waitForSelector('h1');
    await page.waitForSelector('[data-testid="changelog-entry"]', { timeout: 10000 });
    
    await expect(page).toHaveScreenshot('homepage-desktop.png', {
      timeout: 10000,
      maxDiffPixelRatio: 0.05,
      threshold: 0.2,
    });
  });

  // Test dark mode
  test('dark mode visual test', async ({ page }) => {
    await page.goto('/');
    
    // Emulate dark mode using prefers-color-scheme
    await page.emulateMedia({ colorScheme: 'dark' });
    
    // Wait for content to be fully loaded
    await page.waitForSelector('h1');
    await page.waitForSelector('[data-testid="changelog-entry"]', { timeout: 10000 });
    
    await expect(page).toHaveScreenshot('homepage-dark-mode.png', {
      timeout: 10000,
      maxDiffPixelRatio: 0.05,
      threshold: 0.2,
    });
  });

  // Test filter interactions
  test('filter interaction test', async ({ page }) => {
    await page.goto('/');
    
    // Wait for content to be fully loaded
    await page.waitForSelector('[data-testid="changelog-entry"]', { timeout: 10000 });
    
    // If SidebarControls is visible in the layout
    if (await page.isVisible('select:has([value="all"])')) {
      // Click on status filter dropdown and select 'Merged'
      await page.selectOption('select:nth-of-type(1)', 'merged');
      
      // Wait for the filtered results to update
      await page.waitForTimeout(500);
      
      // Take a screenshot of the filtered results
      await expect(page).toHaveScreenshot('homepage-filtered-by-status.png', {
        timeout: 5000,
        maxDiffPixelRatio: 0.05,
        threshold: 0.2,
      });
      
      // Reset filter back to 'All'
      await page.selectOption('select:nth-of-type(1)', 'all');
    }
  });
});