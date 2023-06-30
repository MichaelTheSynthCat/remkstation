/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#010B14',
                secondary: '#2A2A2A',
                tcolor: '#e2e2e2',
                highlight: '#006FFF',
                highlight_darker: '#001BCE'
            },

            textShadow: {
                sm: '0 1px 2px var(--tw-shadow-color)',
                DEFAULT: '0 2px 4px var(--tw-shadow-color)',
                lg: '0 8px 16px var(--tw-shadow-color)',
            },
        },
    },
    plugins: [require("@tailwindcss/forms"),
    plugin(function ({ matchUtilities, theme }) {
        matchUtilities(
            {
                'text-shadow': (value) => ({
                    textShadow: value,
                }),
            },
            { values: theme('textShadow') }
        )
    }),
    ],
}
