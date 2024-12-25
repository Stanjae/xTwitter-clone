import { Box } from "@chakra-ui/react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import Notifications from "./pages/Notifications";
import { AnimatePresence } from "motion/react";
import UserProfile from "./pages/UserProfile";
import TweetDetail from "./pages/TweetDetail";
import AuthLayout, { loaderParams } from "./layout/AuthLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { toaster, Toaster } from "./components/ui/toaster";
import { useDispatch } from "react-redux";
import { loginSession } from "./features/authSlice";
import ProtectedRoutes from "./layout/ProtectedRoutes";
import TokenExpiryChecker from "./layout/TokenExpiryChecker";
import GetStarted from "./pages/GetStarted";
import AuthorPage from "./pages/AuthorPage";
import SearchPage from "./pages/SearchPage";
import io from 'socket.io-client'
import { useEffect} from "react";
import { sessionUserId } from "./utils/getStorageData";


const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes>
                <TokenExpiryChecker/>
                <DashboardLayout/>
              </ProtectedRoutes>,
    children:[
      {index:true, element:<Index/>},
      {path:'home', element:<Home/>},
      {path:'explore', loader:loaderParams, element:<Explore/>},
      {path:'search', loader:loaderParams, element:<SearchPage/>},
      {path:'notifications', element:<Notifications/>},
      {path:'profile/:id', element:<UserProfile/>},
      {path:'status/:id', element:<TweetDetail/>},
      {path:'grok', element:<div>Hello</div>},
      {path:'premium', element:<div>Premium</div>},
      {path:'more', element:<div>More</div>},
      {path:'messages', element:<div>messages</div>,},
      {path:'profile/h/:id', element:<AuthorPage/>}
    ]
  },
  {path:"/auth", element:<ProtectedRoutes><AuthLayout/></ProtectedRoutes>, children:[
    {path:'login', element:<Login/>},
    {path:'signup', element:<Signup/>},
    {path:'forgot-password', element:<div>Forgot Password</div>}
  ]},
  {path:'/get-started', element:<ProtectedRoutes>
                                    <TokenExpiryChecker/>
                                    <GetStarted/>
                                </ProtectedRoutes>}
]);

//import { ColorModeButton } from "@/components/ui/color-mode"
const sessionYon = ()=>{
  const lop = sessionStorage.getItem("tokenId")
  if(!lop){
    return null;
  }else{
    const pern = JSON.parse(lop)
    return pern
  }
};
const currentUserId = sessionUserId()
const socket = io(`${import.meta.env.VITE_BACKEND_URL}`, { query: { userId: currentUserId } });

function App() {
  const maid:any = sessionYon()
  const dispatch = useDispatch()
  dispatch(loginSession(maid))



  useEffect(()=> {
    //socket.emit('sendNotification', "stanley12345"); // Join room for the user

    socket.on('receiveNotification', (notification) => {
      toaster.create({type:'success',  placement:'top-end', title:`${notification?.name} ${notification?.content}`})
    });

    return () => {
      socket.disconnect()
    };
  }, []);


  return (
    <Box bg="background" color="foreground">
      <AnimatePresence>
        <RouterProvider router={router} />
        <Toaster/>
      </AnimatePresence>
      
    </Box>
  )
}

export default App
