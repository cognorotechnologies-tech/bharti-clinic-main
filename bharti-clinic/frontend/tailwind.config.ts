import type { Config } from 'tailwindcss';

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                ivory: { DEFAULT: '#F5FBF5', 50: '#FFFFFF', 100: '#EAF5EA' },
                lotus: { light: '#D1F0DE', DEFAULT: '#52B788', deep: '#2D8653', dark: '#1E6B40' },
                'lotus-pink': '#52B788',
                maroon: { DEFAULT: '#1B4332', light: '#2D6A4F' },
                gold: { DEFAULT: '#D97706', light: '#F59E0B' },
                charcoal: { DEFAULT: '#1C2B1E', light: '#374B3A', muted: '#6B7C6D' },
            },
            fontFamily: {
                display: ['Playfair Display', 'Georgia', 'serif'],
                body: ['DM Sans', 'sans-serif'],
                accent: ['Cormorant Garamond', 'Georgia', 'serif'],
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                breathe: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.04)' },
                },
                'rotate-slow': {
                    from: { transform: 'rotate(0deg)' },
                    to: { transform: 'rotate(360deg)' },
                },
                'fade-up': {
                    from: { opacity: '0', transform: 'translateY(20px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                'drift-left': {
                    from: { transform: 'translateX(110vw)' },
                    to: { transform: 'translateX(-10vw)' },
                },
                typewriter: {
                    to: { left: '100%' },
                },
            },
            animation: {
                float: 'float 3s ease-in-out infinite',
                breathe: 'breathe 4s ease-in-out infinite',
                'rotate-slow': 'rotate-slow 10s linear infinite',
                'fade-up': 'fade-up 0.5s ease-out forwards',
                'drift-left': 'drift-left 15s linear infinite',
                typewriter: 'typewriter 2s steps(40) forwards',
            },
        },
    },
    plugins: [],
} satisfies Config;
