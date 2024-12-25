import { Box, HStack, Text } from '@chakra-ui/react'
import { Avatar } from '../avatar'

const user ={
    id: "1",
    name: "John Mason",
    email: "@john.mason",
    avatar: "https://i.pravatar.cc/300?u=iu",
  }
const ExploreCards = () => {
  return (
    <Box borderBottomWidth={'0.5px'} pb={'4'} borderBlockColor={'bordergrey'} spaceY={'3'}>
        <Text fontWeight={'bold'} fontSize={'15px'} lineHeight={'20px'}>
            Wizkid's 'Morayo': Unveiling the Tracklist and Collaborations
        </Text>
        <HStack gap="4">
            <Avatar w={'20px'} h={'20px'} name={user.name} size="xs" src={user.avatar} />
            <Text color="fg.muted" fontWeight={'normal'} fontSize={'13px'} lineHeight={'16px'} textStyle="sm">
              22hrs ago . Music . 20k posts
            </Text>
        </HStack>
    </Box>
  )
}

export default ExploreCards
