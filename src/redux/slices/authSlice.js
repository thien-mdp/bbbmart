import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';
import UserApi from '../../api/userApi'
const initialState = {
  access_token: '',
  status: 'idle',
}
export const fetchAccessToken = createAsyncThunk(
  'auth/fetchAccessToken',
  async () => {
    const response = await UserApi.getAuth();
    // Giả sử response trả về đúng định dạng mong muốn
    // console.log("Response", response)
    Cookies.set('token', response.access_token, { expires: 7 })
    return response.access_token;
  }
);
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccessToken.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAccessToken.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.access_token = action.payload;
      })
      .addCase(fetchAccessToken.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default authSlice.reducer;