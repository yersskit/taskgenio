import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    messages: [],
    toastDuration: 15000,
}

export const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        addToast: (state, action) => {
            state.messages.push({
                id: uuidv4(),
                title: action.payload.type,
                body: action.payload.body,
                alert_type: `alert-${action.payload.type}`,
                type: action.payload.type,
                duration: state.toastDuration,
            })
        },
        removeToast: (state, action) => {
            state.messages = state.messages.filter(message => message.id !== action.payload)
        },
        clearToasts: (state, action) => {
            state.messages = []
        }
    },
})

export const { addToast, removeToast, clearToasts } = toastSlice.actions

export default toastSlice.reducer
