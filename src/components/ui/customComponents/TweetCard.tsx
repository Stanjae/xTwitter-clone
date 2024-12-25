import { Box, GridItem, HStack, Icon, IconButton, SimpleGrid, Stack, Text } from "@chakra-ui/react"
import { Avatar } from "../avatar"
import { RiVerifiedBadgeFill } from "react-icons/ri"
import { FaRegComment, FaRetweet } from "react-icons/fa6"
import { BiBarChart } from "react-icons/bi"
import { CiBookmark } from "react-icons/ci"
import { MdOutlineFileUpload } from "react-icons/md"
import ImageGrid from "./ImageGrid"
import OptionsMenu from "./OptionsMenu"
import { DeleteDialog } from "./DeleteDialog"
import UpdateDialog from "./UpdateDialog"
import { Link } from "react-router-dom"
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { MernTweetType } from "@/lib/definitions"
import { sessionUserId } from "@/utils/getStorageData"
import { useGetTweetCommentsQuery } from "@/services/comment"
import millify from "millify"
import { Skeleton} from "../skeleton"
import LikeButton from "./LikeButton"
import { useGetLikeCountQuery, useIsLikedQuery } from "@/services/likes"
import FIxTweetHashtags from "./FIxTweetHashtags"

dayjs.extend(relativeTime)

const TweetCard = ({item}:{item:MernTweetType}) => {
    const userId = sessionUserId()
    const imageUrl = item?.author?.authType == "email" ? item?.author?.profileId?.profilePicture : item?.author?.picture
    
    const url = item?.author?._id == userId ? `/profile/${userId}` : `/profile/h/${item?.author?._id}`

    const {data:comments,  isFetching} = useGetTweetCommentsQuery({replyingTo:item?.author?._id,tweetId:item?._id})

    
    const {data:likes, refetch} = useGetLikeCountQuery(item?._id, { pollingInterval: 5000 })
    const {data:isLiked, refetch:refetchStats}= useIsLikedQuery({tweetId:item?._id, _id:1, userId})
  return (
    <Box cursor={'pointer'} _hover={{bg:'bg.muted'}} borderBottomWidth={'1px'} py={'2'} borderBottomColor={'bordergrey'} px={'16px'}>
        <HStack alignItems={'start'} gapX={'2.5'}>
            <Link to={url}>
                <Avatar fallback={item?.author?.fullName?.slice(0,2)} src={imageUrl} size={'md'} />
            </Link>
            
            <Stack p={0} flexGrow={'1'}>
                <Box display={'flex'} fontSize="15px" lineHeight="20px" gapX={'1.5'} alignItems='center'>
                    <Link style={{display:'flex', gap:'5px', alignItems:'center'}} to={url}>
                        <Text fontWeight={'bold'}>{item?.author?.fullName}</Text>
                        <Icon color={'primary'}><RiVerifiedBadgeFill /></Icon>
                        <Text color="textgray">@{item?.author?.username}</Text>.
                    </Link>
                    <Text color="textgray">{dayjs(item?.createdAt).fromNow()}</Text>
                    <OptionsMenu contentWidth={'auto'} btnSize={'xs'} rounded={'full'} mL={'auto'}>
                       {item?.author?._id == userId && <>
                            <UpdateDialog tweet={item}/>
                            <DeleteDialog location={''} currentUserId={userId} type="tweet" id={item?._id}/>
                        </>}
                    </OptionsMenu>
                </Box>
                <Link to={`/status/${item?._id}`}>
                    <Text color={'textlight'}  fontSize="15px" lineHeight="20px" fontWeight={'medium'}>
                      <FIxTweetHashtags text={item?.tweet}/> 
                    </Text>
                </Link>
                
                <ImageGrid imagesArray={item?.images}/>
                <SimpleGrid columns={{base:5}}>
                    <GridItem alignItems={'center'} display={'flex'} fontSize="13px" lineHeight={'16px'}>
                        <Link to={`/status/${item?._id}`}>
                            <IconButton rounded={'full'} size={'xs'} variant="ghost">
                                {/* comments */}
                                <FaRegComment />
                            </IconButton>
                        </Link>
                       {isFetching ? <Skeleton h={'5'} w={'15%'}/>: millify(comments?.length || 0 )}
                    </GridItem>
                    <GridItem alignItems={'center'} display={'flex'} fontSize="13px" lineHeight={'16px'}>
                        <IconButton rounded={'full'} size={'xs'} variant="ghost">
                            {/* retweets */}
                            <FaRetweet />
                        </IconButton>
                        80
                    </GridItem>
                    <GridItem alignItems={'center'} display={'flex'} fontSize="13px" lineHeight={'16px'}>
                        <LikeButton authorId={item?.author?._id} refetchStats={refetchStats} isLiked={isLiked?.isLiked} count={likes?.count} refetch={refetch} tweetId={item?._id} userId={userId}/>
                    </GridItem>
                    <GridItem alignItems={'center'} display={'flex'} fontSize="13px" lineHeight={'16px'}>
                        <IconButton rounded={'full'} size={'xs'} variant="ghost">
                            {/* analytics */}
                            <BiBarChart />
                        </IconButton>
                        {item?.views ? millify(Number(item?.views || 0)) : <Skeleton h={'5'} w={'15%'}/>}
                    </GridItem>
                    <GridItem justifyContent="flex-end" alignItems={'center'} display={'flex'} fontSize="13px" lineHeight={'16px'}>
                        <IconButton rounded={'full'} size={'xs'} variant="ghost">
                            {/* bookmark */}
                            <CiBookmark />
                        </IconButton>
                        <IconButton rounded={'full'} size={'xs'} variant="ghost">
                            <MdOutlineFileUpload />
                        </IconButton>
                    </GridItem>
                </SimpleGrid>
            </Stack>
        </HStack>
    </Box>
  )
}

export default TweetCard
