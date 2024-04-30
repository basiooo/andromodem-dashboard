import PropTypes from 'prop-types'

const InboxItemSkeleton = ({ count = 2 }) => {
    const skeletons = Array.from({ length: count }, (_, index) => (
        <div className="skeleton w-full min-h-20 p-5 my-2" key={index}>
        </div>
    ))

    return <>{skeletons}</>
}
InboxItemSkeleton.propTypes = {
    count: PropTypes.number,
}

export default InboxItemSkeleton