/** @type {import('tailwindcss').Config} */
export default {
    content: ['./*.php',
        './**/*.php',
        './src/assets/*.scss',
        './src/assets/js/*.js',
    ],
    darkMode: 'class',
    theme: {
        extend: {},
    },
    plugins: [
        require('flowbite/plugin'),
        require('postcss-import')],
}

