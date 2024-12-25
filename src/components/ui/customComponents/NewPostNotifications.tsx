import { Box, HStack, Icon, Text } from '@chakra-ui/react'
import { GoBellFill } from 'react-icons/go'
import { Avatar } from '../avatar'
import { RiVerifiedBadgeFill } from 'react-icons/ri'


const NewPostNotifications = () => {
  return (
    <Box borderBottomWidth={'1px'} borderBottomColor={'bordergrey'} _hover={{bg:"primary/20"}} py={'4'} px={'16px'}>
        <HStack gap={'2'} alignItems={'start'}>
            <Icon color={'primary'} size={'xl'}>
                <GoBellFill />
            </Icon>
            <Box>
                <HStack gapX={'1'}>
                    <Avatar rounded={'full'} size={'xs'} src="https://i.pravatar.cc/300?u=iu"/>
                    <Avatar rounded={'full'} size={'xs'} src="https://i.pravatar.cc/300?u=iu"/>
                    <Avatar rounded={'full'} size={'xs'} src="https://i.pravatar.cc/300?u=iu"/>
                </HStack>
                <Text pt={2} color={'textlight'} fontSize={'15px'} lineHeight={'20px'}> New Post notifications from
                    <Text pr={'2px'} fontWeight={'bold'} as={'span'}> Wizkid 
                        <Icon color={'primary'}><RiVerifiedBadgeFill /></Icon>
                    </Text> and 2 others
                </Text>
            </Box>
        </HStack>
    </Box>
  )
}

export default NewPostNotifications
