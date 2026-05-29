// ══════════════════════════════════════
//  ARCANA – MYSTIC ORACLE  |  app.js
//  Now with Premium + Ads
// ══════════════════════════════════════

// ── Monetisation Config ────────────────
// 🔧 SETUP: Replace these with your real IDs later (see MONETISATION-GUIDE.md)
const ADMOB_CONFIG = {
  appId: 'ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX',      // Your AdMob App ID
  interstitialId: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX', // Full-screen ad between readings
  bannerId: 'ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX',   // Banner ad at bottom
};
const REVENUECAT_API_KEY = 'YOUR_REVENUECAT_PUBLIC_KEY'; // From revenuecat.com dashboard
const PREMIUM_ENTITLEMENT = 'arcana_premium';

const FREE_READINGS_PER_DAY = 3;
const PREMIUM_PRICE_DISPLAY = '£4.99/month';

// ── Free / Premium State ───────────────

const Monetisation = {

  isPremium() {
    // In production this checks RevenueCat. For now uses localStorage.
    return localStorage.getItem('arcana_premium') === 'true';
  },

  getReadingsToday() {
    const today = new Date().toDateString();
    const stored = JSON.parse(localStorage.getItem('arcana_readings') || '{"date":"","count":0}');
    if (stored.date !== today) return 0;
    return stored.count;
  },

  recordReading() {
    const today = new Date().toDateString();
    const count = this.getReadingsToday() + 1;
    localStorage.setItem('arcana_readings', JSON.stringify({ date: today, count }));
  },

  canDoReading() {
    if (this.isPremium()) return true;
    return this.getReadingsToday() < FREE_READINGS_PER_DAY;
  },

  readingsLeft() {
    if (this.isPremium()) return '∞';
    return Math.max(0, FREE_READINGS_PER_DAY - this.getReadingsToday());
  },

  // Called after every reading for free users — shows an ad
  async showInterstitialAd() {
    if (this.isPremium()) return;
    // When AdMob plugin is installed, this shows a real ad.
    // For now shows a placeholder — replace with real AdMob call after setup.
    console.log('[AdMob] Would show interstitial ad here');
    // Real implementation (after npm install @capacitor-community/admob):
    // await AdMob.showInterstitial();
  },

  // Shows the upgrade modal
  showUpgradePrompt(reason = '') {
    const modal = document.getElementById('premiumModal');
    const reasonEl = document.getElementById('premiumReason');
    reasonEl.textContent = reason;
    modal.classList.remove('hidden');
  },

  // Simulates purchase — in production connects to RevenueCat
  async purchase() {
    const btn = document.getElementById('purchaseBtn');
    btn.disabled = true;
    btn.textContent = 'Connecting…';

    try {
      // 🔧 REAL IMPLEMENTATION (after RevenueCat setup):
      // const { customerInfo } = await Purchases.purchasePackage(package);
      // if (customerInfo.entitlements.active[PREMIUM_ENTITLEMENT]) { ... }

      // For now — simulate successful purchase
      await new Promise(r => setTimeout(r, 1500));
      localStorage.setItem('arcana_premium', 'true');
      document.getElementById('premiumModal').classList.add('hidden');
      updatePremiumUI();
      showToast('✨ Welcome to Arcana Premium!');
    } catch (e) {
      showToast('Purchase failed. Please try again.');
    } finally {
      btn.disabled = false;
      btn.textContent = `Unlock Premium – ${PREMIUM_PRICE_DISPLAY}`;
    }
  },

  // Restore purchases (required by App Store rules)
  async restore() {
    showToast('Checking your purchases…');
    // 🔧 REAL: await Purchases.restorePurchases();
    await new Promise(r => setTimeout(r, 1000));
    const hasPremium = localStorage.getItem('arcana_premium') === 'true';
    showToast(hasPremium ? '✅ Premium restored!' : 'No previous purchase found.');
  },
};

// ── UI helpers ─────────────────────────

function updatePremiumUI() {
  const isPremium = Monetisation.isPremium();
  const badge = document.getElementById('premiumBadge');
  const readingsCounter = document.getElementById('readingsCounter');
  const bannerAd = document.getElementById('bannerAd');

  if (badge) badge.textContent = isPremium ? '✨ Premium' : `${Monetisation.readingsLeft()} readings left`;
  if (badge) badge.className = isPremium ? 'premium-badge gold' : 'premium-badge free';
  if (bannerAd) bannerAd.classList.toggle('hidden', isPremium);
}

function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = 'toast visible';
  setTimeout(() => toast.className = 'toast', 3000);
}

// ── Data ──────────────────────────────

const TAROT_CARDS = [
  { num: '0',    name: 'The Fool',         art: '🤡', keywords: 'New beginnings, innocence, spontaneity', meaning: 'leap of faith, unlimited potential' },
  { num: 'I',    name: 'The Magician',     art: '🎩', keywords: 'Willpower, skill, manifestation', meaning: 'power to manifest desires into reality' },
  { num: 'II',   name: 'High Priestess',   art: '🌙', keywords: 'Intuition, mystery, inner knowledge', meaning: 'trust your intuition and inner voice' },
  { num: 'III',  name: 'The Empress',      art: '👑', keywords: 'Fertility, nature, abundance', meaning: 'creative abundance and nurturing energy' },
  { num: 'IV',   name: 'The Emperor',      art: '⚔️', keywords: 'Authority, structure, fatherhood', meaning: 'stability through discipline and order' },
  { num: 'V',    name: 'The Hierophant',   art: '🏛️', keywords: 'Tradition, spirituality, conformity', meaning: 'guidance from wisdom of the ages' },
  { num: 'VI',   name: 'The Lovers',       art: '💞', keywords: 'Love, harmony, alignment of values', meaning: 'choices made with heart and soul aligned' },
  { num: 'VII',  name: 'The Chariot',      art: '🏆', keywords: 'Victory, control, determination', meaning: 'willpower steering toward triumph' },
  { num: 'VIII', name: 'Strength',         art: '🦁', keywords: 'Courage, inner strength, compassion', meaning: 'gentle power over circumstances' },
  { num: 'IX',   name: 'The Hermit',       art: '🏔️', keywords: 'Introspection, solitude, guidance', meaning: 'inner light illuminating the path' },
  { num: 'X',    name: 'Wheel of Fortune', art: '☸️', keywords: 'Cycles, destiny, turning points', meaning: 'the wheel turns — change is inevitable' },
  { num: 'XI',   name: 'Justice',          art: '⚖️', keywords: 'Fairness, truth, cause and effect', meaning: 'karmic balance seeking equilibrium' },
  { num: 'XII',  name: 'The Hanged Man',   art: '🙃', keywords: 'Suspension, sacrifice, new perspective', meaning: 'pause before breakthrough' },
  { num: 'XIII', name: 'Death',            art: '🥀', keywords: 'Endings, transformation, transition', meaning: 'beautiful transformation; not physical death' },
  { num: 'XIV',  name: 'Temperance',       art: '🌊', keywords: 'Balance, patience, moderation', meaning: 'flowing harmony between all things' },
  { num: 'XV',   name: 'The Devil',        art: '🔗', keywords: 'Bondage, materialism, addiction', meaning: 'examine what truly holds you back' },
  { num: 'XVI',  name: 'The Tower',        art: '⚡', keywords: 'Upheaval, chaos, revelation', meaning: 'sudden change that reveals truth' },
  { num: 'XVII', name: 'The Star',         art: '⭐', keywords: 'Hope, renewal, inspiration', meaning: 'universe pouring blessings upon you' },
  { num: 'XVIII',name: 'The Moon',         art: '🌕', keywords: 'Illusion, fear, the unconscious', meaning: 'deeper truth hiding beneath the surface' },
  { num: 'XIX',  name: 'The Sun',          art: '☀️', keywords: 'Joy, success, vitality', meaning: 'radiant positivity and childlike wonder' },
  { num: 'XX',   name: 'Judgement',        art: '📯', keywords: 'Reflection, reckoning, awakening', meaning: 'higher calling summoning transformation' },
  { num: 'XXI',  name: 'The World',        art: '🌍', keywords: 'Completion, integration, accomplishment', meaning: 'wholeness and the dance of completion' },
];

const ZODIAC = {
  Aries:       { symbol: '♈', emoji: '🐏', element: 'Fire',  ruler: 'Mars' },
  Taurus:      { symbol: '♉', emoji: '🐂', element: 'Earth', ruler: 'Venus' },
  Gemini:      { symbol: '♊', emoji: '👯', element: 'Air',   ruler: 'Mercury' },
  Cancer:      { symbol: '♋', emoji: '🦀', element: 'Water', ruler: 'Moon' },
  Leo:         { symbol: '♌', emoji: '🦁', element: 'Fire',  ruler: 'Sun' },
  Virgo:       { symbol: '♍', emoji: '🌾', element: 'Earth', ruler: 'Mercury' },
  Libra:       { symbol: '♎', emoji: '⚖️', element: 'Air',   ruler: 'Venus' },
  Scorpio:     { symbol: '♏', emoji: '🦂', element: 'Water', ruler: 'Pluto' },
  Sagittarius: { symbol: '♐', emoji: '🏹', element: 'Fire',  ruler: 'Jupiter' },
  Capricorn:   { symbol: '♑', emoji: '🐐', element: 'Earth', ruler: 'Saturn' },
  Aquarius:    { symbol: '♒', emoji: '🏺', element: 'Air',   ruler: 'Uranus' },
  Pisces:      { symbol: '♓', emoji: '🐟', element: 'Water', ruler: 'Neptune' },
};

// ── Moon Phase Calculator ──────────────

function getMoonPhase() {
  const now = new Date();
  const knownNewMoon = new Date('2000-01-06');
  const daysSince = (now - knownNewMoon) / (1000 * 60 * 60 * 24);
  const moonCycle = 29.53;
  const phase = ((daysSince % moonCycle) + moonCycle) % moonCycle;

  if (phase < 1.85)  return { name: 'New Moon',        emoji: '🌑', energy: 'Set intentions. Plant seeds of what you wish to grow.', alignment: 'high' };
  if (phase < 7.38)  return { name: 'Waxing Crescent', emoji: '🌒', energy: 'Build momentum. Nurture what you have begun.', alignment: 'medium' };
  if (phase < 9.22)  return { name: 'First Quarter',   emoji: '🌓', energy: 'Take decisive action. Overcome obstacles with courage.', alignment: 'medium' };
  if (phase < 14.77) return { name: 'Waxing Gibbous',  emoji: '🌔', energy: 'Refine and perfect. Your efforts are bearing fruit.', alignment: 'high' };
  if (phase < 16.61) return { name: 'Full Moon',        emoji: '🌕', energy: 'Peak power. Emotions and energy are at their height.', alignment: 'very high' };
  if (phase < 22.15) return { name: 'Waning Gibbous',  emoji: '🌖', energy: 'Release and share gratitude for what has manifested.', alignment: 'medium' };
  if (phase < 23.99) return { name: 'Last Quarter',    emoji: '🌗', energy: 'Let go of what no longer serves you.', alignment: 'medium' };
  return { name: 'Waning Crescent', emoji: '🌘', energy: 'Rest and reflect. The cycle draws to a close.', alignment: 'low' };
}

function getSolarSeason() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  return 'Pisces';
}

// ── Stars Background ───────────────────

function createStars() {
  const container = document.getElementById('stars');
  for (let i = 0; i < 120; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 2.5 + 0.5;
    star.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      --dur: ${Math.random() * 4 + 2}s;
      --delay: -${Math.random() * 4}s;
      --min-op: ${Math.random() * 0.2 + 0.05};
    `;
    container.appendChild(star);
  }
}

// ── Navigation ─────────────────────────

function initNav() {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`screen-${btn.dataset.screen}`).classList.add('active');
    });
  });
}

// ── Tarot Grid ─────────────────────────

function buildTarotGrid() {
  const grid = document.getElementById('tarotGrid');
  TAROT_CARDS.forEach(card => {
    const el = document.createElement('div');
    el.className = 'tarot-card';
    el.innerHTML = `
      <div class="card-num">${card.num}</div>
      <div class="card-art">${card.art}</div>
      <div class="card-name">${card.name}</div>
    `;
    el.addEventListener('click', () => openCardModal(card));
    grid.appendChild(el);
  });
}

async function openCardModal(card) {
  // Premium check — card detail readings are a premium feature
  if (!Monetisation.isPremium()) {
    Monetisation.showUpgradePrompt('Unlock individual card readings with Premium ✨');
    return;
  }

  document.getElementById('modalCardArt').textContent = card.art;
  document.getElementById('modalCardName').textContent = card.name;
  document.getElementById('modalCardKeywords').textContent = card.keywords;
  const readingEl = document.getElementById('modalCardReading');
  readingEl.innerHTML = '<span class="loading-dots">Reading the card</span>';
  document.getElementById('cardModal').classList.remove('hidden');

  const apiKey = localStorage.getItem('arcana_api_key');
  if (!apiKey) {
    readingEl.textContent = card.meaning + '. Connect your API key for deeper AI readings.';
    return;
  }

  try {
    const moon = getMoonPhase();
    const response = await callClaude(apiKey, `You are a mystical tarot reader. Give a single evocative paragraph (4-6 sentences) reading for ${card.name} (${card.keywords}). The moon is currently ${moon.name}. Blend the card's meaning with the lunar energy. Be poetic, mystical, and personal. Do NOT use bullet points.`);
    readingEl.textContent = response;
  } catch (e) {
    readingEl.textContent = `${card.meaning}. The ${card.name} calls you to embrace your ${card.keywords.toLowerCase()}.`;
  }
}

// ── Horoscope Screen ───────────────────

function buildSignSelector() {
  const container = document.getElementById('horoSignSelector');
  Object.entries(ZODIAC).forEach(([name, data]) => {
    const btn = document.createElement('button');
    btn.className = 'sign-btn';
    btn.dataset.sign = name;
    btn.innerHTML = `${data.symbol}<span>${name}</span>`;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sign-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
    container.appendChild(btn);
  });

  document.getElementById('getHoroBtn').addEventListener('click', getHoroscope);
}

async function getHoroscope() {
  const activeSign = document.querySelector('.sign-btn.active');
  if (!activeSign) { alert('Please choose a star sign first.'); return; }
  const sign = activeSign.dataset.sign;
  const info = ZODIAC[sign];
  const card = document.getElementById('horoscopeCard');
  const textEl = document.getElementById('horoText');
  const iconEl = document.getElementById('horoSignIcon');
  const aspectsEl = document.getElementById('horoAspects');

  iconEl.textContent = info.emoji;
  textEl.innerHTML = '<span class="loading-dots">Reading the stars</span>';
  aspectsEl.innerHTML = '';
  card.classList.remove('hidden');

  const moon = getMoonPhase();
  const solar = getSolarSeason();
  const apiKey = localStorage.getItem('arcana_api_key');

  if (!apiKey) {
    textEl.textContent = `${sign}, ruled by ${info.ruler}, today the cosmos invites you to honour your ${info.element} nature. The ${moon.name} amplifies your innate gifts.`;
    renderAspects(aspectsEl, [moon.name, `${info.element} energy`, `Ruled by ${info.ruler}`]);
    return;
  }

  try {
    // Premium users get an extended reading
    const isPremium = Monetisation.isPremium();
    const depthInstruction = isPremium
      ? 'Write a detailed reading of 5-6 sentences covering love, career, AND spiritual growth. Include a lucky number and colour.'
      : 'Write a short reading of 2-3 sentences. Keep it general.';

    const text = await callClaude(apiKey,
      `You are a mystical astrologer. Write a horoscope for ${sign} (element: ${info.element}, ruler: ${info.ruler}).
       Current cosmic weather: Moon is in ${moon.name} (${moon.energy}), Sun is in ${solar}.
       ${depthInstruction} Be poetic and mystical. No bullet points.
       Then on a new line write: ASPECTS: [3 short phrases separated by |]`);

    const parts = text.split('ASPECTS:');
    textEl.textContent = parts[0].trim();
    if (parts[1]) renderAspects(aspectsEl, parts[1].trim().split('|').map(a => a.trim()));

    // Show ad after horoscope for free users
    await Monetisation.showInterstitialAd();

  } catch (e) {
    textEl.textContent = `${sign}, the stars speak of transformation and growth. Trust your ${info.element} instincts today.`;
    renderAspects(aspectsEl, [moon.name, `${info.element} energy`, `${info.ruler} in motion`]);
  }
}

function renderAspects(container, aspects) {
  container.innerHTML = '';
  aspects.forEach(a => {
    const tag = document.createElement('span');
    tag.className = 'aspect-tag';
    tag.textContent = a;
    container.appendChild(tag);
  });
}

// ── Cosmos Screen ──────────────────────

function initCosmos() {
  const moon = getMoonPhase();
  const solar = getSolarSeason();
  const solarInfo = ZODIAC[solar] || {};

  document.getElementById('moonPhase').textContent = moon.emoji;
  document.getElementById('moonPhaseName').textContent = moon.name;
  document.getElementById('moonDesc').textContent = moon.energy;
  document.getElementById('solarSeason').textContent = solar;
  document.getElementById('solarDesc').textContent = `Sun in ${solar}. ${solarInfo.element || 'Cosmic'} season energy surrounds all.`;

  document.getElementById('cosmicReadingBtn').addEventListener('click', getCosmicReading);
}

async function getCosmicReading() {
  const moon = getMoonPhase();
  const solar = getSolarSeason();
  const resultEl = document.getElementById('cosmicResult');
  const textEl = document.getElementById('cosmicText');
  textEl.innerHTML = '<span class="loading-dots">Scanning the cosmos</span>';
  resultEl.classList.remove('hidden');

  const apiKey = localStorage.getItem('arcana_api_key');
  if (!apiKey) {
    textEl.textContent = `The ${moon.name} bathes the world in ${solar} solar light. ${moon.energy} This is a potent time for cosmic alignment.`;
    return;
  }

  try {
    const text = await callClaude(apiKey,
      `You are a cosmic astrologer. Moon phase: ${moon.name} (${moon.energy}), Sun in ${solar}.
       Write a 4-5 sentence cosmic weather report. Be mystical and inspiring. No bullet points.`);
    textEl.textContent = text;
    await Monetisation.showInterstitialAd();
  } catch (e) {
    textEl.textContent = `Under the ${moon.name}, with the Sun in ${solar}, the cosmos is active. ${moon.energy}`;
  }
}

// ── Oracle (Main Reading) ──────────────

function drawCards(n = 3) {
  const shuffled = [...TAROT_CARDS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n).map(c => ({ ...c, reversed: Math.random() > 0.7 }));
}

document.getElementById('askOracleBtn').addEventListener('click', async () => {
  const apiKey = localStorage.getItem('arcana_api_key');
  if (!apiKey) {
    document.getElementById('apiModal').classList.remove('hidden');
    return;
  }

  // Check reading limit for free users
  if (!Monetisation.canDoReading()) {
    Monetisation.showUpgradePrompt(`You've used all ${FREE_READINGS_PER_DAY} free readings today. Upgrade for unlimited access ✨`);
    return;
  }

  await doOracleReading();
});

async function doOracleReading() {
  const question = document.getElementById('oracleQuestion').value.trim() || 'What does the universe want me to know today?';
  const sign = document.getElementById('starSign').value;
  const btn = document.getElementById('askOracleBtn');
  const resultEl = document.getElementById('oracleResult');
  const textEl = document.getElementById('oracleText');
  const cardsEl = document.getElementById('drawnCards');
  const factorsEl = document.getElementById('cosmicFactors');

  btn.disabled = true;
  btn.querySelector('.btn-text').textContent = 'Consulting the Oracle…';

  const isPremium = Monetisation.isPremium();
  // Premium draws 5 cards, free draws 3
  const cardCount = isPremium ? 5 : 3;
  const cards = drawCards(cardCount);
  const moon = getMoonPhase();
  const solar = getSolarSeason();

  cardsEl.innerHTML = '';
  cards.forEach((card, i) => {
    const el = document.createElement('div');
    el.className = 'mini-card';
    el.style.animationDelay = `${i * 0.2}s`;
    el.innerHTML = `
      <span class="mini-card-art">${card.art}</span>
      <span class="mini-card-name">${card.reversed ? '(Rev.) ' : ''}${card.name}</span>
    `;
    cardsEl.appendChild(el);
  });

  textEl.innerHTML = '<span class="loading-dots">The Oracle speaks</span>';
  factorsEl.innerHTML = '';
  resultEl.classList.remove('hidden');

  const apiKey = localStorage.getItem('arcana_api_key');
  const positions = isPremium
    ? ['Distant Past', 'Recent Past', 'Present', 'Near Future', 'Outcome']
    : ['Past', 'Present', 'Future'];

  const cardDesc = cards.map((c, i) =>
    `${positions[i]}: ${c.name}${c.reversed ? ' (reversed)' : ''} — ${c.keywords}`
  ).join('\n');

  const signContext = sign ? `The querent is ${sign} (element: ${ZODIAC[sign]?.element}, ruler: ${ZODIAC[sign]?.ruler}).` : '';
  const depthInstruction = isPremium
    ? 'Write a rich, detailed reading of 7-9 sentences. Cover all 5 card positions in narrative form. End with a specific actionable guidance sentence.'
    : 'Write a flowing reading of 5-6 sentences covering the 3 card positions. End with one empowering sentence.';

  try {
    const reading = await callClaude(apiKey,
      `You are a wise, mystical tarot oracle. Reading for: "${question}"
       Cards: ${cardDesc}
       ${signContext}
       Cosmic weather: ${moon.name} (${moon.energy}) in ${solar} solar season.
       ${depthInstruction} Be poetic, mystical, personally meaningful. No bullet points, no headers.`);

    textEl.textContent = reading;

    // Record reading and show ad for free users
    Monetisation.recordReading();
    updatePremiumUI();
    await Monetisation.showInterstitialAd();

  } catch (e) {
    textEl.textContent = `The ${cards[0].name} reveals your past. In the present, ${cards[1].name} speaks. The path forward calls through ${cards[2].name}. Under the ${moon.name}, trust the journey.`;
  }

  const factors = [moon.name, `☀️ ${solar}`, sign ? `${ZODIAC[sign].symbol} ${sign}` : null].filter(Boolean);
  factors.forEach(f => {
    const tag = document.createElement('span');
    tag.className = 'cosmic-tag';
    tag.textContent = f;
    factorsEl.appendChild(tag);
  });

  btn.disabled = false;
  btn.querySelector('.btn-text').textContent = 'Consult the Oracle';

  // Add share button after the reading
  let shareBtn = document.getElementById('shareOracleBtn');
  if (!shareBtn) {
    shareBtn = document.createElement('button');
    shareBtn.id = 'shareOracleBtn';
    shareBtn.className = 'share-btn';
    shareBtn.innerHTML = '✨ Share This Reading';
    resultEl.appendChild(shareBtn);
  }
  shareBtn.onclick = () => shareReading(textEl.textContent, cards);

  resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Share Reading ──────────────────────

async function shareReading(text, cards) {
  const cardNames = cards.map(c => `${c.art} ${c.name}`).join(' • ');
  const shareText = `🔮 My Veyla Reading 🔮\n\n${cardNames}\n\n"${text}"\n\nGet your reading on Veyla — Mystic Oracle ✨`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: 'My Mystic Reading',
        text: shareText,
      });
    } catch (e) {
      // User cancelled, no error
    }
  } else {
    // Fallback for browsers without share API — copy to clipboard
    try {
      await navigator.clipboard.writeText(shareText);
      showToast('✨ Reading copied! Share anywhere.');
    } catch (e) {
      alert(shareText);
    }
  }
}

// ── Claude API Call ────────────────────



// ── Gemini API Call ────────────────────

async function callClaude(apiKey, prompt) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.9,
          maxOutputTokens: 1000,
        },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error?.message || 'API error');
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

// ── API Key Modal ──────────────────────

document.getElementById('saveApiKey').addEventListener('click', () => {
  const key = document.getElementById('apiKeyInput').value.trim();
  if (key.length < 20) { alert('Please enter a valid Gemini API key'); return; }
  localStorage.setItem('arcana_api_key', key);
  document.getElementById('apiModal').classList.add('hidden');
  doOracleReading();
});

// ── Premium Modal ──────────────────────

document.getElementById('purchaseBtn').addEventListener('click', () => Monetisation.purchase());
document.getElementById('restoreBtn').addEventListener('click', () => Monetisation.restore());
document.getElementById('closePremiumModal').addEventListener('click', () => {
  document.getElementById('premiumModal').classList.add('hidden');
});

// ── Card Modal ─────────────────────────

document.getElementById('closeCardModal').addEventListener('click', () => {
  document.getElementById('cardModal').classList.add('hidden');
});

// ── Header badge click → upgrade ───────

document.getElementById('premiumBadge').addEventListener('click', () => {
  if (!Monetisation.isPremium()) Monetisation.showUpgradePrompt('');
});

// ── Update header ──────────────────────

function updateHeader() {
  const moon = getMoonPhase();
  document.getElementById('moonPhase').textContent = moon.emoji;
  const solar = getSolarSeason();
  const info = ZODIAC[solar];
  if (info) document.getElementById('signBadge').textContent = info.symbol;
}

// ── Init ───────────────────────────────

createStars();
initNav();
buildTarotGrid();
buildSignSelector();
initCosmos();
updateHeader();
updatePremiumUI();

// ══════════════════════════════════════
// SHUFFLE MODE — Dramatic Card Reading
// ══════════════════════════════════════

document.getElementById('shuffleBtn').addEventListener('click', async () => {
  const apiKey = localStorage.getItem('arcana_api_key');
  if (!apiKey) {
    document.getElementById('apiModal').classList.remove('hidden');
    return;
  }

  if (!Monetisation.canDoReading()) {
    Monetisation.showUpgradePrompt(`You've used all ${FREE_READINGS_PER_DAY} free readings today. Upgrade for unlimited shuffles ✨`);
    return;
  }

  await doShuffleReading();
});

async function doShuffleReading() {
  const question = document.getElementById('shuffleQuestion').value.trim() || 'Tell me the story the cards see for me tonight.';
  const btn = document.getElementById('shuffleBtn');
  const stage = document.getElementById('shuffleStage');
  const deck = document.getElementById('deckContainer');
  const resultEl = document.getElementById('shuffleResult');
  const cardsEl = document.getElementById('shuffleDrawnCards');
  const storyEl = document.getElementById('shuffleStory');

  btn.disabled = true;
  btn.querySelector('.btn-text').textContent = 'Shuffling…';
  resultEl.classList.add('hidden');

  // Start shuffle animation
  deck.classList.add('shuffling');

  // Wait for the dramatic effect (2.5 seconds)
  await new Promise(r => setTimeout(r, 2500));

  deck.classList.remove('shuffling');

  // Draw 3 cards dramatically
  const cards = drawCards(3);
  const moon = getMoonPhase();
  const solar = getSolarSeason();

  cardsEl.innerHTML = '';
  cards.forEach((card, i) => {
    const el = document.createElement('div');
    el.className = 'flipped-card';
    el.style.animationDelay = `${i * 0.4}s`;
    el.innerHTML = `
      <span class="flipped-card-art">${card.art}</span>
      <span class="flipped-card-name">${card.reversed ? '~' : ''}${card.name}</span>
    `;
    cardsEl.appendChild(el);
  });

  storyEl.innerHTML = '<span class="loading-dots">The cards whisper their story</span>';
  resultEl.classList.remove('hidden');
  resultEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // Wait a bit so user sees the cards flip
  await new Promise(r => setTimeout(r, 1500));

  const apiKey = localStorage.getItem('arcana_api_key');
  const isPremium = Monetisation.isPremium();
  const cardDesc = cards.map((c, i) =>
    `Card ${i+1} (${['the beginning', 'the heart', 'the destiny'][i]}): ${c.name}${c.reversed ? ' reversed' : ''} — ${c.keywords}`
  ).join('\n');

  const lengthInstruction = isPremium
    ? 'Tell a vivid 8-10 sentence story. Make it cinematic and personal.'
    : 'Tell a vivid 5-6 sentence story. Make it cinematic.';

  try {
    const story = await callClaude(apiKey,
      `You are a wise, theatrical fortune teller in a candlelit room. The cards have just been shuffled and three drawn for this person who asked: "${question}"

       Cards drawn in order:
       ${cardDesc}

       Current cosmic energy: Moon is in ${moon.name}, Sun is in ${solar}.

       ${lengthInstruction}

       Tell their story like an old gypsy storyteller — mysterious, captivating, dramatic. Start with something like "I see..." or "The cards reveal..." or "Listen closely...". Weave the three cards into ONE flowing tale about THEIR life — past, present, and what's coming. Be specific, emotional, intriguing. Hint at struggles, hidden truths, and what awaits. Make them feel like the story is uniquely about them. End with one captivating line about their future. No bullet points. No "Card 1, Card 2" — just the story.`);

    storyEl.textContent = story;

    Monetisation.recordReading();
    updatePremiumUI();
    await Monetisation.showInterstitialAd();
  } catch (e) {
    storyEl.textContent = `The cards have spoken in whispers tonight... ${cards[0].name} marks where you began, ${cards[1].name} burns in your present moment, and ${cards[2].name} waits at the edge of what is yet to come.`;
  }

  btn.disabled = false;
  btn.querySelector('.btn-text').textContent = '🎴 Shuffle the Cards';

  // Set up share button
  document.getElementById('shareShuffleBtn').onclick = () => shareReading(storyEl.textContent, cards);
}
