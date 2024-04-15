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

}