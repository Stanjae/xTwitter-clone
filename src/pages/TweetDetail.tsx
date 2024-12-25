import { Avatar } from "@/components/ui/avatar"
import { CustomLoader } from "@/components/ui/customComponents/CustomLoader"
import { DeleteDialog } from "@/components/ui/customComponents/DeleteDialog"
import ImageGrid from "@/components/ui/customComponents/ImageGrid"
import OptionsMenu from "@/components/ui/customComponents/OptionsMenu"
import ReplyTweet from "@/components/ui/customComponents/ReplyTweet"
import UpdateDialog from "@/components/ui/customComponents/UpdateDialog"
import AnimateLayout from "@/layout/AnimateLayout"
import { useGetPostQuery } from "@/services/tweets"
import { Box, GridItem, HStack, Icon, IconButton, SimpleGrid, Text } from "@chakra-ui/react"
import { BiBarChart } from "react-icons/bi"
import { CiBookmark } from "react-icons/ci"
import { FaArrowLeft, FaRegComment, FaRetweet } from "react-icons/fa6"
import { MdOutlineFileUpload } from "react-icons/md"
import { RiVerifiedBadgeFill } from "react-icons/ri"
import { Link, useNavigate, useParams } from "react-router-dom"
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { sessionUserId } from "@/utils/getStorageData"
import { useGetProfileQuery } from "@/services/profile"
import { useGetTweetCommentsQuery } from "@/services/comment"
import CommentCard from "@/components/ui/customComponents/CommentCard"
import millify from "millify"
import { useGetLikeCountQuery, useIsLikedQuery } from "@/services/likes"
import LikeButton from "@/components/ui/customComponents/LikeButton"
import FIxTweetHashtags from "@/components/ui/customComponents/FIxTweetHashtags"

dayjs.extend(LocalizedFormat)
const TweetDetail = () => {
    const userId = sessionUserId()
    const router = useNavigate()
    const { id } = useParams()

    const { data, isFetching, isSuccess } = useGetPostQuery(id);
    const newDateCreated = dayjs(data?.createdAt)

    const {data:currentUser} = useGetProfileQuery(userId)

    const imageUrl = data?.author?.authType == "email" ? data?.author?.profileId?.profilePicture : data?.author?.picture

    const url = data?.author?._id == userId ? `/profile/${userId}` : `/profile/h/${data?.author?._id}`
    
    const {data:comments, isSuccess:success, isFetching:fetching} = useGetTweetCommentsQuery({replyingTo:data?.author?._id,tweetId:id})

    const {data:likes, refetch} = useGetLikeCountQuery(id, { pollingInterval: 5000 })
    const {data:isLiked, refetch:refetchStats}= useIsLikedQuery({tweetId:id, _id:1, userId})

  return (
    <AnimateLayout>
        <Box css={{overFlow:"hidden"}}>
            <Box px={'3'} top={'0'} py={'2'} w={'2xl'} css={{backdropFilter:'blur(5px)', zIndex:'1', background:'rgba(255, 255, 255, 0.65)', _dark:{background:'rgba(6, 6, 6, 0.65)'}}} position={'fixed'}>
                <HStack gap={'3'}>
                    <IconButton onClick={()=> router(-1)} colorPalette={'blue'} rounded={'full'} variant={'ghost'}>
                        <FaArrowLeft />
                    </IconButton>
                    <Box spaceY={'1'}>
                        <Text color={'textlight'} fontWeight={'bold'}  lineHeight={'24px'} fontSize={'20px'}>
                            Post
                        </Text>
                    </Box>   
                </HStack>     
            </Box>
            {isFetching && <CustomLoader/>}
            {isSuccess && data && <Box position={'relative'} mt={'62px'} px={'16px'} py={'2'}>
                <Box borderBottomWidth={'1px'} borderBottomColor={'bordergrey'}>
                    <HStack alignItems={'start'} gapX={'2.5'}>
                        <Link style={{display:'flex', gap:'10px', alignItems:'flex-start'}} to={url}>
                            <Avatar fallback={data?.author?.fullName} src={imageUrl} size={'md'} />
                            <Box fontSize="15px" lineHeight="20px" gapX={'1'} >
                                <Text fontWeight={'bold'}>{data?.author?.fullName} <Icon color={'primary'}><RiVerifiedBadgeFill /></Icon></Text>
                                <Text color="textgray">@{data?.author?.username}. </Text>        
                            </Box>
                        </Link>
                       
                        <OptionsMenu contentWidth={'auto'} btnSize={'xs'} rounded={'full'} mL={'auto'}>
                               { userId == data?.author?._id && <>
                                    <UpdateDialog tweet={data}/>
                                    <DeleteDialog currentUserId={userId} location="detail" type="tweet" id={id}/>
                                </>}
                        </OptionsMenu>
                    </HStack>

                    
                    <Text color={'textlight'} py={'16px'} fontSize="15px" lineHeight="20px" fontWeight={'medium'}>
                       <FIxTweetHashtags text={data?.tweet}/>
                    </Text>
                    
                    {data?.images?.length > 0 && <ImageGrid imagesArray={data?.images}/>}

                    <Text as={'div'} py={'16px'} color={'textgray'} fontSize={'15px'} lineHeight={'20px'}>
                       {newDateCreated.format('h:mm A')} . {newDateCreated.format('MMM D, YYYY')} . <Text color={'foreground'} fontWeight={'bold'} as={'span'}> {millify(Number(data?.views))}</Text> Views
                    </Text>

                    <SimpleGrid py={'5px'} borderBlockStartWidth={'1px'} columns={{base:5}}>
                            <GridItem alignItems={'center'} display={'flex'} fontSize="13px" lineHeight={'16px'}>
                                <IconButton rounded={'full'} size={'xs'} variant="ghost">
                                    {/* comments */}
                                    <FaRegComment />
                                </IconButton>
                                {millify(comments?.length || 0)}
                            </GridItem>
                            <GridItem alignItems={'center'} display={'flex'} fontSize="13px" lineHeight={'16px'}>
                                <IconButton rounded={'full'} size={'xs'} variant="ghost">
                                    {/* retweets */}
                                    <FaRetweet />
                                </IconButton>
                                80
                            </GridItem>
                            <GridItem alignItems={'center'} display={'flex'} fontSize="13px" lineHeight={'16px'}>
                               <LikeButton authorId={data?.author?._id} refetchStats={refetchStats} isLiked={isLiked?.isLiked} count={likes?.count} refetch={refetch} tweetId={id} userId={userId}/>
                            </GridItem>
                            <GridItem alignItems={'center'} display={'flex'} fontSize="13px" lineHeight={'16px'}>
                                <IconButton rounded={'full'} size={'xs'} variant="ghost">
                                    {/* analytics */}
                                    <BiBarChart />
                                </IconButton>
                                {millify(Number(data?.views))}
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
                </Box>
            </Box>}

            <ReplyTweet tweet={id} author={userId} replyingTo={data?.author?._id} newData={currentUser}/>

            <Box>
                {fetching && <CustomLoader/>}
                {success && comments.map((item)=>(
                    <CommentCard key={item?._id} item={item}/>
                ))}
                
            </Box>          

        </Box>
    </AnimateLayout>
    
  )
}

export default TweetDetail