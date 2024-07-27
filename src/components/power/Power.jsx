import PropTypes from 'prop-types'
import { useState } from "react"
import toast from "react-hot-toast"
import { FaAndroid, FaPowerOff } from "react-icons/fa"
import { IoMdSettings } from "react-icons/io"
import { MdOutlineRestartAlt } from "react-icons/md"

import { devicesAPI } from "../../api/devicesApi"

const Power = ({ serial }) => {
    const [option, setOption] = useState("reboot")
    const [isLoading, setIsLoading] = useState(false)
    const handlerPower = (value) => {
        setOption(value)
        document.getElementById('power_modal').showModal()
    }
    const handlePowerExecute = () => {
        (
            async () => {
                try {
                    setIsLoading(true)
                    const result = await devicesAPI.actionDevicePower(
                        serial, {
                            action:option
                        }
                    )
                    if (result?.status === "failed"){
                      throw new Error(result.message)
                    }
                    toast.success(`Success run action ${option.replace('_', ' ')}.`)
                }
                catch (error) {
                    toast.error(error.message)
                }
                finally{
                  setIsLoading(false)
                }
            }
        )()

        document.getElementById('close_power_modal').click()
    }
  return (
    <>
    <dialog id="power_modal" className="modal">
        <div className="modal-box text-center">
            <h3 className="font-bold text-3xl">Confirm</h3>
            <p className="text-xl py-4">Are you sure?</p>
            <div className="modal-action">
            <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn" id="close_power_modal">Close</button>
            </form>
            <button className="btn" onClick={handlePowerExecute}>Confirm</button>
            </div>
        </div>
    </dialog>
      <div className="card card-compact w-full bg-base-200 shadow-xl">
        <div className="card-body">
          <div className="grid grid-cols-2 justify-items-center gap-10">
            <div className="text-center w-fit">
              <button disabled={isLoading} className="btn w-16 h-16 md:w-24 md:h-24 btn-circle bg-red-500 hover:bg-red-700" onClick={() => handlerPower("power_off")}>
                <FaPowerOff className="text-2xl md:text-4xl" />
              </button>
              <p className="text-base md:text-xl">Power Off</p>
            </div>
            <div className="text-center w-fit">
              <button disabled={isLoading} className="btn w-16 h-16 md:w-24 md:h-24 btn-circle bg-red-500 hover:bg-red-700" onClick={() => handlerPower("reboot")}>
                <MdOutlineRestartAlt className="text-2xl md:text-4xl" />
              </button>
              <p className="text-base md:text-xl">Reboot</p>
            </div>
            <div className="text-center w-fit">
              <button disabled={isLoading} className="btn w-16 h-16 md:w-24 md:h-24 btn-circle bg-red-500 hover:bg-red-700" onClick={() => handlerPower("reboot_recovery")}>
                <IoMdSettings className="text-2xl md:text-4xl" />
              </button>
              <p className="text-base md:text-xl">Reboot Recovery</p>
            </div>
            <div className="text-center w-fit">
              <button disabled={isLoading} className="btn w-16 h-16 md:w-24 md:h-24 btn-circle bg-red-500 hover:bg-red-700" onClick={() => handlerPower("reboot_bootloader")}>
                <FaAndroid className="text-2xl md:text-4xl" />
              </button>
              <p className="text-base md:text-xl">Reboot Bootloader</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Power.propTypes = {
    serial: PropTypes.string.isRequired,
}
export default Power
