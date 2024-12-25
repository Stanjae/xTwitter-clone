import { Box, HStack, Icon, Text } from '@chakra-ui/react'
import { RiVerifiedBadgeFill } from 'react-icons/ri'
import { Avatar } from '../avatar'
import { BsHeartFill } from 'react-icons/bs'
import { FaRetweet } from 'react-icons/fa6'
import { NotificationType } from '@/lib/definitions'
import { Button } from '../button'
import { useMarkReadMutation } from '@/services/notification'

const NotificationToMyTweets = ({item, type, refetch}:{refetch:any; type:string, item:NotificationType}) => {
    const imageUrl = item?.userId?.authType == 'email' ? item?.userId?.profileId?.profilePicture : item?.userId?.picture;

    const [markRead] = useMarkReadMutation();

    const markAsRead =async()=>{
        await markRead({notificationId:item?._id})
        refetch()
    }
  return (
    <Box bg={item?.isRead ? '':'primary/25'} borderBottomWidth={'1px'} borderBottomColor={'bordergrey'} _hover={{bg:"bg.muted"}} py={'4'} px={'16px'}>
    <HStack gap={'2'} alignItems={'start'}>
        <Icon  size={'lg'}>
            {type == "like" ? <BsHeartFill color={'#f91880'}/>:<FaRetweet color='#00ba7c'/>}
        </Icon>
        <Box>
            <HStack  gapX={'1'}>
                <Avatar rounded={'full'} size={'xs'} src={imageUrl}/>
                
            </HStack>
            <Text gap={'1'} pt={2} display={'flex'} fontWeight={'bold'} alignItems={'center'} color={'textlight'} fontSize={'15px'} 
                lineHeight={'20px'}>{item?.userId?.fullName}
                <Icon color={'primary'}><RiVerifiedBadgeFill /></Icon>
                <Text fontWeight={'normal'} as={'span'}>{type == 'like' ? ` ${item?.content}`: type == 'follow' ? `${item?.content}` : `${item?.content}`} </Text>
            </Text>

            <Text lineHeight={'20px'} mt={'5'} fontSize={'15px'} color={'textgray'}>{type == 'like' ? item?.relatedEntityId?.tweet : ''}</Text>
        </Box>
        <Button onClick={markAsRead} ml={'auto'} variant={item?.isRead ? 'outline' : 'solid'} size={'xs'}>{item?.isRead ? 'Marked':'Mark as Read'}</Button>
    </HStack>
</Box>
  )
}

export default NotificationToMyTweets