import { useAddLikeMutation, useDeleteLikeMutation } from '@/services/likes';
import { Box, IconButton } from '@chakra-ui/react'
import millify from 'millify';
//import { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa6'

const LikeButton = ({isLiked, count, refetch, tweetId, userId, refetchStats, authorId}:
    {refetchStats: any; authorId:string | undefined; isLiked:boolean |undefined; refetch:any; count:number|undefined; tweetId:string | undefined; userId:string | undefined}) => {
  
    /* const [isLike, setIsLike] = useState<boolean | undefined>();
    const [newCount, setCount] = useState<number | undefined>(); */

    const [addLike] = useAddLikeMutation()
    const [deleteLike] = useDeleteLikeMutation()

    const handleLike = async () => {
        if (isLiked) {
          await deleteLike({ tweetId, userId});
        } else {
          await addLike({ tweetId, userId, authorId});
        }
        refetch(); // Trigger a refetch of follow stats
        refetchStats();
      };
  
    return (
    <Box display={'flex'} alignItems={'center'}>
        <IconButton onClick={handleLike} rounded={'full'} size={'xs'} variant="ghost">
            {/* likes */}
            {isLiked ? <FaHeart color='red'/>:<FaRegHeart />}
        </IconButton>
        
        {millify(Number(count || 0))}
    </Box>
  )
}

export default LikeButton