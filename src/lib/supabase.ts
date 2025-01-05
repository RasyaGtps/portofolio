// File: C:\my-portfolio\src\lib\supabase.ts

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

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