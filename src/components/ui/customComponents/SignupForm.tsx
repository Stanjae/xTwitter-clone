import { Box, Input } from '@chakra-ui/react'
import { InputGroup } from '../input-group'
import { MdAlternateEmail } from 'react-icons/md'
import { PasswordInput } from '../password-input'
import { BiKey, BiUser } from 'react-icons/bi'
import { BsFillKeyFill } from 'react-icons/bs'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { EmailSignUpType } from '@/lib/definitions'
import { SignUpSchema } from '@/lib/zod'
import { Field } from '../field'
import AuthSubmitBtn from './AuthSubmitBtn'
import { signUpAPI } from '@/api/auth'
import { toaster } from '../toaster'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


const SignupForm = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors, isDirty, isValid }, } = useForm<EmailSignUpType>({
        resolver: zodResolver(SignUpSchema),
        defaultValues:{username:'', type:'email', email:'', password:'', confirmPassword:''}
      })

      const onSubmit=async(data:EmailSignUpType)=>{
        setLoading(true)
        const response  = await signUpAPI(data)
        if(response?.code == 201){
            toaster.create({title:response?.message, type:"success"})
            navigate('/get-started')
        }else{
            toaster.create({title:response?.message, type:"error"})
        }
        setLoading(false)
      }
  return (
    <Box onSubmit={handleSubmit(onSubmit)}  textAlign={'right'} spaceY={'4'} as={'form'}>
         <Field display={'block'} textAlign={'left'}  w={'full'} invalid={!!errors?.username?.message} errorText={errors?.username?.message}>
            <InputGroup display={'block'} flex="1" startElement={<BiUser/>}>
                <Input {...register('username',{required:"username is required"})} type='text' placeholder="Enter your Username" size={'lg'} rounded={'full'} variant="subtle" />
            </InputGroup>
         </Field>
        
         <Field display={'block'} textAlign={'left'}  w={'full'} invalid={!!errors?.email?.message} errorText={errors?.email?.message}>
            <InputGroup display={'block'} flex="1" startElement={<MdAlternateEmail />}>
                <Input {...register('email')} type='email' placeholder="Enter your Email" size={'lg'} rounded={'full'} variant="subtle" />
            </InputGroup>
        </Field>

        <Field display={'block'} textAlign={'left'}  w={'full'} invalid={!!errors?.password?.message} errorText={errors?.password?.message}>
            <InputGroup display={'block'} flex="1" startElement={<BiKey />}>
                <PasswordInput {...register('password')} placeholder='Enter your Password' variant={'subtle'} rounded={'full'}/>
            </InputGroup>
        </Field>
        
        <Field display={'block'} textAlign={'left'}  w={'full'} invalid={!!errors?.confirmPassword?.message} errorText={errors?.confirmPassword?.message}>
            <InputGroup display={'block'} flex="1" startElement={<BsFillKeyFill />}>
                <PasswordInput {...register('confirmPassword')} placeholder='Confirm your Password' variant={'subtle'} rounded={'full'}/>
            </InputGroup>
        </Field>
        
        <AuthSubmitBtn loadingText='Signing up...' loading={loading} disabledStatus={!isDirty || !isValid}>
            SignUp
        </AuthSubmitBtn>
    </Box>
  )
}

export default SignupForm