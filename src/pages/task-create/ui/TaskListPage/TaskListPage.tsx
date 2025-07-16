import { useState } from 'react';
import { Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { TaskList } from '@widgets/task-list/ui/TaskList';
import { TaskForm } from '@features/task-manager/ui/TaskForm';

import styles from './TaskListPage.module.css'

export default function TaskListPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.container_wrap}>
                <h1>Task Manager</h1>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsModalOpen(true)}
                >
                    Новая задача
                </Button>
            </div>

            <TaskList/>

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