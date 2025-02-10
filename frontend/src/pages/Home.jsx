import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AppointmentCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [message, setMessage] = useState(null);

  // Generate time slots from 9 AM to 5 PM
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 17; hour++) {
      slots.push(`${hour}:00`);
      slots.push(`${hour}:30`);
    }
    return slots;
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    setShowBookingForm(false);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setShowBookingForm(true);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setMessage({ type: 'success', text: 'Appointment booked successfully!' });
      setShowBookingForm(false);
      setSelectedSlot(null);
      setFormData({ name: '', email: '', phone: '' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to book appointment. Please try again.' });
    }
  };

  // Generate dates for the next 7 days
  const getNextSevenDays = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Book an Appointment
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Date Selection */}
          <div className="grid grid-cols-7 gap-2 mb-6">
            {getNextSevenDays().map((date) => (
              <Button
                key={date.toISOString()}
                variant={selectedDate?.toDateString() === date.toDateString() ? "default" : "outline"}
                className="p-2 h-auto flex flex-col"
                onClick={() => handleDateSelect(date)}
              >
                <span className="text-sm">{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                <span className="text-lg font-bold">{date.getDate()}</span>
              </Button>
            ))}
          </div>

          {/* Time Slots */}
          {selectedDate && (
            <div className="grid grid-cols-4 gap-2 mb-6">
              {generateTimeSlots().map((slot) => (
                <Button
                  key={slot}
                  variant={selectedSlot === slot ? "default" : "outline"}
                  className="flex items-center gap-2"
                  onClick={() => handleSlotSelect(slot)}
                >
                  <Clock className="h-4 w-4" />
                  {slot}
                </Button>
              ))}
            </div>
          )}

          {/* Booking Form */}
          {showBookingForm && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Confirm Booking
              </Button>
            </form>
          )}

          {/* Messages */}
          {message && (
            <Alert className={`mt-4 ${message.type === 'error' ? 'bg-red-50' : 'bg-green-50'}`}>
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentCalendar;