import { networkAPI } from "../../api/networkApi"

export const NetworkActionType = {
    SET: 'network/set',
}

export const networkAction = {
    set(network) {
        return {
            type: NetworkActionType.SET,
            payload: {
                network,
            },
        }
    }
}
export const networkThunks = {
    asyncGetnetwork(serial) {
        return async (dispatch) => {
            const res = await networkAPI.getNetwork(serial)
            const { status, message } = res
            if (status === 'failed') {
                throw new Error(message)
            }
            dispatch(networkAction.set(res.network_info))
        }
    },
    asyncToggleAirplaneMode(serial) {
        return async (dispatch) => {
            const res = await networkAPI.toggleAirplaneMode(serial)
            const { status, message } = res
            if (status === 'failed') {
                throw new Error(message)
            }
            await new Promise(resolve => setTimeout(resolve, 3000))
            dispatch(networkThunks.asyncGetnetwork(serial))
        }
    },
    asyncToggleMobileData(serial) {
        return async (dispatch) => {
            const res = await networkAPI.toggleMobileData(serial)
            const { status, message } = res
            if (status === 'failed') {
                throw new Error(message)
            }
            await new Promise(resolve => setTimeout(resolve, 3000))
            dispatch(networkThunks.asyncGetnetwork(serial))
        }
    },
}  