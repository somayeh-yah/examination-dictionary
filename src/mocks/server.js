import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Skapa MSW-server med alla definierade handlers
export const server = setupServer(...handlers);