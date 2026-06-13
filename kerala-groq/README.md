# 🌾 Kerala Farming Assistant — FREE Version (Groq AI)

100% free for farmers. No cost to you. Powered by Groq + Llama 3.3.

---

## 📁 Files
```
kerala-farming-assistant/
├── api/chat.js       ← Backend (hides your Groq key)
├── public/index.html ← Frontend farmers see
├── vercel.json       ← Deployment config
└── README.md
```

---

## 🔑 STEP 1 — Get Your FREE Groq API Key

1. Go to → https://console.groq.com
2. Click **Sign Up** (free, no credit card)
3. Click **API Keys** in the left menu
4. Click **Create API Key**
5. Give it a name like "kerala-farming"
6. Copy the key — looks like: `gsk_xxxxxxxxxxxxxxxxxxxx`

✅ That's your FREE key. Groq gives generous free limits.

---

## 📤 STEP 2 — Upload to GitHub

1. Go to → https://github.com → Sign up free
2. Click **"New"** (green button) → Create repository
3. Name it: `kerala-farming-assistant` → Click **Create repository**
4. Click **"uploading an existing file"**
5. Upload these files keeping the same folder structure:
   - `api/chat.js`
   - `public/index.html`
   - `vercel.json`
6. Click **Commit changes** ✅

---

## 🚀 STEP 3 — Deploy on Vercel (Free)

1. Go to → https://vercel.com → Sign up with GitHub
2. Click **Add New Project**
3. Click **Import** next to your `kerala-farming-assistant` repo
4. Leave all settings as default
5. Click **Deploy** 🚀

Wait ~1 minute. Vercel builds your site.

---

## 🔐 STEP 4 — Add Your Groq Key (Secret)

1. In Vercel → Click your project
2. Go to **Settings** tab
3. Click **Environment Variables** in left menu
4. Fill in:
   - **Key:** `GROQ_API_KEY`
   - **Value:** `gsk_your_key_here` (paste your Groq key)
5. Click **Save**
6. Go to **Deployments** tab → Click the 3 dots → **Redeploy**

---

## ✅ DONE!

Your chatbot is live at:
`https://kerala-farming-assistant.vercel.app`

Share this link with farmers — it's completely FREE for them!

---

## 💡 Groq Free Limits
- 30 requests/minute
- 14,400 requests/day  
- More than enough for farmers!
- No credit card ever needed

---

## 🛠️ Customize
- Edit the bot personality → `api/chat.js` → `SYSTEM_PROMPT`
- Change colors/design → `public/index.html`
- Add Malayalam responses → update SYSTEM_PROMPT to reply in Malayalam

Built with ❤️ for Kerala farmers
