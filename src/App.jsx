import { Toaster } from "react-hot-toast"
import { RouterProvider } from "react-router-dom"

import { routers } from "./routers"

const App = () => {
    return (
        <>
            <Toaster />
            <main className="min-h-screen">
                <RouterProvider router={routers} />
            </main>
        </>
    )
}

export default App