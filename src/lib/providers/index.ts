import { BusDataProvider } from './types';
import { mockDataProvider } from './mockDataProvider';

/**
 * SINGLE SOURCE OF TRUTH for which data provider to use
 * 
 * To switch to real API:
 * 1. Create realApiProvider.ts implementing BusDataProvider
 * 2. Import it here
 * 3. Change the export below to: export const busDataProvider = realApiProvider;
 * 
 * That's it! No other code changes needed.
 */
export const busDataProvider: BusDataProvider = mockDataProvider;
