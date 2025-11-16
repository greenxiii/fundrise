import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Get Telegram bot configuration from environment variables
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!botToken || !chatId) {
      console.error('Telegram bot configuration missing')
      return NextResponse.json(
        { error: 'Telegram bot not configured' },
        { status: 500 }
      )
    }

    // Format the message
    const message = `
📋 *Нова заявка на вакансію*

💼 *Вакансія:* ${formData.vacancyTitle || 'Не вказано'}

👤 *Особисті дані:*
• Прізвище: ${formData.lastName}
• Ім'я: ${formData.firstName}
• По-батькові: ${formData.patronymic}
• Телефон: ${formData.phone}
• Telegram: ${formData.telegram || 'Не вказано'}

📝 *Додаткова інформація:*
• Військовослужбовець: ${formData.isServiceman === 'yes' ? 'Так' : 'Ні'}
• Вік 18-58 років: ${formData.age18to58 ? 'Так' : 'Ні'}

---
_Час подачі: ${new Date().toLocaleString('uk-UA')}_
    `.trim()

    // Send message to Telegram
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Telegram API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to send message to Telegram' },
        { status: response.status }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending to Telegram:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

