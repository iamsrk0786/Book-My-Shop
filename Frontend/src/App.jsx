import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Login from './components/Login';
import DashBoard from './components/Dashboard/DashBoard';
import PrivateRoute from './components/PrivateRoute';
import Homepage from './components/Homepage';
import Services from './components/Dashboard/Services';
import Users from './components/Dashboard/Users'
import Statistics from './components/Dashboard/Statistics';
import Bookings from './components/Dashboard/Bookings';
function App() {
  return (
    <div>
      <Toaster richColors  position="top-center"/>
     
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route element={<PrivateRoute allowedRole={['admin']} />}>
           
            <Route path="/dashboard" element={<DashBoard />}>
               <Route index element={<Statistics/>}/>
               <Route path='services' element={<Services/>}></Route>
               <Route path='users' element={<Users/>}/>
               <Route path='bookings' element={<Bookings/>} />
              </Route>           
          </Route>

          <Route element={<PrivateRoute allowedRole={['user']} />}>
           <Route path="/" element={<Homepage />} /> 
          </Route>
          </Routes>
     
    </div>
  );
}

export default App;
