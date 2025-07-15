import { Button, Form, Input, Select } from 'antd'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch'
import { addTask, updateTask } from '@entities/task/model/taskSlice'
import type { Task } from '@entities/task/model/types'

const taskCategories = [
    { value: 'Bug', label: 'Bug' },
    { value: 'Feature', label: 'Feature' },
    { value: 'Documentation', label: 'Documentation' },
    { value: 'Refactor', label: 'Refactor' },
    { value: 'Test', label: 'Test' }
]

const taskStatuses = [
    { value: 'To Do', label: 'To Do' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Done', label: 'Done' }
]

const taskPriorities = [
    { value: 'Low', label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' }
]

export function TaskForm({task, onCancel}: {
    task?: Task,
    onCancel: () => void,
    onUpdate?: (updatedTask: Task) => void
}) {
    const [form] = Form.useForm()
    const dispatch = useAppDispatch()

    const handleSubmit = (values: Omit<Task, 'id'>) => {
        if (task) {
            dispatch(updateTask({ ...values, id: task.id }));
        } else {
            dispatch(addTask({
                ...values,
                id: Date.now(),
                createdAt: new Date().toISOString()
            }));
        }
        onCancel();
    };

    return (
        <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={task}>
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

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    {task ? 'Обновить' : 'Создать'}
                </Button>
                <Button onClick={onCancel} style={{ marginLeft: 8 }}>
                    Отмена
                </Button>
            </Form.Item>
        </Form>
    )
}