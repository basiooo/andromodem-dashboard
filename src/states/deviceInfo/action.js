import { devicesAPI } from "../../api/devicesApi"

export const DeviceInfoActionType = {
    SET: 'deviceInfo/set',
}


export const deviceInfoAction = {
    set(deviceInfo) {
        return {
            type: DeviceInfoActionType.SET,
            payload: {
                deviceInfo,
            },
        }
    }
}

export const deviceInfoThunks = {
    asyncGetDeviceInfo(serial) {
        return async (dispatch) => {
            const res = await devicesAPI.getDeviceInfo(serial)
            const { status, message } = res
            if (status === 'failed') {
                throw new Error(message)
            }
            dispatch(deviceInfoAction.set(res.device_info))
        }
    },
}  