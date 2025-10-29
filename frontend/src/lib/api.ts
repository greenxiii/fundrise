import client, { 
  AboutUsContent, 
  ImportantFoundriesContent, 
  PaymentDetailsContent, 
  CommanderContent, 
  DivisionsContent, 
  ReportsContent,
  FAQContent
} from './contentful'

// Types for Contentful API responses
interface ContentfulImageLink {
  sys?: { id: string }
  url?: string
  title?: string
  fields?: {
    title?: string
    file?: {
      url: string
    }
  }
}

interface ContentfulFoundryFields {
  title?: string
  description?: string
  button?: string
  image?: ContentfulImageLink
  variant?: 'horizontal' | 'vertical'
  size?: 'small' | 'medium' | 'large'
}

interface ContentfulImportantFoundriesFields {
  section?: string
  foundries?: ContentfulFoundryFields[]
  images?: ContentfulImageLink[]
}

interface ContentfulReportFields {
  title?: string
  date?: string
  description?: string
}

interface ContentfulReportsFields {
  section?: string
  title?: string
  subtitle?: string
  description?: string
  reports?: ContentfulReportFields[]
  images?: ContentfulImageLink[]
}

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
          value: "Пару фактів про вас.",
        },
        {
          value: "Пару фактів про вас.",
        },
        {
          value: "Пару фактів про вас.",
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
      throw new Error('Contentful not configured')
    }

    // Find the importantFoundries entry by content type
    // Include assets to get image data
    const entries = await client.getEntries({
      content_type: 'importantFoundries',
      limit: 1,
      include: 10 // Include up to 10 levels of linked assets (images)
    })
    
    if (entries.items.length === 0) {
      throw new Error('No importantFoundries entries found')
    }
    
    const response = entries.items[0]
    const fields = response.fields as unknown as ContentfulImportantFoundriesFields
    
    // Extract and process images array
    const imageAssets: Array<{ url: string; title: string }> = []
    if (fields.images && Array.isArray(fields.images)) {
      for (const image of fields.images) {
        let imageUrl = '/block.webp' // fallback
        let imageTitle = 'Foundry Image' // fallback
        
        // Check if image is a link that needs resolution
        if (image.sys) {
          const assetId = image.sys.id
          // Find the asset in the includes
          const asset = entries.includes?.Asset?.find((a) => a.sys.id === assetId)
          if (asset && asset.fields?.file?.url) {
            imageUrl = asset.fields.file.url.startsWith('//') 
              ? `https:${asset.fields.file.url}` 
              : asset.fields.file.url
            imageTitle = asset.fields.title || imageTitle
          }
        }
        // Handle case where image might already have fields
        else if (image.fields?.file?.url) {
          imageUrl = image.fields.file.url.startsWith('//') 
            ? `https:${image.fields.file.url}` 
            : image.fields.file.url
          imageTitle = image.fields.title || imageTitle
        }
        // Handle case where image has direct URL
        else if (image.url) {
          imageUrl = image.url
          imageTitle = image.title || imageTitle
        }
        
        imageAssets.push({ url: imageUrl, title: imageTitle })
      }
    }
    
    // Transform foundries array and match with images by position
    const foundries = (fields.foundries || []).map((foundry: ContentfulFoundryFields, index: number) => {
      // Get image for this position, or use fallback
      const matchedImage = imageAssets[index] || { url: '/blank.png', title: 'Foundry Image' }
      
      return {
        title: foundry.title || '',
        description: foundry.description || '',
        button: foundry.button || '',
        image: {
          url: matchedImage.url,
          title: matchedImage.title
        },
        variant: foundry.variant || 'horizontal',
        size: foundry.size || 'medium'
      }
    })
    
    return {
      section: fields.section || 'Важливі збори',
      foundries
    }
  } catch {
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
  } catch {
    // Return fallback data
    return {
      section: 'Благодійний фонд',
      title: 'Фонд забезпечує дрони, техніку, екіпірування підтримуємо тих, хто тримає небо і землю.',
      button: 'Дізнатись більше',
      paymentMethods: [
        {
          title: 'Реквізити Фонду UAH',
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
        },
        {
          title: 'Реквізити Фонду EUR',
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
        },
        {
          title: 'Реквізити Фонду USD',
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
        },
        {
          title: 'Реквізити Фонду PAYPAL',
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
        },
        {
          title: 'Реквізити Crypto',
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.'
        }
      ]
    }
  }
}

// Fetch FAQ content
export async function getFAQContent(): Promise<FAQContent> {
  try {
    // Check if Contentful is configured
    if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || !process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN) {
      console.warn('Contentful not configured, using fallback data')
      throw new Error('Contentful not configured')
    }

    const entries = await client.getEntries({
      content_type: 'faq',
      limit: 1
    })
    
    if (entries.items.length === 0) {
      throw new Error('No faq entries found')
    }
    
    const response = entries.items[0]
    return response.fields as unknown as FAQContent
  } catch {
    // Return fallback data
    return {
      section: 'Питання відповіді',
      title: 'Часті питання',
      questions: [
        {
          title: 'Як я можу допомогти?',
          content: 'Ви можете допомогти нам різними способами: фінансовою підтримкою, волонтерством або поширенням інформації про наш фонд.'
        },
        {
          title: 'Куди йдуть кошти?',
          content: 'Всі кошти направляються на забезпечення нашим захисникам дронів, техніки та необхідного екіпірування.'
        },
        {
          title: 'Як відстежити використання коштів?',
          content: 'Ми регулярно публікуємо звіти про використання коштів у розділі "Звіти".'
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

    // Find the reports entry by content type
    // Include assets to get image data
    const entries = await client.getEntries({
      content_type: 'reports',
      limit: 1,
      include: 10 // Include up to 10 levels of linked assets (images)
    })
    
    if (entries.items.length === 0) {
      throw new Error('No reports entries found')
    }
    
    const response = entries.items[0]
    const fields = response.fields as unknown as ContentfulReportsFields
    
    // Extract and process images array
    const imageAssets: Array<{ url: string; title: string }> = []
    if (fields.images && Array.isArray(fields.images)) {
      for (const image of fields.images) {
        let imageUrl = '/blank.png' // fallback
        let imageTitle = 'Report Image' // fallback
        
        // Check if image is a link that needs resolution
        if (image.sys) {
          const assetId = image.sys.id
          // Find the asset in the includes
          const asset = entries.includes?.Asset?.find((a) => a.sys.id === assetId)
          if (asset && asset.fields?.file?.url) {
            imageUrl = asset.fields.file.url.startsWith('//') 
              ? `https:${asset.fields.file.url}` 
              : asset.fields.file.url
            imageTitle = asset.fields.title || imageTitle
          }
        }
        // Handle case where image might already have fields
        else if (image.fields?.file?.url) {
          imageUrl = image.fields.file.url.startsWith('//') 
            ? `https:${image.fields.file.url}` 
            : image.fields.file.url
          imageTitle = image.fields.title || imageTitle
        }
        // Handle case where image has direct URL
        else if (image.url) {
          imageUrl = image.url
          imageTitle = image.title || imageTitle
        }
        
        imageAssets.push({ url: imageUrl, title: imageTitle })
      }
    }
    
    // Transform reports array and match with images by position
    const reports = (fields.reports || []).map((report: ContentfulReportFields, index: number) => {
      // Get image for this position, or use fallback
      const matchedImage = imageAssets[index] || { url: '/blank.png', title: 'Report Image' }
      
      // First two reports are horizontal, rest are vertical (same pattern as foundries)
      const variant: 'horizontal' | 'vertical' = index < 2 ? 'horizontal' : 'vertical'
      
      return {
        title: report.title || '',
        date: report.date || '',
        description: report.description || '',
        image: {
          url: matchedImage.url,
          title: matchedImage.title
        },
        variant
      }
    })
    
    return {
      section: fields.section || 'Звіти',
      title: fields.title || 'ПРОЗОРІ ЗВІТИ — НАША',
      subtitle: fields.subtitle || 'ВІДПОВІДАЛЬНІСТЬ',
      description: fields.description || 'Опис звітів',
      reports
    }
  } catch (error) {
    console.warn('Using fallback data for Reports content:', error instanceof Error ? error.message : 'Unknown error')
    // Return fallback data
    return {
      section: 'Звіти',
      title: 'ПРОЗОРІ ЗВІТИ — НАША',
      subtitle: 'ВІДПОВІДАЛЬНІСТЬ',
      description: 'Опис звітів',
      reports: [
        {
          title: 'Звіт за місяць',
          date: '2024-01-01',
          description: 'Опис звіту',
          image: {
            url: '/blank.png',
            title: 'Report Image'
          },
          variant: 'horizontal'
        }
      ]
    }
  }
}
