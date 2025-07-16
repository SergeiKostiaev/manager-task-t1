import { RouterProvider } from 'react-router-dom'
import { router } from './router.tsx'
import { ConfigProvider } from 'antd'
import {loadTasks} from "@entities/task/model/taskSlice.ts";
import {useEffect} from "react";
import {useAppDispatch} from "@shared/lib/hooks";

export function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadTasks());
    }, [dispatch]);


    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#52a8ff' } }}>
            <RouterProvider router={router} />
        </ConfigProvider>
    )
}