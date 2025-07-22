import { Button, Form, Input, Select, message } from 'antd';
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch';
import { createTask, updateTask } from '@entities/task/model/taskSlice';
import type { Task } from '@entities/task/model/types';
import { useEffect } from 'react';

const taskCategories = [
    { value: 'Bug', label: 'Bug' },
    { value: 'Feature', label: 'Feature' },
    { value: 'Documentation', label: 'Documentation' },
    { value: 'Refactor', label: 'Refactor' },
    { value: 'Test', label: 'Test' }
];

const taskStatuses = [
    { value: 'To Do', label: 'To Do' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Done', label: 'Done' }
];

const taskPriorities = [
    { value: 'Low', label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' }
];

interface FormValues {
    title: string;
    description?: string;
    category: 'Bug' | 'Feature' | 'Documentation' | 'Refactor' | 'Test';
    status: 'To Do' | 'In Progress' | 'Done';
    priority: 'Low' | 'Medium' | 'High';
    createdAt?: string;
}

interface TaskFormProps {
    task?: Task;
    onCancel: () => void;
    onUpdate?: (updatedTask: Task) => void;
}

export function TaskForm({ task, onCancel, onUpdate }: TaskFormProps) {
    const [form] = Form.useForm<FormValues>();
    const dispatch = useAppDispatch();
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (task) {
            form.setFieldsValue({
                title: task.title,
                description: task.description,
                category: task.category,
                status: task.status,
                priority: task.priority,
                createdAt: task.createdAt
            });
        }
    }, [task, form]);

    const handleSubmit = async (values: FormValues) => {
        try {
            const now = new Date().toISOString();
            const taskData: Omit<Task, 'id'> = {
                ...values,
                createdAt: task?.createdAt || now,
                updatedAt: now
            };

            if (task) {
                const resultAction = await dispatch(updateTask({
                    ...taskData,
                    id: task.id
                }));

                if (updateTask.fulfilled.match(resultAction)) {
                    messageApi.success('Задача обновлена');
                    onUpdate?.({
                        ...resultAction.payload,
                        createdAt: task.createdAt
                    });
                    onCancel();
                }
            } else {
                const resultAction = await dispatch(createTask(taskData));

                if (createTask.fulfilled.match(resultAction)) {
                    messageApi.success('Задача создана');
                    onCancel();
                }
            }
        } catch (error) {
            messageApi.error('Ошибка при сохранении задачи');
            console.error('Error submitting task:', error);
        }
    };

    return (
        <>
            {contextHolder}
            <Form<FormValues>
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{
                    category: 'Feature',
                    status: 'To Do',
                    priority: 'Medium'
                }}
            >
                <Form.Item
                    name="title"
                    label="Заголовок"
                    rules={[{ required: true, message: 'Введите заголовок' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name="description" label="Описание">
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    name="category"
                    label="Категория"
                    rules={[{ required: true, message: 'Выберите категорию' }]}
                >
                    <Select options={taskCategories} />
                </Form.Item>

                <Form.Item
                    name="status"
                    label="Статус"
                    rules={[{ required: true, message: 'Выберите статус' }]}
                >
                    <Select options={taskStatuses} />
                </Form.Item>

                <Form.Item
                    name="priority"
                    label="Приоритет"
                    rules={[{ required: true, message: 'Выберите приоритет' }]}
                >
                    <Select options={taskPriorities} />
                </Form.Item>

                <Form.Item name="createdAt" hidden>
                    <Input type="hidden" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {task ? 'Обновить' : 'Создать'}
                    </Button>
                    <Button onClick={onCancel} style={{ marginLeft: 8 }}>
                        Отмена
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}