# Delice
 
 Delice is a React Native (Expo) food ordering app with Supabase (Auth + Database + Storage) and Paystack card payments via Supabase Edge Functions.
 
 ## App download
 
 - **Android (Play Store / APK)**: https://YOUR_DOWNLOAD_LINK_HERE
 
 If you send me your real link (Play Store URL, App Store URL, or direct APK link), I’ll replace the placeholder.
 
 ## Tech stack
 
 - **Mobile**: Expo + React Native
 - **Navigation**: React Navigation
 - **State**: Redux Toolkit + redux-persist
 - **Backend**: Supabase
 - **Payments**: Paystack Hosted Checkout (card)
 
 ## Getting started
 
 1. Install dependencies
 
    ```bash
    npm install
    ```
 
 2. Create environment variables
 
    Create a `.env` file in the project root and add:
 
    ```bash
    EXPO_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
    EXPO_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```
 
 3. Start the app
 
    ```bash
    npx expo start
    ```
 
 ## Paystack payments (Supabase Edge Functions)
 
 Payments are implemented using Paystack hosted checkout.
 
 - **Init**: `supabase/functions/paystack-init`
 - **Verify**: `supabase/functions/paystack-verify`
 
 The functions expect a Paystack secret key stored in Supabase secrets (Dashboard) as:
 
 - `PAYSTACK_SECRET_KEY`
 
 Deployment examples:
 
 ```bash
 npx supabase functions deploy paystack-init --no-verify-jwt
 npx supabase functions deploy paystack-verify --no-verify-jwt
 ```
 
 ## Deep linking
 
 The Paystack callback uses deep linking:
 
 - **Scheme**: `delice://`
 - **Callback route**: `delice://paystack/callback`
 
 Linking configuration is in:
 
 - `src/navigation/linking.ts`
 
 ## Scripts
 
 ```bash
 npm run start
 npm run android
 npm run ios
 npm run web
 ```
