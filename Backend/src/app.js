import cookieParser from 'cookie-parser'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors' 
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cors({
    origin: `${process.env.FRONTEND_URL}`,
    credentials: true,
}))
import authRouter from './routes/auth.routes.js'
import chatRouter from "./routes/chat.routes.js"

app.use('/api/auth', authRouter)
app.use("/api/chats", chatRouter)
export default app