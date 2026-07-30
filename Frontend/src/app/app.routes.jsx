import { createBrowserRouter, Navigate } from "react-router";
import Register from "../features/auth/pages/Register.jsx";
import Login from "../features/auth/pages/Login.jsx";
import Protected from "../features/auth/components/Protected.jsx";
import Chat from "../features/chat/pages/Chat.jsx";
import NotFoundPage from "../features/NotFoundPage.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Protected><Chat /></Protected>
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/dashboard",
        element: <Navigate to="/" replace />
    },
    {
        path: "*",
        element: <NotFoundPage />
    }
])