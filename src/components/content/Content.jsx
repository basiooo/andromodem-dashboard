import PropTypes from 'prop-types'
import { useState } from 'react'
import { FaRobot } from 'react-icons/fa'
import { GiNetworkBars } from 'react-icons/gi'
import { IoMdPower } from 'react-icons/io'
import { MdOutlineMessage, MdPermDeviceInformation } from 'react-icons/md'

import { DeviceShape } from '../../utils/shapes'
import Automation from '../automation/Automation'
import DeviceInfo from '../deviceInfo/DeviceInfo'
import InboxList from '../inbox/InboxList'
import Network from '../network/Network'
import Power from '../power/Power'

const Content = ({ device }) => {
    const [activeTab, setActiveTab] = useState('tab-device-info')

    const changeTab = (tabId) => {
        setActiveTab(tabId)
    }
    return (
        <div className="card card-compact w-full bg-base-200 shadow-xl mt-5">
            <div className="card-body">
                <h2 className="card-title text-xl sm:text-2xl">
                    {device.model}
                </h2>
                <div role="tablist" className="tabs tabs-lifted">
                    <button type="button" role="tab" className={`tab text-base ${activeTab === 'tab-device-info' ? 'tab-active' : ''}`} id="tab-device-info" onClick={() => changeTab('tab-device-info')}>
                        <MdPermDeviceInformation  size={23} className='md:hidden'/>
                        <span className='hidden md:block'>Device</span>
                    </button>
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                        <DeviceInfo serial={device.serial} />
                    </div>
                    <button type="button" role="tab" className={`tab text-base ${activeTab === 'tab-network-info' ? 'tab-active' : ''}`} id="tab-network-info" onClick={() => changeTab('tab-network-info')}>
                        <GiNetworkBars  size={23} className='md:hidden'/>
                        <span className='hidden md:block'>Network</span>
                    </button>
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 w-auto">
                        <Network serial={device.serial} />
                    </div>
                    <button type="button" role="tab" className={`tab text-base ${activeTab === 'tab-inbox' ? 'tab-active' : ''}`} id="tab-inbox" onClick={() => changeTab('tab-inbox')}>
                        <MdOutlineMessage size={23} className='md:hidden'/>
                        <span className='hidden md:block'>Inbox</span>
                    </button>
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 w-auto">
                        <InboxList serial={device.serial} />
                    </div>
                    <button type="button" role="tab" className={`tab text-base ${activeTab === 'tab-power' ? 'tab-active' : ''}`} id="tab-power" onClick={() => changeTab('tab-power')}>
                        <IoMdPower  size={23} className='md:hidden'/>
                        <span className='hidden md:block'>Power</span>
                    </button>
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 w-auto">
                        <Power serial={device.serial} />
                    </div>
                    {/* <button type="button" role="tab" className={`tab text-base ${activeTab === 'tab-automation' ? 'tab-active' : ''}`} id="tab-automation" onClick={() => changeTab('tab-automation')}>
                        <FaRobot  size={23} className='md:hidden'/>
                        <span className='hidden md:block'>Automation</span>
                    </button>
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 w-auto">
                        <Automation serial={device.serial} />
                    </div> */}
                </div>
            </div>
        </div>
    )
}

Content.propTypes = {
    device: PropTypes.shape(DeviceShape).isRequired,
}
export default Content