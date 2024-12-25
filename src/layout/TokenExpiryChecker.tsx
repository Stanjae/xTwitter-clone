import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import {jwtDecode} from 'jwt-decode'
import { useDispatch } from "react-redux"
import { logoutSession } from "@/features/authSlice"

const TokenExpiryChecker = () => {
    const location = useLocation()
    const dispatch = useDispatch()

    useEffect(()=>{
        const checkTokenStatus =()=>{
            const token = sessionStorage.getItem('tokenId')
            if(token){
                const storedToken = JSON.parse(token)
                const decodedToken: any = jwtDecode(storedToken?.token)
                const currentTime = Date.now() / 1000

                if(decodedToken?.exp < currentTime){
                    sessionStorage.removeItem('tokenId')
                    dispatch(logoutSession())
                    window.location.href = '/auth/login'
                }
            }
        }
        checkTokenStatus()
    },[location])

  return null
}

export default TokenExpiryChecker