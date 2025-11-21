/** @type {import('tailwindcss').Config} */
module.exports = {
content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
theme: { extend: 
    {fontFamily: {
        barlow: ['Barlow','sans-serif'],
        quattrocento: ['Quattrocento', 'sans-serif'], 
        satisfy: ['Satisfy', 'cursive' ],
      }
    } 
    },
plugins: [],
}
