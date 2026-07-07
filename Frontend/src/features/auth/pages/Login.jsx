import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router'
import {useAuth} from '../hook/useAuth.js'
import { useSelector } from 'react-redux'
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { handleLogin } = useAuth()
    const navigate = useNavigate()
    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.auth.loading)

    if (!loading && user) {
        return <Navigate to="/" replace />
    }   
    const handleSubmit = async (e) => {
        e.preventDefault()

        await handleLogin({ email, password })
        navigate('/')
    }

    return (
        <section className="min-h-screen bg-zinc-950 px-4 py-10 text-zinc-100 sm:px-6 lg:px-8">
            <div className="mx-auto flex min-h-[85vh] w-full max-w-5xl items-center justify-center">
                <div className="w-full max-w-md rounded-2xl border border-[#31b8c6]/40 bg-zinc-900/70 p-8 shadow-2xl shadow-black/50 backdrop-blur">

                    <h1 className="text-3xl font-bold text-[#31b8c6]">Welcome Back</h1>

                    <p className="mt-2 text-sm text-zinc-300">Sign in with your email and password.</p>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">

                        <div>
                            <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-200">Email</label>

                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-950/80 px-4 py-3 text-zinc-100 outline-none transition focus:border-[#31b8c6] focus:shadow-[0_0_0_3px_rgba(49,184,198,0.25)]"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="mb-2 block text-sm font-medium text-zinc-200">Password</label>

                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-lg border border-zinc-700 bg-zinc-950/80 px-4 py-3 text-zinc-100 outline-none transition focus:border-[#31b8c6] focus:shadow-[0_0_0_3px_rgba(49,184,198,0.25)]"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-[#31b8c6] px-4 py-3 font-semibold text-zinc-950 transition hover:bg-[#45c7d4]"
                        >
                            Login
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-zinc-300">Don't have an account?{' '}
                        <Link to="/register" className="font-semibold text-[#31b8c6] hover:text-[#45c7d4]">Register</Link>
                    </p>

                </div>
            </div>
        </section>
    )
}

export default Login