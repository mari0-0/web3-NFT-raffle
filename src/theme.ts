// theme.ts

import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import '@fontsource/dela-gothic-one';
import '@fontsource/poppins';
// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

// 3. extend the theme
const theme = extendTheme({ 
  colors: {
    brand: {
      100: '#9520e4',
      200: '#33006d',
      800: '#1a0044',
      900: "RGBA(0, 0, 0, 0.92)"
    },
    black: "RGBA(0, 0, 0, 0.92)",
  },
  config ,
  styles: {
    global: {
      body: {
        bg: "#FBF9F2",
      },
    },
  },
  fonts: {
    heading: `'Dela Gothic One', system-ui`,
    body: `'Poppins', sans-serif`,
  },

})

export default theme