const Automation = () => {
    return (
        <>
            {/* <h1 className="text-3xl text-center font-bold my-5 text-red-500">Coming Soon</h1>
            <h1 className="text-xl text-center font-bold mb-5 text-red-500">UI Preview Only</h1> */}
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className="card card-compact w-full bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title text-xl sm:text-2xl">
                            Automation Tasks
                        </h3>
                        <div className="form-control">
                            <label className="label cursor-pointer justify-start w-fit">
                                <span className="label-text font-bold mr-5">Enable</span> 
                                <input type="checkbox" disabled className="checkbox checkbox-primary" />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text font-bold">URL Test</span>
                            </div>
                            <input type="text" placeholder="https://google.com" className="input input-bordered input-primary  w-full" />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text font-bold">Action</span>
                            </div>
                            <select className="select select-primary select-md w-full">
                            <option>Enable/Disable Airplane Mode</option>
                            <option>Enable/Disable Mobile Data</option>
                            </select>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="form-control w-full ">
                            <div className="label">
                                <span className="label-text font-bold">Delay for next ping (second)</span>
                            </div>
                            <input type="text" placeholder="10" className="input input-bordered input-primary  w-full" />
                            </label>
                        </div>
                        <button  className="btn cursor-not-allowed no-animation btn-primary text-xl">Apply</button>
                    </div>
                </div>
                <div className="card card-compact w-full bg-base-200 shadow-xl">
                    <div className="card-body">
                        <h3 className="card-title text-xl sm:text-2xl">
                            Logs
                        </h3>
                        <div className="mockup-code w-full">
                            <div className="h-80 overflow-scroll">
                            <pre data-prefix=">" className="text-warning"><code>Example Logs</code></pre>
                            {/* <pre data-prefix=">" className="text-success"><code>Coming soon</code></pre> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Automation