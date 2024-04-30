import { FaPowerOff, FaTasks } from "react-icons/fa"
import { MdOutlineRestartAlt } from "react-icons/md"

const Advance = () => {
    return (
        <>
            <h1 className="text-2xl text-center font-bold my-5 text-red-500">Coming Soon</h1>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                <div className="card card-compact w-full bg-base-200 shadow-xl md:col-span-2">
                    <div className="card-body">
                        <h3 className="card-title text-xl sm:text-2xl">
                            Automation Tasks
                        </h3>
                        <button className="btn btn-active btn-primary mb-3" disabled>
                            <FaTasks size={20} />
                            Add Task
                        </button>
                    </div>
                </div>
                <div className="card card-compact w-full bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title text-xl sm:text-2xl">
                            Power
                        </h3>
                        <div className="grid grid-cols-2 justify-items-center">
                            <div className="text-center">
                                <button className="btn btn-lg btn-circle bg-red-500 hover:bg-red-700" disabled>
                                    <FaPowerOff size={30} />
                                </button>
                                <p>Power Off</p>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-lg btn-circle bg-orange-500 hover:bg-orange-700" disabled>
                                    <MdOutlineRestartAlt size={30} />
                                </button>
                                <p>Restart</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div></>
    )
}

export default Advance