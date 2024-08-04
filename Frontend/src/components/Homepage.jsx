import React, {useEffect} from 'react'
import Header from '../components/Header'
import {fetchService} from './redux/slices/servicesSlice'
import {useDispatch , useSelector} from 'react-redux'
function Homepage() {
  const {services , count} = useSelector((state)=>state.service)

  console.log(services , count)
 const dispatch = useDispatch()

useEffect(()=>{
  dispatch(fetchService())
},[])

  return (
    <div>
   <Header/>

    </div>
  )
}

export default Homepage
