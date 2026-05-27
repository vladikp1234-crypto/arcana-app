# 🔮 Arcana App — Detailed Coding Guide
### Complete step-by-step for complete beginners

---

## BEFORE YOU START — What is a "Terminal"?

A Terminal is a black window where you type commands to your computer.
You'll be copying and pasting commands from this guide into it.
It looks scary but you're just telling your computer what to do, step by step.

---

---

# PART 1 — INSTALL YOUR TOOLS

---

## Step 1.1 — Install VS Code (your code editor)

1. Open your web browser (Chrome, Edge, etc.)
2. Go to: **https://code.visualstudio.com**
3. Click the big blue button that says **"Download for Windows"**
4. A file called something like `VSCodeSetup-x64-1.xx.x.exe` will download
5. Open that file (it's in your Downloads folder)
6. Click **Next → Next → Next → Install → Finish**
7. VS Code will open — it looks like a dark text editor

✅ You'll know it worked when VS Code opens and you see a welcome screen.

---

## Step 1.2 — Install Node.js (lets you run JavaScript commands)

1. Go to: **https://nodejs.org**
2. Click the button that says **"LTS"** (it has a green badge — this is the stable version)
3. A file called something like `node-v20.x.x-x64.msi` will download
4. Open that file
5. Click **Next → I accept the agreement → Next → Next → Install**
6. When it asks about "Tools for Native Modules" — TICK that checkbox
7. Click **Finish**
8. Your computer may open a black window and install some extras — let it finish, then press any key

✅ To check it worked:
- Press the **Windows key + R** on your keyboard
- Type **cmd** and press Enter
- A black window opens — type: `node --version` and press Enter
- You should see something like `v20.11.0`
- Then type: `npm --version` and press Enter
- You should see something like `10.2.4`

---

## Step 1.3 — Install Android Studio (for building the Android app)

1. Go to: **https://developer.android.com/studio**
2. Click **"Download Android Studio"**
3. Open the downloaded `.exe` file
4. Click **Next → Next → Next → Install** (this takes 5-10 minutes, it's a big program)
5. When it opens, click **"Do not import settings"** → OK
6. In the setup wizard, choose **Standard** installation → Next → Finish
7. It will download more files — this takes another 10-15 minutes on good internet

✅ You'll know it worked when you see the Android Studio welcome screen with "New Project" and "Open" buttons.

---

---

# PART 2 — SET UP YOUR PROJECT FOLDER

---

## Step 2.1 — Create your project folder

1. Open **File Explorer** (the folder icon on your taskbar)
2. Go to your **Documents** folder
3. Right-click in an empty area → **New → Folder**
4. Name the folder: **arcana-app**
5. Double-click it to open it — it's empty for now

---

## Step 2.2 — Put your app files in the folder

When you downloaded the zip file from me earlier:
1. Find `arcana-app.zip` in your Downloads folder
2. Right-click it → **Extract All**
3. Click **Browse** → navigate to your Documents → arcana-app folder
4. Click **Extract**

You should now have these 4 files inside your arcana-app folder:
```
arcana-app/
├── index.html
├── style.css
├── app.js
└── manifest.json
```

---

## Step 2.3 — Open the project in VS Code

1. Open **VS Code**
2. Click **File** (top left menu) → **Open Folder**
3. Navigate to **Documents → arcana-app**
4. Click **Select Folder**
5. You'll now see your 4 files listed on the LEFT side panel

---

## Step 2.4 — Open the Terminal in VS Code

This is important — from now on you'll type all commands here.

1. In VS Code, click **Terminal** in the top menu bar
2. Click **New Terminal**
3. A panel opens at the BOTTOM of VS Code — this is your terminal
4. You'll see something like: `PS C:\Users\YourName\Documents\arcana-app>`
5. The `arcana-app` at the end means you're in the right folder ✅

> ⚠️ IMPORTANT: Every command from here on gets typed into this terminal,
> then you press ENTER to run it.

---

---

# PART 3 — INSTALL CAPACITOR (wraps your app for phones)

---

## Step 3.1 — Initialise npm

Copy and paste this command into your terminal, then press Enter:

```
npm init -y
```

What you'll see:
```
Wrote to C:\Users\YourName\Documents\arcana-app\package.json
```

A new file called `package.json` appears in your file list. This is normal — it just tracks what tools your project uses.

---

## Step 3.2 — Install Capacitor

Copy and paste this ENTIRE command (it's one line), then press Enter:

```
npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios
```

What you'll see: lots of text scrolling by for about 30-60 seconds. Wait for it to finish.

When it's done, you'll see something like:
```
added 87 packages in 45s
```

---

## Step 3.3 — Initialise Capacitor for your app

Copy and paste this command, then press Enter:

```
npx cap init "Arcana" "com.yourname.arcana" --web-dir "."
```

> 📝 You can replace `yourname` with your actual name, e.g. `com.sarah.arcana`
> This is just an ID for your app — it doesn't need to be a real website.

What you'll see:
```
✔ Creating capacitor.config.ts in arcana-app
✔ Adding native platforms is the next step. Run npx cap add android or npx cap add ios
```

---

## Step 3.4 — Add Android support

Copy and paste this command, then press Enter:

```
npx cap add android
```

What you'll see: more text, then:
```
✔ Adding android project in android
```

A new folder called `android` appears in your file list — this is your Android app! Don't touch anything inside it manually.

---

## Step 3.5 — Copy your app files into the Android project

Copy and paste this command, then press Enter:

```
npx cap sync
```

What you'll see:
```
✔ Copying web assets from . to android/app/src/main/assets/public
✔ Creating capacitor.config.json in android/app/src/main/assets
✔ copy android
✔ Updating Android plugins
✔ update android
```

> 💡 Every time you make changes to index.html, style.css, or app.js,
> run `npx cap sync` again to update the Android app.

---

---

# PART 4 — TEST YOUR APP ON ANDROID

---

## Step 4.1 — Open Android Studio with your project

Copy and paste this command, then press Enter:

```
npx cap open android
```

Android Studio will open automatically with your project loaded.

---

## Step 4.2 — Wait for Android Studio to set itself up

When Android Studio first opens your project, it needs to sync (download some tools).
You'll see a progress bar at the BOTTOM of Android Studio.
Wait for it to finish — this can take 2-5 minutes.

You'll know it's done when the progress bar disappears.

---

## Step 4.3 — Create a virtual phone to test on

1. In Android Studio, click **Tools** in the top menu → **Device Manager**
2. A panel opens on the right — click **Create Device** (or the + button)
3. Choose **Phone** category → select **Pixel 7** → click **Next**
4. Under "Recommended", click **Download** next to the latest Android version (e.g. API 34)
5. Wait for the download → click **Next → Finish**

---

## Step 4.4 — Run your app!

1. At the top of Android Studio, you'll see a dropdown showing your virtual phone
2. Click the green **▶ Play button** (or press Shift+F10)
3. A virtual phone appears on your screen — wait for it to boot up
4. Your Arcana app will automatically open on the virtual phone! 🎉

---

---

# PART 5 — CONNECT YOUR CLAUDE API KEY

---

## Step 5.1 — Get your free API key

1. Go to: **https://console.anthropic.com**
2. Click **Sign Up** and create a free account
3. Once logged in, click **API Keys** in the left sidebar
4. Click **Create Key** at the top right
5. Give it a name like "arcana-app"
6. Copy the key — it starts with `sk-ant-api03-...`
   > ⚠️ Save this somewhere safe — you can only see it once!

---

## Step 5.2 — Add the key to your app

1. Open your app in the browser (or the Android emulator)
2. Tap **"Consult the Oracle"**
3. A popup appears asking for your API key
4. Paste your key and tap **"Activate Oracle"**

That's it — your app now has AI readings! 🔮

---

---

# PART 6 — PUBLISH TO GOOGLE PLAY (Android)

---

## Step 6.1 — Build a release version

In VS Code terminal, run:

```
npx cap sync
```

Then in Android Studio:
1. Click **Build** in the top menu
2. Click **Generate Signed Bundle / APK**
3. Choose **Android App Bundle** → click **Next**
4. Under "Key store path", click **Create new**
5. Fill in the form:
   - Key store path: click the folder icon, save it somewhere safe as `arcana-keystore.jks`
   - Password: choose a password (WRITE IT DOWN — you'll need it every time)
   - Alias: type `arcana`
   - Certificate fields: fill in your name, country (GB)
6. Click **OK → Next**
7. Choose **Release** → click **Create**
8. Wait about 1 minute
9. A green bar appears: **"Bundle(s) generated successfully"** — click **locate** to find your file
10. The file is called `app-release.aab` — this is what you upload to Google Play

---

## Step 6.2 — Create your Google Play account

1. Go to: **https://play.google.com/console**
2. Sign in with a Google account
3. Pay the **£20 one-time fee**
4. Fill in your developer name (this appears on the store listing)

---

## Step 6.3 — Create your app listing

1. Click **Create app** (top right)
2. Fill in:
   - App name: **Arcana – Mystic Oracle**
   - Default language: **English (United Kingdom)**
   - App or game: **App**
   - Free or paid: **Free**
3. Click **Create app**

---

## Step 6.4 — Fill in the store listing

In the left menu, click **Main store listing** and fill in:
- Short description (80 chars max): `AI-powered tarot readings, horoscopes & lunar guidance`
- Full description: (use the one I'll write for you — just ask!)
- Screenshots: take screenshots of the emulator (press the camera icon in the emulator panel)
- App icon: a 512×512 image (ask me to design this for you!)

---

## Step 6.5 — Upload your app file

1. In the left menu, click **Production** → **Create new release**
2. Click **Upload** → select your `app-release.aab` file
3. Add release notes: `Initial release of Arcana – Mystic Oracle`
4. Click **Save → Review release → Start rollout to Production**

Google will review your app — this usually takes **1-3 days**.

---

---

# PART 7 — PUBLISH TO IOS APP STORE (no Mac needed)

---

## Step 7.1 — Register as an Apple Developer

1. Go to: **https://developer.apple.com/programs/enroll**
2. Sign in with your Apple ID (create one free if you don't have one)
3. Choose **Individual** (not Organisation)
4. Fill in your details → pay **£90/year**
5. Wait for approval email — usually same day, sometimes up to 48 hours

---

## Step 7.2 — Sign up for Codemagic (builds iOS without a Mac)

1. Go to: **https://codemagic.io**
2. Click **Sign up free**
3. Choose **Sign up with GitHub**

---

## Step 7.3 — Upload your project to GitHub

1. Go to: **https://github.com** → sign up free
2. Click the **+** button (top right) → **New repository**
3. Name: **arcana-app** → set to **Public** → click **Create repository**
4. Follow the instructions on screen to upload your files
   (GitHub will show you exact commands to copy into your VS Code terminal)

---

## Step 7.4 — Connect Codemagic to your project

1. In Codemagic, click **Add application**
2. Choose **GitHub** → select your `arcana-app` repository
3. Project type: **Ionic/Capacitor**
4. Click **Finish: Add application**

---

## Step 7.5 — Configure the iOS build

1. Click on your app in Codemagic
2. Click **Build** on the right
3. Platform: **iOS**
4. Under **iOS signing**, connect your Apple Developer account
5. Click **Start new build**

Codemagic builds your app in the cloud — takes about 10 minutes.
When done, it emails you a link to download the `.ipa` file.

---

## Step 7.6 — Submit to App Store

1. Go to: **https://appstoreconnect.apple.com**
2. Click **My Apps** → **+** → **New App**
3. Fill in:
   - Platform: **iOS**
   - Name: **Arcana – Mystic Oracle**
   - Bundle ID: the one you chose earlier (e.g. com.yourname.arcana)
4. In the left menu, click **App Store → App Information** and fill in details
5. Click **TestFlight** → **+** → upload your `.ipa` from Codemagic
6. Once uploaded, go back to **App Store** → click **Submit for Review**

Apple reviews take **1-7 days**.

---

---

# QUICK REFERENCE — Commands you'll use most often

| What you want to do | Command to type |
|---|---|
| Update the native apps after editing code | `npx cap sync` |
| Open Android Studio | `npx cap open android` |
| Test in browser | Open index.html with Live Server |

---

# GETTING HELP

If you get stuck at any point, you can:
1. **Ask me** — paste the error message you see and I'll tell you exactly what to do
2. **Google the exact error message** — someone else has had the same problem!
3. The error messages look scary but they almost always have a simple fix

The most common beginner errors and fixes:
- `'npx' is not recognized` → Node.js didn't install properly, reinstall it
- `ENOENT: no such file or directory` → You're not in the right folder. Check the terminal shows `arcana-app` at the end
- `Permission denied` → Right-click VS Code → "Run as administrator"

---

You've got this! 🌙
