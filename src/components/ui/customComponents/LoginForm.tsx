import { Box, Input } from '@chakra-ui/react'
import { InputGroup } from '../input-group'
import { MdAlternateEmail } from 'react-icons/md'
import { PasswordInput } from '../password-input'
import { BiKey } from 'react-icons/bi'
import { EmailSignInType } from '@/lib/definitions'
import { signInAPI } from '@/api/auth'
import { SignInSchema } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toaster } from '../toaster'
import { Field } from '../field'
import AuthSubmitBtn from './AuthSubmitBtn'
import { useState } from 'react'


const LoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { register, handleSubmit, formState: { errors, isDirty, isValid }, } = useForm<EmailSignInType>({
          resolver: zodResolver(SignInSchema),
          defaultValues:{email:'', password:''}
        })
  
        const onSubmit=async(data:EmailSignInType)=>{
          setLoading(true)
          const response  = await signInAPI(data)
          if(response?.code == 201){
              toaster.create({title:response?.message, type:"success"})
              window.location.href = '/home'
          }else{
              toaster.create({title:response?.message, type:"error"})
          }
          setLoading(false)
        }
  return (
    <Box onSubmit={handleSubmit(onSubmit)} textAlign={'right'} spaceY={'4'} as={'form'}>
      <Field display={'block'} textAlign={'left'}  w={'full'} invalid={!!errors?.email?.message} errorText={errors?.email?.message}>
        <InputGroup display={'block'} flex="1" startElement={<MdAlternateEmail />}>
            <Input {...register("email")} type='email' placeholder="Enter your Email" size={'lg'} rounded={'full'} variant="subtle" />
        </InputGroup>
      </Field>

      <Field display={'block'} textAlign={'left'}  w={'full'} invalid={!!errors?.password?.message} errorText={errors?.password?.message}>
        <InputGroup display={'block'} flex="1" startElement={<BiKey />}>
            <PasswordInput {...register("password")} placeholder='Enter your Password' variant={'subtle'} rounded={'full'}/>
        </InputGroup>
      </Field>
        
        
      <AuthSubmitBtn loadingText='Signing in...' loading={loading} disabledStatus={!isDirty || !isValid}>
            Sign in
        </AuthSubmitBtn>
    </Box>
  )
}

export default LoginForm