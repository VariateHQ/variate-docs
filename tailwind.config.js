/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  theme: {
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      transparent: 'transparent',
      background: '#F7F8FA',
      pink: {
        100: '#FFEFF2',
        200: '#FED6DF',
        300: '#FDBECB',
        400: '#FC8DA4',
        500: '#FB5C7D',
        600: '#E25371',
        700: '#97374B',
        800: '#712938',
        900: '#4B1C26',
      },
      purple: {
        100: '#F0F3FF',
        200: '#DAE0FE',
        300: '#C3CDFD',
        400: '#97A8FC',
        500: '#6A82FB',
        600: '#5F75E2',
        700: '#404E97',
        800: '#303B71',
        900: '#20274B',
      },
      success: {
        100: '#F0F8F3',
        200: '#D8EEE1',
        300: '#C1E3CF',
        400: '#93CFAB',
        500: '#64BA87',
        600: '#5AA77A',
        700: '#3C7051',
        800: '#2D543D',
        900: '#1E3829',
      },
      warning: {
        100: '#FDF6EC',
        200: '#F9E8CE',
        300: '#F5DAB1',
        400: '#EEBE77',
        500: '#E6A23C',
        600: '#CF9236',
        700: '#8A6124',
        800: '#68491B',
        900: '#453112',
      },
      danger: {
        100: '#FEF0F0',
        200: '#FDDADA',
        300: '#FBC4C4',
        400: '#F89898',
        500: '#F56C6C',
        600: '#DD6161',
        700: '#934141',
        800: '#6E3131',
        900: '#4A2020',
      },
      info: {
        100: '#F4F4F5',
        200: '#E3E4E6',
        300: '#D3D4D6',
        400: '#B1B3B8',
        500: '#909399',
        600: '#82848A',
        700: '#56585C',
        800: '#414245',
        900: '#2B2C2E',
      },
    },
    fontFamily: {
      brand: ['Hind', 'sans-serif'],
      heading: ['Poppins', 'sans-serif'],
      body: ['Open Sans', 'sans-serif'],
      base: ['sans-serif']
    }
  },
  variants: {},
  plugins: [],
};
