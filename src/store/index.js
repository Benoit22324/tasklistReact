import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './reducer/taskReducer';

const store = configureStore({
    reducer: {
        task: taskReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
        // Nos MiddleWares
    ])
})

export default store