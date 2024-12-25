import { useGetAuthorFollowCountQuery } from "@/services/follow"
import { HStack, Text } from "@chakra-ui/react"
import millify from "millify"
import { Skeleton } from "../skeleton"


const FollowingCountBox = ({authorId}:{authorId:string | undefined}) => {
  const {data, isLoading} =  useGetAuthorFollowCountQuery(authorId, { pollingInterval: 3000 })
  
  return (
        <HStack mt={'14px'} fontSize={'15px'} gap={'4'} color={'textlight'} lineHeight={'20px'}>
            <Text gapX={'3'} display={'flex'} fontWeight={'bold'}>{isLoading ? <Skeleton display={'inline-block'} h={'4'} w={'15%'}/> : millify(Number(data?.followers || 0))} <Text color={'textgray'} fontWeight={'normal'} as={'span'}>Followers</Text> </Text>
            <Text gapX={'3'} display={'flex'} fontWeight={'bold'}>{isLoading ? <Skeleton display={'inline-block'} h={'4'} w={'15%'}/> : millify(Number(data?.following || 0))} <Text color={'textgray'} fontWeight={'normal'} as={'span'}>Following</Text> </Text>
        </HStack>
  )
}

export default FollowingCountBox