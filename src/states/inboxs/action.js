import { devicesAPI } from "../../api/devicesApi"

export const InboxActionType = {
    SET: 'inbox/set',
}

export const inboxsAction = {
    set(inboxs) {
        return {
            type: InboxActionType.SET,
            payload: {
                inboxs,
            },
        }
    }
}
export const inboxThunks = {
    asyncGetInboxs(serial) {
        return async (dispatch) => {
            const { status, message, inboxs } = await devicesAPI.getDeviceInboxs(serial)
            if (status === 'failed') {
                throw new Error(message)
            }
            dispatch(inboxsAction.set(inboxs))
        }
    },
}  