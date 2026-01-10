AI-powered resume builder with professional templates, Google login, and PDF export.

✨ Demo
https://resume-builder-nu-blush.vercel.app/

🛠 Tech
React + Vite + Supabase + Gemini AI + Vercel

🚀 Setup
npm install
npm run dev

.env:
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
VITE_GEMINI_API_KEY=your_key

☁️ Deploy
vercel --prod
vercel.json:
json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}

📁 Files
src/
├── components/     # Template1.jsx, Template2.jsx
├── pages/          # Home.jsx, Dashboard.jsx
├── contexts/       # AuthContext.jsx
└── utils/          # geminiHelper.js

🎯 Features
AI bullet enhancement (Gemini)
2 templates (Classic + Modern)
PDF export with styling
Google OAuth + Supabase
Auto-save to database
