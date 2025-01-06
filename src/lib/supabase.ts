import { createClient } from '@supabase/supabase-js'

// Credentials langsung di file
const supabaseUrl = 'https://uuzqvmghxnlxosxmfxih.supabase.co'; // Ganti dengan URL Supabase Anda
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1enF2bWdoeG5seG9zeG1meGloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwOTc1NDAsImV4cCI6MjA1MTY3MzU0MH0.CqmkH8icL6ubi4U8ZDlqzjRFyndIrd94hOU8qpVL_tI'; // Ganti dengan Anon Key Supabase Anda

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Contact {
  id: number
  name: string
  email: string
  message: string
  created_at: string
}

export const addContact = async (name: string, email: string, message: string) => {
  const { data, error } = await supabase
    .from('contacts')
    .insert([{ name, email, message }])
    .select()

  if (error) {
    console.error('Supabase error:', error)
    throw new Error(error.message)
  }

  if (!data) {
    throw new Error('No data returned from Supabase')
  }

  return data
}

export const getContacts = async () => {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Supabase error:', error)
    throw new Error(error.message)
  }

  if (!data) {
    throw new Error('No data returned from Supabase')
  }

  return data as Contact[]
}