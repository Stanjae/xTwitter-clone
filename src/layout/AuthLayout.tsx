import { Box, Container, GridItem, Icon, SimpleGrid, Text } from "@chakra-ui/react"
import { FC } from "react"
import { FaXTwitter } from "react-icons/fa6"
import { Outlet, useLocation } from "react-router-dom"

export async function loaderParams({ request }:any) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const contacts = ['meat', 'fish'];
    return { contacts, q };
  }


const AuthLayout:FC = () => {
    const {pathname} = useLocation()

  return (
    <Container overflow={{md:'hidden', base:'auto'}} css={{height:'100dvh'}}>
        <SimpleGrid height={'full'} columns={{md:2, base:1}}>
            <GridItem  display={'flex'} justifyContent={{md:'center', base:'flex-start'}} alignItems={'center'}>
                <Icon mt={{base:'16px', md:'0'}} ml={{base:'36px', md:'0'}} fontSize={{md:"298px", base:'40px'}}>
                    <FaXTwitter/>
                </Icon>      
    
            </GridItem>
            <GridItem p={'16px'}>
                <Box px={'20px'}>
                    <Text mt={{base:'26px',md:'72px'}} fontSize={{md:'64px', base:'40px'}} fontWeight={'bold'} lineHeight={{base:'48px', md:'84px'}} color={'textlight'} letterSpacing={'-1.2px'}>Happening Now</Text>
                    <Text fontWeight={'bold'} fontSize={{md:'31px', base:'20px'}} lineHeight={{md:'36px', base:'20px'}} mt={'51px'} >{pathname.endsWith('login') ? "Sign In":"Join today"}</Text>

                    <Box display={'flex'} justifyContent={'flex-start'} mt={'30px'}>
                        <Outlet/>
                    </Box>
                </Box>
                
            </GridItem>
        </SimpleGrid>
    </Container>
  )
}

export default AuthLayout