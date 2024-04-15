import { useState } from "react"
import toast from "react-hot-toast"
import { LuRefreshCw } from "react-icons/lu"
import { useDispatch, useSelector } from "react-redux"

import { deviceThunks } from "../../states/device/action"
import { devicesThunks } from "../../states/devices/action"

const DeviceSelector = () => {
    const devices = useSelector((state) => state.devices) ?? []
    const dispatch = useDispatch()
    const [isLoadDevices, setIsLoadDevices] = useState(false)

    const refreshDevices = () => {
        (
            async () => {
                try {
                    setIsLoadDevices(true)
                    await dispatch(devicesThunks.asyncGetDevices())
                } catch (error) {
                    toast.error(error.message)
                }
                finally {
                    setIsLoadDevices(false)
                }
            }
        )()
    }

    const onSelectDevice = (serial) => {
        let device = null
        if (serial !== "DEFAULT") {
            const index = devices.findIndex((device) => device.serial === serial)
            if (index === -1) {
                throw new Error(`Device not found`)
            }
            device = devices[index]
        }
        dispatch(deviceThunks.asyncSetDevice(device))
    }

    return (
        <div className="card card-compact w-full bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-xl sm:text-2xl">
                    Select Device
                    <div className="tooltip" data-tip="Refresh device list">
                        <LuRefreshCw onClick={refreshDevices} className={isLoadDevices ? "animate-spin" : ""} />
                    </div>
                </h2>
                <select className="select select-primary w-full sm:select-lg" disabled={isLoadDevices} onChange={(device) => onSelectDevice(device.target.value)}>
                    <option value="DEFAULT">{`Select Device. ${devices.length} available`}</option>
                    {devices.map((device) => (
                        <option key={device.serial} value={device.serial} disabled={device.state !== "Online"}>
                            {`${device.model} / ${device.serial} (${device.state})`}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}
export default DeviceSelector