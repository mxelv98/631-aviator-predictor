/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}", // Added to ensure components are scanned
        "./lib/**/*.{js,ts,jsx,tsx}",        // Added for completeness
    ],
    theme: {
        extend: {
            colors: {
                'custom-pink': '#FF90E8',
                'custom-green': '#23A094',
                'custom-yellow': '#FFC900',
            },
            boxShadow: {
                'neubrutalist': '5px 5px 0px 0px rgba(0,0,0,1)',
                'neubrutalist-sm': '2px 2px 0px 0px rgba(0,0,0,1)',
            },
        },
    },
    plugins: [],
}
