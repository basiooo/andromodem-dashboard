import { FaHeart } from "react-icons/fa"

import { config } from "../../config"

const Footer = () => {
    return (
        <footer className="footer footer-center p-4 bg-base-300 text-base-content">
            <aside>
                <p>Version {config.VERSION} (Alpha)</p>
                <p>
                    Made with
                    <FaHeart className="mx-3 inline text-lg animate-bounce text-pink-600" />
                    in Nganjuk, Indonesia
                </p>
                <p className="text-md">2024 - <a className="link" href="https://github.com/basiooo">Bagas Julianto</a></p>
            </aside>
        </footer>
    )
}

export default Footer
