import { CustomAvatar } from '@/components/ui/customComponents/CustomAvatar'
import MobileNav from '@/components/ui/customComponents/MobileNav'
//import DialogForImages from '@/components/ui/customComponents/DialogForImages'
import NavBar from '@/components/ui/customComponents/NavBar'
import SearchFeed from '@/components/ui/customComponents/SearchFeed'
import { InputGroup } from '@/components/ui/input-group'
import { Container, Flex, Box, Input, Icon, Text} from '@chakra-ui/react'
import { FaXTwitter } from 'react-icons/fa6'
import { LuSearch } from 'react-icons/lu'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
    
  return (
    <Container p={"0px"} maxW="7xl">
       {/* <DialogForImages open={open} setOpen={setOpen} item={yun[0]}/> */}
       <Flex position={'relative'} >
            <Box hideBelow={'md'} zIndex={'3'} bg={'background'} pb={5} py={1} pr={4} display={'flex'} flexDirection={'column'} justifyContent={'space-between'} borderRightColor={'bordergrey'} borderRightWidth="0.5px" w={'260px'} height={"100%"} position={"fixed"}>
                <NavBar/>
                <CustomAvatar/>
            </Box>
            <Box zIndex={'2'} ml={{md:'260px', base:'0px'}} width={{md:'660px', base:'full'}} >
                <Box w={'full'} top={'0px'} left={'0px'} css={{backdropFilter:'blur(5px)', position:'fixed', zIndex:'1', background:'rgba(255, 255, 255, 0.65)', _dark:{background:'rgba(6, 6, 6, 0.65)'}}} hideFrom={'md'} py={'2'} pr={'4'} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                    <MobileNav/>
                    <Icon fontSize="26px"><FaXTwitter/></Icon>
                    <Text fontWeight={'medium'}>Upgrade</Text> 
                </Box>
                <Box mt={{base:'48px', md:'0px'}}>
                     <Outlet/>
                </Box>
               
            </Box>
            <Box hideBelow={'md'} bg="background" borderLeftColor={'bordergrey'} borderLeftWidth="0.5px" pl={'4'} zIndex={'3'} position={'relative'}  flexGrow={'1'} >
                <Box py={'1'} right={'-7'} bg='background' css={{'width':'400px'}} zIndex={'5'} position={'fixed'}>
                    <InputGroup display={'block'} w={'xs'} flex="1" startElement={<LuSearch />}>
                        <Input  placeholder="Search" size={'lg'} rounded={'full'} variant="subtle" />
                    </InputGroup>
                </Box>
                <Box mt={'70px'}>
                    <SearchFeed/>
                </Box>
            </Box>
        </Flex>
    </Container>
  )
}

export default DashboardLayout