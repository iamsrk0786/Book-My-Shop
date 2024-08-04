import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'sonner';
const initialState = {
  services: [],
  count: 0,

  error: null,
  loading: false,
};

export const fetchService = createAsyncThunk(
  '/fetchService',
  async (_, { rejectWithValue }) => {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_API_URL}/get_allservices`
      );

     
      return data.data.services;
    } catch (error) {
      rejectWithValue(error.data.message);
    }
  }
);

export const createService = createAsyncThunk(
  '/createService' , async(formData , {rejectWithValue}) => {
    console.log(formData)
    try{
const res = await axios.post(`${import.meta.env.VITE_API_URL}/create_services` , formData , {
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

export const deleteService = createAsyncThunk(
  '/deleteService' , async(id , {rejectWithValue}) => {
    try{
 const res = await axios.delete(`${import.meta.env.VITE_API_URL}/delete_service/${id}` , {
  headers : {
    Authorization : `Bearer ${localStorage.getItem('token')}`
  }})
    }catch(error){
 rejectWithValue(error)
    }
  }
)

export const updateService = createAsyncThunk('/updateService', async({id,data} , {rejectWithValue})=>{
  console.log(id,data)

  try{
    const res = await axios.put(`${import.meta.env.VITE_API_URL}/update_service/${id}` ,data , {
  headers : {
    Authorization : `Bearer ${localStorage.getItem('token')}`
  }}) 

  }catch(error){
rejectWithValue(error)
  }
})

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchService.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchService.fulfilled, (state, action) => {
    
console.log(action.payload)
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchService.rejected, (state, action) => {
        state.error = action.payload;
      }).addCase(createService.pending, (state)=>{
        state.loading = true;
      }).addCase(createService.fulfilled , (state)=>{
        state.loading = false;
        toast.success('New Services Succesfully Created')

      }).addCase(createService.rejected, (state , action)=>{
       state.loading = false ;
       state.error = action.payload ;
       toast.error(
        "failed to create new service"
       )
      }).addCase(updateService.pending, (state)=>{
        state.loading = true
      }).addCase(updateService.fulfilled , (state)=>{
        state.loading = false ;
        toast.success('Service Updated Successfull')
      }).addCase(updateService.rejected , (state,action)=>{
        toast.error(action.payload)
      })
  },
});

export default serviceSlice.reducer;
