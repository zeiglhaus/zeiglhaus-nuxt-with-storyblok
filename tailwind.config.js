const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: ['storyblok/**/*.{vue,js}', 'components/**/*.{vue,js}', 'pages/**/*.vue'],
    theme: {
        extend: {
            colors: {
                // Basalt palette
                'deep-basalt': '#333333',
                'weathered-basalt': '#4A4A4A',
                'basalt-highlight': '#5D5D5D',
                'iron-basalt': '#3F3F3F',

                // Volcanic accents
                'volcanic-red': '#8C271E',
                'molten-amber': '#E78A00',
                'cooling-lava': '#704214',
                'steam-gray': '#D7D7D7',

                // Traditional Bavarian
                'bavarian-blue': '#0065BD',
                'beer-foam': '#F8F4E3',
            },
                fontFamily: {
                'fraunces': ['Fraunces', ...defaultTheme.fontFamily.serif],
                'sans': ['Montserrat', ...defaultTheme.fontFamily.sans],
                'handwritten': ['Caveat', 'cursive'],
            },
        }
    }
}