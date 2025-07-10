import {type FC} from 'react';
import { Col, Row } from 'antd';
import TaskItem from '../TaskItem/TaskItem';
import type {Task} from '../../types/taskTypes';
import styles from './TaskList.module.css';

const TaskList: FC<{ tasks: Task[] }> = ({ tasks }) => {
    return (
        <div className={styles.container}>
            <h1>Менеджер задач</h1>
            <Row gutter={[16, 16]}>
                {tasks.map(task => (
                    <Col key={task.id} xs={24} sm={12} md={8} lg={6}>
                        <TaskItem task={task} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default TaskList;