import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ConfigProvider } from 'antd';
import { fetchTasks } from '@entities/task/model/taskSlice';
import { useEffect } from 'react';
import { useAppDispatch } from '@shared/lib/hooks';

export function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#52a8ff' } }}>
            <RouterProvider router={router} />
        </ConfigProvider>
    );
}