import { api, makeResponseFailed } from "./api"

export const networkAPI = {
    getNetwork: async (serial) => {
        try {
            return await api.get(`devices/${serial}/network`)
        } catch (error) {
            return makeResponseFailed({
                message: error.message,
            })
        }
    },
    toggleAirplaneMode: async (serial) => {
        try {
            return await api.put(`devices/${serial}/network/airplane`)
        } catch (error) {
            return makeResponseFailed({
                message: error.message,
            })
        }
    },
    toggleMobileData: async (serial) => {
        try {
            return await api.put(`devices/${serial}/network`)
        } catch (error) {
            return makeResponseFailed({
                message: error.message,
            })
        }
    },
}