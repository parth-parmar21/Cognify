import { User } from "../models/user.model.js"
import { sendEmail } from "../services/mail.service.js"
import jwt from 'jsonwebtoken'

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 * @body { username, email, password }
 */
export async function register(req, res) {
    const { username, email, password } = req.body
    console.log(username, email, password);

    const isUserExists = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (isUserExists) {
        return res.status(409).json({
            message: "User already exists with this email or username",
            success: false,
            field: "email"
        })
    }

    const user = await User.create({
        username,
        email,
        password
    })

    const emailVerificationToken = jwt.sign({
        email: user.email
    }, process.env.JWT_SECRET, { expiresIn: '1d' })

    await sendEmail({
        to: email,
        subject: "Welcome to Perplexity!",
        html: `
                <p>Hi ${username},</p>
                <p>Thank you for registering at <strong>Cognify</strong>. We're excited to have you on board!</p>
                <p>Please verify your email address by clicking the link below:</p>
                <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
                <p>If you did not create an account, please ignore this email.</p>
                <p>Best regards,<br>The Perplexity Team</p>
        `
    })

    return res.status(201).json({
        message: "User registered successfully",
        success: true,
        user: {
            _id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

/**
 * @desc Verify user's email address
 * @route GET /api/auth/verify-email
 * @access Public
 * @query { token }
 */
export async function verifyEmail(req, res) {
    try {
        const { token } = req.query

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ email: decoded.email })

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        user.verified = true
        await user.save()

        const html = `
        <h1>Email Verified</h1>
            <p>Your email has been verified successfully!.Now you can login.</p>
            <a href="http://localhost:3000/login">Log in</a>
        `

        return res.send(html)
    } catch (err) {
        return res.status(400).json({
            message: "Invalid or expried token",
            success: false,
            err: err.message
        })
    }
}

/**
 * @desc Login a user
 * @route POST /api/auth/login
 * @access Public
 * @body { email, password }
 */

export async function login(req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return res.status(404).json({
            success: false,
            field: "email",
            message: "Email not found"
        })
    }

    const isPasswordValid = await user.comparePassword(password)


    if (!isPasswordValid) {
        return res.status(401).json({
            success: false,
            field: "password",
            message: "Invalid password"
        })
    }

    if (!user.verified) {
        return res.status(400).json({
            success: false,
            field: "email",
            message: "Please verify your email before logging in"
        })
    }
    
    const token = jwt.sign({
        _id: user._id,
        email: user.email
    }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.cookie("token", token)

    return res.status(200).json({
        message: "Login successful",
        success: true,
        user: {
            _id: user._id,
            username: user.username,
            email: user.email
        }
    })

}

/**
 * @desc Get the current logged-in user
 * @route GET /api/auth/me
 * @access Private
 */
export async function getMe(req, res) {
    const userId = req.user._id

    const user = await User.findById(userId)

    if (!user) {
        return res.status(404).json({
            message: "User not found",
            success: false,
            err: "User not found"
        })
    }

    return res.status(200).json({
        message: "User found",
        success: true,
        user
    })
}