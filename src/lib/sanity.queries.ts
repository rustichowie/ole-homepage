import type { PortableTextBlock } from '@portabletext/types'
import type { Image, Slug } from '@sanity/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`
export const landingPage = groq`*[_type == "landingPage"][0]{
  _id, title, subTitle, images, ctaLabel, ctaLink,contactPhone,contactEmail,
  highlightedJobs[]->,
  highlightedServices[]->
}`

export async function getFrontPage(client: SanityClient): Promise<LandingPage> {
  return await client.fetch(landingPage)
}

export interface LandingPage {
  _type: 'landingPage'
  _id: string
  _createtAt: string
  title?: string
  subTitle?: string
  images: Image[]
  ctaLabel?: string
  ctaLink?: string
  highlightedJobs: Job[]
  highlightedServices: Service[]
  contactPhone?: string
  contactEmail?: string
}

export interface Post {
  _type: 'post'
  _id: string
  _createdAt: string
  title?: string
  slug: Slug
  excerpt?: string
  mainImage?: Image
  body: PortableTextBlock[]
}

export interface Job {
  _type: 'job'
  _id: string
  _createdAt: string
  title: string
  mainImage?: Image
  excerpt?: string
}
export interface Service {
  _type: 'service'
  _id: string
  _createdAt: string
  title: string
  mainImage?: string
  excerpt?: string
}
