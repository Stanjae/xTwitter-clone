import { HStack, Stack, Text } from '@chakra-ui/react'
import { Avatar } from "@/components/ui/avatar"
import { getUsersType } from '@/lib/definitions'
import FollowButton from './FollowButton'
import { sessionUserId } from '@/utils/getStorageData'
import { useIsFollowingQuery } from '@/services/follow'
import { CustomLoader } from './CustomLoader'
import { Link } from 'react-router-dom'

const AvatarWithFollow = ({author}:{author:getUsersType}) => {
  const currentUserId = sessionUserId();

  const { data, isLoading, refetch } = useIsFollowingQuery({ authorId:author?._id, userId:currentUserId });

  const imageUrl = author?.authType == "email" ? author?.profileId?.profilePicture : author?.picture

   const url = author?._id == currentUserId ? `/profile/${currentUserId}` : `/profile/h/${author?._id}`

  if(isLoading) return <CustomLoader/>
  return (
    <Stack rounded={'full'} _hover={{bg:'bg.muted'}}>
        <HStack gap="4">
          <Link style={{display:'flex', gap:'5px'}} to={url}>
            <Avatar name={author?.fullName} size="md" src={imageUrl} />
            <Stack gap="0">
              <Text fontSize={'17px'} lineHeight={'20px'} fontWeight="bold">{author?.fullName}</Text>
              <Text color="fg.muted" textStyle="sm">
                {author?.username}
              </Text>
            </Stack>
          </Link>
          
          <FollowButton refetch={refetch} isFollowing={data?.isFollowing} userId={currentUserId} authorId={author?._id} size='xs'/>
        </HStack>
    </Stack>
  )
}

export default AvatarWithFollow