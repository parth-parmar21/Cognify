import { useDispatch } from "react-redux"
import { setError, setLoading, setUser } from "../auth.slice"
import { register, login, getMe } from "../service/auth.api"

export function useAuth(params) {
    const dispatch = useDispatch()

    async function handleRegister({ email, username, password }) {
        try {
            dispatch(setLoading(true));

            const data = await register({ email, username, password });

            dispatch(setError(null));

            return {
                success: true,
                data
            };

        } catch (error) {

            const response = error.response?.data;

            return {
                success: false,
                message: response?.message,
                field: response?.field,
                errors: response?.errors || []
            };

        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleLogin({ email, password }) {
        try {
            dispatch(setLoading(true));

            const data = await login({ email, password });

            dispatch(setUser(data.user));
            dispatch(setError(null));

            return {
                success: true,
                data
            };

        } catch (error) {

            const response = error.response?.data;

            return {
                success: false,
                message: response?.message,
                field: response?.field,
                errors: response?.errors || []
            };

        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleGetMe() {
        try {
            dispatch(setLoading(true))
            const data = await getMe()
            dispatch(setUser(data.user))
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Failed to fetch user details"))
        } finally {
            dispatch(setLoading(false))
        }
    }

    return {
        handleRegister,
        handleLogin,
        handleGetMe
    }
}