import { config } from "../config"

const api = {
    baseUrl: config.BASE_API_URL,

    _fetch: async (url, options = {}) => {
        return fetch(url, {
            ...options,
            headers: {
                ...options.headers,
            },
        })
    },

    _handleResponse: async (response) => {
        const responseJson = await response.json()

        const { status, message, data } = responseJson

        if (status !== "Success") {
            throw new Error(message)
        }

        return data
    },

    get: async (url, options = {}) => {
        const response = await api._fetch(`${api.baseUrl}/${url}`, options)

        const responseData = await api._handleResponse(response)
        return responseData
    },

    post: async (url, body, options = {}) => {
        const response = await api._fetch(`${api.baseUrl}/${url}`, {
            ...options,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
            body: JSON.stringify(body),
        })
        const responseData = await api._handleResponse(response)
        return responseData
    },

    put: async (url, body = {}, options = {}) => {
        const response = await api._fetch(`${api.baseUrl}/${url}`, {
            ...options,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
            body: JSON.stringify(body),
        })
        const responseData = await api._handleResponse(response)
        return responseData
    },

    delete: async (url, options = {}) => {
        return api._fetch(`${api.baseUrl}/${url}`, {
            ...options,
            method: "DELETE",
        })
    },
}

const makeResponseFailed = ({
    status = "failed",
    message = "",
    data = null,
}) => {
    return { status, message, data }
}
export { api, makeResponseFailed }
