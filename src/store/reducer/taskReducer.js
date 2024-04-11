import { createSlice } from '@reduxjs/toolkit';

const taskReducer = createSlice({
    name: 'task',
    initialState: {
        tasklist: [],
        id: 1,
        userid: 1,
        title: '',
        errmsg: '',
    },
    reducers: {
        addTask(state, action) {
            state.tasklist = [...state.tasklist, {id: state.id, userid: state.userid, title: state.title.trim(), completed: false}],
            state.id++,
            state.title = '',
            state.errmsg = ''
        },
        updateTitle(state, action) {
            state.title = action.payload,
            state.errmsg =''
        },
        checkCompletion(state, action) {
            state.tasklist = state.tasklist.map((task) => task.id === action.payload ? {...task, completed: true} : task)
        },
        uncheckCompletion(state, action) {
            state.tasklist = state.tasklist.map((task) => task.id === action.payload ? {...task, completed: false} : task)
        },
        delTask(state, action) {
            state.tasklist = state.tasklist.filter((task) => task.id !== action.payload)
        },
        addError(state, action) {
            state.errmsg = action.payload
        }
    }
})

export const {
    addTask,
    updateTitle,
    checkCompletion,
    uncheckCompletion,
    delTask,
    addError
} = taskReducer.actions;

export default taskReducer.reducer