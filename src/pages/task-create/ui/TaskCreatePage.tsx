import { useNavigate } from 'react-router-dom';
import { TaskForm } from '@features/task-manager/ui/TaskForm';

export default function TaskCreatePage() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Создать новую задачу</h1>
            <TaskForm onCancel={() => navigate('/')} />
        </div>
    );
};