import { createClient } from 'contentful'

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
})

export default client

// Content Types
export interface AboutUsContent {
  section: string
  header: {
    title: string
    subtitle: string
  }
  descriptionBlocks: Array<{
    value: string
  }>
  button: string
}

export interface Foundry {
  title: string
  description: string
  button: string
  image: {
    url: string
    title: string
  }
  variant: 'horizontal' | 'vertical'
  size: 'small' | 'medium' | 'large'
}

export interface ImportantFoundriesContent {
  section: string
  foundries: Foundry[]
}

export interface PaymentDetailsContent {
  section: string
  title: string
  button: string
  paymentMethods: Array<{
    title: string
    content: string
  }>
}

export interface FAQContent {
  section: string
  title: string
  questions: Array<{
    title: string
    content: string
  }>
}

export interface CommanderContent {
  section: string
  title: string
  description: string
  image: {
    url: string
    title: string
  }
  button: string
}

export interface Division {
  name: string
  description: string
  image: {
    url: string
    title: string
  }
}

export interface DivisionsContent {
  section: string
  title: string
  description: string
  divisions: Division[]
}

export interface Report {
  title: string
  date: string
  description: string
  image: {
    url: string
    title: string
  }
  variant: 'horizontal' | 'vertical'
}

export interface ReportsContent {
  section: string
  title: string
  subtitle: string
  description: string
  reports: Report[]
}
