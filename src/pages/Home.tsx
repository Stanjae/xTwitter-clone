import { CreateTweetForm } from "@/components/ui/customComponents/CreateTweetForm"
import TweetCard from "@/components/ui/customComponents/TweetCard"
import { Box, Tabs } from "@chakra-ui/react"
import AnimateLayout from "../layout/AnimateLayout";
import { useGetPostsQuery } from "@/services/tweets";
import { CustomLoader } from "@/components/ui/customComponents/CustomLoader";


const Home = () => {
  const i = ''
  const { data, isFetching, isSuccess } = useGetPostsQuery(i,{ pollingInterval: 20000 })

  console.log("hunt:", data)

  return (
    <AnimateLayout>
      <Box>
         <Tabs.Root position={'relative'}  defaultValue="forYou" variant={'line'}>
            <Tabs.List position={'fixed'} py={'1'} w={'2xl'} colorPalette={'blue'}
            css={{backdropFilter:'blur(5px)', zIndex:'1', background:'rgba(255, 255, 255, 0.65)', _dark:{background:'rgba(6, 6, 6, 0.65)'}}} >
              <Tabs.Trigger value="forYou">
               For You
              </Tabs.Trigger>
              <Tabs.Trigger value="following">
                Following
              </Tabs.Trigger>
            </Tabs.List>
            <Box position={'relative'} top={'20'}>
              <CreateTweetForm setOpen={null} oldTweet={null} btnText={'Post'}/>
            </Box>
            <Box position={'relative'} top={'20'}>
              <Tabs.Content value="forYou">
                {isFetching && <CustomLoader/>}
                {isSuccess && data?.map((tweet:any)=>(
                  <TweetCard key={tweet?._id} item={tweet}/>
                ))}
              </Tabs.Content>
              <Tabs.Content value="following">Manage your projects</Tabs.Content>
              <Tabs.Content value="tasks">
                Manage your tasks for freelancers
              </Tabs.Content>
            </Box>
            
          </Tabs.Root>
    </Box>
    </AnimateLayout>
   
  )
}

export default Home