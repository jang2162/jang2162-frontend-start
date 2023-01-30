var defaultTheme = require('tailwindcss/defaultTheme')


/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-pretendard)', ...defaultTheme.fontFamily.sans],
            },
        },
    },
  plugins: [],
}

