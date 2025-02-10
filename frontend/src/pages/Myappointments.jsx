import React, { useState } from 'react';
import { Calendar, Clock, Trash2, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      date: '2025-02-15',
      time: '10:00',
      status: 'upcoming',
      notes: 'Regular checkup'
    },
    {
      id: 2,
      date: '2025-02-20',
      time: '14:30',
      status: 'upcoming',
      notes: 'Follow-up appointment'
    },
    {
      id: 3,
      date: '2025-01-30',
      time: '11:00',
      status: 'completed',
      notes: 'Initial consultation'
    }
  ]);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [message, setMessage] = useState(null);

  const handleCancelAppointment = async (appointmentId) => {
    try {
      // API call to cancel appointment would go here
      setAppointments(appointments.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: 'cancelled' }
          : apt
      ));
      setMessage({ type: 'success', text: 'Appointment cancelled successfully!' });
      setShowCancelDialog(false);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to cancel appointment. Please try again.' });
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isUpcoming = (appointment) => {
    return new Date(`${appointment.date} ${appointment.time}`) > new Date();
  };

  const getStatusBadge = (status) => {
    const styles = {
      upcoming: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-sm ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            My Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Upcoming Appointments Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Upcoming Appointments</h3>
            <div className="space-y-4">
              {appointments
                .filter(apt => apt.status === 'upcoming' && isUpcoming(apt))
                .map(appointment => (
                  <div
                    key={appointment.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">
                            {formatDate(appointment.date)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>{appointment.time}</span>
                        </div>
                        {appointment.notes && (
                          <p className="text-gray-600 text-sm mt-2">
                            {appointment.notes}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(appointment.status)}
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => {
                            setSelectedAppointment(appointment);
                            setShowCancelDialog(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Past Appointments Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Past Appointments</h3>
            <div className="space-y-4">
              {appointments
                .filter(apt => apt.status === 'completed' || !isUpcoming(apt))
                .map(appointment => (
                  <div
                    key={appointment.id}
                    className="border rounded-lg p-4 bg-gray-50"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">
                            {formatDate(appointment.date)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>{appointment.time}</span>
                        </div>
                        {appointment.notes && (
                          <p className="text-gray-600 text-sm mt-2">
                            {appointment.notes}
                          </p>
                        )}
                      </div>
                      <div>
                        {getStatusBadge(appointment.status)}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Cancel Confirmation Dialog */}
          <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to cancel your appointment on{' '}
                  {selectedAppointment && formatDate(selectedAppointment.date)}{' '}
                  at {selectedAppointment?.time}? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>No, keep appointment</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => handleCancelAppointment(selectedAppointment?.id)}
                >
                  Yes, cancel appointment
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Messages */}
          {message && (
            <Alert className={`mt-4 ${message.type === 'error' ? 'bg-red-50' : 'bg-green-50'}`}>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserAppointments;