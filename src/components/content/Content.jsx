import PropTypes from 'prop-types'
import { useState } from 'react'

import { DeviceShape } from '../../utils/shapes'
import InboxList from '../inbox/InboxList'
import Network from '../network/Network'

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
                    <button type="button" role="tab" className={`tab text-lg ${activeTab === 'tab-device-info' ? 'tab-active' : ''}`} id="tab-device-info" onClick={() => changeTab('tab-device-info')}>
                        Device
                    </button>
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">Tab content 1</div>
                    <button type="button" role="tab" className={`tab text-lg ${activeTab === 'tab-network-info' ? 'tab-active' : ''}`} id="tab-network-info" onClick={() => changeTab('tab-network-info')}>
                        Network
                    </button>
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 w-auto">
                        <Network serial={device.serial} />
                    </div>
                    <button type="button" role="tab" className={`tab text-lg ${activeTab === 'tab-inbox' ? 'tab-active' : ''}`} id="tab-inbox" onClick={() => changeTab('tab-inbox')}>
                        Inbox
                    </button>
                    <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 w-auto">
                        <InboxList serial={device.serial} />
                    </div>
                    <button type="button" role="tab" className={`tab text-lg ${activeTab === 'tab-advance' ? 'tab-active' : ''}`} id="tab-advance" onClick={() => changeTab('tab-advance')}>
                        Advance
                    </button>
                </div>
            </div>
        </div>
    )
}

Content.propTypes = {
    device: PropTypes.shape(DeviceShape).isRequired,
}
export default Content