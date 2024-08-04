import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'sonner';
const initialState = {
  loading: false,
  token: null,
  role: null,
  error: null,
  name : null ,
  
};

export const login = createAsyncThunk(
  '/login',
  async (formData, { rejectWithValue }) => {
    try {
      const data = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        ...formData,
      });
      return data;
    } catch (error) {
     return rejectWithValue(error);
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: (state) => {
      (state.loading = 'true'),
        (state.token = null),
        (state.role = null),
        localStorage.removeItem('token');
      localStorage.removeItem('role');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload)
        const data = action.payload;
        const token = data.data.token;
        console.log(token);
        state.loading = false;
        state.token = token;
        const decoded = jwtDecode(token);
        console.log(decoded);
        // decode = {
        //   role : ''
        //   id : ''
        // }
        const { role  , name} = decoded;
        state.name = name ;
        localStorage.setItem('name', name)
        console.log(role);
        state.role = role;
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        toast.success('Login Successfull');
  
      }).addCase(login.rejected , (state,action)=>{
        console.log(action.payload.response.data.error)
       toast.error(action.payload.response.data.error)
        state.loading = false
      })
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
