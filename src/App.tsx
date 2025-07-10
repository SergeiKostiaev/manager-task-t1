import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';
import TaskList from './components/TaskList/TaskList';
import TaskDetails from './components/TaskDetails/TaskDetails';
import type { Task } from './types/taskTypes';

const App: React.FC = () => {
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
        setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    };

    return (
        <ConfigProvider locale={ruRU}>
            <Router>
                <Routes>
                    <Route path="/" element={<TaskList tasks={tasks} />} />
                    <Route
                        path="/task/:id"
                        element={<TaskDetails tasks={tasks} onUpdate={handleTaskUpdate} />}
                    />
                </Routes>
            </Router>
        </ConfigProvider>
    );
};

export default App;