import { combineReducers } from '@reduxjs/toolkit';
import tasksReducer from '@entities/task/model/taskSlice';

const rootReducer = combineReducers({
    tasks: tasksReducer,
});

export default rootReducer;