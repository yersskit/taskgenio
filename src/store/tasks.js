import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ID } from 'appwrite'
import { database, databaseId } from '../utils/appwriteConfig'
import { tasks_collection_id } from '../utils/collections'

const initialState = {
    tasks: [],
}

export const createTask = createAsyncThunk(
    'tasks/createTask',
    async (payload, { dispatch, getState }) => {
        try {
            let response = await database.createDocument(
                databaseId,
                tasks_collection_id,
                ID.unique(),
                { ...payload },
            )
            return response
        }
        catch (error) {
            throw new Error(error.code)
        }
    }
)

export const userSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createTask.pending, (state, action) => {
        })
        builder.addCase(createTask.fulfilled, (state, action) => {

            state.tasks.push(action.payload)
        })
        builder.addCase(createTask.rejected, (state, action) => {

        })
    }
})

export default userSlice.reducer
