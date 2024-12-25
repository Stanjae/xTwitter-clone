import { HStack, Stack, Text } from "@chakra-ui/react"
import { Avatar } from "@/components/ui/avatar"
import OptionsMenu from "./OptionsMenu"
import { MenuItem } from "../menu"
import { useDispatch} from "react-redux"
import { logoutSession } from "@/features/authSlice"
//import { AuthSliceType } from "@/lib/definitions"
import { useNavigate } from "react-router-dom"
import { useGetProfileQuery } from "@/services/profile"
import { sessionUserId } from "@/utils/getStorageData"
import AvatarSkeleton from "./AvatarSkeleton"


export const CustomAvatar = () => {
  //const newSession:AuthSliceType = useSelector((state: any) => state?.sessionAuth)
  const uid = sessionUserId()
  const { data, isFetching, isSuccess } = useGetProfileQuery(uid)
  const dispatch = useDispatch()
  const navigate = useNavigate()
 

  const profile = data?.profile

    const handleLogOut =()=>{
      dispatch(logoutSession())
      sessionStorage.removeItem("tokenId")
      navigate('/auth/login')
    }

    const imageUrl = profile?.userId?.authType == "email" ? profile?.profilePicture : profile?.userId?.picture
  return (
    <Stack gap="8">
      {isFetching && <AvatarSkeleton/>}
       { isSuccess && <HStack  p="3.5" _hover={{bg:'muted'}} rounded={'full'} gap="1">
          <Avatar name={profile?.userId?.fullName?.slice(0,2)} size="lg" src={imageUrl} />
          <Stack gap="0">
            <HStack justifyContent={'space-between'}>
                <Text fontWeight="medium">{profile?.userId?.fullName}</Text>
                <OptionsMenu contentWidth={'auto'} btnSize={'xs'} rounded={'full'} mL={'auto'}>
                        <>
                          <MenuItem value="setting">Settings</MenuItem>
                          <MenuItem onClick={handleLogOut} value="logout" color="fg.error" _hover={{ bg: "bg.error", color: "fg.error" }}>
                              Logout
                          </MenuItem>
                        </>
                    </OptionsMenu>
            </HStack>
            <Text color="fg.muted" textStyle="sm">
              @{profile?.userId?.username}
            </Text>
          </Stack>
        
        </HStack>}
    </Stack>
  )
}
