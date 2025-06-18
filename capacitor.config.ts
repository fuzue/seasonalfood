import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "org.fuzue.seasonalfood",
  appName: "Seasonal Food",
  webDir: "build",
  server: {
    androidScheme: "https",
    allowNavigation: ["*"],
  },
  android: {
    path: "./android",
    allowMixedContent: true,
    captureInput: true,
  },
};

export default config;
