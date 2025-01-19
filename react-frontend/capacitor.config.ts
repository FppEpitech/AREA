import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.Plumpy.app',
  appName: 'Plumpy',
  webDir: 'build',
  plugins: {
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ["google.com", "github.com"],
    },
  }
};

export default config;
