import client, { 
  AboutUsContent, 
  ImportantFoundriesContent, 
  PaymentDetailsContent, 
  CommanderContent, 
  DivisionsContent, 
  ReportsContent,
  FAQContent,
  VacanciesContent,
  ContactContent
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
  image?: ContentfulImageLink
  url?: string
}

interface ContentfulImportantFoundriesFields {
  section?: string
  foundries?: ContentfulFoundryFields[]
  images?: ContentfulImageLink[]
  button?: string
}

interface ContentfulPaymentMethodFields {
  name?: string  // Required: Payment method name (e.g., "Реквізити Фонду UAH")
  details?: string  // Required: Payment details content (can contain newlines)
  // Optional fields for backward compatibility:
  title?: string  // Alternative to 'name'
  content?: string  // Alternative to 'details'
  icon?: ContentfulImageLink  // Optional: Icon image (not currently displayed)
}

interface ContentfulPaymentDetailsFields {
  section?: string
  title?: string
  button?: string
  paymentMethods?: ContentfulPaymentMethodFields[]
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
        image: {
          url: matchedImage.url,
          title: matchedImage.title
        },
        url: foundry.url || undefined
      }
    })
    
    return {
      section: fields.section || 'Важливі збори',
      foundries,
      button: fields.button || 'Усі збори'
    }
  } catch {
    // Return fallback data
    return {
      section: 'Важливі збори',
      button: 'Усі збори',
      foundries: [
        {
          title: 'Назва Збору',
          description: 'Опис збору. Ми збираємо на машинку, нам треба зібрати 40к, наразі маємо 10к. Якщо ти ухилес, то маєш взагали закрити збір...',
          image: {
            url: '/block.webp',
            title: 'Foundry Image'
          }
        },
        {
          title: 'Назва Збору',
          description: 'Опис збору. Ми збираємо на машинку, нам треба зібрати 40к, наразі маємо 10к. Якщо ти ухилес, то маєш взагали закрити збір...',
          image: {
            url: '/block.webp',
            title: 'Foundry Image'
          }
        },
        {
          title: 'Назва Збору',
          description: 'Опис збору. Ми збираємо на машинку, нам треба зібрати 40к, наразі маємо 10к. Якщо ти ухилес, то маєш взагали закрити збір...',
          image: {
            url: '/block.webp',
            title: 'Foundry Image'
          }
        },
        {
          title: 'Назва Збору',
          description: 'Опис збору. Ми збираємо на машинку, нам треба зібрати 40к, наразі маємо 10к. Якщо ти ухилес, то маєш взагали закрити збір...',
          image: {
            url: '/block.webp',
            title: 'Foundry Image'
          }
        },
        {
          title: 'Назва Збору',
          description: 'Опис збору. Ми збираємо на машинку, нам треба зібрати 40к, наразі маємо 10к. Якщо ти ухилес, то маєш взагали закрити збір...',
          image: {
            url: '/block.webp',
            title: 'Foundry Image'
          }
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
    const fields = response.fields as unknown as ContentfulPaymentDetailsFields
    
    // Transform paymentMethods from Contentful format (name/details) to component format (title/content)
    const paymentMethods = (fields.paymentMethods || []).map((method: ContentfulPaymentMethodFields) => ({
      title: method.name || method.title || '',
      content: method.details || method.content || ''
    })).filter(method => method.title && method.content) // Filter out empty methods
    
    // If no valid payment methods, throw to use fallback
    if (paymentMethods.length === 0) {
      throw new Error('No valid payment methods found')
    }
    
    return {
      section: fields.section || 'Благодійний фонд',
      title: fields.title || 'Фонд забезпечує дрони, техніку, екіпірування підтримуємо тих, хто тримає небо і землю.',
      paymentMethods
    }
  } catch (error) {
    console.error('Error fetching Payment Details from Contentful:', error)
    // Return fallback data
    return {
      section: 'Благодійний фонд',
      title: 'Фонд забезпечує дрони, техніку, екіпірування підтримуємо тих, хто тримає небо і землю.',
      paymentMethods: [
        {
          title: 'Реквізити Фонду UAH',
          content: 'МоноБанк:\nОтримувач\nБО "БФ "СУППОРТ 2-го МЕХАНІЗОВАНОГО БАТАЛЬЙОНУ"\nIBAN\nUA283220010000026009700005408\nЄДРПОУ\n45831069\n\nАкціонерне товариство\nУНІВЕРСАЛ БАНК\nМФО: 322001\nЄДРПОУ:\n21133352\n\n\nПриватБанк:\nОтримувач\nБО "БФ "СУППОРТ 2-го МЕХАНІЗОВАНОГО БАТАЛЬЙОНУ"\nIBAN\nUA343052990000026009005923755\nЄДРПОУ\n45831069\n\nАКЦІОНЕРНЕ ТОВАРИСТВО КОМЕРЦІЙНИЙ БАНК «ПРИВАТБАНК»\nМФО: 305299\nЄДРПОУ: 14360570'
        },
        {
          title: 'Реквізити Фонду EUR',
          content: 'Назва компанії / company Name: БО БФ СУППОРТ 2-ГО МЕХАН БАТАЛ\nIBAN Code: UA603052990000026000005926115\nНазва банку / Name of the bank: JSC CB "PRIVATBANK", 1D HRUSHEVSKOHO STR., KYIV, 01001, UKRAINE\nSWIFT code банку / Bank SWIFT Code: PBANUA2X\nАдреса компанії / Company address: 64309, УКРАЇНА, ОБЛ. ХАРКІВСЬКА, Р-Н. ІЗЮМСЬКИЙ, М. ІЗЮМ, ВУЛ. РІЗДВЯНА, Б. 9, КВ. 8.'
        },
        {
          title: 'Реквізити Фонду USD',
          content: 'Назва компанії / company Name: БО БФ СУППОРТ 2-ГО МЕХАН БАТАЛ\nIBAN Code: UA093052990000026002015933000\nНазва банку / Name of the bank: JSC CB "PRIVATBANK", 1D HRUSHEVSKOHO STR., KYIV, 01001, UKRAINE\nSWIFT code банку / Bank SWIFT Code: PBANUA2X\nАдреса компанії / Company address: 64309, УКРАЇНА, ОБЛ. ХАРКІВСЬКА, Р-Н. ІЗЮМСЬКИЙ, М. ІЗЮМ, ВУЛ. РІЗДВЯНА, Б. 9, КВ. 8.'
        },
        {
          title: 'Реквізити Фонду PAYPAL',
          content: 'cocf2mb@gmail.com'
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

// Fetch Vacancies content
export async function getVacanciesContent(): Promise<VacanciesContent> {
  try {
    // Check if Contentful is configured
    if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || !process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN) {
      console.warn('Contentful not configured, using fallback data')
      throw new Error('Contentful not configured')
    }

    // Find the vacancies entry by content type
    // Include assets to get image data
    const entries = await client.getEntries({
      content_type: 'vacancies',
      limit: 1,
      include: 10 // Include up to 10 levels of linked assets (images)
    })
    
    if (entries.items.length === 0) {
      throw new Error('No vacancies entries found')
    }
    
    const response = entries.items[0]
    const fields = response.fields as unknown as {
      section?: string
      title?: string
      button?: string
      vacancies?: Array<{
        title?: string
        description?: string
        contract?: string
        salary?: string
        age?: string
        button?: string
      }>
      images?: ContentfulImageLink[]
    }
    
    // Extract and process images array if it exists
    const imageAssets: Array<{ url: string; title: string }> = []
    if (fields.images && Array.isArray(fields.images)) {
      for (const image of fields.images) {
        let imageUrl = '/blank.png' // fallback
        let imageTitle = 'Vacancy Image' // fallback
        
        // Check if image is a link that needs resolution
        if (image.sys) {
          const assetId = image.sys.id
          const asset = entries.includes?.Asset?.find((a) => a.sys.id === assetId)
          if (asset && asset.fields?.file?.url) {
            imageUrl = asset.fields.file.url.startsWith('//') 
              ? `https:${asset.fields.file.url}` 
              : asset.fields.file.url
            imageTitle = asset.fields.title || imageTitle
          }
        } else if (image.fields?.file?.url) {
          imageUrl = image.fields.file.url.startsWith('//') 
            ? `https:${image.fields.file.url}` 
            : image.fields.file.url
          imageTitle = image.fields.title || imageTitle
        } else if (image.url) {
          imageUrl = image.url
          imageTitle = image.title || imageTitle
        }
        
        imageAssets.push({ url: imageUrl, title: imageTitle })
      }
    }
    
    // Transform vacancies array and match with images by position
    const vacancies = (fields.vacancies || []).map((vacancy, index) => {
      // Get image for this position, or use fallback
      const matchedImage = imageAssets[index] || { url: '/blank.png', title: 'Vacancy Image' }
      
      return {
        title: vacancy.title || '',
        description: vacancy.description || '',
        contract: vacancy.contract || '',
        salary: vacancy.salary || '',
        age: vacancy.age || '',
        image: {
          url: matchedImage.url,
          title: matchedImage.title
        }
      }
    })
    
    return {
      section: fields.section || 'Вакансії',
      title: fields.title || 'Усі вакансії',
      button: fields.button || 'Усі вакансії',
      vacancies
    }
  } catch {
    // Return fallback data
    return {
      section: 'Вакансії',
      title: 'Усі вакансії',
      button: 'Усі вакансії',
      vacancies: [
        {
          title: 'Пілот FPV',
          description: 'Кандидат з досвідом роботи в технічній, комп\'ютерній галузі. Володіння технічними засобами не принципово. Технолог, програміст, паяльник. Водійське посвідчення категорії В. Вміння паяти, обслуговувати та ремонтувати електроніку. Досвід обслуговування, діагностики й ремонту електроніки. Високі навички пілотної майстерності.',
          contract: 'Контракт 18-24 -1 млн.грн',
          salary: 'Заробітня плата від 120к грн',
          age: 'Вік: від 18 до 25',
          image: {
            url: '/blank.png',
            title: 'Vacancy Image'
          }
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

// Fetch Contact content
export async function getContactContent(): Promise<ContactContent> {
  try {
    // Check if Contentful is configured
    if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || !process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN) {
      console.warn('Contentful not configured, using fallback data')
      throw new Error('Contentful not configured')
    }

    const entries = await client.getEntries({
      content_type: 'contact',
      limit: 1
    })
    
    if (entries.items.length === 0) {
      throw new Error('No contact entries found')
    }
    
    const response = entries.items[0]
    return response.fields as unknown as ContactContent
  } catch {
    // Return fallback data
    return {
      title: 'ПРИЄДНУЙСЯ — КОЖНА ДОПОМОГА ВАЖЛИВА ДЛЯ НАШИХ ЗАХИСНИКІВ.',
      description: 'Нам неважливо, ким ви є — волонтером, що плете сітки у вільний час, чи підприємцем, який може допомогти фінансово. Кожна дія, кожен внесок — важливі. Саме завдяки людям, які роблять що можуть, ми разом підтримуємо наших бійців і наближаємо перемогу.',
      phone: '+380937823787',
      email: 'charitableorganization@gmail.com',
      instagramUrl: '',
      facebookUrl: ''
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
      
      return {
        title: report.title || '',
        date: report.date || '',
        description: report.description || '',
        image: {
          url: matchedImage.url,
          title: matchedImage.title
        }
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
          }
        }
      ]
    }
  }
}
