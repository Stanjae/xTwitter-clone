import { Box, GridItem, HStack, Icon, IconButton, SimpleGrid, Stack, Text } from "@chakra-ui/react"
import { Avatar } from "../avatar"
import { RiVerifiedBadgeFill } from "react-icons/ri"
import { FaRegComment, FaRegHeart, FaRetweet } from "react-icons/fa6"
import { BiBarChart } from "react-icons/bi"
import { CiBookmark } from "react-icons/ci"
import { MdOutlineFileUpload } from "react-icons/md"
import OptionsMenu from "./OptionsMenu"
import { DeleteDialog } from "./DeleteDialog"
import { Link } from "react-router-dom"
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { CommentType} from "@/lib/definitions"
import { sessionUserId } from "@/utils/getStorageData"

dayjs.extend(relativeTime)

const CommentCard = ({item}:{item:CommentType}) => {
    const userId = sessionUserId()
    const imageUrl = item?.author?.authType == "email" ? item?.author?.profileId?.profilePicture : item?.author?.picture
    
     const url = item?.author?._id == userId ? `/profile/${userId}` : `/profile/h/${item?.author?._id}`
  return (
    <Box cursor={'pointer'} _hover={{bg:'bg.muted'}} borderBottomWidth={'1px'} py={'2'} borderBottomColor={'bordergrey'} px={'16px'}>
        <HStack alignItems={'start'} gapX={'2.5'}>
            <Link to={url}>
                <Avatar fallback={item?.author?.fullName} src={imageUrl} size={'md'} />
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
                            <DeleteDialog currentUserId={userId} location="" type="comment" id={item?._id}/>
                        </>}
                    </OptionsMenu>
                </Box>
                <Link to={`/status/${item?._id}`}>
                    <Text color={'textlight'}  fontSize="15px" lineHeight="20px" fontWeight={'medium'}>
                       {item?.comment}
                    </Text>
                </Link>
                
                <SimpleGrid columns={{md:5}}>
                    <GridItem alignItems={'center'} display={'flex'} fontSize="13px" lineHeight={'16px'}>
                        <IconButton rounded={'full'} size={'xs'} variant="ghost">
                            {/* comments */}
                            <FaRegComment />
                        </IconButton>
                        200
                    </GridItem>
                    <GridItem alignItems={'center'} display={'flex'} fontSize="13px" lineHeight={'16px'}>
                        <IconButton rounded={'full'} size={'xs'} variant="ghost">
                            {/* retweets */}
                            <FaRetweet />
                        </IconButton>
                        80
                    </GridItem>
                    <GridItem alignItems={'center'} display={'flex'} fontSize="13px" lineHeight={'16px'}>
                        <IconButton rounded={'full'} size={'xs'} variant="ghost">
                            {/* likes */}
                            <FaRegHeart />
                        </IconButton>
                        807
                    </GridItem>
                    <GridItem alignItems={'center'} display={'flex'} fontSize="13px" lineHeight={'16px'}>
                        <IconButton rounded={'full'} size={'xs'} variant="ghost">
                            {/* analytics */}
                            <BiBarChart />
                        </IconButton>
                        807K
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

export default CommentCard
