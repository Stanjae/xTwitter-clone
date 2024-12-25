import { CustomLoader } from "@/components/ui/customComponents/CustomLoader"
//import NewPostNotifications from "@/components/ui/customComponents/NewPostNotifications"
import NotificationToMyTweets from "@/components/ui/customComponents/NotificationToMyTweets"
import AnimateLayout from "@/layout/AnimateLayout"
import { useGetUserNotificationsQuery } from "@/services/notification"
import { sessionUserId } from "@/utils/getStorageData"
import { Box, HStack, IconButton, Tabs, Text } from "@chakra-ui/react"
import { MdOutlineSettings } from "react-icons/md"


const Notifications = () => {
  const authorId = sessionUserId()
  const {data, isLoading, refetch} =  useGetUserNotificationsQuery({authorId},{pollingInterval:10000})
  return (
    <AnimateLayout>
      <Box>
         <Tabs.Root position={'relative'}  defaultValue="all" variant={'line'}>
            <Box px={'3'} top={{md:'0px', base:'50px'}} pt={'2'} w={'2xl'} css={{backdropFilter:'blur(5px)', zIndex:'1', background:'rgba(255, 255, 255, 0.65)', _dark:{background:'rgba(6, 6, 6, 0.65)'}}} position={'fixed'}>
                <HStack>
                    <Text color={'textlight'} fontWeight={'bold'}  lineHeight={'24px'} fontSize={'20px'}>Notifications</Text>
                    <IconButton marginLeft={'auto'} colorPalette={'blue'} variant={'ghost'}>
                        <MdOutlineSettings />
                    </IconButton>
                </HStack>
                <Tabs.List py={'1'} w={'2xl'} colorPalette={'blue'}>
                    <Tabs.Trigger value="all">
                    All ({data?.length})
                    </Tabs.Trigger>
                    <Tabs.Trigger value="verified">
                        Verified
                    </Tabs.Trigger>
                    <Tabs.Trigger value="mentions">
                        Mentions
                    </Tabs.Trigger>
                </Tabs.List>
            </Box>
           
            <Box position={'relative'} top={'20'}>
              <Tabs.Content value="all">
                {isLoading && <CustomLoader/>}
                {data?.map((item)=>(
                  <NotificationToMyTweets refetch={refetch} key={item?._id} item={item} type={item?.type}/>
                ))}
              </Tabs.Content>
              <Tabs.Content value="verified">Manage your projects</Tabs.Content>
              <Tabs.Content value="mentions">
                Manage your tasks for freelancers
              </Tabs.Content>
            </Box>
            
          </Tabs.Root>
    </Box>  
    </AnimateLayout>
    
  )
}

export default Notifications
