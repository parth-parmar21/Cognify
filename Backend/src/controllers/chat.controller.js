import { generateChatTitle, generateResponse } from "../services/ai.service.js"
import { Chat } from "../models/chat.model.js"
import { Message } from "../models/message.model.js"
export async function sendMessage(req, res) {
    const { message, chatId } = req.body
    
    let chat = null
    
    if (chatId) {
        chat = await Chat.findOne({
            _id: chatId,
            user: req.user._id
        })

        if (!chat) {
            return res.status(404)
            .json({
                message: "Chat not found"
            })
        }
    } else{
        chat = await Chat.create({
            user: req.user._id,
            title: await generateChatTitle(message)
        })
    }

        await Message.create({
        chat: chat._id,
        content: message,
        role: "user"
    })

    const messages = await Message.find({ chat: chat._id })

    const result = await generateResponse(messages)

    const aiMessage = await Message.create({
        chat: chatId || chat._id,
        content: result,
        role: "ai"
    })


    res.json({ 
        chat,
        aiMessage
    })
}

export async function getChats(req, res) {
    const user = req.user

    const chat = await Chat.find({
        user: user._id
    })

    if (!chat) {
        return res.status(404).json({
            message: "No chats found"
        })
    }

    res.status(200).json({
        message: "Chat retrieved successfully",
        chat 
    })
}

export async function getMessages(req, res) {
    const { chatId } = req.params
console.log(req.user._id);

    const chat = await Chat.findOne({
        _id: chatId,
        user: req.user._id
    })

    if (!chat) {
        return res.status(404).json({
            message: "Chat not found"
        })
    }
    const messages = await Message.find({ chat: chatId })

    res.status(200).json({
        message: "Messages retrieved successfully",
        messages
    })
}
export async function deleteChat(req, res) {
    const { chatId } = req.params

    const chat = await Chat.findOneAndDelete({
        _id: chatId,
        user: req.user._id
    })

    if (!chat) {
        return res.status(404).json({
            message: "Chat not found"
        })
    }

    await Message.deleteMany({ chat: chatId })

    res.status(200).json({
        message: "Chat deleted successfully"
    })
}
