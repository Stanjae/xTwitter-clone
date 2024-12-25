import { TrendsType } from "@/lib/definitions"
import { Box, HStack, IconButton, Text } from "@chakra-ui/react"
import millify from "millify"
import { CgMore} from "react-icons/cg"
import { Link } from "react-router-dom"


const SearchExploreCard = ({item}:{item:TrendsType}) => {
  const url = item?.topic?.startsWith('#') ? item?.topic.substring(1) : item?.topic
  return (
    <Box _hover={{bg:"bg.muted"}} py={'2'} px={'16px'}>
      <Link to={`/search?q=${url}`}> 
        <HStack justifyContent={'space-between'} alignItems={'flex-start'}>
          <Box>
              <Text as={'span'} color={'textgray'} fontWeight={'medium'} fontSize={'13px'} lineHeight={'16px'}>
                Trending world wide
              </Text>
              <Text color={item?.type == 'hashtag'? 'blue.500':'textlight'} fontWeight={'bold'} fontSize={'15px'} lineHeight={'20px'}>
               {item?.topic}
              </Text>
              <Text as={'span'} color={'textgray'} fontSize={'13px'} lineHeight={'16px'}>
                {millify(Number(item?.count))} posts
              </Text>
          </Box>
          <IconButton size={'sm'} colorPalette={'blue'} variant={'ghost'}>
              <CgMore/>
          </IconButton>
        </HStack>
      </Link>
    </Box>
  )
}

export default SearchExploreCard
