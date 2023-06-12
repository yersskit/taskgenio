/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
        fontFamily: {
            sans: ['Rubik', 'sans-serif'],
        },
    },
    plugins: [require('daisyui')],
    daisyui: {
        styled: true,
        daisyui: {
            themes: ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"],
        },
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        prefix: ''
    }
}