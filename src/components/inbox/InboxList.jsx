import PropTypes from 'prop-types'
import { useEffect, useMemo, useState } from "react"
import toast from 'react-hot-toast'
import { LuRefreshCw } from "react-icons/lu"
import { useDispatch, useSelector } from "react-redux"

import magiskEnableShell from "../../../public/magisk_enable_shell.png"
import magiskHome from "../../../public/magisk_home.png"
import magiskIconApp from "../../../public/magisk_icon_app.png"
import { inboxThunks } from '../../states/inboxs/action'
import InboxItemSkeleton from '../skeletons/InboxItemSkeleton'
import InboxItem from "./InboxItem"

const InboxList = ({ serial }) => {
    const inboxsShowOption = [
        10, 20, 50, 100, "*"
    ]
    const [isLoadInboxs, setIsLoadInboxs] = useState(false)
    const [isReqRoot, setIsReqRoot] = useState(false)
    const [isReqRootPermission, setIsReqRootPermission] = useState(false)
    const [inboxShowValue, setInboxShowValue] = useState(10)
    const dispatch = useDispatch()
    const inboxs = useSelector((state) => state.inboxs)

    const handleInboxsShowOptionChange = (v) => {
        setInboxShowValue(v)
    }

    const finalInboxs = useMemo(() => {
        const result = inboxs ??  []
        if (inboxShowValue === "*"){
            return result
        }
        return result.slice(0,parseInt(inboxShowValue))
    }, [inboxShowValue, inboxs])

    useEffect(() => {
        (
            async () => {
                try {
                    setIsLoadInboxs(true)
                    setInboxShowValue(10)
                    await dispatch(inboxThunks.asyncGetInboxs(serial))
                } catch (error) {
                    if (error.message === "cannot get sms list without root"){
                        setIsReqRoot(true)
                    }
                    else if (error.message === "cannot get sms list. please allow root permission"){
                        setIsReqRootPermission(true)
                    }
                    else{
                        toast.error(error.message)
                    }
                }
                finally{
                    setIsLoadInboxs(false)
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
                    if (error.message === "cannot get sms list without root"){
                        setIsReqRoot(true)
                    }
                    else if (error.message === "cannot get sms list. please allow root permission"){
                        setIsReqRootPermission(true)
                    }
                    else{
                        toast.error(error.message)
                    }                
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
                isReqRoot ? <>
                    <h1 className="text-3xl text-center font-bold my-5 text-red-500">Your device does not support this feature without root</h1>
                    <p className='text-center text-xl'>This feature runs normally without root on Android 10 and above with OS AOSP, MIUI, Hyper OS and others</p>
                </> 
                : isReqRootPermission ?
                <>
                    <h1 className="text-3xl text-center font-bold my-5 text-red-500">Permission Denied</h1>
                    <h2 className='text-center text-xl'>Please allow root access for "com.android.shell"</h2>
                    <div className='text-center mt-8'>
                        <img className='m-auto w-40 md:w-52 lg:w-64'src={magiskIconApp} />
                        <h2 className='text-base pb-9'>Open Magisk manager</h2>
                        <img className='m-auto w-40 md:w-52 lg:w-64'src={magiskHome} />
                        <h2 className='text-base pb-9'>Click Superuser tab</h2>
                        <img className='m-auto w-40 md:w-52 lg:w-64'src={magiskEnableShell} />
                        <h2 className='text-base pb-9'>Enable Superuser for "com.android.shell"</h2>
                    </div>
                </>
                : 
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
                    <div className="flex justify-between align-middle">
                        <span className="text-lg font-bold mx-2">{inboxs.length <= 10 ? inboxs.length : inboxShowValue === "*" ? inboxs.length : inboxShowValue}/{inboxs.length}</span>
                        <select defaultValue={inboxs.length <= 10 ? "*" : inboxShowValue} className="select select-primary select-sm w-auto max-w-xs" onChange={(v) => handleInboxsShowOptionChange(v.target.value)}>
                            {
                                inboxs.length <= 10 ?
                                <option 
                                    key="*" 
                                    value="*">
                                        Show All
                                    </option>
                                :
                                inboxsShowOption.map(v => {
                                    if(inboxs.length >= v || v === "*"){ 
                                        return <option 
                                        key={v} 
                                        value={v} >{
                                            v === "*" ? "Show All" : v
                                        }</option>
                                    }
                                }) 
                            }
                        </select>
                    </div>
                    {
                        inboxs.length > 0 ? 
                        finalInboxs.map((inbox) => (
                            <InboxItem key={`${serial}-${inbox.row}`} inbox={inbox} />
                        ))
                        : 
                        <div className='text-center my-10'>
                            <h2 className='text-xl md:text-2xl'>Empty</h2>
                        </div>
                    }
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