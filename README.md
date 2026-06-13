# Kerala Farming Assistant 🌾

An AI-powered farming assistant specifically designed for Kerala farmers. Get instant advice on crops, pest control, irrigation, soil health, and government schemes.

## Project Structure

```
kerala-farming-assistant/
├── api/
│   └── chat.js          # Chat API endpoint (handles farming questions)
├── index.js             # Main React component (frontend)
├── vercel.json          # Vercel deployment configuration
├── package.json         # Project dependencies
├── .env.local           # Environment variables (API keys)
└── README.md            # This file
```

## Setup Instructions

### 1. Clone or Download this Project

```bash
git clone <your-repo-url>
cd kerala-farming-assistant
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory and add your API key:

```
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

Get your API key from: https://console.anthropic.com/

### 4. Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## Features

- 🌾 **Bilingual Support** - English & Malayalam
- 💬 **AI Chat Interface** - Ask about crops, pests, irrigation, soil health
- ⚡ **Quick Suggestions** - 8 pre-set farming questions
- 🎨 **Animated Background** - Farmer & crop field animations
- 📱 **Responsive Design** - Works on mobile, tablet, desktop
- 🚀 **Fast API** - Powered by Claude AI (Anthropic)

## Deployment to Vercel

### Using Vercel CLI

```bash
npm i -g vercel
vercel
```

### Using GitHub

1. Push your code to GitHub
2. Go to https://vercel.com/new
3. Import your GitHub repository
4. Add environment variable `ANTHROPIC_API_KEY`
5. Deploy

### Add Environment Variable on Vercel

1. Go to your Vercel project settings
2. Add "Environment Variables"
3. Name: `ANTHROPIC_API_KEY`
4. Value: Your Anthropic API key
5. Redeploy

## API Endpoint

**POST** `/api/chat`

**Request:**
```json
{
  "message": "Best crops for monsoon?"
}
```

**Response:**
```json
{
  "response": "For monsoon season in Kerala, the best crops include..."
}
```

## Tech Stack

- **Frontend:** React, Tailwind CSS, Lucide Icons
- **Backend:** Node.js, Anthropic Claude API
- **Deployment:** Vercel
- **Runtime:** Serverless functions

## Customization

### Change Chat System Prompt

Edit `/api/chat.js` and modify the `system` parameter in the API call:

```javascript
system: `Your custom instructions for the AI assistant...`
```

### Update Suggestions

Edit `index.js` and modify the `suggestions` array:

```javascript
const suggestions = [
  { emoji: '⚡', text: 'Your suggestion', mal: 'Malayalam translation' },
  // Add more...
];
```

### Customize Styling

- Colors: Modify Tailwind classes in `index.js`
- Animations: Edit `@keyframes` in the `<style>` sections
- Fonts: Update Tailwind typography config

## Troubleshooting

### Chat not working
- Check if API key is set correctly in `.env.local`
- Verify the API key is valid at console.anthropic.com

### Animations not smooth
- Clear browser cache
- Check browser console for errors
- Ensure you're using a modern browser (Chrome, Firefox, Safari, Edge)

### Vercel deployment issues
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify environment variables are set

## License

MIT License - Feel free to use and modify!

## Support

For questions or issues, please create an issue in the repository.

---

**Built with ❤️ for Kerala Farmers**
