import PropTypes from 'prop-types'
import { useEffect, useState } from "react"
import toast from 'react-hot-toast'
import { LuRefreshCw } from "react-icons/lu"
import { useDispatch, useSelector } from "react-redux"

import { inboxThunks } from '../../states/inboxs/action'
import InboxItem from "./InboxItem"

const InboxList = ({ serial }) => {

    const [isLoadInboxs, setisLoadInboxs] = useState(false)
    const dispatch = useDispatch()
    const inboxs = useSelector((state) => state.inboxs) ?? []
    useEffect(() => {
        (
            async () => {
                try {
                    await dispatch(inboxThunks.asyncGetInboxs(serial))
                } catch (error) {
                    toast.error(error.message)
                }
            }
        )()
    }, [dispatch, serial])


    const refreshInboxs = () => {
        (
            async () => {
                try {
                    setisLoadInboxs(true)
                    await dispatch(inboxThunks.asyncGetInboxs(serial))
                }
                catch (error) {
                    toast.error(error.message)
                }
                finally {
                    setisLoadInboxs(false)
                }
            }
        )()
    }


    return (
        <div className="w-auto">
            <button onClick={refreshInboxs} disabled={isLoadInboxs} className="btn btn-sm btn-active btn-primary mb-3">
                <LuRefreshCw className={isLoadInboxs ? "animate-spin" : ""} />
                Refresh
            </button>
            <span className="text-lg font-bold mx-2">({inboxs.length})</span>
            {
                inboxs.map((inbox) => (
                    <InboxItem key={`${serial}-${inbox.row}`} inbox={inbox} />
                ))
            }
        </div>
    )
}

InboxList.propTypes = {
    serial: PropTypes.string.isRequired,
}
export default InboxList