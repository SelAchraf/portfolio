/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark Mode (Default)
        'deep-black': '#0a0a0a',
        'soft-charcoal': '#121212',
        'card-bg': '#1a1a1a',
        'card-bg-hover': '#262626',
        
        // Text Colors
        'text-primary': '#ffffff',
        'text-secondary': '#e5e5e5',
        'text-muted': '#a0a0a0',
        
        // Accent Colors
        'accent-magenta': '#c026d3',
        'accent-magenta-hover': '#a21caf',
        'accent-gold': '#d4af37',
        'accent-cream': '#f5f5dc',
        
        // Light Mode (Optional)
        'light-bg': '#f8f9fa',
        'light-bg-secondary': '#ffffff',
        'light-card': '#ffffff',
        'light-section-alt': '#f0f2f5',
        'light-border': '#e0e3e7',
        'light-text-primary': '#1a1a1a',
        'light-text-secondary': '#4a5568',
        'light-text-muted': '#718096',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
