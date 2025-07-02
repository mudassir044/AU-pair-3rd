
"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Clock, Video, MapPin } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  role: 'au_pair' | 'host_family'
  name: string
}

interface Booking {
  id: number
  name: string
  date: string
  time: string
  type: 'video' | 'in-person'
  location?: string
  status: 'upcoming' | 'completed' | 'cancelled'
}

export default function BookingsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push('/auth/login')
    }
  }, [router])

  const mockBookings: Booking[] = [
    {
      id: 1,
      name: user?.role === 'au_pair' ? 'Johnson Family Interview' : 'Maria Rodriguez Interview',
      date: '2025-01-15',
      time: '14:00',
      type: 'video',
      status: 'upcoming'
    },
    {
      id: 2,
      name: user?.role === 'au_pair' ? 'Smith Family Meet & Greet' : 'Anna Mueller Meet & Greet',
      date: '2025-01-18',
      time: '10:30',
      type: 'in-person',
      location: 'Central Park, New York',
      status: 'upcoming'
    },
    {
      id: 3,
      name: user?.role === 'au_pair' ? 'Wilson Family Chat' : 'Sophie Dubois Chat',
      date: '2025-01-10',
      time: '16:00',
      type: 'video',
      status: 'completed'
    }
  ]

  const timeSlots = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ]

  const handleScheduleMeeting = () => {
    if (selectedDate && selectedTime) {
      // In real app, send booking request via API
      console.log('Scheduling meeting for:', selectedDate, selectedTime)
      alert('Meeting request sent!')
      setSelectedDate('')
      setSelectedTime('')
    }
  }

  if (!user) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/dashboard" className="text-xl font-semibold">Au Pair Connect</Link>
            <div className="flex space-x-4">
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Dashboard
              </Link>
              <Link href="/matches" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Matches
              </Link>
              <Link href="/messages" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Messages
              </Link>
              <Link href="/documents" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Documents
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Bookings</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Schedule New Meeting */}
          <Card>
            <CardHeader>
              <CardTitle>Schedule New Meeting</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Select Time</label>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-2 text-sm border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 ${
                        selectedTime === time
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-white dark:bg-gray-800 dark:border-gray-600'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              
              <Button 
                onClick={handleScheduleMeeting} 
                className="w-full"
                disabled={!selectedDate || !selectedTime}
              >
                Schedule Meeting
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Your Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className={`p-4 border rounded-lg ${
                      booking.status === 'upcoming'
                        ? 'border-green-200 bg-green-50 dark:bg-green-900/20'
                        : booking.status === 'completed'
                        ? 'border-gray-200 bg-gray-50 dark:bg-gray-800'
                        : 'border-red-200 bg-red-50 dark:bg-red-900/20'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{booking.name}</h3>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          booking.status === 'upcoming'
                            ? 'bg-green-100 text-green-800'
                            : booking.status === 'completed'
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(booking.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {booking.time}
                      </div>
                      <div className="flex items-center">
                        {booking.type === 'video' ? (
                          <Video className="w-4 h-4 mr-1" />
                        ) : (
                          <MapPin className="w-4 h-4 mr-1" />
                        )}
                        {booking.type === 'video' ? 'Video Call' : booking.location}
                      </div>
                    </div>
                    
                    {booking.status === 'upcoming' && (
                      <div className="mt-3 flex space-x-2">
                        {booking.type === 'video' && (
                          <Button size="sm" variant="outline">
                            Join Call
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          Reschedule
                        </Button>
                        <Button size="sm" variant="outline">
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
