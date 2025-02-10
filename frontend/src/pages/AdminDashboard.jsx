import React, { useState } from 'react';
import { 
  Calendar, Clock, Users, Trash2, Edit2, 
  Plus, CheckCircle, XCircle, BarChart 
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('appointments');
  const [showSlotForm, setShowSlotForm] = useState(false);
  const [message, setMessage] = useState(null);

  // Sample data - replace with actual API calls
  const appointments = [
    { id: 1, name: 'John Doe', date: '2025-02-12', time: '10:00', status: 'confirmed' },
    { id: 2, name: 'Jane Smith', date: '2025-02-12', time: '11:30', status: 'pending' },
    { id: 3, name: 'Alice Brown', date: '2025-02-13', time: '14:00', status: 'cancelled' }
  ];

  const stats = {
    total: 45,
    confirmed: 32,
    cancelled: 8,
    pending: 5
  };

  const chartData = [
    { name: 'Mon', appointments: 8 },
    { name: 'Tue', appointments: 12 },
    { name: 'Wed', appointments: 10 },
    { name: 'Thu', appointments: 15 },
    { name: 'Fri', appointments: 9 },
    { name: 'Sat', appointments: 6 },
    { name: 'Sun', appointments: 4 }
  ];

  const handleStatusChange = (appointmentId, newStatus) => {
    // API call to update appointment status
    setMessage({ type: 'success', text: 'Appointment status updated successfully!' });
  };

  const handleDeleteAppointment = (appointmentId) => {
    // API call to delete appointment
    setMessage({ type: 'success', text: 'Appointment deleted successfully!' });
  };

  const handleAddTimeSlot = (e) => {
    e.preventDefault();
    // API call to add new time slot
    setShowSlotForm(false);
    setMessage({ type: 'success', text: 'Time slot added successfully!' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-green-600';
      case 'pending': return 'text-yellow-600';
      case 'cancelled': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Total Appointments</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Confirmed</p>
                <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Cancelled</p>
                <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointments Chart */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Weekly Appointments Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="appointments" fill="#3b82f6" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Tab Navigation */}
      <div className="flex gap-4 mb-6">
        <Button 
          variant={activeTab === 'appointments' ? 'default' : 'outline'}
          onClick={() => setActiveTab('appointments')}
        >
          Appointments
        </Button>
        <Button 
          variant={activeTab === 'timeSlots' ? 'default' : 'outline'}
          onClick={() => setActiveTab('timeSlots')}
        >
          Time Slots
        </Button>
      </div>

      {/* Appointments Table */}
      {activeTab === 'appointments' && (
        <Card>
          <CardHeader>
            <CardTitle>All Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Name</th>
                    <th className="text-left p-4">Date</th>
                    <th className="text-left p-4">Time</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr key={appointment.id} className="border-b">
                      <td className="p-4">{appointment.name}</td>
                      <td className="p-4">{appointment.date}</td>
                      <td className="p-4">{appointment.time}</td>
                      <td className="p-4">
                        <span className={`capitalize ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteAppointment(appointment.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Time Slots Management */}
      {activeTab === 'timeSlots' && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Available Time Slots</CardTitle>
              <Button onClick={() => setShowSlotForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Slot
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {showSlotForm && (
              <form onSubmit={handleAddTimeSlot} className="mb-6 p-4 border rounded">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Date</label>
                    <input type="date" className="w-full p-2 border rounded" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Start Time</label>
                    <input type="time" className="w-full p-2 border rounded" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">End Time</label>
                    <input type="time" className="w-full p-2 border rounded" required />
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button type="submit">Save Slot</Button>
                  <Button variant="outline" onClick={() => setShowSlotForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            )}

            {/* Time slots grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="p-4 border rounded">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">9:00 AM - 9:30 AM</span>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-gray-500">Available Daily</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Messages */}
      {message && (
        <Alert className={`mt-4 ${message.type === 'error' ? 'bg-red-50' : 'bg-green-50'}`}>
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default AdminDashboard;