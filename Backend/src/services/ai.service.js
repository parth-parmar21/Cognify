import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage, AIMessage, tool, createAgent } from "langchain"
import * as z from "zod"
import { searchInternet } from "./internet.service.js";
const model = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY
});

const searchInternetTool = tool(
    searchInternet,
    {
        name: "searchInternet",
        description: "Use this tool to search the internet for information.",
        schema: z.object({
            query: z.string().describe("The search query to look up on the internet.")
        })
    }
)

const agent = createAgent({
    model,
    tools: [searchInternetTool]
})

export async function generateResponse(messages) {
    const response = await agent.invoke({
        messages: [
            new SystemMessage(`
You are a helpful AI assistant.

Formatting rules:
- Always respond in valid GitHub Markdown.
- Use headings (##) for sections.
- Use bullet lists instead of putting every item on a new line.
- Use tables when presenting schedules or comparisons.
- Bold only important labels.
- Never insert blank lines between list items.
- Keep paragraphs short.
- Do not use horizontal rules (---) unless explicitly requested.
- Do not output HTML.
`),
            ...messages.map(msg => {
                if (msg.role == "user") {
                    return new HumanMessage(msg.content);
                } else if (msg.role == "ai") {
                    return new AIMessage(msg.content);
                }
            })]
    })
    return response.messages[response.messages.length - 1].text;
}

export async function generateChatTitle(message) {
    const response = await model.invoke([
        new SystemMessage(`
            You are a helpful assistant that generates concise and descriptive titles for chat conversations.
            
            User will provide you with the first message of a chat conversation, and you will generate a title that captures the essence of the conversation in 1-2 words. The title should be clear, relevant, and engaging, giving users a quick understanding of the chat's topic.
        `),
        new HumanMessage(`
            Generate a title for a chat conversation based on the following first message:
            "${message}" and only return the title, if needed use question mark or dot only
            `)
    ])

    return response.text
}

export async function generateResponseStream(messages, callback) {
    const stream = await model.stream([
        new SystemMessage(`
You are a helpful AI assistant.
Always respond in markdown.
`),

        ...messages.map(msg => {
            if (msg.role === "user") {
                return new HumanMessage(msg.content);
            }

            return new AIMessage(msg.content);
        })
    ]);

    for await (const chunk of stream) {
        if (chunk.content) {
            callback(chunk.content);
        }
    }
}