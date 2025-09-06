import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  /**
   * Check if Brotli support is currently enabled
   */
  isEnabled(): Promise<boolean>;

  /**
   * Enable or disable Brotli compression support
   */
  setEnabled(enabled: boolean): Promise<boolean>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NetworkBrotli');
