import { Box, chakra, HStack,  useRecipe } from "@chakra-ui/react"
import { Avatar } from "../avatar"
import AutoResize from "react-textarea-autosize"
import { AddCommentFormType, SingleProfileReducerType } from "@/lib/definitions"
import { AddCommentFormSchema } from "@/lib/zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import AuthSubmitBtn from "./AuthSubmitBtn"
import { useAddCommentMutation } from "@/services/comment"
import { useEffect } from "react"
import { toaster } from "../toaster"
import { errorMessage } from "./CreateTweetForm"
import { Field } from "../field"

const StyledAutoResize = chakra(AutoResize)
const ReplyTweet = ({newData, author, replyingTo, tweet}:{newData:SingleProfileReducerType | undefined; author:string | undefined; replyingTo:string | undefined; tweet:string|undefined}) => {
    const recipe = useRecipe({ key: "textarea" })
    const styles = recipe({ size: "md", })

    const [addComment, {isLoading, isSuccess, status, isError}] = useAddCommentMutation()

    const { register, handleSubmit, setValue, formState: { errors, isDirty, isValid }, } = useForm<AddCommentFormType>({
        resolver: zodResolver(AddCommentFormSchema),
      })

      const onSubmit = async(data:AddCommentFormType) => {
        await addComment({...data, author, replyingTo, tweet})
        
    }

    
      useEffect(()=>{
        if(isSuccess && status=="fulfilled"){
            toaster.create({title: `Comment added Sucessfully`,type: 'success'})
            setValue("comment", "")
        }else if(!isSuccess && isError){
            toaster.create({title: `${errorMessage}`,type: 'error'})
        }else{
            return
        }
    }, [isSuccess, status])

    const imageUrl = newData?.profile?.userId?.authType == "email" ? newData?.profile?.profilePicture : newData?.profile?.userId?.picture
    
    return (
        <Box borderBottomWidth={'1px'} py={'3'} borderBottomColor={'bordergrey'}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <HStack alignItems={'start'} pb={'3'} gapX={'1'} px={'16px'}>
                    <Avatar fallback={newData?.profile?.userId?.fullName} src={imageUrl} size={'md'} />
                    <HStack flexGrow={'1'}>
                        <Field display={'block'} textAlign={'left'}  w={'full'} invalid={!!errors?.comment?.message} errorText={errors?.comment?.message}>
                            <StyledAutoResize {...register('comment')}
                                placeholder="Post your Reply" minH="initial"
                                w={'100%'} fontSize={'20px'} border={'none'} outline={'none'}
                                    resize="none" overflow="hidden" lineHeight="24px"
                                css={styles}
                                />
                        </Field>
                        <AuthSubmitBtn loadingText='Posting...' loading={isLoading} disabledStatus={!isDirty || !isValid}>
                            Post
                        </AuthSubmitBtn>
                    </HStack>
                </HStack>
            </form> 
    </Box>
    )
}

export default ReplyTweet