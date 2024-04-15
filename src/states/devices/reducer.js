import { DevicesActionType } from "./action"

export const devicesReducer = (devices = null, action = {}) => {
    switch (action.type) {
        case DevicesActionType.SET:
            return action.payload.devices
        default:
            return devices
    }
}