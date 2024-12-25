
import axiosInstance from "@/lib/axiosInstance";
import { EmailSignUpType, ProfileType, EmailSignInType } from "@/lib/definitions";


export const signUpAPI =async(formData:EmailSignUpType)=>{
    try{
        const {data, status} = await axiosInstance.post('/api/auth/signup', {formData})

        if(status == 201){
            sessionStorage.setItem("tokenId", JSON.stringify({token:data?.token, user:data?.user}))
            return {code:201, message:data?.message}
        }
    }catch(err:any){
        if(err?.response?.status == 400){
            const pit = err?.response?.data?.statusText || "Account already Exists!"
            return {code:400, message:pit}
        }else{
            return {code:500, message:"Something went wrong"}
        }
       
    }

}


export const signInAPI =async(formData:EmailSignInType)=>{
    try{
        const {data, status} = await axiosInstance.post('/api/auth/login', {formData})

        if(status == 201){
            sessionStorage.setItem("tokenId", JSON.stringify({token:data?.token, user:data?.user}))
            return {code:201, message:data?.message}
        }
    }catch(err:any){
        if(err?.response?.status == 400){
            const pit = err?.response?.data?.statusText || "Invalid Credentials!"
            return {code:400, message:pit}
        }else{
            return {code:500, message:"Something went wrong"}
        }
       
    }

}

export const CompleteProfile =async(formData:ProfileType)=>{
    try{
        const {data, status} = await axiosInstance.post('/api/auth/complete-profile', {formData})
        console.log("data", data, status)
        return {code:201, message:data?.message}
    }catch(err:any){
        if(err?.response?.status == 400){
            return {code:400, message:"Something went wrong"}
        }else{
            return {code:404, message:"AN Error occured"}
        }
    }

}