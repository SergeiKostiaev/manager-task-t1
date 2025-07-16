import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Task } from '@entities/task/model/types';

interface TasksState {
    tasks: Task[];
}

const loadTasksFromStorage = (): Task[] => {
    try {
        const saved = localStorage.getItem('tasks');
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
};

const saveTasksToStorage = (tasks: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const initialState: TasksState = {
    tasks: loadTasksFromStorage().length > 0
        ? loadTasksFromStorage()
        : [
        {
            id: 1,
            title: 'Исправить ошибку авторизации',
            description: 'При нажатии на авторизоваться, не пускает в систему',
            category: 'Bug',
            status: 'To Do',
            priority: 'High',
            createdAt: '2025-02-20T09:00:00Z',
            updatedAt: '2025-02-20T09:00:00Z'
        },
        {
            id: 2,
            title: 'Внести правки по макету Figma',
            description: 'Доступ к макету попросить у дизайнера',
            category: 'Refactor',
            status: 'To Do',
            priority: 'Low',
            createdAt: '2025-02-19T14:30:00Z',
            updatedAt: '2025-02-19T14:30:00Z'
        },
        {
            id: 3,
            title: 'Реализовать пагинацию на странице задач',
            description: 'Добавить пагинацию по 10 задач на страницу',
            category: 'Feature',
            status: 'In Progress',
            priority: 'Medium',
            createdAt: '2025-02-18T11:15:00Z',
            updatedAt: '2025-02-19T16:45:00Z'
        },
        {
            id: 4,
            title: 'Написать тесты для модуля авторизации',
            description: 'Покрыть тестами основные сценарии входа',
            category: 'Test',
            status: 'Done',
            priority: 'Medium',
            createdAt: '2025-02-15T10:00:00Z',
            updatedAt: '2025-02-16T18:30:00Z'
        }
    ],
};

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.unshift(action.payload);
            saveTasksToStorage(state.tasks);
        },
        updateTask: (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex(t => t.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
                saveTasksToStorage(state.tasks);
            }
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter(t => t.id !== action.payload);
            saveTasksToStorage(state.tasks);
        },
        loadTasks: (state) => {
            const savedTasks = loadTasksFromStorage();
            if (savedTasks.length > 0) {
                state.tasks = savedTasks;
            }
        }
    }
});


export const selectAllTasks = (state: { tasks: TasksState }) => state.tasks.tasks;

export const { addTask, updateTask, deleteTask, loadTasks } = tasksSlice.actions;
export default tasksSlice.reducer;