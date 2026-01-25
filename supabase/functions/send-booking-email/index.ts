import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface AppointmentPayload {
  type: "INSERT";
  table: "appointments";
  record: {
    id: string;
    created_at: string;
    client_name: string;
    client_email: string;
    project_type: string;
    scheduled_time: string;
    notes: string | null;
    status: string;
  };
  schema: "public";
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload: AppointmentPayload = await req.json();
    const { record } = payload;

    // Admin emails to notify
    const adminEmails = ["uncacademycode@gmail.com", "sberechou@gmail.com"];

    // Format the scheduled time
    const scheduledDate = new Date(record.scheduled_time);
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

    // Email content
    const emailContent = {
      to: adminEmails,
      subject: `New Booking: ${record.client_name} - ${record.project_type}`,
      html: `
        <h1>New Appointment Booking</h1>
        <p>A new consultation has been scheduled:</p>
        <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Client Name</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${record.client_name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Email</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${record.client_email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Project Type</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${record.project_type}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Scheduled Date</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${formattedDate}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Scheduled Time</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${formattedTime}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Notes</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${record.notes || "No additional notes"}</td>
          </tr>
        </table>
        <p style="margin-top: 20px; color: #666;">
          Remember to send the Zoom link to <a href="mailto:${record.client_email}">${record.client_email}</a>
        </p>
      `,
    };

    console.log("New booking received:", {
      clientName: record.client_name,
      clientEmail: record.client_email,
      projectType: record.project_type,
      scheduledTime: record.scheduled_time,
    });

    // TODO: Integrate with Resend or another email service
    // For now, we log the email content
    console.log("Email to be sent:", emailContent);

    // To enable email sending, add RESEND_API_KEY secret and uncomment:
    /*
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (RESEND_API_KEY) {
      const resend = new Resend(RESEND_API_KEY);
      await resend.emails.send({
        from: "UncAcademyCode <noreply@your-domain.com>",
        to: adminEmails,
        subject: emailContent.subject,
        html: emailContent.html,
      });
    }
    */

    return new Response(
      JSON.stringify({ success: true, message: "Booking notification processed" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    console.error("Error processing booking notification:", error);
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
