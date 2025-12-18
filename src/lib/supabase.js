import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if credentials are configured
const hasValidCredentials = 
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'your_supabase_url' &&
  supabaseAnonKey !== 'your_supabase_anon_key' &&
  (supabaseUrl.startsWith('http://') || supabaseUrl.startsWith('https://'))

// Only create client if credentials are valid
export const supabase = hasValidCredentials 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Helper function to fetch guestbook entries
export const fetchGuestbookEntries = async () => {
  if (!supabase) {
    console.warn('Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file')
    return []
  }
  
  const { data, error } = await supabase
    .from('guestbook')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50)
  
  if (error) {
    console.error('Error fetching guestbook entries:', error)
    return []
  }
  
  return data
}

// Helper function to add guestbook entry
export const addGuestbookEntry = async (entry) => {
  if (!supabase) {
    throw new Error('Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file')
  }
  
  const { data, error } = await supabase
    .from('guestbook')
    .insert([entry])
    .select()
  
  if (error) {
    console.error('Error adding guestbook entry:', error)
    throw error
  }
  
  return data
}
