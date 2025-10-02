import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
}

interface EmailRequest {
  booking: any;
  type: 'new_booking' | 'confirmation' | 'cancellation';
}

serve(async (req) => {
  console.log('=== Email Function Started ===');
  
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get credentials
    const GMAIL_USER = Deno.env.get('GMAIL_USER');
    const GMAIL_PASS = Deno.env.get('GMAIL_PASS');
    
    console.log('GMAIL_USER:', GMAIL_USER ? 'Set ✓' : 'Missing ✗');
    console.log('GMAIL_PASS:', GMAIL_PASS ? 'Set ✓' : 'Missing ✗');
    
    if (!GMAIL_USER || !GMAIL_PASS) {
      throw new Error('Gmail credentials not configured');
    }

    // Parse request
    const { booking, type }: EmailRequest = await req.json();
    console.log('Booking received for:', booking.name);

    if (!booking || !booking.email) {
      throw new Error('Invalid booking data');
    }

    // Format date
    const appointmentDate = booking.appointment_date 
      ? new Date(booking.appointment_date).toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      : 'Not specified';

    // Configure SMTP client
    const client = new SMTPClient({
      connection: {
        hostname: "smtp.gmail.com",
        port: 465,
        tls: true,
        auth: {
          username: GMAIL_USER,
          password: GMAIL_PASS,
        },
      },
    });

    console.log('SMTP client configured');

    let patientHtml = '';
    let patientSubject = '';
    let shouldSendToDoctorToo = false;

    // Generate email content based on type
    if (type === 'new_booking') {
      patientSubject = `Appointment Booking Confirmation - ${booking.name}`;
      shouldSendToDoctorToo = true;
      patientHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset='UTF-8'>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .header-img { max-width: 300px; margin-bottom: 20px; display: block; }
  </style>
</head>
<body>
  <img src='https://pgrnltvaydqwvcpncjvi.supabase.co/storage/v1/object/public/receipts/Vaishnavi_Poti_1759410695101.jpeg' alt='Dr. Kavya Ballal Clinic Logo' class='header-img'/>
  <h2>🎉 Appointment Booking Received</h2>
  <p>Dear <strong>${booking.name}</strong>,</p>
  <p>Thank you for booking an appointment with <strong>Dr. Kavya Ballal</strong>. We have received your booking request.</p>
  <ul>
    <li><strong>Date:</strong> ${appointmentDate}</li>
    <li><strong>Time:</strong> ${booking.appointment_time}</li>
    <li><strong>Type:</strong> ${booking.consultation_type}</li>
    <li><strong>Status:</strong> Pending Confirmation</li>
    ${booking.payment_screenshot_url ? `<li><strong>Payment Receipt:</strong> <a href='${booking.payment_screenshot_url}' target='_blank'>View Screenshot</a><br><img src='${booking.payment_screenshot_url}' alt='Payment Screenshot' style='max-width:300px; border-radius:8px; margin-top:8px;' /></li>` : ''}
  </ul>
  ${booking.consultation_type === 'text' ? `<div style='margin-top:20px; color:#059669;'><strong>Note:</strong> All communication for this chat consultation will happen via email. Please reply to this email with your questions or concerns.</div>` : ''}
  <p>If you have any questions, feel free to contact us.</p>
</body>
</html>`;
    } else if (type === 'confirmation') {
      patientSubject = `✅ Appointment Confirmed - ${booking.name}`;
      patientHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset='UTF-8'>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .header-img { max-width: 300px; margin-bottom: 20px; display: block; }
  </style>
</head>
<body>
  <img src='https://pgrnltvaydqwvcpncjvi.supabase.co/storage/v1/object/public/receipts/Vaishnavi_Poti_1759410695101.jpeg' alt='Dr. Kavya Ballal Clinic Logo' class='header-img'/>
  <h2>✅ Your Appointment is Confirmed!</h2>
  <p>Dear <strong>${booking.name}</strong>,</p>
  <ul>
    <li><strong>Date:</strong> ${appointmentDate}</li>
    <li><strong>Time:</strong> ${booking.appointment_time}</li>
    <li><strong>Type:</strong> ${booking.consultation_type} consultation</li>
    <li><strong>Duration:</strong> Approximately 30 minutes</li>
    ${booking.payment_screenshot_url ? `<li><strong>Payment Receipt:</strong> <a href='${booking.payment_screenshot_url}' target='_blank'>View Screenshot</a><br><img src='${booking.payment_screenshot_url}' alt='Payment Screenshot' style='max-width:300px; border-radius:8px; margin-top:8px;' /></li>` : ''}
  </ul>
  ${booking.consultation_type === 'text' ? `<div style='margin-top:20px; color:#059669;'><strong>Note:</strong> All communication for this chat consultation will happen via email. Please reply to this email with your questions or concerns.</div>` : ''}
  <p>We look forward to seeing you!</p>
</body>
</html>`;
    } else if (type === 'cancellation') {
      patientSubject = `❌ Appointment Cancelled - ${booking.name}`;
      patientHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset='UTF-8'>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .header-img { max-width: 300px; margin-bottom: 20px; display: block; }
  </style>
</head>
<body>
  <img src='https://pgrnltvaydqwvcpncjvi.supabase.co/storage/v1/object/public/receipts/Vaishnavi_Poti_1759410695101.jpeg' alt='Dr. Kavya Ballal Clinic Logo' class='header-img'/>
  <h2>❌ Appointment Cancellation</h2>
  <p>Dear <strong>${booking.name}</strong>,</p>
  <ul>
    <li><strong>Date:</strong> ${appointmentDate}</li>
    <li><strong>Time:</strong> ${booking.appointment_time}</li>
    <li><strong>Type:</strong> ${booking.consultation_type} consultation</li>
    ${booking.cancellation_reason ? `<li><strong>Reason:</strong> ${booking.cancellation_reason}</li>` : ''}
    ${booking.payment_screenshot_url ? `<li><strong>Payment Receipt:</strong> <a href='${booking.payment_screenshot_url}' target='_blank'>View Screenshot</a><br><img src='${booking.payment_screenshot_url}' alt='Payment Screenshot' style='max-width:300px; border-radius:8px; margin-top:8px;' /></li>` : ''}
  </ul>
  <p>We hope to serve you in the future.</p>
</body>
</html>`;
    }

    // Send to patient
    console.log('Sending email to patient...');
    try {
      await client.send({
        from: GMAIL_USER,
        to: booking.email,
        subject: patientSubject,
        content: "auto",
        html: patientHtml,
      });
      console.log('✓ Patient email sent successfully');
    } catch (error: any) {
      console.error('✗ Failed to send patient email:', error);
      throw new Error(`Patient email failed: ${error.message}`);
    }

    // Send to doctor only for new bookings
    if (shouldSendToDoctorToo) {
      console.log('Sending email to doctor...');
      const doctorHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
    }
    .header-img { max-width: 300px; margin-bottom: 20px; display: block; }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header { 
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
      padding: 40px 30px;
      text-align: center;
    }
    .header h2 {
      margin: 0;
      font-size: 24px;
    }
    .content { 
      padding: 30px;
    }
    .info-box { 
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
      border-left: 4px solid #f5576c;
    }
    .info-box h3 {
      margin-top: 0;
      color: #f5576c;
      font-size: 18px;
    }
    .detail-item { 
      margin: 10px 0;
      padding: 8px 0;
      border-bottom: 1px solid #e9ecef;
      font-size: 15px;
    }
    .detail-item:last-child {
      border-bottom: none;
    }
    .label { 
      font-weight: 600;
      color: #f5576c;
      display: inline-block;
      min-width: 150px;
    }
    .concern-box { 
      background: #fff3cd;
      border-left: 4px solid #ffc107;
      padding: 20px;
      margin: 20px 0;
      border-radius: 8px;
    }
    .concern-box h4 {
      margin-top: 0;
      color: #856404;
    }
    .footer {
      text-align: center;
      padding: 20px;
      background: #f8f9fa;
      color: #666;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src='https://pgrnltvaydqwvcpncjvi.supabase.co/storage/v1/object/public/receipts/Vaishnavi_Poti_1759410695101.jpeg' alt='Dr. Kavya Ballal Clinic Logo' class='header-img'/>
      <h2>🔔 New Appointment Booking</h2>
    </div>
    <div class="content">
      <p>Dear <strong>Dr. Kavya</strong>,</p>
      <p>You have received a new appointment booking request that requires your attention.</p>
      <div class="info-box">
        <h3>👤 Patient Information</h3>
        <div class="detail-item"><span class="label">Name:</span> ${booking.name}</div>
        <div class="detail-item"><span class="label">Email:</span> <a href="mailto:${booking.email}">${booking.email}</a></div>
        <div class="detail-item"><span class="label">Phone:</span> <a href="tel:${booking.phone}">${booking.phone}</a></div>
        <div class="detail-item"><span class="label">Age:</span> ${booking.age} years</div>
        <div class="detail-item"><span class="label">Sex:</span> ${booking.sex || 'Not specified'}</div>
        <div class="detail-item"><span class="label">Address:</span> ${booking.address || 'Not specified'}</div>
      </div>
      <div class="info-box">
        <h3>📅 Appointment Details</h3>
        <div class="detail-item"><span class="label">Date:</span> ${appointmentDate}</div>
        <div class="detail-item"><span class="label">Time:</span> ${booking.appointment_time}</div>
        <div class="detail-item"><span class="label">Type:</span> ${booking.consultation_type}</div>
        <div class="detail-item"><span class="label">Previous Patient:</span> ${booking.previous_consultation ? '✅ Yes' : '❌ No'}</div>
      </div>
      <div class="concern-box">
        <h4>⚕️ Chief Concern / Reason for Consultation</h4>
        <p style="margin: 0; white-space: pre-wrap;">${booking.concern}</p>
      </div>
      <p style="margin-top: 30px;"><strong>⚡ Action Required:</strong></p>
      <p>Please review this appointment request and confirm or reschedule at your earliest convenience.</p>
    </div>
    <div class="footer">
      <p><strong>Dr. Kavya Ballal's Clinic</strong></p>
    </div>
  </div>
</body>
</html>`;
      try {
        await client.send({
          from: GMAIL_USER,
          to: "drkavyaballal@gmail.com",
          subject: `New Appointment Booking - ${booking.name}`,
          content: "auto",
          html: doctorHtml,
        });
        console.log('✓ Doctor email sent successfully');
      } catch (error: any) {
        console.error('✗ Failed to send doctor email:', error);
        throw new Error(`Doctor email failed: ${error.message}`);
      }
    }

    // Close connection
    await client.close();
    console.log('=== Email Function Completed Successfully ===');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Emails sent successfully to both patient and doctor'
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error: any) {
    console.error('=== Email Function Error ===');
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
    
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message || 'Failed to send emails',
        details: error.stack
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})