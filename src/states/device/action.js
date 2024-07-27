export const DeviceActionType = {
    SET: 'device/set',
}


export const deviceAction = {
    set(device) {
        return {
            type: DeviceActionType.SET,
            payload: {
                device,
            },
        }
    }
}

export const deviceThunks = {
    asyncSetDevice(device) {
        return async (dispatch) => {
            dispatch(deviceAction.set(device))
        }
    },
}  