
"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, MessageCircle, Calendar, FileText, Users } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  role: 'au_pair' | 'host_family'
  name: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push('/auth/login')
    }
  }, [router])

  const mockMatches = [
    {
      id: 1,
      name: user?.role === 'au_pair' ? 'The Johnson Family' : 'Maria Rodriguez',
      location: user?.role === 'au_pair' ? 'New York, USA' : 'Madrid, Spain',
      match: 95,
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      name: user?.role === 'au_pair' ? 'The Smith Family' : 'Anna Mueller',
      location: user?.role === 'au_pair' ? 'London, UK' : 'Berlin, Germany',
      match: 88,
      image: 'https://via.placeholder.com/150'
    }
  ]

  if (!user) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-semibold">Au Pair Connect</h1>
            <div className="flex space-x-4">
              <Link href="/matches" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Matches
              </Link>
              <Link href="/messages" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Messages
              </Link>
              <Link href="/bookings" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Bookings
              </Link>
              <Link href="/documents" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Documents
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user.name}!
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Here's what's happening with your {user.role === 'au_pair' ? 'au pair' : 'host family'} journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Matches</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +2 from last week
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                Unread conversations
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Meetings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">
                This week
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Documents</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">
                Profile completion
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Matches</CardTitle>
              <CardDescription>
                {user.role === 'au_pair' ? 'Host families' : 'Au pairs'} that match your preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockMatches.map((match) => (
                  <div key={match.id} className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{match.name}</p>
                      <p className="text-sm text-gray-500">{match.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">{match.match}% match</p>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button asChild className="w-full">
                  <Link href="/matches">View All Matches</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks to manage your profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/messages">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Check Messages
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/bookings">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Meeting
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/documents">
                    <FileText className="mr-2 h-4 w-4" />
                    Upload Documents
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
