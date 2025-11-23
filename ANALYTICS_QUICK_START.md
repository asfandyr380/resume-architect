# Firebase Analytics - Quick Reference

## What's Been Integrated

✅ **Firebase SDK** - Installed and configured
✅ **Analytics Service** - Type-safe event tracking
✅ **Automatic Event Tracking** for:
  - Template selections
  - Theme toggles
  - PDF/PNG downloads (started, completed, failed)
  - Editor tab changes
  - AI feature usage
  - Page views

## Files Created

1. **`firebase.ts`** - Firebase initialization and configuration
2. **`services/analytics.ts`** - Analytics helper functions
3. **`FIREBASE_SETUP.md`** - Complete setup instructions
4. **`.env.example`** - Environment variable template

## Files Modified

1. **`App.tsx`** - Added page tracking and download analytics
2. **`Editor.tsx`** - Added tab change and AI usage tracking
3. **`.gitignore`** - Added `.env` protection

## Next Steps

### 1. Get Your Firebase Configuration

1. Visit [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Add a web app to your project
4. Copy the Firebase configuration object

### 2. Create .env File

Create a `.env` file in your project root:

```bash
cp .env.example .env
```

Then edit `.env` and add your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_actual_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Important:** Restart your dev server after editing `.env`!

### 3. Test It

```bash
npm run dev
```

Then:
- Click around the app
- Change templates
- Toggle theme
- Download PDF/PNG
- Switch editor tabs

### 4. View Analytics

- Wait 24-48 hours for data
- Go to Firebase Console → Analytics → Events
- See your tracked events!

## Events You Can Track

| Event Name | Triggers When |
|-----------|---------------|
| `page_view` | App loads |
| `template_selected` | User picks a template |
| `theme_toggled` | Light/Dark mode switch |
| `download_started` | Download begins |
| `download_completed` | Download succeeds |
| `download_failed` | Download fails |
| `editor_tab_changed` | User switches tabs |
| `ai_enhancement_used` | AI text enhancement used |
| `ai_bullet_generated` | AI bullet point created |

## Need Help?

📖 Read **FIREBASE_SETUP.md** for detailed instructions
🔍 Check browser console for errors
🌐 Visit [Firebase Docs](https://firebase.google.com/docs/analytics)

## Security Notes

⚠️ **IMPORTANT:**
- Never commit your `.env` file
- `.env` is already in `.gitignore`
- Use `.env.example` as a template
- Keep your API keys secure

---

Firebase Analytics is ready to use! Just add your config and start tracking. 🚀
