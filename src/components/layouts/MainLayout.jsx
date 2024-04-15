import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { devicesThunks } from "../../states/devices/action"
import Content from "../content/Content"
import DeviceSelector from "../deviceSelector/DeviceSelector"
import Footer from "../footer/Footer"
import Header from "../header/Header"

export const MainLayout = () => {
    const dispatch = useDispatch()
    const [errrorMessage, setErrrorMessage] = useState()
    const device = useSelector((state) => state.device)

    useEffect(() => {
        (
            async () => {
                try {
                    await
                        dispatch(devicesThunks.asyncGetDevices())
                } catch (error) {
                    setErrrorMessage(error.message)
                }
            }
        )()
    }, [dispatch])

    return (
        <>
            <Header />
            <main className="container min-h-screen mx-auto py-5">
                {
                    errrorMessage ?
                        <div className="hero min-h-5 bg-base-200">
                            <div className="hero-content text-center">
                                <div className="max-w-md">
                                    <h1 className="text-3xl md:text-5xl font-bold">An error occurred.</h1>
                                    <p className="py-6">{errrorMessage}</p>
                                </div>
                            </div>
                        </div>
                        :
                        <>
                            <DeviceSelector />
                            {
                                device ?
                                    <Content device={device} />
                                    : <></>
                            }
                        </>
                }
            </main>
            <Footer />
        </>
    )
}
