import { Modal, message } from 'antd';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { TaskForm } from '@features/task-manager/ui/TaskForm';
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch';
import { updateTask } from '@entities/task/model/taskSlice';
import type { Task } from '@entities/task/model/types';

interface LoaderData {
    task: Task;
}

export function TaskDetailsPage() {
    const { task } = useLoaderData() as LoaderData;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const handleUpdate = async (updatedTask: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
        try {
            const resultAction = await dispatch(updateTask({
                ...updatedTask,
                id: task.id,
                createdAt: task.createdAt, // Сохраняем оригинальную дату создания
                updatedAt: new Date().toISOString()
            }));

            if (updateTask.fulfilled.match(resultAction)) {
                messageApi.success('Задача успешно обновлена');
                navigate(-1);
            }
        } catch (error) {
            messageApi.error('Ошибка при обновлении задачи');
            console.error('Failed to update task:', error);
        }
    };

    return (
        <>
            {contextHolder}
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
        </>
    );
}