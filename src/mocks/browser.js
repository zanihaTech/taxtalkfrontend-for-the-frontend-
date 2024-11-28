// src/mocks/browser.js
import { setupWorker } from 'msw';
import { handlers } from './handlers';

// Set up the mock service worker with the handlers
export const worker = setupWorker(...handlers);
