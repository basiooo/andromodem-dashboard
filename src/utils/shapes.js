import PropTypes from 'prop-types'

export const DeviceShape = {
    serial: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
}

export const InboxShape = {
    row: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
}
