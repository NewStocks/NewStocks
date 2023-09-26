// app/providers.tsx
'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, ColorModeScript, StyleFunctionProps, extendTheme, type ThemeConfig } from '@chakra-ui/react'
import {mode} from "@chakra-ui/theme-tools"

const config: ThemeConfig = {
  initialColorMode: 'dark', 
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode('#00051E', '#00051E')(props),
      },
    }),
  },
})

export function Provider({ 
    children 
  }: { 
  children: React.ReactNode 
  }) {
  return (
    <CacheProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
}