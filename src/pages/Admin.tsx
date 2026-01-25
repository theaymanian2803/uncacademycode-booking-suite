import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { 
  Calendar, 
  Clock, 
  Mail, 
  User, 
  FileText, 
  ArrowLeft,
  RefreshCw,
  Send,
  Loader2,
  LogOut,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface Appointment {
  id: string;
  created_at: string;
  client_name: string;
  client_email: string;
  project_type: string;
  scheduled_time: string;
  notes: string | null;
  status: string;
}

const statusOptions = [
  { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  { value: "in_review", label: "In Review", color: "bg-blue-100 text-blue-800" },
  { value: "confirmed", label: "Confirmed", color: "bg-green-100 text-green-800" },
  { value: "completed", label: "Completed", color: "bg-primary/10 text-primary" },
  { value: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-800" },
];

const Admin = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [sendEmailDialog, setSendEmailDialog] = useState<Appointment | null>(null);
  const [zoomLink, setZoomLink] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .order("scheduled_time", { ascending: true });

      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Failed to load appointments");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const updateStatus = async (id: string, newStatus: string) => {
    setIsUpdating(id);
    try {
      const { error } = await supabase
        .from("appointments")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === id ? { ...apt, status: newStatus } : apt
        )
      );

      toast.success("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    } finally {
      setIsUpdating(null);
    }
  };

  const sendBookingEmail = async () => {
    if (!sendEmailDialog) return;
    
    setIsSendingEmail(true);
    try {
      const response = await supabase.functions.invoke("send-booking-email", {
        body: {
          clientName: sendEmailDialog.client_name,
          clientEmail: sendEmailDialog.client_email,
          projectType: sendEmailDialog.project_type,
          scheduledTime: sendEmailDialog.scheduled_time,
          notes: sendEmailDialog.notes,
          zoomLink: zoomLink || undefined,
        },
      });

      if (response.error) throw response.error;

      toast.success("Emails sent successfully!");
      setSendEmailDialog(null);
      setZoomLink("");

      if (zoomLink) {
        await updateStatus(sendEmailDialog.id, "confirmed");
      }
    } catch (error) {
      console.error("Error sending emails:", error);
      toast.error("Failed to send emails");
    } finally {
      setIsSendingEmail(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = statusOptions.find((s) => s.value === status);
    return (
      <Badge className={statusConfig?.color || "bg-muted text-muted-foreground"}>
        {statusConfig?.label || status}
      </Badge>
    );
  };

  const getStatusCounts = () => {
    const counts = statusOptions.reduce((acc, status) => {
      acc[status.value] = appointments.filter((a) => a.status === status.value).length;
      return acc;
    }, {} as Record<string, number>);
    return counts;
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <p className="text-muted-foreground text-sm">
                  Logged in as {user?.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={fetchAppointments} variant="outline">
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button onClick={handleSignOut} variant="outline">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {statusOptions.map((status) => (
            <Card key={status.value}>
              <CardHeader className="pb-2">
                <CardDescription className="text-xs">{status.label}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{statusCounts[status.value] || 0}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Appointments Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Appointments</CardTitle>
            <CardDescription>
              {appointments.length} total appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : appointments.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No appointments yet
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Scheduled</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 font-medium">
                              <User className="h-4 w-4 text-muted-foreground" />
                              {appointment.client_name}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Mail className="h-3 w-3" />
                              {appointment.client_email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            {appointment.project_type}
                          </div>
                          {appointment.notes && (
                            <p className="text-xs text-muted-foreground mt-1 max-w-[200px] truncate">
                              {appointment.notes}
                            </p>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              {format(new Date(appointment.scheduled_time), "MMM d, yyyy")}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {format(new Date(appointment.scheduled_time), "h:mm a")}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={appointment.status}
                            onValueChange={(value) => updateStatus(appointment.id, value)}
                            disabled={isUpdating === appointment.id}
                          >
                            <SelectTrigger className="w-[140px]">
                              {isUpdating === appointment.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <SelectValue>{getStatusBadge(appointment.status)}</SelectValue>
                              )}
                            </SelectTrigger>
                            <SelectContent>
                              {statusOptions.map((status) => (
                                <SelectItem key={status.value} value={status.value}>
                                  <Badge className={status.color}>{status.label}</Badge>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSendEmailDialog(appointment)}
                          >
                            <Send className="h-4 w-4 mr-2" />
                            Send Email
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Send Email Dialog */}
      <Dialog open={!!sendEmailDialog} onOpenChange={() => setSendEmailDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Booking Confirmation</DialogTitle>
            <DialogDescription>
              Send a confirmation email to {sendEmailDialog?.client_name} and notify admins.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="zoom-link">Zoom Meeting Link (Optional)</Label>
              <Input
                id="zoom-link"
                placeholder="https://zoom.us/j/..."
                value={zoomLink}
                onChange={(e) => setZoomLink(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                If provided, the link will be included in the client's confirmation email.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSendEmailDialog(null)}>
              Cancel
            </Button>
            <Button onClick={sendBookingEmail} disabled={isSendingEmail}>
              {isSendingEmail ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Emails
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
