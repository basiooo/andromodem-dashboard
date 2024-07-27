import { InboxActionType } from "./action"

export const inboxsReducer = (inboxs = null, action = {}) => {
    switch (action.type) {
        case InboxActionType.SET:
            return action.payload.inboxs
        default:
            return inboxs
    }
}