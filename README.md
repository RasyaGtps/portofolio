<div align="center">
  <h1>🚀 My Professional Portfolio</h1>
  <p>A modern, responsive portfolio website built with Next.js 14 and TailwindCSS</p>
  
  ![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
  ![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue?style=for-the-badge&logo=typescript)
  ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-38B2AC?style=for-the-badge&logo=tailwind-css)
  ![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)
</div>

## ✨ Features

- 🎨 Modern and clean design
- 📱 Fully responsive
- 🌟 Smooth animations and transitions
- 🎭 Interactive particle background
- ⚡ Fast loading with Next.js
- 📊 Real-time skill progress bars
- 🖼️ Dynamic project showcase
- 📜 Certificate display section
- 📬 Contact form integration
- 🔍 SEO optimized

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Animation:** Custom CSS animations
- **Icons:** Lucide Icons
- **Fonts:** Geist Font
- **Analytics:** Vercel Analytics
- **Deployment:** Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/RasyaGtps/portfolio.git
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env.local` file in the root directory and add your environment variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── public/
│   ├── projects/    # Project images
│   └── certificates/# Certificate files
├── src/
│   ├── app/
│   │   ├── api/    # API routes
│   │   ├── fonts/  # Custom fonts
│   │   └── page.tsx# Main page
│   ├── components/ # React components
│   └── styles/     # Global styles
└── package.json
```

## 🎨 Customization

### Changing Content

1. Update personal information in `src/app/page.tsx`:
```typescript
const roles = ["Your", "Roles", "Here"];
const projects = [
  {
    title: "Your Project",
    description: "Project description",
    // ...
  }
];
```

2. Modify skills in the skills array:
```typescript
const skills = [
  { name: "Your Skill", percentage: 85 },
  // ...
];
```

### Styling

- Colors can be customized in `tailwind.config.js`
- Animations can be modified in the global styles section

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints for:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add environment variables
4. Deploy!

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For any questions or feedback, please reach out to [your@email.com](mailto:rasya23darkness@gmail.com)

---

<div align="center">
  Made with ❤️ by Rayy
</div>
