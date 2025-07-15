import { Card, Tag, Button, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch'
import { deleteTask } from '../model/taskSlice'
import type { Task } from '@entities/task/model/types'

const categoryColors = {
    Bug: 'red',
    Feature: 'blue',
    Documentation: 'green',
    Refactor: 'purple',
    Test: 'orange'
}

export function TaskItem({ task }: { task: Task }) {
    const dispatch = useAppDispatch()

    return (
        <Card
            actions={[
                <Link to={`/task/${task.id}`} key="edit">
                    <Button type="text" icon={<EditOutlined />} />
                </Link>,
                <Popconfirm
                    key="delete"
                    title="Удалить задачу?"
                    onConfirm={() => dispatch(deleteTask(task.id))}
                >
                    <Button type="text" danger icon={<DeleteOutlined />} />
                </Popconfirm>
            ]}
        >
            <h3>{task.title}</h3>
            {task.description && <p>{task.description}</p>}
            {new Date(task.createdAt).toLocaleTimeString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            })}

            <div style={{ marginTop: 16 }}>
                <Tag color={categoryColors[task.category]}>{task.category}</Tag>
                <Tag color={task.status === 'Done' ? 'success' : 'processing'}>
                    {task.status}
                </Tag>
                <Tag color={task.priority === 'High' ? 'red' : task.priority === 'Medium' ? 'orange' : 'green'}>
                    {task.priority}
                </Tag>
            </div>
        </Card>
    )
}