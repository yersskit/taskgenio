import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ID } from 'appwrite';
import { database, databaseId } from '../utils/appwriteConfig';
import { tasks_collection_id } from '../utils/collections';

const initialState = {
  tasks: []
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

export const userSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: () => {}
});

export default userSlice.reducer;
