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

  test('test API should be restricted in production', async ({ request }) => {
    // This test assumes the app is running in development mode
    // In production, this would return a 403
    const response = await request.post('/api/test');
    
    // Check if we're in dev mode (test should succeed)
    if (process.env.NODE_ENV === 'development') {
      expect(response.status()).toBe(200);
    } else {
      // In production, it should reject
      expect(response.status()).toBe(403);
    }
  });

  test('revalidate API requires secret', async ({ request }) => {
    const response = await request.post('/api/revalidate');
    
    // Should fail without proper secret
    expect(response.status()).not.toBe(200);
  });
});