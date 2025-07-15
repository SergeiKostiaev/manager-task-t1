import { Col, Row } from 'antd';
import { TaskItem } from '@entities/task/ui/TaskItem';
import type { Task } from '@entities/task/model/types';

interface TaskListProps {
    tasks?: Task[];
}

export function TaskList({ tasks = [] }: TaskListProps) {
    return (
        <Row gutter={[16, 16]}>
            {tasks.map(task => (
                <Col key={task.id} xs={24} sm={12} md={8} lg={6}>
                    <TaskItem task={task} />
                </Col>
            ))}
        </Row>
    );
}