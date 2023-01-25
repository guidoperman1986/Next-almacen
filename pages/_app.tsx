import React from 'react';
import { ChakraProvider, Container, VStack, Image, Heading, Box, Divider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import theme from "../theme"

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Box padding={4}>
        <Container 
          backgroundColor="white"
          boxShadow="md"
          marginY={4}
          maxWidth="container.xl"
          padding={4}
          borderRadius="sm"
        >
          <VStack marginBottom={6}>
            <Image src="//place-hold.it/128x128" borderRadius={9999}></Image>
            <Heading>Almacen</Heading>
            {/* <Text>El almacen de Guido</Text> */}
          </VStack>
          <Divider marginY={6}></Divider>
          <Component {...pageProps} />
        </Container>
      </Box>
    </ChakraProvider>
  )
}

export default App;