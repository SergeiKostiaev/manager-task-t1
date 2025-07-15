import { useState } from 'react';
import { Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { TaskList } from '@widgets/task-list/ui/TaskList';
import { TaskForm } from '@features/task-manager/ui/TaskForm';
import { useAppSelector } from '@shared/lib/hooks';
import { selectAllTasks } from '@entities/task/model/taskSlice';

export function TaskListPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const tasks = useAppSelector(selectAllTasks);

    return (
        <div style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <h1>Менеджер задач</h1>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsModalOpen(true)}
                >
                    Новая задача
                </Button>
            </div>

            <TaskList tasks={tasks} />

            <Modal
                title="Создать задачу"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                destroyOnHidden
            >
                <TaskForm onCancel={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
}