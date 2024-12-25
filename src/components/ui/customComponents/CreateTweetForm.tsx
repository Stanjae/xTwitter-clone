import { Box, HStack, IconButton, Image, Stack, Text, chakra, useRecipe } from '@chakra-ui/react'
import { Avatar } from '../avatar'
import AutoResize from "react-textarea-autosize"
import { VscSmiley } from 'react-icons/vsc'
import { FiImage } from 'react-icons/fi'
import {useForm} from 'react-hook-form'
import { CreateTweetType} from '@/lib/definitions'
import { zodResolver } from "@hookform/resolvers/zod"
import { TweetSchema } from '@/lib/zod'
import { useAddPostMutation, useUpdatePostMutation } from '@/services/tweets'
import { Button } from '../button'
import { useEffect, useState } from 'react'
import { toaster } from '../toaster'
import { FileUploaderRegular } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';
import './index.css'
import { TbTrashX } from 'react-icons/tb'
import { useGetProfileQuery } from '@/services/profile'
import { sessionUserId } from '@/utils/getStorageData'
import { SkeletonCircle } from '../skeleton'


const StyledAutoResize = chakra(AutoResize)

export const errorMessage = "An Error Occured"
export const CreateTweetForm =({btnText, oldTweet, setOpen}:{btnText:string; setOpen:any; oldTweet:any;})=>{
    const id = sessionUserId()

    const { data, isFetching } = useGetProfileQuery(id)
    
    const profile = data?.profile
    const imageUrl = profile?.userId?.authType == "email" ? profile?.profilePicture : profile?.userId?.picture

    const recipe = useRecipe({ key: "textarea" })
    const styles = recipe({ size: "md", })

    const [images, setImages] = useState<any>([])

    const [
        addPost, // This is the mutation trigger
        { isLoading: isUpdating , status, isSuccess, isError}, // This is the destructured mutation result
      ] = useAddPostMutation()

      const [updatePost] = useUpdatePostMutation()
    

    const { register, setValue, handleSubmit, formState: { errors, isDirty, isValid }, } = useForm<CreateTweetType>({
        resolver: zodResolver(TweetSchema),
      })

    const onSubmit = async(data:CreateTweetType) => {
        if(btnText == "Post"){
            const newData = {...data, id:1, author:profile?.userId?._id, images:[...images]}
            await addPost(newData)
            setImages([])
            setValue("tweet",'')
        }else{
            //Edit tweet logic here
            const newData = {...oldTweet, tweet:data?.tweet, images:[...images]}
            await updatePost(newData)
            setImages([])
            setValue("tweet",'')
            setOpen(false)
        }
        
    }

    const handleDelete =(id:string)=>{
        setImages((prevImages:any )=> prevImages.filter((item:any) => item?.id != id))
    }

    useEffect(()=>{
        if(oldTweet != null){
            setValue("tweet", oldTweet?.tweet)
            setImages(oldTweet?.images)
        }
    },[oldTweet])


    useEffect(()=>{
        if(isSuccess && status=="fulfilled"){
            toaster.create({
                title: `Tweet created Sucessfully`,
                type: 'success'
        })
        }else if(!isSuccess && isError){
            toaster.create({
                title: `${errorMessage}`,
                type: 'error'
            })
        }else{
            return
        }
    }, [isSuccess, status])

    const handleFileUpload = (files:any) => {
        setImages(()=> files.allEntries?.map((item:any)=>({id:item?.uuid, imageUrl:item?.cdnUrl})))
    }

    return(
        <Box borderBottomWidth={'1px'} py={'2'} borderBottomColor={'bordergrey'}>
           <form onSubmit={handleSubmit(onSubmit)} >
            <HStack alignItems={'start'} gapX={'1'} px={'16px'}>
                {profile && <Avatar fallback={profile?.userId?.fullName?.slice(0,2)} src={imageUrl} size={'md'} />}
                {isFetching && <SkeletonCircle size="10" />}
                <Stack flexGrow={'1'}>
                    <StyledAutoResize  {...register("tweet")}
                        placeholder="What is happening?"
                        aria-label='tweet-input'
                        minH="initial"
                        w={'100%'}
                        fontSize={'20px'}
                        border={'none'}
                        outline={'none'}
                        resize="none"
                        overflow="hidden"
                        lineHeight="24px"
                        css={styles}
                        />
                    {errors.tweet && <Text color={'fg.error'} fontSize={'2xs'}>{errors.tweet?.message}</Text>}
                    <HStack justifyContent={'space-between'}>
                        <Box display={'flex'} gapX="0.5">
                            <IconButton type='button' position={'relative'} color='primary' size={'sm'} colorPalette={'blue'} 
                            rounded="full" variant={'ghost'}>
                                <FiImage />
                                <FileUploaderRegular className='buddy' onChange={handleFileUpload}
                                sourceList="local, camera" maxLocalFileSizeBytes={10000000}
                                multipleMax={4} imgOnly={true}
                                pubkey="72d090bc149255852c55"
                                />
                            </IconButton>
                           
                            <IconButton type='button' color='primary' size={'sm'} colorPalette={'blue'} rounded="full" variant={'ghost'}>
                                <VscSmiley />
                                
                            </IconButton>
                        </Box>
                        <Box>
                            <Button css={{bg: "primary", color: "textlight", paddingY: "8px", paddingX:"12px", fontSize: "15px", lineHeight: "20px", fontWeight: "bold", rounded:'full',cursor: "pointer",
                                transition:'all',transitionDuration:'slow'}} 
                                _disabled={{bg:'primary/15', color:'textgray'}} disabled={!isDirty || !isValid} 
                                loading={isUpdating}
                                loadingText="posting..." type='submit' variant={'solid'}>
                                {btnText}
                            </Button>
                        </Box>
                    </HStack>
                </Stack>
            </HStack>
            <HStack p={'2'}>
                    {btnText != "Post" && images?.map((item:any, index:number)=>(
                        <Box key={index} position={'relative'}>
                            <Image rounded={'md'} src={item?.imageUrl} objectFit={'cover'} w={'100px'} h={'100px'}/>
                            <IconButton onClick={()=> handleDelete(item?.id)} _hover={{bg:'background'}} bg={'background/80'} css={{transform:'translate(-50%, -50%)'}}
                                color={'foreground'} top={'50%'} left={'50%'} variant={'solid'} 
                                size={'lg'} position={'absolute'}>
                                <TbTrashX/>
                            </IconButton>
                        </Box>
                    ))}   
                </HStack>
        </form> 
        </Box>
        
    )
}