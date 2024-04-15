import { configureStore } from "@reduxjs/toolkit"

import { deviceReducer } from "./device/reducer"
import { devicesReducer } from "./devices/reducer"
import { inboxsReducer } from "./inboxs/reducer"
import { networkReducer } from "./network/reducer"

const store = configureStore({
    reducer: {
        devices: devicesReducer,
        device: deviceReducer,
        inboxs: inboxsReducer,
        network: networkReducer
    },
})

export default store
