import AvatarSkeleton from "@/components/ui/customComponents/AvatarSkeleton"
import SearchExploreCard from "@/components/ui/customComponents/SearchExploreCard"
import WhoToFollowCard from "@/components/ui/customComponents/WhoToFollowCard"
import { InputGroup } from "@/components/ui/input-group"
import { SkeletonText } from "@/components/ui/skeleton"
import AnimateLayout from "@/layout/AnimateLayout"
import { useGetTrendsQuery } from "@/services/trends"
import { useGetNoOfUsersQuery } from "@/services/users"
import { sessionUserId } from "@/utils/getStorageData"
import { Box, HStack, IconButton, Input, Tabs , Text} from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"
import { MdOutlineSettings } from "react-icons/md"
import { useNavigate, useSubmit } from "react-router-dom"



const Explore = () => {
  const currentUserId = sessionUserId()
  const {data, isSuccess, isFetching} = useGetNoOfUsersQuery({currentUserId, limit:3, skip:0})
  
  const {data:trends, isFetching:trendFetching, isSuccess:trendsSucess} = useGetTrendsQuery();



  const navigate = useNavigate()
  const submit = useSubmit()
  
  const handleSearch = (e:any) => {
      e.preventDefault()
      submit(`/search?q=${e.target[0].value}`)
      navigate(`/search?q=${e.target[0].value}`)
    
  }

  return (
    <AnimateLayout>
      <Box>
         <Tabs.Root position={'relative'}  defaultValue="forYou" variant={'line'}>
            <Box px={'3'} top={{md:'0px', base:'50px'}} pt={'2'} w={{md:'2xl', base:'full'}} css={{backdropFilter:'blur(5px)', zIndex:'1', background:'rgba(255, 255, 255, 0.65)', _dark:{background:'rgba(6, 6, 6, 0.65)'}}} position={'fixed'}>
                <HStack>
                  <form style={{display:'block', width:'100%'}} onSubmit={handleSearch} id="search-form" role="search">
                    <InputGroup  display={'block'} flex="1" startElement={<LuSearch />}>
                        <Input name="q" type="search" maxW={{base:'xl'}} placeholder="Search" size={'lg'} rounded={'full'} variant="subtle" />
                    </InputGroup>
                  </form>
                    <IconButton colorPalette={'blue'} variant={'ghost'}>
                        <MdOutlineSettings />
                    </IconButton>
                </HStack>
                <Tabs.List py={'1'} w={'2xl'} colorPalette={'blue'}>
                    <Tabs.Trigger value="forYou">
                    For You
                    </Tabs.Trigger>
                    <Tabs.Trigger value="trending">
                        Trending
                    </Tabs.Trigger>
                </Tabs.List>
            </Box>
           
            <Box position={'relative'} top={'20'}>
              <Tabs.Content value="forYou">
                {trendFetching && <Box spaceY={'8'} py={'5'} px={'20px'}>
                  {Array(5).fill('').map(()=><SkeletonText  noOfLines={3} gap="2" />)}
                </Box>}
                
                {trendsSucess && trends?.map(item => <SearchExploreCard item={item}/>)}
                <Box>
                    <Text p={'16px'} fontWeight={'800'} fontSize={'20px'} lineHeight={'24px'} as={'h2'}>Who to Follow</Text>
                   {isFetching && <Box p={5} spaceY={'20px'}>
                    {Array(5).fill('').map(()=> <AvatarSkeleton/> )}
                   </Box>
                    }
                   {isSuccess && data?.map((item)=>(
                      <WhoToFollowCard key={item?._id} author={item}/>
                   ))} 
                    
                </Box>
              </Tabs.Content>
              <Tabs.Content value="trending">Manage your projects</Tabs.Content>
              <Tabs.Content value="tasks">
                Manage your tasks for freelancers
              </Tabs.Content>
            </Box>
            
          </Tabs.Root>
    </Box>
    </AnimateLayout>
    
  )
}

export default Explore
