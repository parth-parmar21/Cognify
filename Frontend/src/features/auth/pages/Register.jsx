import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hook/useAuth'
import toast from "react-hot-toast";

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({});

    const navigate = useNavigate()
    const { handleRegister } = useAuth()
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await handleRegister({
            username,
            email,
            password
        });

        if (result.success) {
            toast.success(
                "Verification email sent. Please check your inbox."
            );

            setUsername("");
            setEmail("");
            setPassword("");
            setErrors({});

            return;
        }

        const fieldErrors = {};

        result.errors.forEach(err => {
            fieldErrors[err.path] = err.msg;
        });

        if (result.field) {
            fieldErrors[result.field] = result.message;
        }

        setErrors(fieldErrors);
    };

    return (
        <section className="min-h-screen bg-zinc-950 px-4 py-10 text-zinc-100 sm:px-6 lg:px-8">
            <div className="mx-auto flex min-h-[85vh] w-full max-w-5xl items-center justify-center">
                <div className="w-full max-w-md rounded-2xl border border-[#999]/40 bg-zinc-900/70 p-8 shadow-2xl shadow-black/50 backdrop-blur">

                    <h1 className="text-3xl font-bold text-zinc-300">Create Account</h1>

                    <p className="mt-2 text-sm text-zinc-300">Register with your username, email, and password.</p>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">

                        <div>
                            <label htmlFor="username" className="mb-2 block text-sm font-medium text-zinc-200">Username</label>

                            <input
                                id="username"
                                type="text"
                                placeholder="Choose a username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-950/80 px-4 py-3 text-zinc-100 outline-none transition focus:border-[#999] focus:shadow-[0_0_0_3px_rgba(49,184,198,0.25)]"
                            />
                            {errors.username && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.username}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-200">Email</label>

                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-950/80 px-4 py-3 text-zinc-100 outline-none transition focus:border-[#999] focus:shadow-[0_0_0_3px_rgba(49,184,198,0.25)]"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="mb-2 block text-sm font-medium text-zinc-200">Password</label>

                            <input
                                id="password"
                                type="password"
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-950/80 px-4 py-3 text-zinc-100 outline-none transition focus:border-[#999] focus:shadow-[0_0_0_3px_rgba(49,184,198,0.25)]"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.password}
                                </p>
                            )}
                        </div>
                        {errors.server && (
                            <p className="mb-4 text-center text-red-500">
                                {errors.server}
                            </p>
                        )}
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-[#31b8c6] px-4 py-3 font-semibold text-zinc-950 transition hover:bg-[#45c7d4] active:scale-95"
                        >
                            Register
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-zinc-300">Already have an account?{' '}
                        <Link to="/login" className="font-semibold text-zinc-300 hover:text-[#45c7d4]">Login</Link>
                    </p>

                </div>
            </div>
        </section>
    )
}

export default Register