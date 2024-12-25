import { Button } from "@/components/ui/button"
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Avatar } from "../avatar"
import { useGetProfileQuery } from "@/services/profile"
import { sessionUserId } from "@/utils/getStorageData"
import { Skeleton, SkeletonCircle } from "../skeleton"
import { Box, HStack, Icon, IconButton, Separator, Text } from "@chakra-ui/react"
import { FaXTwitter } from "react-icons/fa6"
import MobileNavLinks from "./MobileNavLinks"
import { ColorModeButton } from "../color-mode"
import { Link } from "react-router-dom"
import { RiVerifiedBadgeFill } from "react-icons/ri"
import FollowingCountBox from "./FollowingCountBox"


const MobileNav = () => {
    const uid = sessionUserId()
    const { data, isFetching } = useGetProfileQuery(uid)

    const profile = data?.profile
    
    const imageUrl = profile?.userId?.authType == "email" ? profile?.profilePicture : profile?.userId?.picture
    return (
        <DrawerRoot size={'xs'} placement={'start'}>
          <DrawerBackdrop />
          <DrawerTrigger asChild>
            <Button bg={'transparent'} size="md">
            {isFetching && <SkeletonCircle size={'10'}/>}
            <Avatar
                name={profile?.userId?.fullName?.slice(0,2)}
                src={imageUrl}
                shape="full"
                size="md"
            />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
                <Link to={``}>
                    <Avatar name={profile?.userId?.fullName?.slice(0,2)} src={imageUrl} shape="full"
                    size="md"/>
                </Link>
                <Box mb={'9px'}>
                    <HStack>
                        { isFetching ? <Skeleton height={'5'} w={'40%'}/>:
                        <Text lineHeight={'24px'} textTransform={'capitalize'} fontSize={'16px'} fontWeight={'bold'} color={'textlight'}>{profile?.userId?.fullName}</Text>
                         }
                        <Icon color={'primary'}><RiVerifiedBadgeFill /></Icon> 
                    </HStack>
                    {isFetching ? <Skeleton mt={'10px'} height={'3'} w={'15%'}/> :<Text fontSize={'13px'} color={'textgray'} lineHeight={'20px'}>@{profile?.userId?.username}</Text>}
                </Box>
                <FollowingCountBox authorId={uid}/>
            </DrawerHeader>
            <Separator/>
            <DrawerBody>
              <MobileNavLinks/>
            </DrawerBody>
            <Separator/>
            <DrawerFooter display={'block'} >
                <HStack  hideFrom={'md'} justifyContent={'space-between'}>
                    <IconButton size={'lg'} p={'10px'} borderRadius={'full'} aria-label="twitter logo" variant={'ghost'}>
                        <Icon fontSize="28px">
                            <FaXTwitter/>
                        </Icon>      
                    </IconButton>
                    <ColorModeButton />
                </HStack>
            </DrawerFooter>
            <DrawerCloseTrigger />
          </DrawerContent>
        </DrawerRoot>
      )
}

export default MobileNav