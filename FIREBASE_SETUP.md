# Firebase Analytics Setup Instructions

This document provides complete instructions for setting up Firebase Analytics in your Resume Architect project.

## Prerequisites

- A Google account
- Node.js and npm installed
- Your Resume Architect project

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter a project name (e.g., "Resume Architect")
4. (Optional) Enable Google Analytics for the project
5. Click "Continue" and follow the prompts to complete project creation

## Step 2: Register Your Web App

1. In the Firebase Console, click on the web icon (`</>`) to add a web app
2. Enter an app nickname (e.g., "Resume Architect Web")
3. (Optional) Check "Also set up Firebase Hosting" if you plan to use it
4. Click "Register app"
5. **Important:** Copy the Firebase configuration object that appears

## Step 3: Configure Your Project

1. Create a `.env` file in your project root (copy from `.env.example`):
```bash
cp .env.example .env
```

2. Open the `.env` file and add your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=AIzaSyB1234567890abcdefghijklmnopqrst
VITE_FIREBASE_AUTH_DOMAIN=resume-architect-12345.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=resume-architect-12345
VITE_FIREBASE_STORAGE_BUCKET=resume-architect-12345.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
VITE_FIREBASE_MEASUREMENT_ID=G-ABCDEFGH12
```

**Important:**
- Replace the example values with your actual Firebase credentials
- Never commit the `.env` file to version control (it's already in `.gitignore`)
- The `.env` file is automatically loaded by Vite
- Restart your development server after changing `.env` values

## Step 4: Enable Analytics in Firebase Console

1. In the Firebase Console, navigate to "Analytics" in the left sidebar
2. Click "Enable Analytics" if it's not already enabled
3. Follow the prompts to set up Analytics

## Step 5: Test Your Integration

1. Start your development server:
```bash
npm run dev
```

2. Open your browser and navigate to your app
3. Perform some actions (change templates, toggle theme, download PDF, etc.)
4. Wait 24-48 hours for data to appear in Firebase Analytics (real-time data may appear sooner)

## Step 6: View Your Analytics

1. Go to the Firebase Console
2. Navigate to "Analytics" → "Dashboard"
3. You should see events appearing (may take 24-48 hours for initial data)
4. Go to "Analytics" → "Events" to see detailed event tracking

## Analytics Events Being Tracked

The following events are automatically tracked in your Resume Architect app:

### User Interaction Events
- **template_selected**: When a user selects a template
- **theme_toggled**: When a user toggles between light/dark theme
- **editor_tab_changed**: When a user switches between editor tabs

### Download Events
- **download_started**: When a download begins (PDF or PNG)
- **download_completed**: When a download completes successfully
- **download_failed**: When a download fails

### AI Events
- **ai_enhancement_used**: When AI text enhancement is used
- **ai_bullet_generated**: When AI bullet point generation is used

### Page Events
- **page_view**: When the app loads

## Custom Event Parameters

Each event includes relevant parameters for better insights:

- **Timestamp**: ISO 8601 format timestamp
- **Template ID**: Which template was selected
- **Theme**: Current theme (light/dark)
- **Format**: Download format (pdf/png)
- **Status**: Download status (started/completed/failed)
- **Error messages** (when applicable)

## Debugging Analytics

To test if analytics is working:

1. Open browser DevTools (F12)
2. Go to the Console tab
3. You should see logs from Firebase Analytics
4. Any errors will appear here

To enable debug mode:
```bash
# Add to your browser console
window.analytics = window.analytics || {};
window.analytics.debug_mode = true;
```

## Privacy Considerations

- Analytics data is anonymized by default
- No personally identifiable information (PII) is sent
- Users' resume content is not tracked
- Only interaction events are logged

## Troubleshooting

### Analytics not showing data
- Wait 24-48 hours for initial data population
- Check that your Firebase config is correct
- Verify that Analytics is enabled in Firebase Console
- Check browser console for errors

### Import errors
- Make sure `firebase` package is installed: `npm install firebase`
- Verify all import paths are correct
- Check that `firebase.ts` exists in your project root

### TypeScript errors
- Ensure TypeScript definitions are installed
- Check that all imports use correct paths

## Production Deployment

When deploying to production:

1. Ensure your Firebase config is using production credentials
2. Consider using environment variables for sensitive data
3. Set up proper security rules in Firebase Console
4. Monitor Analytics regularly for insights

## Additional Resources

- [Firebase Analytics Documentation](https://firebase.google.com/docs/analytics)
- [Firebase Console](https://console.firebase.google.com/)
- [Analytics Events Reference](https://firebase.google.com/docs/analytics/events)

## Support

If you encounter issues:
1. Check the Firebase Console for configuration errors
2. Review browser console for JavaScript errors
3. Verify network requests in DevTools Network tab
4. Consult Firebase documentation

---

## Quick Start Checklist

- [ ] Create Firebase project
- [ ] Register web app
- [ ] Copy Firebase config
- [ ] Update `firebase.ts` with your config
- [ ] Enable Analytics in Firebase Console
- [ ] Test locally
- [ ] Wait for data to appear (24-48 hours)
- [ ] Verify events in Firebase Console

Your Firebase Analytics integration is now complete! 🎉
