import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { TaskApi } from '@shared/lib/api/taskApi/taskApi';
import type { Task } from '@entities/task/model/types';

interface FiltersState {
    searchText: string;
    date: string | null;
    category: string | null;
    status: string | null;
    priority: string | null;
}

interface TasksState {
    tasks: Task[];
    filteredTasks: Task[];
    loading: boolean;
    error: string | null;
    filters: FiltersState;
}

const initialState: TasksState = {
    tasks: [],
    filteredTasks: [],
    loading: false,
    error: null,
    filters: {
        searchText: '',
        date: null,
        category: null,
        status: null,
        priority: null
    }
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

const applyAllFilters = (tasks: Task[], filters: FiltersState): Task[] => {
    let result = [...tasks];

    // Поиск по названию
    if (filters.searchText) {
        const searchText = filters.searchText.toLowerCase();
        result = result.filter(task =>
            task.title.toLowerCase().includes(searchText)
        );
    }

    // Фильтр по дате
    if (filters.date) {
        const filterDate = new Date(filters.date).toISOString().split('T')[0];
        result = result.filter(task =>
            new Date(task.createdAt).toISOString().split('T')[0] === filterDate
        );
    }

    // Фильтр по категории
    if (filters.category) {
        result = result.filter(task => task.category === filters.category);
    }

    // Фильтр по статусу
    if (filters.status) {
        result = result.filter(task => task.status === filters.status);
    }

    // Фильтр по приоритету
    if (filters.priority) {
        result = result.filter(task => task.priority === filters.priority);
    }

    return result;
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        applyFilters: (state, action: PayloadAction<Partial<FiltersState>>) => {
            const newFilters = {
                ...state.filters,
                ...action.payload
            };
            state.filters = newFilters;
            state.filteredTasks = applyAllFilters(state.tasks, newFilters);
        },
        resetFilters: (state) => {
            state.filters = initialState.filters;
            state.filteredTasks = [...state.tasks];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
                state.filteredTasks = applyAllFilters(action.payload, state.filters);
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
                state.filteredTasks = applyAllFilters(state.tasks, state.filters);
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
                state.tasks = state.tasks.map(task =>
                    task.id === action.payload.id ? action.payload : task
                );
                state.filteredTasks = applyAllFilters(state.tasks, state.filters);
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(t => t.id !== action.payload);
                state.filteredTasks = applyAllFilters(state.tasks, state.filters);
            });
    }
});

export const { applyFilters, resetFilters } = tasksSlice.actions;

export const selectAllTasks = (state: { tasks: TasksState }) => state.tasks.tasks;
export const selectFilteredTasks = (state: { tasks: TasksState }) =>
    state.tasks.filteredTasks;
export const selectTasksLoading = (state: { tasks: TasksState }) => state.tasks.loading;
export const selectTasksError = (state: { tasks: TasksState }) => state.tasks.error;
export const selectCurrentFilters = (state: { tasks: TasksState }) => state.tasks.filters;

export default tasksSlice.reducer;