import CustomCard from './CustomCard'
import { Box, Text } from '@chakra-ui/react'
import { CustomButton } from './CustomButton'
import AvatarWithFollow from './AvatarWithFollow'
import ExploreCards from './ExploreCards'
import { useGetNoOfUsersQuery } from '@/services/users'
import { sessionUserId } from '@/utils/getStorageData'

const SearchFeed = () => {
    const currentUserId = sessionUserId()
    const {data, isSuccess} = useGetNoOfUsersQuery({currentUserId, limit:4, skip:0})

  return (
    <Box spaceY={'18px'} maxW={'xs'} mx={'auto'}>
        <CustomCard title={'Subscribe to Premium'}>
            <Box>
                <Text fontWeight="medium" fontSize="15px" lineHeight={'20px'} mb={2}>
                    Subscribe to unlock new features and if eligible, receive a share of revenue.
                </Text>
                <CustomButton size={'sm'} visual={'solidBlue'}>Subscribe</CustomButton>
            </Box>
        </CustomCard>

        <CustomCard title={'Explore'}>
            <Box spaceY={'2'}>
                <ExploreCards/>
                <ExploreCards/>
                <ExploreCards/>
                <ExploreCards/>
            </Box>
        </CustomCard>

        <CustomCard title={'Who to Follow'}>
            <Box spaceY={'20px'}>
                {isSuccess && data?.map((item)=>(
                    <AvatarWithFollow key={item?._id} author={item}/>
                ))}
            </Box>
        </CustomCard>
    </Box>
  )
}

export default SearchFeed