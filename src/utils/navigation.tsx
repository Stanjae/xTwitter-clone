import { BiBell, BiHome, BiMailSend, BiSearch, BiUser} from 'react-icons/bi'
import { BsSlashSquare } from 'react-icons/bs'
import { CgMoreO } from 'react-icons/cg'
import { FaXTwitter } from 'react-icons/fa6'
import { sessionUserId } from './getStorageData'

const id = sessionUserId()

export const navigationPaths = [
    {icon:<BiHome/>, path:'/home', title:'Home'},
    {icon:<BiSearch/>, path:'/explore', title:'Explore'},
    {icon:<BiBell/>, path:'/notifications', title:'Notifications'},
    {icon:<BiMailSend/>, path:'/messages', title:'Messages'},
    {icon:<BsSlashSquare />, path:'/grok', title:'Grok'},
    {icon:<FaXTwitter/>, path:'/premium', title:'Premium'},
    {icon:<BiUser/>, path:`/profile/${id}`, title:'Profile'},
    {icon:<CgMoreO/>, path:'/more', title:'More'}
]


export const genderList = [
    {label:"Male", value:"male"},
    {label:"Female", value:"female"},
    {label:"Prefer not to say", value:"prefer_not_to_say"}
]