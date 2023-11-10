import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.clear()
        navigate('/login')
    }

    return (
        <>
            <nav className="bg-primary p-2">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-white font-bold text-2xl">
                        <Link to={'/'}>
                            <img src={logo} width={"50px"} />
                        </Link>
                    </div>
                    <ul className="flex space-x-4">
                        <li>
                            <a href="#" className="text-white hover:underline">Home</a>
                        </li>
                        <li>
                            <a href="#" className="text-white hover:underline">About</a>
                        </li>
                        <li>
                            <a href="#" className="text-white hover:underline">Services</a>
                        </li>
                        <li>
                            <a href="#" className="text-white hover:underline">Contact</a>
                        </li>
                    </ul>
                    <button className="text-red-400 hover:text-red-600 transition duration-300 ease-in-out transform hover:scale-110" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>
        </>
    );
}
