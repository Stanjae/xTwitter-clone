import { Box, chakra, HStack, Icon, IconButton, Stack } from '@chakra-ui/react';
import { FaXTwitter } from "react-icons/fa6";
import { ColorModeButton } from "@/components/ui/color-mode"
import { Link, useLocation } from 'react-router-dom';
import { navigationPaths } from '@/utils/navigation';
import CreateTweetModal from './CreateTweetModal';
import { useGetUnreadCountQuery } from '@/services/notification';
import { sessionUserId } from '@/utils/getStorageData';
import millify from 'millify';

const LinkButton = ({ count, title, url, icon, active}:any) => (
    <Link to={url}>
        <chakra.button cursor={'pointer'} bg={active ? "muted":"transparent"}  transition="backgrounds" transitionTimingFunction="ease-in-out" 
        _hover={{bg:'muted'}} gapX={'18px'} fontSize={'20px'} display={'flex'} 
        fontWeight={active?"bolder":"normal"}
        justifyContent={'center'} alignItems={'center'} p={'12px'} pr={'6'} rounded="full">
        <Box position={'relative'}>
            <Icon fontSize="26px">
                {icon}
            </Icon>
            {title == "Notifications" && count > 0 && <Box w={'5'} h={'5'} fontSize={'xs'} p={'0.5'} top={'0'} left={'0'} rounded={'full'} bg={'red.500'} 
            position={'absolute'}>{millify(Number(count))}</Box>}
        </Box>
         {title}
        </chakra.button>
    </Link>
    
  )

const NavBar = () => {
    const authorId = sessionUserId()
    const {pathname} = useLocation()
    const {data} =  useGetUnreadCountQuery({authorId},{pollingInterval:10000})
  return (
    <Box >
        <HStack hideBelow={'md'} justifyContent={'space-between'}>
            <IconButton size={'lg'} p={'10px'} borderRadius={'full'} aria-label="twitter logo" variant={'ghost'}>
                <Icon fontSize="28px">
                    <FaXTwitter/>
                </Icon>      
            </IconButton>
            <ColorModeButton />
        </HStack>

        <Stack gap={1}>
            {navigationPaths.map(((item:any)=>(
                <Box key={item.title}>
                    <LinkButton count={data?.count} active={pathname == item.path} title={item.title} icon={item.icon} url={item.path}/>
                </Box>
                
            )))}
            {/* <CustomButton size={'md'} visual={'solidBlue'}>Post</CustomButton> */}
            <CreateTweetModal/>
        </Stack>
        
        
    </Box>
  )
}

export default NavBar