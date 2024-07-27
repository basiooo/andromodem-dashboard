import { DeviceInfoActionType } from "./action"

export const deviceInfoReducer = (deviceInfo = null, action = {}) => {
    switch (action.type) {
        case DeviceInfoActionType.SET:
            return action.payload.deviceInfo
        default:
            return deviceInfo
    }
}