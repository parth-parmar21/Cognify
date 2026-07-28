import { tavily } from '@tavily/core'

const tvly = tavily({
    apiKey: process.env.TAVILY_API_KEY
})

export async function searchInternet({query}) {
    const result =  await tvly.search(query, {
        maxResults: 5
    })

    return JSON.stringify(result)
}