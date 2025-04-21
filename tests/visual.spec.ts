/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test('homepage visual test', async ({ page }) => {
    await page.goto('/');
    
    // Wait for content to be loaded
    await page.waitForSelector('h1');
    
    // Compare the screenshot with a reference
    await expect(page).toHaveScreenshot('homepage.png', {
      timeout: 5000,
      maxDiffPixelRatio: 0.05, // Allow 5% difference
    });
  });
  
  // Test different viewport sizes
  test('responsive design tests', async ({ page }) => {
    // Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForSelector('h1');
    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      timeout: 5000,
      maxDiffPixelRatio: 0.05,
    });
    
    // Tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForSelector('h1');
    await expect(page).toHaveScreenshot('homepage-tablet.png', {
      timeout: 5000,
      maxDiffPixelRatio: 0.05,
    });
    
    // Desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.waitForSelector('h1');
    await expect(page).toHaveScreenshot('homepage-desktop.png', {
      timeout: 5000,
      maxDiffPixelRatio: 0.05,
    });
  });

  // Test dark mode if applicable
  test('dark mode visual test', async ({ page }) => {
    await page.goto('/');
    
    // Enable dark mode if your app has a way to toggle it
    // This is hypothetical and would need to be adjusted for your actual app
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    
    await page.waitForSelector('h1');
    await expect(page).toHaveScreenshot('homepage-dark-mode.png', {
      timeout: 5000,
      maxDiffPixelRatio: 0.05,
    });
  });
});