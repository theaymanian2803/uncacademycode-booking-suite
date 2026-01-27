import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address").max(255, "Email is too long"),
  projectType: z.enum([
    "Consultation",
    "SaaS",
    "E-commerce",
    "Portfolio",
    "Static",
    "Landing Page",
    "Business",
    "Blog",
    "Appointment System",
    "Other"
  ], {
    required_error: "Please select a project type",
  }),
  scheduledDate: z.date({
    required_error: "Please select a date",
  }),
  scheduledTime: z.string({
    required_error: "Please select a time",
  }),
  notes: z.string().max(1000, "Notes must be less than 1000 characters").optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00",
];

const BookingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      notes: "",
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);

    try {
      // Combine date and time into a single timestamp
      const [hours, minutes] = data.scheduledTime.split(":");
      const scheduledDateTime = new Date(data.scheduledDate);
      scheduledDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

      const { error } = await supabase.from("appointments").insert({
        client_name: data.name,
        client_email: data.email,
        project_type: data.projectType,
        scheduled_time: scheduledDateTime.toISOString(),
        notes: data.notes || null,
        status: "pending",
      });

      if (error) throw error;

      // Send confirmation emails via edge function
      await supabase.functions.invoke("send-booking-email", {
        body: {
          clientName: data.name,
          clientEmail: data.email,
          projectType: data.projectType,
          scheduledTime: scheduledDateTime.toISOString(),
          notes: data.notes || null,
        },
      });

      toast.success("Booking Confirmed!", {
        description: "You'll receive a confirmation email shortly.",
      });

      form.reset();
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Booking Failed", {
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-20 sm:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              Book Your Session
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Schedule Your <span className="gradient-text">Consultation</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Fill in your details and we'll get back to you with a Zoom link.
            </p>
          </div>

          {/* Form */}
          <div className="glass-card p-6 sm:p-8 lg:p-10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium">Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          {...field}
                          className="h-12 bg-background border-border focus:border-primary transition-colors"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium">Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          {...field}
                          className="h-12 bg-background border-border focus:border-primary transition-colors"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Project Type */}
                <FormField
                  control={form.control}
                  name="projectType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium">Project Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 bg-background border-border focus:border-primary transition-colors">
                            <SelectValue placeholder="Select project type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-background border-border">
                          <SelectItem value="Consultation">General Consultation</SelectItem>
                          <SelectItem value="SaaS">SaaS Application</SelectItem>
                          <SelectItem value="E-commerce">E-commerce Platform</SelectItem>
                          <SelectItem value="Portfolio">Portfolio Website</SelectItem>
                          <SelectItem value="Static">Static Website</SelectItem>
                          <SelectItem value="Landing Page">Landing Page</SelectItem>
                          <SelectItem value="Business">Business Website</SelectItem>
                          <SelectItem value="Blog">Blog / Content Site</SelectItem>
                          <SelectItem value="Appointment System">Appointment Booking System</SelectItem>
                          <SelectItem value="Other">Other / Custom Project</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="scheduledDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-foreground font-medium">Preferred Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "h-12 w-full justify-start text-left font-normal bg-background border-border hover:bg-secondary",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date() || date.getDay() === 0 || date.getDay() === 6
                              }
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="scheduledTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground font-medium">Preferred Time</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 bg-background border-border focus:border-primary transition-colors">
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Notes */}
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium">Additional Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your project ideas, requirements, or any questions..."
                          className="min-h-[120px] bg-background border-border focus:border-primary transition-colors resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 gradient-bg text-primary-foreground hover:opacity-90 transition-opacity font-semibold text-lg glow-effect"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Book Consultation
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
