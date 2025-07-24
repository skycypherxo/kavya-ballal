import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface EmailRequest {
  booking: any;
  type: 'new_booking' | 'confirmation' | 'cancellation';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { booking, type }: EmailRequest = await req.json()

    // Email templates
    const getEmailContent = (type: string, booking: any) => {
      switch (type) {
        case 'new_booking':
          return {
            subject: `New Appointment Booking - ${booking.name}`,
            patientHtml: `
              <h2>Appointment Booking Confirmation</h2>
              <p>Dear ${booking.name},</p>
              <p>Thank you for booking an appointment with Dr. Kavya Ballal. Your booking details:</p>
              <ul>
                <li><strong>Date:</strong> ${new Date(booking.appointment_date).toLocaleDateString()}</li>
                <li><strong>Time:</strong> ${booking.appointment_time}</li>
                <li><strong>Type:</strong> ${booking.consultation_type}</li>
                <li><strong>Status:</strong> Pending Confirmation</li>
              </ul>
              <p>You will receive a confirmation email once Dr. Kavya confirms your appointment.</p>
              <p>Best regards,<br>Dr. Kavya Ballal's Clinic</p>
            `,
            doctorHtml: `
              <h2>New Appointment Booking</h2>
              <p>Dear Dr. Kavya,</p>
              <p>You have received a new appointment booking:</p>
              <ul>
                <li><strong>Patient:</strong> ${booking.name}</li>
                <li><strong>Email:</strong> ${booking.email}</li>
                <li><strong>Phone:</strong> ${booking.phone}</li>
                <li><strong>Age:</strong> ${booking.age}</li>
                <li><strong>Date:</strong> ${new Date(booking.appointment_date).toLocaleDateString()}</li>
                <li><strong>Time:</strong> ${booking.appointment_time}</li>
                <li><strong>Type:</strong> ${booking.consultation_type}</li>
                <li><strong>Previous Consultation:</strong> ${booking.previous_consultation ? 'Yes' : 'No'}</li>
              </ul>
              <p><strong>Chief Concern:</strong></p>
              <p>${booking.concern}</p>
              <p>Please confirm or reschedule this appointment.</p>
            `
          }
        default:
          return { subject: '', patientHtml: '', doctorHtml: '' }
      }
    }

    const emailContent = getEmailContent(type, booking)

    // Here you would integrate with your email service (SendGrid, Mailgun, etc.)
    // For now, we'll simulate the email sending
    
    console.log('Sending emails:', {
      to_patient: booking.email,
      to_doctor: 'kavyabhat23895@gmail.com',
      subject: emailContent.subject,
      patient_content: emailContent.patientHtml,
      doctor_content: emailContent.doctorHtml
    })

    // In a real implementation, you would use an email service like:
    /*
    const emailService = new EmailService(Deno.env.get('EMAIL_API_KEY'))
    
    await emailService.send({
      to: booking.email,
      subject: emailContent.subject,
      html: emailContent.patientHtml
    })
    
    await emailService.send({
      to: 'kavyabhat23895@gmail.com',
      subject: emailContent.subject,
      html: emailContent.doctorHtml
    })
    */

    return new Response(
      JSON.stringify({ success: true, message: 'Emails sent successfully' }),
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