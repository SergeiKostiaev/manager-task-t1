import { Modal } from 'antd'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { TaskForm } from '@features/task-manager/ui/TaskForm'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch'
import { updateTask } from '@entities/task/model/taskSlice'
import type { Task } from '@entities/task/model/types'

export function TaskDetailsPage() {
    const { task } = useLoaderData() as { task: Task }
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleUpdate = (updatedTask: Task) => {
        const taskWithDate = {
            ...updatedTask,
            updatedAt: new Date().toISOString()
        }
        dispatch(updateTask(taskWithDate))
        navigate(-1)
    }

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString)
            return isNaN(date.getTime())
                ? 'Дата не указана'
                : date.toLocaleDateString('ru-RU', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })
        } catch {
            return 'Некорректная дата'
        }
    }

    const taskWithFormattedDate = {
        ...task,
        createdAt: formatDate(task.createdAt),
        updatedAt: task.updatedAt ? formatDate(task.updatedAt) : 'Не обновлялась'
    }

    return (
        <Modal
            open={true}
            title="Редактирование задачи"
            onCancel={() => navigate(-1)}
            footer={null}
            destroyOnHidden
        >
            <TaskForm
                task={taskWithFormattedDate}
                onCancel={() => navigate(-1)}
                onUpdate={handleUpdate}
            />
        </Modal>
    )
}