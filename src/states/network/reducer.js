import { NetworkActionType } from "./action"

export const networkReducer = (network = null, action = {}) => {
    switch (action.type) {
        case NetworkActionType.SET:
            return action.payload.network
        default:
            return network
    }
}