import PropTypes from 'prop-types'
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { DiAndroid } from "react-icons/di"
import { FaBatteryFull } from "react-icons/fa"
import { GiAndroidMask } from "react-icons/gi"
import { IoPhonePortraitOutline } from "react-icons/io5"
import { LuRefreshCw } from "react-icons/lu"
import { MdOutlineCategory, MdOutlineFactory } from "react-icons/md"
import { PiIdentificationBadgeBold, PiPlugChargingBold } from "react-icons/pi"
import { TbTemperatureCelsius } from "react-icons/tb"
import { useDispatch, useSelector } from "react-redux"

import { deviceInfoThunks } from '../../states/deviceInfo/action'

const DeviceInfo = ({ serial }) => {
    const dispatch = useDispatch()
    const [isLoadDeviceInfo, setIsLoadDeviceInfo] = useState(false)
    const deviceInfo = useSelector((state) => state.deviceInfo)

    useEffect(() => {
        (
            async () => {
                try {
                    await dispatch(deviceInfoThunks.asyncGetDeviceInfo(serial))
                } catch (error) {
                    toast.error(error.message)
                }
            }
        )()
    }, [dispatch, serial])

    const refreshDeviceInfo = () => {
        (
            async () => {
                try {
                    setIsLoadDeviceInfo(true)
                    await dispatch(deviceInfoThunks.asyncGetDeviceInfo(serial))
                }
                catch (error) {
                    toast.error(error.message)
                }
                finally {
                    setIsLoadDeviceInfo(false)
                }
            }
        )()
    }


    return (

        <div>
            <button onClick={refreshDeviceInfo} disabled={isLoadDeviceInfo} className="btn btn-sm btn-active btn-primary mb-3">
                <LuRefreshCw className={isLoadDeviceInfo ? "animate-spin" : ""} />
                Refresh
            </button>
            {
                deviceInfo ?

                    <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                        <div className="card card-compact w-full bg-base-200 shadow-xl md:col-span-2">
                            <div className="card-body">
                                <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                                    <div>
                                        <div className='flex items-center text-lg font-bold'>
                                            <MdOutlineFactory />
                                            <div className='mx-2 text-base'>Brand</div>
                                        </div>
                                        <h1>{deviceInfo.prop.brand}</h1>
                                    </div>
                                    <div>
                                        <div className='flex items-center text-lg font-bold'>
                                            <IoPhonePortraitOutline />
                                            <div className='mx-2 text-base'>Model</div>
                                        </div>
                                        <h1>{deviceInfo.prop.model}</h1>
                                    </div>
                                    <div>
                                        <div className='flex items-center text-lg font-bold'>
                                            <PiIdentificationBadgeBold />
                                            <div className='mx-2 text-base'>Name</div>
                                        </div>
                                        <h1>{deviceInfo.prop.name}</h1>
                                    </div>
                                    <div>
                                        <div className='flex items-center text-lg font-bold'>
                                            <DiAndroid />
                                            <div className='mx-2 text-base'>OS Version</div>
                                        </div>
                                        <h1>{deviceInfo.prop.android_version}</h1>
                                    </div>
                                    <div>
                                        <div className='flex items-center text-lg font-bold'>
                                            <GiAndroidMask />
                                            <div className='mx-2 text-base'>Root</div>
                                        </div>
                                        {
                                            deviceInfo.root.is_rooted ?
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>Name</td>
                                                            <td>:</td>
                                                            <td>{deviceInfo.root.name}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Version</td>
                                                            <td>:</td>
                                                            <td>{deviceInfo.root.version}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                :
                                                <h1>Not Rooted</h1>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card card-compact w-full bg-base-200 shadow-xl">
                            <div className="card-body">
                                <div className='grid gap-2 col-span-1 md:grid-cols-2'>
                                    <div>
                                        <div className='flex items-center text-lg font-bold'>
                                            <FaBatteryFull />
                                            <div className='mx-2 text-base'>Battery</div>
                                        </div>
                                        <h1>{deviceInfo.battery.present ? deviceInfo.battery.level + "%" : "Does not have a physical battery"}</h1>
                                    </div>
                                    {
                                        deviceInfo.battery.present ?
                                            <>
                                                <div>
                                                    <div className='flex items-center text-lg font-bold'>
                                                        <PiPlugChargingBold />
                                                        <div className='mx-2 text-base'>Counter</div>
                                                    </div>
                                                    <h1>{deviceInfo.battery.charge_counter}</h1>
                                                </div>
                                                <div>
                                                    <div className='flex items-center text-lg font-bold'>
                                                        <TbTemperatureCelsius />
                                                        <div className='mx-2 text-base'>Temp</div>
                                                    </div>
                                                    <h1>{deviceInfo.battery.temperature} °C</h1>
                                                </div>
                                                <div>
                                                    <div className='flex items-center text-lg font-bold'>
                                                        <MdOutlineCategory />
                                                        <div className='mx-2 text-base'>Technology</div>
                                                    </div>
                                                    <h1>{deviceInfo.battery.technology}</h1>
                                                </div>
                                            </>
                                            : <></>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <></>
            }
        </div>
    )
}
DeviceInfo.propTypes = {
    serial: PropTypes.string.isRequired,
}
export default DeviceInfo