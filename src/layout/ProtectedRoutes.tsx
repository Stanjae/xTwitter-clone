import { Navigate, useLocation} from 'react-router-dom'


const ProtectedRoutes = ({children}:any) => {
    const user = sessionStorage.getItem('tokenId')
    const location = useLocation()
   
    if(!user){
        if(!location.pathname.includes('auth')) {
           return <Navigate to={'/auth/login'}/>
        }
    }
    
    if(user){
        // if user is authenticated, render the children component
        if(location.pathname.includes('auth')){
            return <Navigate to={'/home'}/>
        }
    }  

    /* React.useEffect(()=>{
        const checkProtectedRoutes =()=>{
             // check if user is authenticated
             // if not, redirect to login page
             // else render the children component
            const user = sessionStorage.getItem('tokenId')
            if(!user){
                if(!location.pathname.includes('auth')) window.location.href = '/auth/login'
            }else{
                // if user is authenticated, render the children component
                if(location.pathname.includes('auth')){
                    navigate(-1)
                }
            }    
            } 
            checkProtectedRoutes();
        }
       
    , [location]) */
  return (
    <div>{children}</div>
  )
}

export default ProtectedRoutes