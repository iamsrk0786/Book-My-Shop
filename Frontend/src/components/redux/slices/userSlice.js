import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  users: [],
  loading: false,
  error: null ,

};


const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/allusers`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.users;
  } catch (error) {
   
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

export const DeactivateUser = createAsyncThunk('/users/deactivateUser', async(id, {rejectWithValue})=>{
  try{
  const token = localStorage.getItem('token');
  console.log(token)
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/deactivate_user/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }catch{
rejectWithValue(error)
  }
})

export const activateUser = createAsyncThunk('/users/activateUser', async(id, {rejectWithValue})=>{
  try{
  const token = localStorage.getItem('token');
  console.log(token)
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/activate_user/${id}`, {
    headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }catch{
rejectWithValue(error)
  }
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;

      }).addCase(DeactivateUser.pending, (state, action) => {
        console.log(action.meta)
        state.loading = true;
      
        
        state.error = null;
      }).addCase(DeactivateUser.fulfilled, (state, action) => {
        state.loading = false;
         
        // state.users = action.payload;
      }).addCase(DeactivateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
  
      }).addCase(activateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(activateUser.fulfilled, (state, action) => {
        state.loading = false;
        // state.users = action.payload;
      })
      .addCase(activateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default usersSlice.reducer;
export { fetchUsers };
