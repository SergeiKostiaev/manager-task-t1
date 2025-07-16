import { createBrowserRouter } from 'react-router-dom'
import { TaskListPage } from '@pages/task-list/ui/TaskListPage'
import { store } from './store'
import {TaskDetailsPage} from "@pages/TaskDetailsPage/TaskDetailsPage.tsx";

export const router = createBrowserRouter([
    { path: '/', element: <TaskListPage />},
    { path: '/task/:id', element: <TaskDetailsPage />,
        loader: async ({ params }) => {
            const task = store.getState().tasks.tasks.find(t => t.id === Number(params.id))
            return { task }
        }
    }
])