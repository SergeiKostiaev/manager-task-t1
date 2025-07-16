import { RouterProvider } from 'react-router-dom'
import { router } from './router.tsx'
import { ConfigProvider } from 'antd'

export function App() {
    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#52a8ff' } }}>
            <RouterProvider router={router} />
        </ConfigProvider>
    )
}