# 💰 Arcana – Monetisation Setup Guide

Your app now has a full free/premium system built in. Here's how to connect
the real payment and ad services when you're ready to go live.

---

## How the Money Model Works

FREE users get:
- 3 Oracle readings per day
- Short horoscopes (2-3 sentences)
- Basic 3-card spreads
- Ads shown between readings

PREMIUM users (£4.99/month) get:
- Unlimited readings every day
- Deep horoscopes covering love, career & spiritual growth
- 5-card spreads
- Individual tarot card AI readings
- Zero ads

---

## PART A — Setting Up Subscriptions (RevenueCat)

RevenueCat handles all the complex subscription billing for you.
It's free until you earn over $2,500/month.

### Step A1 — Create your RevenueCat account
1. Go to https://www.revenuecat.com
2. Click "Get started free" → sign up
3. Click "Create new project" → name it "Arcana"

### Step A2 — Install the RevenueCat plugin
In your VS Code terminal, type this and press Enter:
```
npm install @revenuecat/purchases-capacitor
```
Then:
```
npx cap sync
```

### Step A3 — Set up your subscription in the App Store
(Do this BEFORE connecting RevenueCat)

In App Store Connect (appstoreconnect.apple.com):
1. Click your app → "Subscriptions" in the left menu
2. Click "+" to create a Subscription Group → name it "Arcana Premium"
3. Click "+" to add a subscription:
   - Reference Name: Premium Monthly
   - Product ID: arcana.premium.monthly
   - Duration: 1 Month
   - Price: £4.99

In Google Play Console:
1. Click your app → "Monetise" → "Subscriptions"
2. Click "Create subscription":
   - Product ID: arcana.premium.monthly
   - Name: Arcana Premium
   - Billing period: Monthly
   - Price: £4.99

### Step A4 — Connect RevenueCat to both stores
In the RevenueCat dashboard:
1. Click "Apps" → add your iOS app (paste your Apple Bundle ID)
2. Click "Apps" → add your Android app (paste your Google package name)
3. Go to "Entitlements" → click "+" → name it: arcana_premium
4. Go to "Offerings" → create an offering with your monthly subscription

### Step A5 — Add your RevenueCat key to the app
1. In RevenueCat dashboard, go to "API Keys"
2. Copy your PUBLIC key (starts with appl_... or goog_...)
3. Open app.js in VS Code
4. Find this line near the top:
   const REVENUECAT_API_KEY = 'YOUR_REVENUECAT_PUBLIC_KEY';
5. Replace YOUR_REVENUECAT_PUBLIC_KEY with your actual key
6. Save the file → run: npx cap sync

---

## PART B — Setting Up Ads (Google AdMob)

AdMob shows ads to free users. You earn money every time they see or tap an ad.
Typical earnings: £3–£8 per 1,000 ad views.

### Step B1 — Create your AdMob account
1. Go to https://admob.google.com
2. Sign in with your Google account
3. Click "Add app" → choose iOS or Android → enter your app details

### Step B2 — Create your ad units
In AdMob, click your app → "Ad units" → "Add ad unit":

Create TWO ad units:
1. Type: Interstitial (full-screen, shows between readings)
   → Copy the Ad Unit ID (looks like: ca-app-pub-XXXX/XXXX)
2. Type: Banner (small bar at bottom)
   → Copy that Ad Unit ID too

### Step B3 — Install the AdMob plugin
In VS Code terminal:
```
npm install @capacitor-community/admob
```
Then:
```
npx cap sync
```

### Step B4 — Add your AdMob IDs to the app
Open app.js in VS Code. Find these lines near the top:

```javascript
const ADMOB_CONFIG = {
  appId: 'ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX',
  interstitialId: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
  bannerId: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',
};
```

Replace each XXXXXXXX with your real IDs from AdMob.
Save the file → run: npx cap sync

### Step B5 — Activate real ads (replace the placeholder code)
In app.js, find the showInterstitialAd() function.
Replace the comment line with:

```javascript
await AdMob.showInterstitial();
```

And add this at the very top of app.js (line 1):
```javascript
import { AdMob } from '@capacitor-community/admob';
```

---

## How Much Could You Earn?

Example with 1,000 active users:

| Source | Calculation | Monthly estimate |
|---|---|---|
| Ads (free users) | 700 users × 5 readings × £0.005 | ~£17.50 |
| Subscriptions | 50 premium users × £4.99 | ~£249.50 |
| **Total** | | **~£267/month** |

With 10,000 users, that scales to roughly £2,500–£3,000/month.

Apple and Google each take 15-30% of subscription revenue.
RevenueCat is free until $2,500/month earnings.
AdMob is free to use (they take a cut of the ad revenue automatically).

---

## Testing Before Going Live

While developing, use TEST IDs so you don't accidentally violate ad policies:

AdMob test IDs (use these while building):
- iOS Interstitial: ca-app-pub-3940256099942544/4411468910
- Android Interstitial: ca-app-pub-3940256099942544/1033173712
- iOS Banner: ca-app-pub-3940256099942544/2934735716
- Android Banner: ca-app-pub-3940256099942544/6300978111

RevenueCat has a sandbox mode — purchases in development don't charge real money.

---

Questions? Paste any error messages and I'll walk you through them!
