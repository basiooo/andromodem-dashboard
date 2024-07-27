import { DeviceActionType } from "./action"

export const deviceReducer = (device = null, action = {}) => {
    switch (action.type) {
        case DeviceActionType.SET:
            return action.payload.device
        default:
            return device
    }
}