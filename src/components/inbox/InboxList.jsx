import PropTypes from 'prop-types'
import { useEffect, useState } from "react"
import toast from 'react-hot-toast'
import { LuRefreshCw } from "react-icons/lu"
import { useDispatch, useSelector } from "react-redux"

import { inboxThunks } from '../../states/inboxs/action'
import InboxItemSkeleton from '../skeletons/InboxItemSkeleton'
import InboxItem from "./InboxItem"

const InboxList = ({ serial }) => {
    const [isLoadInboxs, setIsLoadInboxs] = useState(false)
    const [isNotSupport, setIsNotSupport] = useState(false)
    const dispatch = useDispatch()
    const inboxs = useSelector((state) => state.inboxs)
    useEffect(() => {
        (
            async () => {
                try {
                    await dispatch(inboxThunks.asyncGetInboxs(serial))
                } catch (error) {
                    if (error.message === "cannot get sms list"){
                        setIsNotSupport(true)
                    }else{
                        toast.error(error.message)
                    }
                }
            }
        )()
    }, [dispatch, serial])


    const refreshInboxs = () => {
        (
            async () => {
                try {
                    setIsLoadInboxs(true)
                    await dispatch(inboxThunks.asyncGetInboxs(serial))
                }
                catch (error) {
                    toast.error(error.message)
                }
                finally {
                    setIsLoadInboxs(false)
                }
            }
        )()
    }

    return (
        <div className="w-auto">
            {
                isNotSupport ? <>
                    <h1 className="text-2xl text-center font-bold my-5 text-red-500">Your device does not support this feature</h1>
                    <p className='text-center'>This feature runs normally on Android 10 and above with OS AOSP, MIUI, Hyper OS and others</p>
                </> : 
                <>
                <button onClick={refreshInboxs} disabled={isLoadInboxs} className="btn btn-sm btn-active btn-primary mb-3">
                    <LuRefreshCw className={isLoadInboxs ? "animate-spin" : ""} />
                    Refresh
                </button>
                {
                    
                    isLoadInboxs || !inboxs ?  
                    <InboxItemSkeleton count={5}/>
                    :
                    <>
                    <span className="text-lg font-bold mx-2">({inboxs.length})</span>
                    {inboxs.map((inbox) => (
                        <InboxItem key={`${serial}-${inbox.row}`} inbox={inbox} />
                    ))}
                    </>
                }
                </>
            }
        </div>
    )
}

InboxList.propTypes = {
    serial: PropTypes.string.isRequired,
}
export default InboxList