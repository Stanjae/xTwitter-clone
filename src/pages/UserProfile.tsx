import AnimateLayout from "@/layout/AnimateLayout"
import { Box, Tabs, HStack, IconButton, Text, Image, Icon } from "@chakra-ui/react"
import { FaArrowLeft, FaMap } from "react-icons/fa6"
import { useNavigate, useParams } from "react-router-dom"
import { CustomButton } from "@/components/ui/customComponents/CustomButton"
import { RiVerifiedBadgeFill } from "react-icons/ri"
import { CgCalendar } from "react-icons/cg"
import TweetCard from "@/components/ui/customComponents/TweetCard"
import { useGetProfileQuery } from "@/services/profile"
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { useGetUserPostsQuery } from "@/services/tweets"
import { CustomLoader } from "@/components/ui/customComponents/CustomLoader"
import millify from "millify";
import FollowingCountBox from "@/components/ui/customComponents/FollowingCountBox"
import { Skeleton, SkeletonCircle } from "@/components/ui/skeleton"




dayjs.extend(LocalizedFormat)
const UserProfile = () => {
    const {id} = useParams()
    const router = useNavigate()
    const { data, isSuccess, isFetching:profileFetching } = useGetProfileQuery(id)

    const {data:tweets, isSuccess:success, isFetching} = useGetUserPostsQuery(id, { pollingInterval: 5000 })

    const profile = data?.profile
    const imageUrl = profile?.userId?.authType == "email" ? profile?.profilePicture : profile?.userId?.picture

    const newDateCreated = dayjs(profile?.dateCreated)

    const tweetCount:any = millify(tweets?.length || 0)

  return (
    <AnimateLayout>
    <Box css={{overFlow:"hidden"}}>
        <Box px={'3'} top={'0'} py={'2'} w={'2xl'} css={{backdropFilter:'blur(5px)', zIndex:'1', background:'rgba(255, 255, 255, 0.65)', _dark:{background:'rgba(6, 6, 6, 0.65)'}}} position={'fixed'}>
            <HStack gap={'3'}>
                <IconButton onClick={()=> router(-1)} colorPalette={'blue'} rounded={'full'} variant={'ghost'}>
                    <FaArrowLeft />
                </IconButton>
                <Box spaceY={'1'}>
                    {profileFetching && <Skeleton w={'20%'}/>}
                    <Text color={'textlight'} fontWeight={'bold'}  lineHeight={'24px'} fontSize={'20px'}>
                        {isSuccess && profile?.userId?.fullName}
                    </Text>
                    <Text color={'textgray'} fontSize={'13px'} lineHeight={'16px'} fontWeight={'medium'}>
                        {isFetching ? <Skeleton w={'5%'}/> : tweetCount} Posts</Text>
                </Box>
                
                
            </HStack>     
        </Box>

        <Box h={'200px'} position={'relative'} mt={'62px'}>
            { profile?.coverPicture != "" && <Image w={'full'} src={profile?.coverPicture} objectFit={'cover'} h={'full'}/>}
            <Box bg={profile?.coverPicture != "" ? 'background/30':"#333839"} h={'full'} w={'full'} position={'absolute'} top={'0'} left={'0'}/>
        </Box>
        
        <Box position={'relative'} px={'16px'} pb={'16px'} pt={'0'}>
            <HStack py={'5'} justifyContent={'space-between'} alignItems={'center'}>
                <Box bg={'background'} w={'148px'} p={'3px'} h={'148px'} rounded={'full'} position={'absolute'} 
                    left={'16px'} top={'-74px'} >
                    {profileFetching ? <SkeletonCircle size={'36'}/>
                     :<Image objectFit={'cover'} w={'full'} h={'full'} rounded={'full'}
                    alt="profile-pic" src={imageUrl}/>}
                </Box>
                <CustomButton ml={'auto'} visual={'solidBorder'} size={'sm'}>Edit Profile</CustomButton>
            </HStack>

            <Box>
                <Box mb={'9px'}>
                    <HStack>
                        { profileFetching ? <Skeleton height={'5'} w={'40%'}/>:
                        <Text lineHeight={'24px'} textTransform={'capitalize'} fontSize={'20px'} fontWeight={'bolder'} color={'textlight'}>{profile?.userId?.fullName}</Text>
                         }
                        <Icon color={'primary'}><RiVerifiedBadgeFill /></Icon> 
                    </HStack>
                    {profileFetching ? <Skeleton mt={'10px'} height={'3'} w={'15%'}/> :<Text fontSize={'15px'} color={'textgray'} lineHeight={'20px'}>@{profile?.userId?.username}</Text>}
                </Box>
               {profileFetching ? <Skeleton mt={'12px'} h={'4'} w={'75%'}/> : <Text color={'textlight'} mt={'12px'} fontSize={'15px'} lineHeight={'20px'} fontWeight={'medium'}>{profile?.bio}</Text>}
                
                {profileFetching ? <Skeleton mt={'14px'} h={'3.5'} w={'50%'}/> :
                    <HStack mt={'14px'} fontSize={'15px'} gap={'3'} color={'textgray'} lineHeight={'20px'}>
                        <Text alignItems={'center'} gap={'1'} display={'flex'}><FaMap/>{profile?.location}</Text>
                        <Text alignItems={'center'} gap={'1'} display={'flex'}><CgCalendar/> Joined {newDateCreated?.format('MMMM, YYYY')}</Text>
                    </HStack>
                }

                <FollowingCountBox authorId={id}/>
            </Box>
        </Box>

       <Tabs.Root position={'relative'}  defaultValue="all" variant={'line'}>
        
       <Tabs.List py={'1'} w={'2xl'} colorPalette={'blue'}>
            <Tabs.Trigger value="all">
                  All
                  </Tabs.Trigger>
                  <Tabs.Trigger value="verified">
                      Verified
                  </Tabs.Trigger>
                  <Tabs.Trigger value="mentions">
                      Mentions
                  </Tabs.Trigger>
              </Tabs.List>
          <Box position={'relative'}>
            <Tabs.Content value="all">
                {isFetching && <CustomLoader/>}
                {success && tweets?.map((item:any)=>(
                    <TweetCard key={item?._id} item={item}/>
  
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

export default UserProfile