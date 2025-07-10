import { type FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Input, Select} from 'antd';
import type { Task } from '../../types/taskTypes';
import styles from './TaskDetails.module.css';


const taskCategories = {
    Bug: 'Bug',
    Feature: 'Feature',
    Documentation: 'Documentation',
    Refactor: 'Refactor',
    Test: 'Test',
};

const taskStatuses = {
    'To Do': 'To Do',
    'In Progress': 'In Progress',
    'Done': 'Done',
};

const taskPriorities = {
    Low: 'Low',
    Medium: 'Medium',
    High: 'High',
};

const TaskDetails: FC<{
    tasks: Task[];
    onUpdate: (updatedTask: Task) => void
}> = ({ tasks, onUpdate }) => {
    const [form] = Form.useForm();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const task = tasks.find(t => t.id === Number(id));

    if (!task) {
        return (
            <div className={styles.container}>
                <p>Задача не найдена</p>
                <Button
                    type="primary"
                    onClick={() => navigate('/')}
                >
                    Вернуться к списку задач
                </Button>
            </div>
        );
    }

    const handleSubmit = (values: Task) => {
        onUpdate({ ...task, ...values });
        navigate('/');
    };

    return (
        <div className={styles.container}>
            <h1>Редактирование задачи</h1>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={task}
            >
                <Form.Item
                    name="title"
                    label="Заголовок"
                    rules={[{ required: true, message: 'Пожалуйста, введите заголовок' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Описание"
                >
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    name="category"
                    label="Категория"
                    rules={[{ required: true, message: 'Пожалуйста, выберите категорию' }]}
                >
                    <Select>
                        {Object.values(taskCategories).map(category => (
                            <Select.Option key={category} value={category}>{category}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="status"
                    label="Статус"
                    rules={[{ required: true, message: 'Пожалуйста, выберите статус' }]}
                >
                    <Select>
                        {Object.values(taskStatuses).map(status => (
                            <Select.Option key={status} value={status}>{status}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="priority"
                    label="Приоритет"
                    rules={[{ required: true, message: 'Пожалуйста, выберите приоритет' }]}
                >
                    <Select>
                        {Object.values(taskPriorities).map(priority => (
                            <Select.Option key={priority} value={priority}>{priority}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ marginRight: 8 }}
                    >
                        Сохранить
                    </Button>
                    <Button onClick={() => navigate('/')}>
                        Отмена
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default TaskDetails;