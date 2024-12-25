import { Box, Icon, chakra, Stack } from "@chakra-ui/react"
import { navigationPaths } from "@/utils/navigation"
import { Link, useLocation } from "react-router-dom"
import { useGetUnreadCountQuery } from "@/services/notification";
import { sessionUserId } from "@/utils/getStorageData";
import millify from "millify";

const LinkButton = ({count, title, url, icon, active}:any) => (
    <Link to={url}>
        <chakra.button cursor={'pointer'} bg={active ? "muted":"transparent"}  transition="backgrounds" transitionTimingFunction="ease-in-out" 
        _hover={{bg:'muted'}} gapX={'18px'} fontSize={'16px'} display={'flex'} 
        fontWeight={active?"bolder":"normal"}
        justifyContent={'center'} alignItems={'center'} p={'12px'} pr={'6'} rounded="full">
        <Box position={'relative'}>
            <Icon fontSize="18px">{icon}</Icon> {title}
            {title == "Notifications" && count > 0 && <Box w={'4'} h={'4'} fontSize={'10px'} p={'0.5'} top={'0'} left={'0'} rounded={'full'} bg={'red.500'} 
            display={'flex'} justifyContent={'center'} alignItems={'center'} position={'absolute'}>
                {millify(Number(count))}</Box>}
        </Box>
            
        </chakra.button>
    </Link>
    
);
const MobileNavLinks = () => {
    const authorId = sessionUserId()
    const {pathname} = useLocation()
    const {data} =  useGetUnreadCountQuery({authorId}, {pollingInterval:10000})

  return (
    <Box>
        <Stack gap={1}>
            {navigationPaths.map(((item:any)=>(
                <Box key={item.title}>
                    <LinkButton count={data?.count} active={pathname == item.path} title={item.title} icon={item.icon} url={item.path}/>
                </Box>
                
            )))}
        </Stack>
    </Box>
  )
}

export default MobileNavLinks