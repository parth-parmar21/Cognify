import { Router } from "express";
import { getMe, login, register, verifyEmail } from "../controllers/auth.controller.js";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
import { authUser } from "../middleware/auth.middlware.js";

/** 
 * @route POST api/auth/register
 * @access Public
*/
const authRouter = Router()

authRouter.post("/register", registerValidator, register)

/** 
 * @route GET api/auth/verify-email
 * @access Public
 */
authRouter.get("/verify-email", verifyEmail)

/**
 * @route POST api/auth/login
 * @access Public
 */
authRouter.post("/login", loginValidator, login)

/** 
 * @route GET api/auth/me
 * @access Private
 */
authRouter.get("/get-me", authUser, getMe)

export default authRouter