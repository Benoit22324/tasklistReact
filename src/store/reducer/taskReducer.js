import { createSlice } from '@reduxjs/toolkit';

const taskReducer = createSlice({
    name: 'task',
    initialState: {
        tasklist: [],
        id: 1,
        userid: 1,
        title: '',
    },
    reducers: {
        addTask(state, action) {
            state.tasklist = [...state.tasklist, {id: state.id, userid: state.userid, title: state.title, completed: false}],
            state.id++,
            state.title = ''
        },
        updateTitle(state, action) {
            state.title = action.payload
        },
        checkCompletion(state, action) {
            state.tasklist = state.tasklist.map((task) => task.id === action.payload ? {...task, completed: true} : task)
        },
        uncheckCompletion(state, action) {
            state.tasklist = state.tasklist.map((task) => task.id === action.payload ? {...task, completed: false} : task)
        },
        delTask(state, action) {
            state.tasklist = state.tasklist.filter((task) => task.id !== action.payload)
        }
    }
})

export const {
    addTask,
    updateTitle,
    checkCompletion,
    uncheckCompletion,
    delTask
} = taskReducer.actions;

export default taskReducer.reducer