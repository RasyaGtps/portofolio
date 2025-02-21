import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://bjixyukzsuaflpxiriva.supabase.co'; // Ganti dengan URL Supabase Anda
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqaXh5dWt6c3VhZmxweGlyaXZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwNzQzNDksImV4cCI6MjA1NTY1MDM0OX0.3INUixBawZEVSLLl6Pbz61PDvQ7ChrFsTr34C9Yr7FQ'; // Ganti dengan Anon Key Supabase Anda

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