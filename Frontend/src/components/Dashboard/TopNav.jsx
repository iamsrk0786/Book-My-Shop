import { useDispatch} from "react-redux";
import { RiLogoutCircleLine } from "react-icons/ri";
import { logout } from "../redux/slices/LoginSlice";
import { useNavigate } from "react-router-dom";
import { io } from 'socket.io-client';
import {useEffect } from 'react'
import { toast } from "sonner";
import { GoBell } from "react-icons/go";
const socket = io('http://localhost:8000');



const TopNav = () => {

 
    useEffect(()=>{
        //on method is used to listen the event emmited in the backend
        socket.on('newbooking', (booking)=>{
         
            toast.info(`New booking done by ${booking.name} at ${booking.time}`)
            console.log(booking)
        })


        return ()=>{
            socket.off(()=>{
                console.log('hello')
            })
        }
    },[])
    // const {nam)e} = useSelector((state)=> state.login) ;
const dispatch = useDispatch();
const navigate = useNavigate()
    const name = localStorage.getItem('name');
    const handleClick = ()=> {
        dispatch(logout())
        navigate('/login')

    }
  
    return (
          <div className='flex items-center justify-between px-6 h-16 bg-white border-b border-gray-200'>
      <h1 className='text-xl font-semibold'>Welcome {name}</h1>
      <div className="flex items-center gap-4">
        <GoBell size={24} className="hover:text-blue-500 cursor-pointer" />
      <RiLogoutCircleLine onClick={handleClick}  size={24} className="hover:text-red-500 cursor-pointer" />
      </div>
    </div>
    )
}


export default TopNav ;