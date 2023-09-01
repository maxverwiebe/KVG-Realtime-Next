/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/flowbite/**/*.js'
    ],
    purge: ["./pages/**/*.js", "./components/**/*.js"],
    theme: {
            extend: {
                colors: {
                    background: 'rgb(226 236 255)',
                    darkMode: {
                        background: 'rgb(19, 26, 40)',
                    },
                },
            },
        },
    plugins: [
        require('flowbite/plugin')
    ]
}
