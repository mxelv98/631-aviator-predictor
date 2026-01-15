/** @type {import('tailwindcss').Config} */


export default {
    darkMode: ["class"],
    content: [
        "./index.html",
        "./*.{js,ts,jsx,tsx}",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./lib/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Legacy / Main App Colors
                'custom-pink': '#FF90E8',
                'custom-green': '#23A094',
                'custom-yellow': '#FFC900',

                // New Mobile V2 Brand Colors
                'brand-bg': '#000000',
                'brand-primary': '#0ea5e9',
                'brand-elite': '#f59e0b',
                'brand-success': '#22c55e',
                'brand-border': 'rgba(255,255,255,0.08)',
            },
            boxShadow: {
                'neubrutalist': '5px 5px 0px 0px rgba(0,0,0,1)',
                'neubrutalist-sm': '2px 2px 0px 0px rgba(0,0,0,1)',
                'pro-shadow': '0 0 20px rgba(14, 165, 233, 0.15)',
                'elite-glow': '0 0 30px rgba(245, 158, 11, 0.2)',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'], // Ensure Inter is available (might need import in index.html)
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
        },
    },
    plugins: [],
}
