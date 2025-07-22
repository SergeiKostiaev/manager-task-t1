import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TaskApi } from '@shared/lib/api/taskApi/taskApi';
import type { Task } from '@entities/task/model/types';

interface TasksState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
}

const initialState: TasksState = {
    tasks: [],
    loading: false,
    error: null
};

export const fetchTasks = createAsyncThunk(
    'tasks/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            return await TaskApi.getAllTasks();
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const createTask = createAsyncThunk(
    'tasks/create',
    async (taskData: Omit<Task, 'id'>, { rejectWithValue }) => {
        try {
            return await TaskApi.createTask(taskData);
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const updateTask = createAsyncThunk(
    'tasks/update',
    async ({ id, ...taskData }: Partial<Task> & { id: number }, { rejectWithValue }) => {
        try {
            const currentTask = await TaskApi.getTaskById(id);
            const dataToUpdate = {
                ...taskData,
                createdAt: currentTask.createdAt
            };

            return await TaskApi.updateTask(id, dataToUpdate);
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const deleteTask = createAsyncThunk(
    'tasks/delete',
    async (id: number, { rejectWithValue }) => {
        try {
            await TaskApi.deleteTask(id);
            return id;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.unshift(action.payload);
            })
            .addCase(createTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.tasks.findIndex(t => t.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(t => t.id !== action.payload);
            });
    }
});

export const selectAllTasks = (state: { tasks: TasksState }) => state.tasks.tasks;
export const selectTasksLoading = (state: { tasks: TasksState }) => state.tasks.loading;
export const selectTasksError = (state: { tasks: TasksState }) => state.tasks.error;

export default tasksSlice.reducer;