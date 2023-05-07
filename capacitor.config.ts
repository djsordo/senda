import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sendaestadisticas',
  appName: 'senda',
  webDir: 'www/mobile',
  bundledWebRuntime: false,
  android: {
    loggingBehavior: 'debug'
  },
  ios: {
    loggingBehavior: 'debug'
  }
};

export default config;
