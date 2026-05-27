# 🔮 Arcana – Mystic Oracle App

A beautiful tarot, horoscope, and cosmic weather app powered by AI.

---

## What's Inside

- **Oracle Screen** – Ask a question, draw 3 tarot cards, get an AI reading
- **Tarot Screen** – All 22 Major Arcana cards with AI interpretations  
- **Stars Screen** – AI-powered daily horoscopes for all 12 signs
- **Cosmos Screen** – Live moon phase + solar season + cosmic weather

---

## Setup Instructions (Complete Beginner)

### Step 1 – Install VS Code
1. Go to https://code.visualstudio.com
2. Click the big download button for your operating system (Windows/Mac)
3. Open the installer and follow the steps
4. Launch VS Code

### Step 2 – Open this project in VS Code
1. In VS Code, click **File → Open Folder**
2. Select the folder where you saved these files
3. You'll see all the files (index.html, style.css, app.js, manifest.json) on the left sidebar

### Step 3 – Preview your app locally
1. In VS Code, press **Ctrl+Shift+X** (Windows) or **Cmd+Shift+X** (Mac) to open Extensions
2. Search for **"Live Server"** (by Ritwick Dey) and click Install
3. Right-click on `index.html` in the sidebar
4. Click **"Open with Live Server"**
5. Your browser opens with the app running! 🎉

### Step 4 – Get your Claude API key (free)
1. Go to https://console.anthropic.com
2. Create a free account
3. Click **API Keys** in the left menu
4. Click **Create Key** and copy the key (starts with sk-ant-)
5. In the app, click **"Consult the Oracle"** – it will ask for your key
6. Paste your key and click **Activate Oracle**

Your key is saved in your browser. You only need to do this once.

### Step 5 – Put your app on the internet (free)
1. Go to https://github.com and create a free account
2. Click **New Repository**, name it "arcana-app", make it Public, click Create
3. Go to https://vercel.com and sign up with your GitHub account
4. Click **Add New → Project**
5. Import your GitHub repository
6. Click **Deploy** – Vercel builds and hosts it for free!
7. You get a link like `https://arcana-app.vercel.app` – share it with anyone!

### Step 6 – Use it like an app on your phone
1. Open your Vercel link on your phone
2. On iPhone: tap the Share button → "Add to Home Screen"
3. On Android: tap the 3-dot menu → "Add to Home Screen"
4. It appears as an app icon on your phone! 📱

---

## File Structure
```
arcana-app/
├── index.html     ← The app structure
├── style.css      ← All the visual design
├── app.js         ← All the logic and AI calls
└── manifest.json  ← Makes it work like a mobile app
```

---

## Customising (when you're ready)

- **Change colours** → Edit the `:root { }` section in `style.css`
- **Add tarot cards** → Edit the `TAROT_CARDS` array in `app.js`
- **Change AI personality** → Edit the text in quotes inside `callClaude(...)` in `app.js`
- **Add minor arcana cards** → Extend the `TAROT_CARDS` array with the 56 minor arcana

---

## Cost
- VS Code: **Free**
- GitHub: **Free**
- Vercel hosting: **Free**
- Claude API: **Pay as you use** (a reading costs ~$0.001 – about 1/10 of a penny)
  - $5 of credit = roughly 5,000 readings
  - New accounts get free credits to start

---

Built with ❤️ and ✨
