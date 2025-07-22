import { createBrowserRouter } from 'react-router-dom';
import { TaskListPage } from '@pages/task-list/ui/TaskListPage';
import { TaskDetailsPage } from '@pages/TaskDetailsPage/TaskDetailsPage';
import { TaskApi } from '@shared/lib/api/taskApi/taskApi';
import type { LoaderFunction } from 'react-router-dom';

export const taskDetailsLoader: LoaderFunction = async ({ params }) => {
    try {
        const taskId = params.id;
        if (!taskId) {
            throw new Error('Task ID is required');
        }
        const task = await TaskApi.getTaskById(Number(taskId));
        return { task };
    } catch (error) {
        throw new Error('Failed to load task');
    }
};

export const router = createBrowserRouter([
    {
        path: '/',
        element: <TaskListPage />
    },
    {
        path: '/task/:id',
        element: <TaskDetailsPage />,
        loader: taskDetailsLoader
    }
]);