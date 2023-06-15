import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ID } from 'appwrite';
import { database, databaseId } from '../utils/appwriteConfig';
import { tasks_collection_id } from '../utils/collections';

const initialState = {
  tasks: [],
  currentTask: null,
  drawerOpen: false
};

export const createTask = createAsyncThunk('tasks/createTask', async (payload) => {
  try {
    let response = await database.createDocument(databaseId, tasks_collection_id, ID.unique(), {
      ...payload
    });
    return response;
  } catch (error) {
    throw new Error(error.code);
  }
});

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setCurrentTask: (state, action) => {
      state.currentTask = action.payload;
    },
    setDrawerOpen: (state, action) => {
      state.drawerOpen = action.payload;
    }
  },
  extraReducers: () => {}
});

export const { setCurrentTask, setDrawerOpen } = tasksSlice.actions;
export default tasksSlice.reducer;
