/*
 * Copyright The OpenTelemetry Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { test, expect } from '@playwright/test';

test.describe('API Routes', () => {
  test('feed route should return RSS feed', async ({ request }) => {
    const response = await request.get('/feed');
    
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/xml');
    
    const body = await response.text();
    expect(body).toContain('<?xml');
    expect(body).toContain('<rss');
    expect(body).toContain('<channel>');
  });

  test('test API should work in development', async ({ request }) => {
    // When testing in CI, we're likely in development mode
    const response = await request.post('/api/test');
    
    // In CI/tests, we accept either 200 (dev mode) or 403 (prod mode)
    expect([200, 403]).toContain(response.status());
    
    // If we got a 200, verify the response
    if (response.status() === 200) {
      const text = await response.text();
      expect(text).toContain('Test entry added');
    }
  });

  test('revalidate API requires secret', async ({ request }) => {
    const response = await request.post('/api/revalidate');
    
    // Should fail without proper secret
    expect(response.status()).not.toBe(200);
  });
});