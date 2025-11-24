import { ProviderConnector } from './types';
import { mockRedBusConnector } from './mockRedBusConnector';
import { mockAbhiBusConnector } from './mockAbhiBusConnector';

/**
 * Provider Registry
 * Central registry of all active provider connectors
 * 
 * To add a new provider:
 * 1. Create connector implementing ProviderConnector
 * 2. Import it here
 * 3. Add to activeProviders array
 */

export const activeProviders: ProviderConnector[] = [
    mockRedBusConnector,
    mockAbhiBusConnector
];

/**
 * Get all active providers
 */
export function getActiveProviders(): ProviderConnector[] {
    return activeProviders;
}

/**
 * Get provider by name
 */
export function getProviderByName(name: string): ProviderConnector | undefined {
    return activeProviders.find(p => p.name.toLowerCase() === name.toLowerCase());
}
