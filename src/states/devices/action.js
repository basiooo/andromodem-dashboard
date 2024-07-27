import { devicesAPI } from "../../api/devicesApi"

export const DevicesActionType = {
    SET: 'devices/set',
}


export const devicesAction = {
    set(devices) {
        return {
            type: DevicesActionType.SET,
            payload: {
                devices,
            },
        }
    }
}

export const devicesThunks = {
    asyncGetDevices() {
        return async (dispatch) => {
            const { status, message, devices } = await devicesAPI.getDevices()
            if (status === 'failed') {
                throw new Error(message)
            }
            dispatch(devicesAction.set(devices))
        }
    },
}  