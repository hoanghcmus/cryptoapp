/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/App.{js,jsx,ts,tsx}',
        './src/activitys/*.{js,jsx,ts,tsx}',
        './src/activitys/**/*.{js,jsx,ts,tsx}',
        './src/components/**/*.{js,jsx,ts,tsx}',
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {},
    },
    plugins: [],
}