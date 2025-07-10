import {type FC, useState} from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import TaskList from './components/TaskList/TaskList';
import TaskDetails from './components/TaskDetails/TaskDetails';
import type { Task } from './types/taskTypes';

const App: FC = () => {
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: 1,
            title: 'Исправить баг в авторизации',
            description: 'Пользователи не могут войти после обновления пароля',
            category: 'Bug',
            status: 'In Progress',
            priority: 'High',
        },
        {
            id: 2,
            title: 'Добавить страницу профиля',
            description: 'Создать новый раздел для просмотра профиля пользователя',
            category: 'Feature',
            status: 'To Do',
            priority: 'Medium',
        },
    ]);

    const handleTaskUpdate = (updatedTask: Task) => {
        setTasks(prevTasks => prevTasks.map(task =>
            task.id === updatedTask.id ? { ...updatedTask } : task
        ));
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TaskList tasks={tasks} key={tasks.length}/>} />
                <Route
                    path="/task/:id"
                    element={<TaskDetails tasks={tasks} onUpdate={handleTaskUpdate} />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;