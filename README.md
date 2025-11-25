# Resume Architect 🚀

<div align="center">

A modern, AI-powered resume builder with a stunning dark-themed interface. Create professional resumes with real-time preview, AI-enhanced content, and seamless editing experience.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

</div>

---

## ✨ Features

### 🎨 **Modern Design**
- **Dark-themed interface** with glassmorphism effects
- **Real-time preview** with professional A4 layout
- **Responsive design** with smooth animations and transitions
- **Premium aesthetics** with gradient accents and hover effects

### 📝 **Comprehensive Editing**
- **Personal Information** - Name, role, contact details, avatar, and inspirational quote
- **Work Experience** - Add multiple positions with company logos, dates, and AI-generated descriptions
- **Skills** - Organize skills by category (Design, Development, Marketing, Business, Data Science, DevOps) with color-coded display
- **Education** - Track degrees, institutions, and certifications
- **Projects** - Showcase your portfolio with images and links
- **Social Links** - Connect your Instagram, Twitter, LinkedIn, GitHub, Dribbble, and more
- **Languages** - List languages with proficiency levels and country flags

### 🤖 **AI-Powered**
- **AI Content Enhancement** - Improve your profile quote with Gemini AI
- **AI Bullet Points** - Generate professional experience descriptions automatically
- **Smart Suggestions** - Get skill recommendations based on category

### 🎯 **User Experience**
- **Drag-and-drop** avatar upload
- **Autocomplete** skill suggestions
- **Live validation** and error handling
- **Tab-based navigation** for organized editing
- **Export-ready** resume preview

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Gemini API Key** (for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/asfandyr380/resume-architect.git
   cd resume-architect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   
   > 💡 Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` to see your app running!

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS with custom design tokens
- **AI Integration:** Google Gemini API
- **Icons:** Custom SVG icon components
- **State Management:** React Hooks (useState)

---

## 📁 Project Structure

```
resume-architect/
├── components/
│   ├── Editor.tsx          # Main editor component with tab navigation
│   ├── ResumePreview.tsx   # Live resume preview with A4 layout
│   ├── Icons.tsx           # Custom SVG icon components
│   └── Input.tsx           # Reusable input component
├── services/
│   └── gemini.ts           # Gemini AI integration
├── constants.ts            # App constants and initial data
├── types.ts                # TypeScript type definitions
├── App.tsx                 # Root application component
├── index.html              # HTML entry point with Tailwind config
└── .env.local              # Environment variables (not in repo)
```

---

## 🎨 Customization

### Color Scheme

The app uses a sophisticated dark color palette with Tailwind CSS configuration in `index.html`:

**Background Colors:**
- `#13131f` - Main background (dark-900)
- `#1c1c2e` - Cards/Sidebar (dark-800)
- `#27273a` - Lighter elements (dark-700)
- `#3f3f55` - Borders (dark-600)

**Accent Colors:**
- `#7c3aed` - Purple accent
- `#3b82f6` - Blue accent
- `#ec4899` - Pink accent
- Gradient: `#6366f1` → `#a855f7`

**Text Colors:**
- `#e4e4e7` - Main text
- `#a1a1aa` - Muted text
- `#71717a` - Dim text

To customize colors, edit the Tailwind config in `index.html` (lines 55-87).

### Templates

The app supports multiple resume templates. Currently implemented:
- **Modern Sidebar** (`modern-sidebar`) - Two-column layout with sidebar
- **Classic Vertical** (`classic`) - Traditional single-column layout

Add new templates in `components/templates/` and register them in `types.ts`:
```typescript
export type TemplateId = 'modern-sidebar' | 'classic' | 'your-template';
```

### Themes

Both light and dark themes are supported. The theme toggle affects:
- Background colors
- Text contrast
- PDF/PNG export backgrounds

Customize theme colors in template components (`ModernSidebar.tsx`, `ClassicVertical.tsx`).

### Skill Categories

Add or modify skill categories in `constants.ts`:
```typescript
export const SKILL_CATEGORIES = [
  {
    name: "Your Category",
    color: "text-your-color",           // Tailwind text color
    borderColor: "border-your-color/50", // Border with opacity
    shadowColor: "rgba(r,g,b,0.15)",    // Shadow color
    icon: "icon-name",                   // Icon from Icons.tsx
    suggestedSkills: ["Skill 1", "Skill 2", ...]
  }
];
```

**Available Categories:**
- Design (purple) - Design tools and skills
- Development (blue) - Programming languages and frameworks
- Marketing (pink) - Marketing and SEO skills
- Business (emerald) - Management and business skills
- Data Science (yellow) - ML, AI, and data analysis
- DevOps (orange) - Infrastructure and deployment

### Languages

Customize available languages in `constants.ts`:
```typescript
export const LANGUAGES_LIST = [
  { name: "Language Name", code: "ISO-CODE" }
];

export const LANGUAGE_LEVELS = [
  "Native", "Fluent", "Proficient", "Advanced",
  "Intermediate", "Conversational", "Elementary", "Beginner"
];
```

### Firebase Analytics

Configure Firebase Analytics for tracking user interactions:

1. **Set up Firebase project** (see [FIREBASE_SETUP.md](FIREBASE_SETUP.md))
2. **Add credentials to `.env`:**
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

**Tracked Events:**
- Template selection
- Theme toggles
- Editor tab changes
- Download actions (PDF/PNG)
- AI feature usage

Customize analytics events in `services/analytics.ts`.

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

---

## 📧 Contact

**Asfand Yar** - [@asfandyr380](https://github.com/asfandyr380)

Project Link: [https://github.com/asfandyr380/resume-architech](https://github.com/asfandyr380/resume-architech)

---

<div align="center">

**Made with ❤️ and ☕**

If you find this project helpful, please consider giving it a ⭐!

</div>
