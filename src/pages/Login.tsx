import AuthModal from '@/components/ui/customComponents/AuthModal'
import { CustomButton } from '@/components/ui/customComponents/CustomButton'
import LoginForm from '@/components/ui/customComponents/LoginForm'
import { Box, HStack, Separator, Stack, Text } from '@chakra-ui/react'
import { RiAppleFill } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import { useGoogleLogin } from "@react-oauth/google"
import axiosInstance from '@/lib/axiosInstance'
import { toaster } from '@/components/ui/toaster'
import { useDispatch} from 'react-redux'
import { loginSession } from '@/features/authSlice'


const Login = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handlelogin = useGoogleLogin({
        onSuccess: async(codeResponse) => {
            try{
                const {access_token} = codeResponse;
                const response = await axiosInstance.post('/api/auth/google', {access_token})
                if(response?.data?.token){
                    sessionStorage.setItem('tokenId', JSON.stringify(response?.data))
                    dispatch(loginSession(response?.data))
                    navigate('/home')
                }     
            }catch(err){
                console.log(err)
            }
        },
        onError: (error) => toaster.create({title:"Auhtentication Failed", type:'error', description:JSON.stringify(error)})
    });


  return (
    <Box width={'320px'}>
        <Stack gap={2} direction={'column'}>
            <CustomButton onClick={()=> handlelogin()} fontWeight={'medium'} display={'flex'} gap={2} justifyContent={'center'} alignItems={'center'} size={'sm'} visual={'solidLight'}>
                <svg width={'20px'} version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" 
                    className="LgbsSe-Bz112c"><g><path fill="#EA4335" 
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z">
                    </path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg>
                 Sign in with Google
            </CustomButton>

            <CustomButton display={'flex'} gap={2} justifyContent={'center'} alignItems={'center'} size={'sm'} visual={'solidLight'}>
                <RiAppleFill/>
                Sign in with Apple
            </CustomButton>

            <HStack>
                <Separator/>
                <Text fontSize={'sm'} as={'span'}>Or</Text>
                <Separator/>
            </HStack>

            <AuthModal btnText='Sign in' formTitle='Welcome Back'>
                <LoginForm/>
            </AuthModal>
            <Text color={'textgray'} fontSize={'11px'}>
             By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.
            </Text>

            <Box spaceY={'21px'} mt={{base:'40px',md:'60px'}}>
                <Text  fontSize={'17px'}  fontWeight={'medium'} lineHeight={'20px'}>Don't have an Account?</Text>
                <Link style={{display:'block'}} to={'/auth/signup'}>
                    <CustomButton color={'primary'} w={'full'} size={'sm'} visual={'solidBorder'}>Signup</CustomButton>
                </Link>
            </Box>
        </Stack>
    </Box>
  )
}

export default Login