import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'org.fuzue.seasonalfood',
  appName: 'Seasonal Food',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  },
  android: {
    path: './android'
  }
};

export default config;
