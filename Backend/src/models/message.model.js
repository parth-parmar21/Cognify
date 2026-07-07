import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const messageSchema = new Schema({
    chat: { 
        type: Schema.Types.ObjectId, 
        ref: 'Chat', 
        required: true 
    },
    content: { 
        type: String, 
        required: true, 
        trim: true 
    },
    role: {
        type: String,
        required: true,
    }
}, { 
    timestamps: true 
});

export const Message = model('Message', messageSchema);