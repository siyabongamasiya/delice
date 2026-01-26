// Expo automatically inlines EXPO_PUBLIC_* envs; no dotenv needed in RN

/** @type {import('@expo/config').ExpoConfig} */
module.exports = {
  name: "delice",
  slug: "delice",
  scheme: "delice",
  version: "1.0.0",
  orientation: "portrait",
  userInterfaceStyle: "dark",
  ios: { supportsTablet: true },
  android: {},
  web: { bundler: "metro" },
  extra: {
    // Optional access via Constants.expoConfig?.extra if needed
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    eas: { projectId: process.env.EAS_PROJECT_ID || null },
  },
};
