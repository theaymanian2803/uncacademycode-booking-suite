import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingEmailRequest {
  clientName: string;
  clientEmail: string;
  projectType: string;
  scheduledTime: string;
  notes: string | null;
  zoomLink?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const resend = new Resend(RESEND_API_KEY);
    const { clientName, clientEmail, projectType, scheduledTime, notes, zoomLink }: BookingEmailRequest = await req.json();

    // Admin emails to notify
    const adminEmails = ["uncacademycode@gmail.com", "sberechou@gmail.com"];

    // Format the scheduled time
    const scheduledDate = new Date(scheduledTime);
    const formattedDate = scheduledDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedTime = scheduledDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Send notification to admins
    const adminEmailResponse = await resend.emails.send({
      from: "UncAcademyCode <onboarding@resend.dev>",
      to: adminEmails,
      subject: `New Booking: ${clientName} - ${projectType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #4f46e5;">New Appointment Booking</h1>
          <p>A new consultation has been scheduled:</p>
          <table style="border-collapse: collapse; width: 100%;">
            <tr>
              <td style="padding: 12px; border: 1px solid #e5e7eb; background: #f9fafb;"><strong>Client Name</strong></td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">${clientName}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #e5e7eb; background: #f9fafb;"><strong>Email</strong></td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;"><a href="mailto:${clientEmail}">${clientEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #e5e7eb; background: #f9fafb;"><strong>Project Type</strong></td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">${projectType}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #e5e7eb; background: #f9fafb;"><strong>Scheduled Date</strong></td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">${formattedDate}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #e5e7eb; background: #f9fafb;"><strong>Scheduled Time</strong></td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">${formattedTime}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #e5e7eb; background: #f9fafb;"><strong>Notes</strong></td>
              <td style="padding: 12px; border: 1px solid #e5e7eb;">${notes || "No additional notes"}</td>
            </tr>
          </table>
          <p style="margin-top: 20px; color: #6b7280;">
            Please send a Zoom link to the client at <a href="mailto:${clientEmail}">${clientEmail}</a>
          </p>
        </div>
      `,
    });

    console.log("Admin notification sent:", adminEmailResponse);

    // Send confirmation to client
    const clientEmailResponse = await resend.emails.send({
      from: "UncAcademyCode <onboarding@resend.dev>",
      to: [clientEmail],
      subject: "Booking Confirmed - UncAcademyCode Consultation",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #4f46e5;">Booking Confirmed! 🎉</h1>
          <p>Hi ${clientName},</p>
          <p>Thank you for booking a consultation with UncAcademyCode. We're excited to discuss your ${projectType} project!</p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">Session Details</h3>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${formattedTime}</p>
            <p><strong>Project Type:</strong> ${projectType}</p>
            ${zoomLink ? `<p><strong>Zoom Link:</strong> <a href="${zoomLink}">${zoomLink}</a></p>` : ''}
          </div>
          
          ${!zoomLink ? '<p style="color: #6b7280;">You will receive a Zoom meeting link shortly before your scheduled session.</p>' : ''}
          
          <p>If you have any questions, feel free to reply to this email.</p>
          
          <p>Best regards,<br>The UncAcademyCode Team</p>
        </div>
      `,
    });

    console.log("Client confirmation sent:", clientEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        adminEmail: adminEmailResponse,
        clientEmail: clientEmailResponse 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    console.error("Error sending booking emails:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
