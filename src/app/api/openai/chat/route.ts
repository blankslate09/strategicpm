import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY
    const assistantId = process.env.OPENAI_ASSISTANT_ID

    // Add detailed debugging
    console.log('Environment check:', {
      NODE_ENV: process.env.NODE_ENV,
      hasOpenAIKey: !!apiKey,
      hasAssistantId: !!assistantId,
      assistantIdLength: assistantId?.length || 0
    })

    if (!apiKey || !assistantId) {
      throw new Error('OpenAI configuration is incomplete')
    }

    const { messages, portfolioContext } = await req.json()

    // Initialize the OpenAI client
    const openai = new OpenAI({ apiKey })

    // 1. Create a thread
    const thread = await openai.beta.threads.create()

    // 2. Add the portfolio context as the first message
    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: `Portfolio Context:
        - Total Revenue: $${portfolioContext?.totalRevenue || 'N/A'}
        - Average Nightly Rate: $${portfolioContext?.avgNightlyRate || 'N/A'}
        - Occupancy Rate: ${portfolioContext?.occupancy || 'N/A'}%
        - Average Listing Revenue: $${portfolioContext?.avgListingRevenue || 'N/A'}`
    })

    // 3. Add the user's message
    if (Array.isArray(messages)) {
      for (const message of messages) {
        await openai.beta.threads.messages.create(thread.id, {
          role: message.role,
          content: message.content,
        })
      }
    }

    // 4. Run the assistant
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId,
    })

    // 5. Wait for completion
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id)
    while (runStatus.status === 'in_progress' || runStatus.status === 'queued') {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id)
    }

    // 6. Get the assistant's response
    if (runStatus.status === 'completed') {
      const messages = await openai.beta.threads.messages.list(thread.id)
      const lastMessage = messages.data[0]

      if (!lastMessage || !lastMessage.content[0]) {
        throw new Error('No response received from assistant')
      }
      if ('text' in lastMessage.content[0]) {
        return NextResponse.json({
          content: lastMessage.content[0].text.value
        })
      } else {
        throw new Error('Unexpected message content type')
      }
    } else {
      throw new Error(`Run ended with status: ${runStatus.status}`)
    }

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate response' },
      { status: 500 }
    )
  }
}
