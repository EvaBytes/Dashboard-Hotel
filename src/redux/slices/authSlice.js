import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const authenticateUser = createAsyncThunk(
  'auth/authenticateUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await fakeAuthApi(credentials);
      if (response.token) {
        localStorage.setItem('authToken', response.token);
        return response.user;
      }
    } catch (error) {
      return rejectWithValue('Invalid credentials');
    }
  }
);

const fakeAuthApi = async (credentials) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        credentials.email === 'user@test.com' &&
        credentials.password === '123456'
      ) {
        resolve({
          token: 'fakeToken',
          user: { name: 'Eva Sevillano', email: 'user@test.com' },
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1500);
  });
};

const initialState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {  
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem('authToken', 'fakeToken');
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('authToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { login, logout } = authSlice.actions; 
export default authSlice.reducer;
