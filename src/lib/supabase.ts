import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Booking {
  id?: string
  name: string
  email: string
  phone: string
  age: number
  consultation_type: string
  appointment_date: string
  appointment_time: string
  concern: string
  previous_consultation: boolean
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  created_at?: string
  updated_at?: string
}