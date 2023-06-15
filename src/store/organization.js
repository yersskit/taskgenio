import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ID, Query } from 'appwrite';
import { database, databaseId } from '../utils/appwriteConfig';
import { organizations_collection_id } from '../utils/collections';

const initialState = {
  organizations: [],
  currentOrganization: '',
  isLoading: false,
  error: null
};

export const createOrganization = createAsyncThunk('tasks/createTask', async (payload) => {
  try {
    let response = await database.createDocument(
      databaseId,
      organizations_collection_id,
      ID.unique(),
      {
        ...payload
      }
    );
    return response;
  } catch (error) {
    throw new Error(error.code);
  }
});

export const getOrganizations = createAsyncThunk('tasks/getTasks', async (userId) => {
  try {
    let response = await database.listDocuments(databaseId, organizations_collection_id, [
      Query.equal('owner', userId)
    ]);
    return response;
  } catch (error) {
    throw new Error(error.code);
  }
});

export const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {
    setCurrentOrganization: (state, action) => {
      state.currentOrganization = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createOrganization.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createOrganization.fulfilled, (state, action) => {
      state.isLoading = false;
      state.organizations.push(action.payload);
    });
    builder.addCase(createOrganization.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getOrganizations.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getOrganizations.fulfilled, (state, action) => {
      state.isLoading = false;
      state.organizations = action.payload.documents;
    });
    builder.addCase(getOrganizations.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  }
});

export const { setCurrentOrganization } = organizationSlice.actions;
export default organizationSlice.reducer;
