import {type FC} from 'react';
import { Button, Card, Tag } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import type { Task } from '../../types/taskTypes';
import styles from './TaskItem.module.css';

const categoryColors: Record<Task['category'], string> = {
    'Bug': 'red',
    'Feature': 'blue',
    'Documentation': 'green',
    'Refactor': 'purple',
    'Test': 'orange',
};

const statusColors: Record<Task['status'], string> = {
    'To Do': 'default',
    'In Progress': 'processing',
    'Done': 'success',
};

const priorityColors: Record<Task['priority'], string> = {
    'Low': 'green',
    'Medium': 'orange',
    'High': 'red',
};

const TaskItem: FC<{ task: Task }> = ({ task }) => {
    return (
        <Card
            className={styles.card}
            title={task.title}
            extra={
                <Link to={`/task/${task.id}`}>
                    <Button type="text" icon={<EditOutlined />} />
                </Link>
            }
        >
            {task.description && <p>{task.description}</p>}

            <div className={styles.tags}>
                <Tag color={categoryColors[task.category]}>{task.category}</Tag>
                <Tag color={statusColors[task.status]}>{task.status}</Tag>
                <Tag color={priorityColors[task.priority]}>{task.priority}</Tag>
            </div>
        </Card>
    );
};

export default TaskItem;