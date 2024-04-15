import PropTypes from 'prop-types'
import { Anchorme } from "react-anchorme"

import { InboxShape } from '../../utils/shapes'

const CustomLink = (props) => {
    return (
        <a className="link" {...props} />
    )
}
const InboxItem = ({ inbox }) => {
    return (
        <div className="collapse collapse-arrow  bg-base-200 my-2">
            <input type="checkbox" className="peer" />
            <div className="collapse-title text-lg bg-base-300 peer-checked:bg-base-200">
                {inbox.address}
                <p className='text-sm text-gray-500'>
                    {inbox.date}
                </p>
            </div>
            <div className="collapse-content bg-base-200 border-t pt-3 text-lg w-auto">
                <Anchorme linkComponent={CustomLink} target="_blank" rel="noreferrer noopener">
                    {inbox.body}
                </Anchorme>
            </div>
        </div>
    )
}

InboxItem.propTypes = {
    inbox: PropTypes.shape(InboxShape).isRequired,
}
export default InboxItem