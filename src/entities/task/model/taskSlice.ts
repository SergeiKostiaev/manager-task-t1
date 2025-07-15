import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Task } from '@entities/task/model/types';

interface TasksState {
    tasks: Task[];
}

const initialState: TasksState = {
    tasks: [],
};

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.unshift(action.payload);
        },
        updateTask: (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex(t => t.id === action.payload.id);
            if (index !== -1) state.tasks[index] = action.payload;
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter(t => t.id !== action.payload);
        }
    }
});

export const selectAllTasks = (state: { tasks: TasksState }) => state.tasks.tasks;

export const { addTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;