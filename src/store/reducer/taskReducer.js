import { createSlice, createAsyncThunk, asyncThunkCreator } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTask = createAsyncThunk(
    'task/fetchTask',
    async () => {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?userId=1`);
        return response.data
    }
)
export const newTask = createAsyncThunk(
    'task/newTask',
    async (data) => {
        const response = await axios.post(`https://jsonplaceholder.typicode.com/todos`, data)
        return response.data
    }
)
export const deleteTask = createAsyncThunk(
    'task/deleteTask',
    async (data) => {
        const response = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${data}`)
        return {response: response.status, id: data}
    }
)
export const updateTask = createAsyncThunk(
    'task/updateTask',
    async (data) => {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${data.id}`, data)
        return response.data
    }
)

const taskReducer = createSlice({
    name: 'task',
    initialState: {
        tasklist: [],
        id: 1,
        userid: 1,
        title: '',
        errmsg: '',
        statut: 'idle',
        loadingmsg: '',
    },
    reducers: {
        updateTitle(state, action) {
            state.title = action.payload,
            state.errmsg =''
        },
        addError(state, action) {
            state.errmsg = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTask.fulfilled, (state, action) => {
            state.tasklist = action.payload,
            state.statut = 'idle'
        }),
        builder.addCase(fetchTask.pending, (state, action) => {
            state.statut = 'loading',
            state.loadingmsg = 'Recherche des tâches'
        }),
        builder.addCase(newTask.fulfilled, (state, action) => {
            state.tasklist.push(action.payload),
            state.title = '',
            state.statut = 'idle'
        }),
        builder.addCase(newTask.pending, (state, action) => {
            state.statut = 'loading',
            state.loadingmsg = 'Ajout en cours'
        }),
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            state.tasklist = state.tasklist.filter((task) => task.id !== action.payload.id)
            state.statut = 'idle'
        }),
        builder.addCase(deleteTask.pending, (state, action) => {
            state.statut = 'loading',
            state.loadingmsg = 'Suppression en cours'
        }),
        builder.addCase(updateTask.fulfilled, (state, action) => {
            state.tasklist = state.tasklist.map((task) => task.id === action.payload.id ? action.payload : task)
            state.statut = 'idle'
        }),
        builder.addCase(updateTask.pending, (state, action) => {
            state.statut = 'loading',
            state.loadingmsg = 'Mise à jour en cours'
        })
    }
})

export const {
    updateTitle,
    addError
} = taskReducer.actions;

export default taskReducer.reducer