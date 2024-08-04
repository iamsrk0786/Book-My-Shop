import React from 'react';
import NavLink from './NavLink';
import { LuUsers } from "react-icons/lu";
import { RiAlignItemLeftLine } from "react-icons/ri";

function SideNav() {
  return (
    <div className="w-64 bg-black text-white flex flex-col">
      <div className="h-16 flex items-center justify-center font-semibold text-xl border-b border-gray-200">

      <h1 className='text-md'>Booking</h1>  
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
          <NavLink to="/dashboard" text="Dashboard" icon={<LuUsers/>}/>
          <NavLink to="/dashboard/services" text="Services" icon={<RiAlignItemLeftLine/>} />
        <NavLink to="/dashboard/users" text="Users" icon={<LuUsers/>}/>
        <NavLink to="/dashboard/bookings" text="Bookings" icon={<LuUsers/>}/>
      
       
      
      </nav>
    </div>
  );
}

export default SideNav;
