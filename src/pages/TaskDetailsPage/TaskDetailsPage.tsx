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
        dispatch(updateTask(updatedTask))
        navigate(-1)
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
                task={task}
                onCancel={() => navigate(-1)}
                onUpdate={handleUpdate}
            />
        </Modal>
    )
}
