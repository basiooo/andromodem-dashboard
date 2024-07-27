import { api, makeResponseFailed } from "./api"

export const devicesAPI = {
    getDevices: async () => {
        try {
            return await api.get("devices")
        } catch (error) {
            return makeResponseFailed({
                message: error.message,
            })
        }
    },
    actionDevicePower: async (serial,body) => {
        try {
            return await api.put(`devices/${serial}/power`,body)
        } catch (error) {
            return makeResponseFailed({
                message: error.message,
            })
        }
    },
    getDeviceInfo: async (serial) => {
        try {
            return await api.get(`devices/${serial}`)
        } catch (error) {
            return makeResponseFailed({
                message: error.message,
            })
        }
    },
    getDeviceInboxs: async (serial) => {
        try {
            return await api.get(`devices/${serial}/inbox`)
        } catch (error) {
            return makeResponseFailed({
                message: error.message,
            })
        }
    },

}