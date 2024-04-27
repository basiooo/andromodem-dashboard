import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { GrLocationPin } from 'react-icons/gr'
import { IoAirplane } from 'react-icons/io5'
import { LuRefreshCw } from 'react-icons/lu'
import { MdOutlineSettingsApplications } from 'react-icons/md'
import { TbMobiledata } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'

import { networkThunks } from '../../states/network/action'
import { CONNECTION_STATE } from '../../utils/const'
import SimDetail from './SimDetail'

const Network = ({ serial }) => {

    const [isLoadNetwork, setIsLoadNetwork] = useState(false)
    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = useState(0)
    const networkInfo = useSelector((state) => state.network)

    useEffect(() => {
        (
            async () => {
                try {
                    await dispatch(networkThunks.asyncGetnetwork(serial))
                } catch (error) {
                    toast.error(error.message)
                }
            }
        )()
    }, [dispatch, serial])

    const changeTab = (tabId) => {
        setActiveTab(tabId)
    }

    const isCarriersMobileDataEnabled = (carriers) => {
        return networkInfo.carriers.some((carrier, index) => {
            return isMobileDataEnabled(carrier.connection_state)
        })
    }    
    const isCarriersMobileDataEmptyState = (carriers) => {
        return networkInfo.carriers.some((carrier, index) => {
            return carrier.connection_state === ""
        })
    }
    const isMobileDataEnabled = (conectionState) => {
        return conectionState === CONNECTION_STATE.CONNECTED || conectionState === CONNECTION_STATE.CONNECTING
    }

    const refreshNetwork = () => {
        (
            async () => {
                try {
                    setIsLoadNetwork(true)
                    await dispatch(networkThunks.asyncGetnetwork(serial))
                }
                catch (error) {
                    toast.error(error.message)
                }
                finally {
                    setIsLoadNetwork(false)
                }
            }
        )()
    }


    const toggleAirplaneMode = () => {
        (
            async () => {
                try {
                    setIsLoadNetwork(true)
                    await dispatch(networkThunks.asyncToggleAirplaneMode(serial))
                    toast.success(`Success ${!networkInfo.airplane_mode ? "enable" : "disable"} airplane mode`)
                }
                catch (error) {
                    toast.error(error.message)
                }
                finally {
                    setIsLoadNetwork(false)
                }
            }
        )()
    }

    const toggleMobileData = () => {
        (
            async () => {
                try {
                    setIsLoadNetwork(true)
                    await dispatch(networkThunks.asyncToggleMobileData(serial))
                    toast.success(`Success ${isCarriersMobileDataEnabled(networkInfo.carriers) ? "enable" : "disable"} mobile data`)
                }
                catch (error) {
                    toast.error(error.message)
                }
                finally {
                    setIsLoadNetwork(false)
                }
            }
        )()
    }

    return (
        <div>
            <button onClick={refreshNetwork} disabled={isLoadNetwork} className="btn btn-sm btn-active btn-primary mb-3">
                <LuRefreshCw className={isLoadNetwork ? "animate-spin" : ""} />
                Refresh
            </button>
            <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                {
                    networkInfo ?
                        <>
                            <div className="card card-compact w-full bg-base-200 shadow-xl">
                                <div className="card-body">
                                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                                        <div>
                                            <div className='flex items-center text-lg font-bold'>
                                                <MdOutlineSettingsApplications />
                                                <div className='mx-2 text-base'>APN</div>
                                            </div>
                                            {
                                                Object.keys(networkInfo.apn).length > 0 ?
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td>Name</td>
                                                                <td>:</td>
                                                                <td>{networkInfo.apn.name}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Apn</td>
                                                                <td>:</td>
                                                                <td>{networkInfo.apn.apn}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    :
                                                    <h1>Unknown</h1>
                                            }
                                        </div>
                                        <div>
                                            <div className='flex items-center text-lg font-bold'>
                                                <GrLocationPin />
                                                <div className='mx-2 text-base'>Mobile Data IP</div>
                                            </div>
                                            <div className="tooltip" data-tip="The IP address is obtained from rmnet_data*">
                                                <h1>{networkInfo.ip.length ? networkInfo.ip : "Unknown"}</h1>
                                            </div>
                                        </div>
                                        <div>
                                            <div className='flex items-center text-lg font-bold'>
                                                <IoAirplane />
                                                <div className='mx-2 text-base'>Airplane Mode</div>
                                            </div>
                                            <button disabled={isLoadNetwork} onClick={toggleAirplaneMode} className={`btn btn-xs btn-active mb-3 ${networkInfo.airplane_mode ? "btn-success" : "btn-error"
                                                }`}>
                                                <LuRefreshCw className={isLoadNetwork ? "animate-spin" : ""} />
                                                {
                                                    networkInfo.airplane_mode ? "Disable" : "Enable"
                                                }
                                            </button>
                                        </div>
                                        <div>
                                            <div className='flex items-center text-lg font-bold'>
                                                <TbMobiledata />
                                                <div className='mx-2 text-base'>Mobile Data</div>
                                            </div>
                                            <button disabled={networkInfo.airplane_mode || isLoadNetwork || isCarriersMobileDataEmptyState(networkInfo.carriers)} onClick={toggleMobileData} className={`btn btn-xs btn-active  mb-3 ${isCarriersMobileDataEnabled(networkInfo.carriers) ? "btn-error" : "btn-success"}`}>
                                                <LuRefreshCw className={isLoadNetwork ? "animate-spin" : ""} />
                                                {
                                                    isCarriersMobileDataEnabled(networkInfo.carriers) ? "Disable" : "Enable"
                                                }
                                            </button>
                                            {
                                                isCarriersMobileDataEmptyState(networkInfo.carriers)
                                                ? 
                                                <p className='text-red-500'>
                                                This feature cannot be used because it cannot obtain the device connection status
                                                </p>
                                                :<></>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card card-compact w-full lg:col-span-2 bg-base-200 shadow-xl">
                                <div className="card-body">
                                    <div role="tablist" className="tabs tabs-lifted">
                                        {
                                            networkInfo.carriers.map((carrier, index) => (
                                                <>
                                                    <button type="button" role="tab" className={`tab text-sm md:text-lg ${activeTab === index ? 'tab-active' : ''}`} id={index} onClick={() => changeTab(index)}>
                                                        {carrier.name}
                                                        {
                                                            isMobileDataEnabled(carrier.connection_state) ?
                                                                <TbMobiledata color="green" fontSize={23} />
                                                                :
                                                                ""
                                                        }
                                                    </button>
                                                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 overflow-auto ">
                                                        <SimDetail carrier={carrier} />
                                                    </div>
                                                </>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </>
                        :
                        <></>
                }
            </section>
        </div>
    )
}

Network.propTypes = {
    serial: PropTypes.string.isRequired,
}
export default Network