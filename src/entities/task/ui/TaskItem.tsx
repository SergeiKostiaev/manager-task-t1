import { Card, Tag, Button, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '@shared/lib/hooks/useAppDispatch';
import { deleteTask } from '../model/taskSlice';
import type { Task } from '@entities/task/model/types';
import styles from './TaskItem.module.css';
import { useState } from 'react';

const categoryColors = {
    Bug: 'red',
    Feature: 'blue',
    Documentation: 'green',
    Refactor: 'purple',
    Test: 'orange'
};

export function TaskItem({ task }: { task: Task }) {
    const dispatch = useAppDispatch();
    const [expanded, setExpanded] = useState(false);

    return (
        <Card
            className={styles.container}
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
            classNames={{
                body: styles.cardBody
            }}
        >
            <div className={styles.content}>
                <h3 className={styles.title}>{task.title}</h3>

                {task.description && (
                    <div className={styles.descriptionContainer}>
                        <p className={expanded ? styles.descriptionExpanded : styles.description}>
                            {task.description}
                        </p>
                        {task.description.length > 100 && (
                            <Button
                                type="link"
                                size="small"
                                onClick={() => setExpanded(!expanded)}
                                icon={expanded ? <UpOutlined /> : <DownOutlined />}
                                className={styles.expandButton}
                            >
                                {expanded ? 'Свернуть' : 'Подробнее'}
                            </Button>
                        )}
                    </div>
                )}

                <div className={styles.date}>
                    {new Date(task.createdAt).toLocaleTimeString('ru-RU', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </div>

                <div className={styles.tags}>
                    <Tag color={categoryColors[task.category]}>{task.category}</Tag>
                    <Tag color={task.status === 'Done' ? 'success' : 'processing'}>
                        {task.status}
                    </Tag>
                    <Tag color={task.priority === 'High' ? 'red' : task.priority === 'Medium' ? 'orange' : 'green'}>
                        {task.priority}
                    </Tag>
                </div>
            </div>
        </Card>
    );
}