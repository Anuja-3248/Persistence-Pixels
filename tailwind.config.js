/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'

export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#faf5ff',
                    100: '#f3e8ff',
                    200: '#e9d5ff',
                    300: '#d8b4fe',
                    400: '#c084fc',
                    500: '#a855f7',
                    600: '#9333ea',
                    700: '#7e22ce',
                    800: '#6b21a8',
                    900: '#581c87',
                },
                dark: {
                    bg: '#0a0a0a',     /* Neutral 950 - Faint Black */
                    card: '#171717',   /* Neutral 900 - Lighter Black */
                    border: '#262626', /* Neutral 800 */
                    accent: '#3b82f6', /* Brighter blue for contrast */
                },
                health: {
                    indigo: '#6366f1',
                    violet: '#8b5cf6',
                    cyber: '#22d3ee',
                    emerald: '#10b981',
                    rose: '#f43f5e',
                    amber: '#f59e0b',
                },
                surface: {
                    glass: 'rgba(255, 255, 255, 0.7)',
                    card: '#ffffff',
                    bg: '#f8fafc',
                },
                // Emergency Incident Commander Theme
                "on-surface-variant": "#5b403d",
                "on-background": "#1b1c1c",
                "surface-container-highest": "#e5e2e1",
                "surface-variant": "#e5e2e1",
                "surface-container-low": "#f6f3f2",
                "tertiary-fixed": "#d4e3ff",
                "inverse-on-surface": "#f3f0ef",
                "on-tertiary": "#ffffff",
                "on-primary-fixed": "#410003",
                "tertiary": "#0058a2",
                "inverse-surface": "#303030",
                "on-surface": "#1b1c1c",
                "surface-container-lowest": "#ffffff",
                "on-error": "#ffffff",
                "secondary-fixed-dim": "#ffb68f",
                "surface-container-high": "#eae7e7",
                "surface-tint": "#ba1a20",
                "secondary-fixed": "#ffdbca",
                "on-primary-fixed-variant": "#930010",
                "inverse-primary": "#ffb3ac",
                "outline-variant": "#e4beba",
                "on-secondary": "#ffffff",
                "primary-container": "#d32f2f",
                "surface-bright": "#fcf9f8",
                "tertiary-fixed-dim": "#a5c8ff",
                "surface-container": "#f0eded",
                "tertiary-container": "#0770cc",
                "on-tertiary-fixed": "#001c3a",
                "secondary-container": "#fd7613",
                "secondary": "#9c4400",
                "on-secondary-fixed": "#331200",
                "on-error-container": "#93000a",
                "on-primary-container": "#fff2f0",
                "outline": "#8f6f6c",
                "on-secondary-fixed-variant": "#773200",
                "on-tertiary-container": "#f0f4ff",
                "primary-fixed-dim": "#ffb3ac",
                "on-tertiary-fixed-variant": "#004786",
                "on-secondary-container": "#5b2500",
                "surface-dim": "#dcd9d9",
                "primary-fixed": "#ffdad6"
            },
            boxShadow: {
                'premium': '0 10px 40px -10px rgba(0, 0, 0, 0.05)',
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
                'glow': '0 0 20px rgba(147, 51, 234, 0.25)',
                'sticker': '4px 4px 0px 0px rgba(15, 23, 42, 0.05)',
                'sticker-dark': '4px 4px 0px 0px rgba(255, 255, 255, 0.05)',
                'cartoon': '0 8px 30px rgba(0, 0, 0, 0.12)',
                'cartoon-dark': '0 8px 30px rgba(255, 255, 255, 0.03)',
            },
            animation: {
                'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'float': 'float 6s ease-in-out infinite',
                'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(30px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-15px)' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 15px rgba(147, 51, 234, 0.2)' },
                    '50%': { boxShadow: '0 0 30px rgba(147, 51, 234, 0.45)' },
                }
            }
        },
    },
    plugins: [
        forms,
        typography,
    ],
}
