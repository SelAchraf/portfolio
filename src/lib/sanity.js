import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET

// Check if credentials are configured (not using placeholder values)
const hasValidCredentials = 
  projectId && 
  dataset && 
  projectId !== 'your_project_id_here' &&
  projectId !== 'your_sanity_project_id'

// Only create client if credentials are valid
export const client = hasValidCredentials
  ? createClient({
      projectId: projectId,
      dataset: dataset,
      apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01',
      useCdn: true,
      token: '',
    })
  : null

// Image URL builder
const builder = client ? imageUrlBuilder(client) : null

export const urlFor = (source) => {
  if (!builder) {
    console.warn('Sanity is not configured')
    return { url: () => '' }
  }
  return builder.image(source)
}

// Helper function to fetch projects
export const fetchProjects = async () => {
  if (!client) {
    console.warn('Sanity is not configured. Please add VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET to your .env file')
    return []
  }
  
  const query = `*[_type == "project"] | order(featured desc, _createdAt desc) {
    _id,
    title,
    slug,
    description,
    image,
    techStack,
    demoUrl,
    repoUrl,
    featured
  }`
  
  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

// Helper function to fetch about data
export const fetchAbout = async () => {
  if (!client) {
    console.warn('Sanity is not configured. Please add VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET to your .env file')
    return null
  }
  
  const query = `*[_type == "about"][0] {
    _id,
    name,
    title,
    bio,
    shortBio,
    image,
    skills[] {
      category,
      items
    },
    socialLinks {
      github,
      linkedin,
      twitter,
      email
    },
    resume
  }`
  
  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching about data:', error)
    return null
  }
}

// Helper function to fetch profile data
export const fetchProfile = async () => {
  if (!client) {
    console.warn('Sanity is not configured. Please add VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET to your .env file')
    return null
  }
  
  const query = `*[_type == "profile"][0] {
    _id,
    name,
    shortBio,
    resume,
    socialLinks {
      github,
      linkedin,
      twitter
    }
  }`
  
  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching profile data:', error)
    return null
  }
}

// Helper function to fetch experience data
export const fetchExperience = async () => {
  if (!client) {
    console.warn('Sanity is not configured. Please add VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET to your .env file')
    return []
  }
  
  const query = `*[_type == "experience"] | order(startDate desc) {
    _id,
    company,
    role,
    startDate,
    endDate,
    isCurrent,
    responsibilities
  }`
  
  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching experience data:', error)
    return []
  }
}

// Helper function to fetch blog posts (if needed)
export const fetchBlogPosts = async () => {
  if (!client) {
    console.warn('Sanity is not configured. Please add VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET to your .env file')
    return []
  }
  
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    author
  }`
  
  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}
