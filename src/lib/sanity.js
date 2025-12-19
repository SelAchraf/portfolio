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
    _createdAt,
    title,
    repoUrl,
    images,
    description,
    techStack,
    demoUrl,
    featured,
    category
  }`
  
  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
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
    fullName,
    professionalTitle,
    bio,
    profileImage,
    "resumeUrl": resume.asset->url,
    socialLinks {
      github,
      linkedin,
      telegram,
      whatsapp,
      instagram,
      email,
      facebook
    }
  }`
  
  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching profile data:', error)
    return null
  }
}

// Helper function to fetch work experience data
export const fetchWorkExperience = async () => {
  if (!client) {
    console.warn('Sanity is not configured. Please add VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET to your .env file')
    return []
  }
  
  const query = `*[_type == "work_experience"] | order(startDate desc) {
    _id,
    company,
    role,
    location,
    startDate,
    endDate,
    isCurrent,
    description,
    responsibilities,
    technologies
  }`
  
  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching work experience data:', error)
    return []
  }
}

// Helper function to fetch skills data
export const fetchSkills = async () => {
  if (!client) {
    console.warn('Sanity is not configured. Please add VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET to your .env file')
    return []
  }
  
  const query = `*[_type == "skills"] | order(category asc) {
    _id,
    name,
    logo,
    percentage,
    category
  }`
  
  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching skills data:', error)
    return []
  }
}

// Helper function to fetch certificates data
export const fetchCertificates = async () => {
  if (!client) {
    console.warn('Sanity is not configured. Please add VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET to your .env file')
    return []
  }
  
  const query = `*[_type == "certificates"] | order(issueDate desc) {
    _id,
    title,
    issuer,
    issueDate,
    expiryDate,
    credentialUrl,
    description,
    image,
    skills,
    featured
  }`
  
  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching certificates data:', error)
    return []
  }
}

// Helper function to fetch about data (deprecated - use fetchProfile instead)
export const fetchAbout = async () => {
  console.warn('fetchAbout is deprecated. Use fetchProfile instead')
  return await fetchProfile()
}

// Helper function to fetch experience data (deprecated - use fetchWorkExperience instead)
export const fetchExperience = async () => {
  console.warn('fetchExperience is deprecated. Use fetchWorkExperience instead')
  return await fetchWorkExperience()
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
