/* eslint-disable jsx-a11y/alt-text */
import { Button, Flex, Grid, Image, Link, Stack, Text } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import React from 'react';
import api from '../products/api';
import { Product } from '../products/types';
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";

interface Props {
  products: Product[]
}

function parseCurrency(value: number): string {
  return value.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  })
}

const IndexRoute: React.FC<Props> = ({products}) => {
  const [cart, setCart] = React.useState<Product[]>([])
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null)

  const waText = React.useMemo(()=> {
    return cart
      .reduce((message: string, product) => message.concat(`* ${product.title} - ${parseCurrency(product.price)}\n`), '')
      .concat(`\nTotal: ${parseCurrency(cart.reduce((total, product)=> total + product.price, 0))}`)

  },[cart])  

  function handleAddToCart(product: Product) {
    setCart(cart => cart.concat(product))
  }

  return (
    <motion.div>
      <Stack spacing={6}>
        <Grid 
          gridGap={6}     
          templateColumns="repeat(auto-fill, minmax(240px, 1fr))"
        >
          {
            products.map(product => 
              <Stack             
                backgroundColor="gray.100"
                borderRadius="md"
                key={product.id}
                spacing={3}
              >
                <Stack spacing={1}>
                  <Image 
                    as={motion.img}
                    cursor="pointer"
                    layoutId={product.image}
                    src={product.image} 
                    maxHeight={128} 
                    objectFit="cover"
                    borderRadius="md"
                    alt={ product.title }
                    onClick={()=>setSelectedImage(product.image)}
                  ></Image>
                  <Text>{ product.title }</Text>
                  <Text color="green.500" fontSize="small">{ parseCurrency(product.price) }</Text>

                </Stack>
                <Button 
                  onClick={()=> handleAddToCart(product) } 
                  colorScheme="primary"
                  size="sm"
                >Agregar</Button>
              </Stack>
            )
          }
        </Grid>
        {
          Boolean(cart.length) &&
            <Link isExternal>
              <Flex 
                alignItems="center" 
                justifyContent="center" 
                bottom={0} 
                padding={4} 
                position="sticky"
              >
                <Button 
                  href={`https://wa.me/14111211412441?text=${encodeURIComponent(waText)}`} 
                  as={Link} 
                  colorScheme="whatsapp"
                  margin="auto"
                >
                  Completar pedido ({cart.length}) productos
                </Button>
              </Flex>
            </Link>
        }
      </Stack>

      {/* <AnimatePresence>
        {selectedImage && 
          <Flex 
            key="backdrop" 
            alignItems="center" 
            as={motion.div} 
            backgroundColor="rgba(0,0,0,0.5)" 
            justifyContent="center" 
            layoutId={selectedImage}
            position="fixed"
            top={0}
            left={0}
            width={100}
            onClick={()=> setSelectedImage(null)}
          >
            <Image key="image" src={selectedImage}></Image>
          </Flex>}
      </AnimatePresence> */}
    </motion.div>
  )
}

//otra opcion aca es usar un getServerSideProps, entonces la info esta todo el tiempo
//actualizandose
export const getStaticProps: GetStaticProps = async () => {
  const products = await api.list();
  return {
    revalidate: 10, //con esto se va a ir regenerando la info que viene
    props: {
      products
    },
  }
}

export default IndexRoute;


//TODO: Drawer de chackr para el carrito