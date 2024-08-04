import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./slices/LoginSlice" ;
import ServiceReducer from "./slices/servicesSlice";
import UsersReducer from './slices/userSlice'
import BookingReducer from "./slices/bookingsSlice";


const store = configureStore({
    reducer : {
        login : LoginReducer,
        service : ServiceReducer,
        users : UsersReducer,
        Booking: BookingReducer,
    }
})


export default store ;