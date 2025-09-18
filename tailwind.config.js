/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/App.tsx',
        './src/activitys/DemoScreen.tsx',
        './src/activitys/fragments/CurrencyList.tsx',
        './src/components/*.{js,jsx,ts,tsx}',
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {},
    },
    plugins: [],
}