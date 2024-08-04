import React from 'react'
import {Link} from 'react-router-dom'
import {useDispatch ,useSelector} from 'react-redux'
import { logout } from './redux/slices/LoginSlice'

function Header() {

    const dispatch = useDispatch() ;
    const handleClick = () =>{
        dispatch(logout())
    }
  return (
    <header className='shadow-md h-20 flex justify-around items-center'>
      <h1>Hairport</h1>
      <nav className='flex gap-6 font-semibold '>
        <Link className="no-underline text-sky-500" to="/">Services</Link>
        <Link className="no-underline text-sky-500" to="/contact">Contact</Link>
      </nav>
      <button onClick={handleClick} className="px-8 py-2 rounded-md bg-sky-500">Logout</button>
    </header>
  );
}

export default Header
