import { useEffect, useState } from "react"
import { MdBrowserUpdated } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import { config } from "../../config"
import { devicesThunks } from "../../states/devices/action"
import Content from "../content/Content"
import DeviceSelector from "../deviceSelector/DeviceSelector"
import Footer from "../footer/Footer"
import Header from "../header/Header"

export const MainLayout = () => {
    const dispatch = useDispatch()
    const [errrorMessage, setErrrorMessage] = useState()
    const [hasUpdate, setHasUpdate] = useState(false)
    const [updateDetail, setUpdateDetail] = useState([])
    const device = useSelector((state) => state.device)

    useEffect(() => {
        (async () => {
            try {
                await dispatch(devicesThunks.asyncGetDevices())
            } catch (error) {
                setErrrorMessage(error.message)
            }
            try {
                const andromodem = await fetch(
                    "https://andromodem.bagasjulianto.my.id/download/latest/"
                )
                const response = await andromodem.json()
                if (parseFloat(response.version) > config.VERSION) {
                    setHasUpdate(true)
                    setUpdateDetail(response)
                }
            } catch (error) {
            }
        })()
    }, [dispatch, hasUpdate])

    return (
        <>
            <Header />
            <main className="container min-h-screen mx-auto py-5">
            {
                hasUpdate ? 
            <button onClick={()=>document.getElementById('update_modal').showModal()} className="h-10 btn btn-sm mb-5 btn-success w-full md:w-auto">
            <MdBrowserUpdated fontSize={20} />
                New update available
            </button>
                :
                <></>
            }
                {errrorMessage ? (
                    <div className="hero min-h-5 bg-base-200">
                        <div className="hero-content text-center">
                            <div className="max-w-md">
                                <h1 className="text-3xl md:text-5xl font-bold">
                                    An error occurred.
                                </h1>
                                <p className="py-6">{errrorMessage}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <DeviceSelector />
                        {device ? <Content device={device} /> : <></>}
                    </>
                )}
                {hasUpdate ? (
                    <>
                        <dialog id="update_modal" className="modal text-center">
                            <div className="modal-box w-11/12 max-w-5xl">
                                <h3 className="font-bold text-left text-lg md:text-2xl">
                                    New Update Version {updateDetail.version}
                                </h3>
                                <hr />
                                <div className="my-3">
                                    <ul>
                                        {updateDetail?.changelog?.map((log) => (
                                            // eslint-disable-next-line react/jsx-key
                                            <li key={log}>{log}</li>
                                        ))}
                                    </ul>
                                </div>
                                <hr />
                                <h5 className="text-2xl font-bold">Step for update</h5>
                                <ul>
                                    <li>Open Terminal</li>
                                    <li>Copy and run code this code</li>
                                    <div className="mockup-code">
                                        <pre>
                                            <code>
                                                curl -s
                                                https://andromodem.bagasjulianto.my.id/download/installer.sh
                                                | bash
                                            </code>
                                        </pre>
                                    </div>
                                </ul>
                                <div className="modal-action">
                                    <form method="dialog">
                                        <button className="btn">Close</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </>
                ) : (
                    <></>
                )}
            </main>
            <Footer />
        </>
    )
}
