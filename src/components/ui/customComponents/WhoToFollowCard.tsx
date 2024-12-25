import { Box, HStack, Icon, Text } from "@chakra-ui/react"
import { Avatar } from "../avatar"
import { RiVerifiedBadgeFill } from "react-icons/ri"
import { FaUser } from "react-icons/fa6"
import { getUsersType } from "@/lib/definitions"
import { useIsFollowingQuery } from "@/services/follow"
import { sessionUserId } from "@/utils/getStorageData"
import FollowButton from "./FollowButton"
import { Link } from "react-router-dom"


const WhoToFollowCard = ({author}:{author:getUsersType}) => {
    const currentUserId = sessionUserId();

  const { data,  refetch } = useIsFollowingQuery({ authorId:author?._id, userId:currentUserId });

  const imageUrl = author?.authType == "email" ? author?.profileId?.profilePicture : author?.picture

  const url = author?._id == currentUserId ? `/profile/${author?._id}` : `/profile/h/${author?._id}`

  return (
    <Box _hover={{bg:"bg.muted"}} py={'2'} px={'16px'}>
    <Text color={'textgray'} display={'flex'} p={'2'} fontWeight={'bold'} alignItems={'center'} gap={'1'} fontSize={'13px'} lineHeight={'16px'}><FaUser /> @bibal and others follow</Text>
    <Link to={url}>
        <HStack alignItems={'flex-start'}>
            <Avatar name={author?.fullName} size="md" src={imageUrl} />
            <Box flexGrow={1} spaceY={'1'}>
                <HStack justifyContent={'space-between'}>    
                    <Box >
                        <Text as={'span'} color={'textlight'} fontWeight={'bolder'} fontSize={'15px'} lineHeight={'20px'}>
                        {author?.fullName}
                            <Icon color={'primary'}><RiVerifiedBadgeFill /></Icon>
                        </Text>
                        <Text color={'textgray'} fontSize={'13px'} lineHeight={'16px'}>
                            @{author?.username}
                        </Text>
                    </Box>
                    <FollowButton refetch={refetch} isFollowing={data?.isFollowing} userId={currentUserId} authorId={author?._id} size='xs'/>
                </HStack>
                <Text as={'span'} color={'textlight'} fontSize={'15px'} lineHeight={'20px'}>
                {author?.profileId?.bio}
                </Text>
            </Box>
        </HStack>
    </Link>
    
  </Box>
  )
}

export default WhoToFollowCard
