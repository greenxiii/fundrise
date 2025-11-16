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
  image: {
    url: string
    title: string
  }
  url?: string
}

export interface ImportantFoundriesContent {
  section: string
  foundries: Foundry[]
  button?: string
}

export interface PaymentDetailsContent {
  section: string
  title: string
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

export interface Vacancy {
  title: string
  description: string
  image: {
    url: string
    title: string
  }
  contract?: string
  salary?: string
  age?: string
}

export interface VacanciesContent {
  section: string
  title: string
  button: string
  vacancies: Vacancy[]
  images?: Array<{
    url: string
    title: string
  }>
}

export interface ContactContent {
  title: string
  description: string
  phone: string
  email: string
  instagramUrl?: string
  facebookUrl?: string
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
  title?: string
  date: string
  description: string
  image: {
    url: string
    title: string
  }
}

export interface ReportsContent {
  section: string
  title: string
  subtitle: string
  description: string
  reports: Report[]
}
