import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ID } from 'appwrite';
import { account, storage } from '../utils/appwriteConfig';
import { GENERAL_UNAUTHORIZED_SCOPE } from '../utils/errorCodes';
import { NO_ERROR } from '../utils/errorCodes';
import { avatars_storage_id } from '../utils/collections';

const initialState = {
  session: null,
  userCreated: null,
  isLoading: false,
  error: null,
  avatar: null
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

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  try {
    let response = await account.deleteSession('current');
    return response;
  } catch (error) {
    throw new Error(error.type);
  }
});

export const uploadAvatar = createAsyncThunk('user/uploadAvatar', async (data, { getState }) => {
  const { user } = getState();
  try {
    let response = await storage.createFile(avatars_storage_id, data.userId, data.file);
    await account.updatePrefs({ ...user.session.prefs, avatar: response.$id });

    return response.$id;
  } catch (error) {
    throw new Error(error.type);
  }
});

export const getAvatar = createAsyncThunk('user/getAvatar', async (fileId) => {
  try {
    let response = await storage.getFileView(avatars_storage_id, fileId);

    return response.href;
  } catch (error) {
    throw new Error(error.type);
  }
});

export const updateAvatar = createAsyncThunk('user/updateAvatar', async (data) => {
  try {
    await storage.deleteFile(avatars_storage_id, data.fileId);
    let created = await storage.createFile(avatars_storage_id, data.userId, data.file);

    return created.$id;
  } catch (error) {
    throw new Error(error.type);
  }
});

export const updatePreferences = createAsyncThunk('user/updatePreferences', async (preferences) => {
  try {
    let response = await account.updatePrefs(preferences);

    return response.prefs;
  } catch (error) {
    throw new Error(error.type);
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  },
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
    builder.addCase(uploadAvatar.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(uploadAvatar.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.session.prefs.avatar = action.payload;
    });
    builder.addCase(uploadAvatar.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getAvatar.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAvatar.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.session.avatarUrl = action.payload;
    });
    builder.addCase(getAvatar.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateAvatar.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateAvatar.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.session.avatar = action.payload;
      state.session.avatarUrl = null;
    });
    builder.addCase(updateAvatar.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(updatePreferences.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updatePreferences.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.session.prefs = action.payload;
    });
    builder.addCase(updatePreferences.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  }
});

export const { setLoading } = userSlice.actions;

export default userSlice.reducer;
