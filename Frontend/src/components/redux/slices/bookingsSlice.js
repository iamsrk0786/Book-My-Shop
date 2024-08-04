import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'sonner';
const initialState = {
  booking: [],
  error: null,
  loading: false,
};
export const fetchBookings = createAsyncThunk(
    '/fetchBookings',
    async (_, { rejectWithValue }) => {
      try {
        const data = await axios.get (
          `${import.meta.env.VITE_API_URL}/bookings` , {
            headers : {
              Authorization : `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
   
        return data.data.booking;
      } catch (error) {
        rejectWithValue(error.data.message);
      }
    }
  );
  export const createBookings = createAsyncThunk(
    '/createBookings' , async(formData , {rejectWithValue}) => {
      console.log(formData)
      try{
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/create_booking` , formData , {
    headers : {
      Authorization : `Bearer ${localStorage.getItem('token')}`
    }
  }) ;
  console.log(res)
      }catch(error){
  rejectWithValue(error)
      }
    }
  )
  const bookingsSlice = createSlice({
    name: 'booking',
    initialState,
    extraReducers: (builder) => {
      builder
        .addCase(fetchBookings.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchBookings.fulfilled, (state, action) => {
      
  console.log(action.payload)
          state.loading = false;
          state.booking = action.payload;
        })
        .addCase(fetchBookings.rejected, (state, action) => {
          state.error = action.payload;
        }).addCase(createBookings.pending, (state)=>{
            state.loading = true;
          }).addCase(createBookings.fulfilled , (state)=>{
            state.loading = false;
            toast.success('booking Succesfully Created')
    
          }).addCase(createBookings.rejected, (state , action)=>{
           state.loading = false ;
           state.error = action.payload ;
           toast.error(
            "failed to create new booking"
           )
          })
    },
  });
  
  export default bookingsSlice.reducer;
  