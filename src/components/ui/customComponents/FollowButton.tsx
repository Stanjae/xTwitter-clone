import { useAddFollowMutation, useDeleteFollowMutation } from '@/services/follow';
import { CustomButton } from './CustomButton'

const FollowButton = ({size, isFollowing, refetch, authorId, userId}:{isFollowing:boolean |undefined; refetch:any; size:"sm" | "md" | "lg" | "xs" | undefined; authorId:string | undefined; userId:string | undefined}) => {
  
    const [addFollow] = useAddFollowMutation()
    const [deleteFollow] = useDeleteFollowMutation()

    const handleFollow = async () => {
        if (isFollowing) {
          await deleteFollow({ authorId, followerId:userId });
        } else {
          await addFollow({ authorId, followerId:userId });
        }
        refetch(); // Trigger a refetch of follow stats
      };
  
    return (
    <CustomButton onClick={handleFollow} marginLeft={'auto'} size={size} visual={isFollowing ?'solidBorder':'solidLight'}>{
    isFollowing ? "following":"follow"}</CustomButton>
  )
}

export default FollowButton