import { RouterProvider } from 'react-router-dom'
import { router } from './app/router'
import { ConfigProvider } from 'antd'

export function App() {
    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
            <RouterProvider router={router} />
        </ConfigProvider>
    )
}