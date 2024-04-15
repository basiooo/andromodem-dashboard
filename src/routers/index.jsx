import { createBrowserRouter } from 'react-router-dom'

import { Fallback } from '../components/fallback/Fallback'
import { MainLayout } from '../components/layouts/MainLayout'


export const routers = createBrowserRouter([
    {
        path: '/',
        errorElement: <Fallback body='Something went wrong' title=".·°՞(≧□≦)՞°·." />,
        element: <MainLayout />,
        children: [{

        }]
    },
    {
        path: '*',
        element: <Fallback body='Page not found.' title="404" />,
    },
])
