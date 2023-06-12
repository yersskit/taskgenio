import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ID } from 'appwrite';
import { account } from '../utils/appwriteConfig';
import { GENERAL_UNAUTHORIZED_SCOPE } from '../utils/errorCodes';
import { NO_ERROR } from '../utils/errorCodes';

const initialState = {
  session: null,
  userCreated: null,
  isLoading: false,
  error: null
};

export const createUser = createAsyncThunk('user/createUser', async ({ email, password, name }) => {
  try {
    let response = await account.create(ID.unique(), email, password, name);
    return response;
  } catch (error) {
    throw new Error(error.type);
  }
});

export const loginUser = createAsyncThunk('user/loginUser', async ({ email, password }) => {
  try {
    let response = await account.createEmailSession(email, password);
    return response;
  } catch (error) {
    throw new Error(error.type);
  }
});

export const getLoggedInUser = createAsyncThunk('user/getLoggedInUser', async () => {
  try {
    let response = await account.get();
    return response;
  } catch (error) {
    throw new Error(error.type === GENERAL_UNAUTHORIZED_SCOPE ? NO_ERROR : error.type);
  }
});

export const getSession = createAsyncThunk('user/getSession', async () => {
  try {
    let response = await account.getSession('current');
    return response;
  } catch (error) {
    throw new Error(error.type);
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userCreated = action.payload;
      state.error = null;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.session = action.payload;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getLoggedInUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getLoggedInUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.session = action.payload;
      state.error = null;
    });
    builder.addCase(getLoggedInUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.session = null;
    });
  }
});

export default userSlice.reducer;
