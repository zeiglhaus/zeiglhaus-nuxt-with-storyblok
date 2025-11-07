const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: ['storyblok/**/*.{vue,js}', 'components/**/*.{vue,js}', 'pages/**/*.vue'],
    plugins: [require('@tailwindcss/typography')],
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

                // CI colors
                'zh-green': '#4d8339' // '#7B9F6E'
            },
            fontFamily: {
                'sans': ['Fira Sans', ...defaultTheme.fontFamily.sans],
                'handwritten': ['Caveat', 'cursive'],
                'antic-slab': ['Antic Slab', ...defaultTheme.fontFamily.serif],
                'fira-mono': ['Fira Mono', ...defaultTheme.fontFamily.sans]                
            },
            typography: {
                DEFAULT: {
                    css: {
                        h1: {
                            color: '#24905c',
                        },
                        p: {
                            color: '#000000',
                        },
                    },
                },
            },
        }
    }
}