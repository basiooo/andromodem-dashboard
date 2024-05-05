import PropTypes from 'prop-types'
import { MdSignalCellular1Bar, MdSignalCellular2Bar, MdSignalCellular3Bar, MdSignalCellular4Bar } from 'react-icons/md'

const signalLevelToIcon = (data) => {
    const level = data?.level ?? data?.mLevel
    switch (level) {
        case "1":
            return <MdSignalCellular1Bar fontSize={30} />
        case "2":
            return <MdSignalCellular2Bar fontSize={30} />
        case "3":
            return <MdSignalCellular3Bar fontSize={30} />
        case "4":
            return <MdSignalCellular4Bar fontSize={30} />
        default:
            return "Unknown"
    }
}
const SimDetail = ({ carrier }) => {
    return (
        <table className="table">
            <tbody>
                <tr>
                    <td className='text-sm md:text-base'>Operator Name</td>
                    <td className='text-sm md:text-base'>{carrier.name}</td>
                </tr>
                <tr>
                    <td className='text-sm md:text-base'>Network Type</td>
                    <td className='text-sm md:text-base'>{Object.keys(carrier.signal_strength).length === 0 ?  "Unknown" : Object.keys(carrier.signal_strength)[0]}  </td>
                </tr>
                <tr>
                    <td className='text-sm md:text-base'>Sim Slot</td>
                    <td className='text-sm md:text-base'>{carrier.sim_slot}</td>
                </tr>
                <tr>
                    <td className='text-sm md:text-base'>Mobile Data Status</td>
                    <td className='text-sm md:text-base'>{carrier.connection_state.length > 0 ? carrier.connection_state : "Unknown"}</td>
                </tr>
                <tr>
                    <td className='text-sm md:text-base'>Signal Strength</td>
                    <td className='text-sm md:text-base'>{signalLevelToIcon(
                        carrier.signal_strength[Object.keys(carrier.signal_strength)]
                    )}</td>
                </tr>
                {
                    Object.keys(carrier.signal_strength).length > 0 && Object.keys(carrier.signal_strength[Object.keys(carrier.signal_strength)]).length > 0 ?
                        Object.entries(Object.values(carrier.signal_strength)[0]).map(([k, v]) => (
                            <tr key={k}>
                                <td className='text-sm md:text-base'>{k}</td>
                                <td className='text-sm md:text-base'>{v}</td>
                            </tr>
                        ))
                        : 
                        <>
                        <tr>
                            <td colSpan={2} className='text-center text-red-600'>
                                <div>
                                <p>Unable to extract signal strength</p>
                                <p className='text-center'>This feature runs normally on Android 10 or above.</p>
                                </div>
                            </td>
                            
                        </tr>
                        </>
                }
            </tbody>
        </table>
    )
}

SimDetail.propTypes = {
    carrier: PropTypes.object.isRequired,
}
export default SimDetail