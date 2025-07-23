import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface BookingRequest {
  name: string;
  email: string;
  phone: string;
  age: number;
  consultationType: string;
  appointmentDate: string;
  appointmentTime: string;
  concern: string;
  previousConsultation: boolean;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    const bookingData: BookingRequest = await req.json()

    // Check if the time slot is available
    const { data: existingBooking, error: checkError } = await supabaseClient
      .from('bookings')
      .select('id')
      .eq('appointment_date', bookingData.appointmentDate)
      .eq('appointment_time', bookingData.appointmentTime)
      .eq('status', 'confirmed')
      .single()

    if (existingBooking) {
      return new Response(
        JSON.stringify({ error: 'Time slot is already booked' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Create the booking
    const { data: booking, error: insertError } = await supabaseClient
      .from('bookings')
      .insert([
        {
          name: bookingData.name,
          email: bookingData.email,
          phone: bookingData.phone,
          age: bookingData.age,
          consultation_type: bookingData.consultationType,
          appointment_date: bookingData.appointmentDate,
          appointment_time: bookingData.appointmentTime,
          concern: bookingData.concern,
          previous_consultation: bookingData.previousConsultation,
          status: 'pending'
        }
      ])
      .select()
      .single()

    if (insertError) {
      throw insertError
    }

    // Send email notification (you can implement this with your preferred email service)
    const emailResponse = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-booking-email`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        booking: booking,
        type: 'new_booking'
      })
    })

    return new Response(
      JSON.stringify({ 
        success: true, 
        booking: booking,
        message: 'Booking created successfully. You will receive a confirmation email shortly.' 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})