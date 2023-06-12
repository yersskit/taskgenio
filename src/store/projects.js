import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ID, Query } from 'appwrite';
import { database, databaseId } from '../utils/appwriteConfig';
import { projects_collection_id } from '../utils/collections';
import { decrementLoadingCounter, incrementLoadingCounter } from './loader';
import { addToast } from './toast';
import {
  ACTIVE_STATUS,
  CREATE_PROJECT,
  LOAD_PROJECTS,
  TYPE_ERROR,
  TYPE_SUCCESS
} from '../utils/consts';

const initialState = {
  projects: [],
  isLoading: false,
  error: null
};

export const createProject = createAsyncThunk(
  'projects/createProject',
  async (payload, { dispatch }) => {
    try {
      let response = await database.createDocument(
        databaseId,
        projects_collection_id,
        ID.unique(),
        { ...payload }
      );

      dispatch(addToast({ type: TYPE_SUCCESS, body: CREATE_PROJECT }));
      return response;
    } catch (error) {
      dispatch(addToast({ type: TYPE_ERROR, body: CREATE_PROJECT }));
      throw new Error(error.code);
    }
  }
);

export const getProjects = createAsyncThunk(
  'projects/getProjects',
  async (payload, { dispatch }) => {
    try {
      dispatch(incrementLoadingCounter());
      let response = await database.listDocuments(databaseId, projects_collection_id, [
        Query.equal('status', ACTIVE_STATUS)
      ]);
      dispatch(decrementLoadingCounter());
      return response;
    } catch (error) {
      dispatch(decrementLoadingCounter());
      dispatch(addToast({ type: TYPE_ERROR, body: LOAD_PROJECTS }));
      throw new Error(error.code);
    }
  }
);

export const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createProject.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createProject.fulfilled, (state, action) => {
      state.projects.push(action.payload);
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(createProject.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getProjects.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getProjects.fulfilled, (state, action) => {
      state.projects = action.payload.documents;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(getProjects.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  }
});

export default projectSlice.reducer;
