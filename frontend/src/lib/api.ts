import client, { 
  AboutUsContent, 
  ImportantFoundriesContent, 
  PaymentDetailsContent, 
  CommanderContent, 
  DivisionsContent, 
  ReportsContent 
} from './contentful'

// Fetch About Us content
export async function getAboutUsContent(): Promise<AboutUsContent> {
  try {
    // Check if Contentful is configured
    if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || !process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN) {
      console.warn('Contentful not configured, using fallback data')
      throw new Error('Contentful not configured')
    }

    // Find the aboutUs entry by content type instead of hardcoded ID
    const entries = await client.getEntries({
      content_type: 'aboutUs',
      limit: 1
    })
    
    if (entries.items.length === 0) {
      throw new Error('No aboutUs entries found')
    }
    
    const response = entries.items[0]
    return response.fields as unknown as AboutUsContent
  } catch (error) {
    console.warn('Using fallback data for About Us content:', error instanceof Error ? error.message : 'Unknown error')
    // Return fallback data
    return {
      section: "Трошки про нас",
      header: {
        title: "2 МЕХ.БАТАЛЬЙОН",
        subtitle: "ВИНИК ЯК ДОБРОВОЛЬЧИЙ ПІДРОЗДІЛ",
      },
      descriptionBlocks: [
        {
          value: "Пару фактів про вас.Бійці «2-го Механізованого Батальйону» обороняли Харківщину та одні зперших вийшли на кордоніз РФ під час контрнаступу вересні 2022-го",
        },
        {
          value: "Пару фактів про вас.Бійці «2-го Механізованого Батальйону» обороняли Харківщину та одні зперших вийшли на кордоніз РФ під час контрнаступу вересні 2022-го",
        },
        {
          value: "Пару фактів про вас.Бійці «2-го Механізованого Батальйону» обороняли Харківщину та одні зперших вийшли на кордоніз РФ під час контрнаступу вересні 2022-го",
        }
      ],
      button: "Дізнатись більше",
    }
  }
}

// Fetch Important Foundries content
export async function getImportantFoundriesContent(): Promise<ImportantFoundriesContent> {
  try {
    // Check if Contentful is configured
    if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || !process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN) {
      console.warn('Contentful not configured, using fallback data')
      throw new Error('Contentful not configured')
    }

    // Find the importantFoundries entry by content type
    const entries = await client.getEntries({
      content_type: 'importantFoundries',
      limit: 1
    })
    
    if (entries.items.length === 0) {
      throw new Error('No importantFoundries entries found')
    }
    
    const response = entries.items[0]
    return response.fields as unknown as ImportantFoundriesContent
  } catch (error) {
    console.warn('Using fallback data for Important Foundries content:', error instanceof Error ? error.message : 'Unknown error')
    // Return fallback data
    return {
      section: 'Важливі збори',
      foundries: [
        {
          title: 'Назва Збору',
          description: 'Опис збору. Ми збираємо на машинку, нам треба зібрати 40к, наразі маємо 10к. Якщо ти ухилес, то маєш взагали закрити збір...',
          button: 'Задонатити',
          image: {
            url: '/block.webp',
            title: 'Foundry Image'
          },
          variant: 'horizontal',
          size: 'medium',
        },
        {
          title: 'Назва Збору',
          description: 'Опис збору. Ми збираємо на машинку, нам треба зібрати 40к, наразі маємо 10к. Якщо ти ухилес, то маєш взагали закрити збір...',
          button: 'Задонатити',
          image: {
            url: '/block.webp',
            title: 'Foundry Image'
          },
          variant: 'horizontal',
          size: 'medium',
        },
        {
          title: 'Назва Збору',
          description: 'Опис збору. Ми збираємо на машинку, нам треба зібрати 40к, наразі маємо 10к. Якщо ти ухилес, то маєш взагали закрити збір...',
          button: 'Задонатити',
          image: {
            url: '/block.webp',
            title: 'Foundry Image'
          },
          variant: 'vertical',
          size: 'small',
        },
        {
          title: 'Назва Збору',
          description: 'Опис збору. Ми збираємо на машинку, нам треба зібрати 40к, наразі маємо 10к. Якщо ти ухилес, то маєш взагали закрити збір...',
          button: 'Задонатити',
          image: {
            url: '/block.webp',
            title: 'Foundry Image'
          },
          variant: 'vertical',
          size: 'small',
        },
        {
          title: 'Назва Збору',
          description: 'Опис збору. Ми збираємо на машинку, нам треба зібрати 40к, наразі маємо 10к. Якщо ти ухилес, то маєш взагали закрити збір...',
          button: 'Задонатити',
          image: {
            url: '/block.webp',
            title: 'Foundry Image'
          },
          variant: 'vertical',
          size: 'small',
        }
      ]
    }
  }
}

// Fetch Payment Details content
export async function getPaymentDetailsContent(): Promise<PaymentDetailsContent> {
  try {
    // Check if Contentful is configured
    if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || !process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN) {
      console.warn('Contentful not configured, using fallback data')
      throw new Error('Contentful not configured')
    }

    const entries = await client.getEntries({
      content_type: 'paymentDetails',
      limit: 1
    })
    
    if (entries.items.length === 0) {
      throw new Error('No paymentDetails entries found')
    }
    
    const response = entries.items[0]
    return response.fields as unknown as PaymentDetailsContent
  } catch (error) {
    console.warn('Using fallback data for Payment Details content:', error instanceof Error ? error.message : 'Unknown error')
    // Return fallback data
    return {
      section: 'Способи оплати',
      title: 'Як підтримати',
      description: 'Опис способів підтримки',
      paymentMethods: [
        {
          name: 'Банківська карта',
          details: 'Переказ на карту',
        },
        {
          name: 'Криптовалюта',
          details: 'Bitcoin, Ethereum',
        }
      ]
    }
  }
}

// Fetch Commander content
export async function getCommanderContent(): Promise<CommanderContent> {
  try {
    // Check if Contentful is configured
    if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || !process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN) {
      console.warn('Contentful not configured, using fallback data')
      throw new Error('Contentful not configured')
    }

    const entries = await client.getEntries({
      content_type: 'commander',
      limit: 1
    })
    
    if (entries.items.length === 0) {
      throw new Error('No commander entries found')
    }
    
    const response = entries.items[0]
    return response.fields as unknown as CommanderContent
  } catch (error) {
    console.warn('Using fallback data for Commander content:', error instanceof Error ? error.message : 'Unknown error')
    // Return fallback data
    return {
      section: 'Командир',
      title: 'Командир підрозділу',
      description: 'Опис командира',
      image: {
        url: '/commander.webp',
        title: 'Commander Image'
      },
      button: 'Дізнатись більше'
    }
  }
}

// Fetch Divisions content
export async function getDivisionsContent(): Promise<DivisionsContent> {
  try {
    // Check if Contentful is configured
    if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || !process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN) {
      console.warn('Contentful not configured, using fallback data')
      throw new Error('Contentful not configured')
    }

    const entries = await client.getEntries({
      content_type: 'divisions',
      limit: 1
    })
    
    if (entries.items.length === 0) {
      throw new Error('No divisions entries found')
    }
    
    const response = entries.items[0]
    return response.fields as unknown as DivisionsContent
  } catch (error) {
    console.warn('Using fallback data for Divisions content:', error instanceof Error ? error.message : 'Unknown error')
    // Return fallback data
    return {
      section: 'Підрозділи',
      title: 'Наші підрозділи',
      description: 'Опис підрозділів',
      divisions: [
        {
          name: 'Підрозділ 1',
          description: 'Опис підрозділу',
          image: {
            url: '/block.webp',
            title: 'Division Image'
          }
        }
      ]
    }
  }
}

// Fetch Reports content
export async function getReportsContent(): Promise<ReportsContent> {
  try {
    // Check if Contentful is configured
    if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || !process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN) {
      console.warn('Contentful not configured, using fallback data')
      throw new Error('Contentful not configured')
    }

    const entries = await client.getEntries({
      content_type: 'reports',
      limit: 1
    })
    
    if (entries.items.length === 0) {
      throw new Error('No reports entries found')
    }
    
    const response = entries.items[0]
    return response.fields as unknown as ReportsContent
  } catch (error) {
    console.warn('Using fallback data for Reports content:', error instanceof Error ? error.message : 'Unknown error')
    // Return fallback data
    return {
      section: 'Звіти',
      title: 'Наші звіти',
      description: 'Опис звітів',
      reports: [
        {
          title: 'Звіт за місяць',
          date: '2024-01-01',
          description: 'Опис звіту'
        }
      ]
    }
  }
}
