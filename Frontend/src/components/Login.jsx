import React, { useEffect } from 'react';
import { useState } from 'react';
import {useDispatch , useSelector} from 'react-redux'
import { login } from './redux/slices/LoginSlice';
import { useNavigate } from 'react-router-dom';
import { CSpinner } from '@coreui/react';


const Login = () => {

  const {role , token ,loading} = useSelector((state)=> state.login)


  console.log(role,token)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(loading)

  useEffect(() => {
   
    if (role === 'admin') {
      navigate('/dashboard');
    } else if(role === 'user'){
      navigate('/')
    }
  }, [role]);


  const [formData, setFormData] = useState({
    email: ' ',
    password: '',
  });

  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div className="h-screen  flex justify-center p-6 shadow-lg flex-col items-center">
      <h1>Login</h1>
      <form className="flex gap-2 flex-col" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          onChange={handleChange}
          type="email"
          name="email"
          className="border border-sky-500 w-64 h-10 focus:ring-1 ring-blue-500 p-2 rounded-md"
          value={formData.email}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          onChange={handleChange}
          name="password"
          className="border border-sky-500 w-64 h-10 focus:ring-1 ring-blue-500 p-2 rounded-md"
          value={formData.password}
        />
        <button className="px-8 py-2 rounded-md bg-sky-500" type="submit">
          {loading ? <CSpinner color="primary" /> : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
