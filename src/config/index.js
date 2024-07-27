import { getBaseUrl } from "../utils/utils"

export const config = {
    // BASE_API_URL: "http://localhost:49153/api",

    BASE_API_URL: `${getBaseUrl()}/api`,
    VERSION : "0.40"
}