import { useState } from "react"
import { useNavigate } from "react-router-dom"
// import Swal from 'sweetalert2'

export default function LoginPage() {
    const navigate = useNavigate()
    const [input, setInput] = useState({
        username: "",
        password: ""
    })

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = (e) => {
        e.preventDefault()
        setPasswordVisible(!passwordVisible);
    };

    const handleFormChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        fetch("http://localhost:3000/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(input)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Something went wrong")
                } else {
                    res.json()
                        .then(data => {
                            // Swal.fire(
                            //     'Login Success',
                            //     '',
                            //     'success'
                            // )
                            localStorage.access_token = data.access_token
                            localStorage.id = data.id
                            localStorage.role = data.role
                            navigate('/')
                        })
                }
            })
            .catch(err => {
                console.log(err)
                // Swal.fire({
                //     icon: 'error',
                //     title: 'Something went wrong!',
                // })
            })
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-base-100 w-96 p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-primary mb-4">Login</h1>
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                        <label className="text-sm text-secondary block mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="w-full py-2 px-3 border border-neutral rounded-md"
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            onChange={handleFormChange}
                            value={input.username}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-sm text-secondary block mb-2" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                className="w-full py-2 px-3 border border-neutral rounded-md"
                                type={passwordVisible ? 'text' : 'password'}
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={input.password}
                                onChange={handleFormChange}
                            />
                            <button
                                className="absolute top-0 right-0 mt-2 mr-2 text-secondary cursor-pointer"
                                onClick={togglePasswordVisibility}
                            >
                                {passwordVisible ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>
                    <button
                        className="w-full bg-primary text-white py-2 rounded-md hover:bg-mytheme-accent"
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}