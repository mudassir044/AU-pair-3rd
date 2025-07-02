
"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, MessageCircle, MapPin, Star } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  role: 'au_pair' | 'host_family'
  name: string
}

export default function MatchesPage() {
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
      age: user?.role === 'au_pair' ? null : 24,
      children: user?.role === 'au_pair' ? '2 children (ages 5, 8)' : null,
      languages: 'English, Spanish',
      bio: user?.role === 'au_pair' 
        ? 'Loving family with two energetic kids looking for a caring au pair to join our household.'
        : 'Experienced childcare provider with 3 years of experience. Love outdoor activities and teaching languages.',
      match: 95,
      image: 'https://via.placeholder.com/300x200',
      rating: 4.9
    },
    {
      id: 2,
      name: user?.role === 'au_pair' ? 'The Smith Family' : 'Anna Mueller',
      location: user?.role === 'au_pair' ? 'London, UK' : 'Berlin, Germany',
      age: user?.role === 'au_pair' ? null : 22,
      children: user?.role === 'au_pair' ? '1 child (age 3)' : null,
      languages: 'English, German',
      bio: user?.role === 'au_pair'
        ? 'Professional couple seeking a responsible au pair for our toddler. Great location in central London.'
        : 'Native German speaker studying education. Patient and creative with children of all ages.',
      match: 88,
      image: 'https://via.placeholder.com/300x200',
      rating: 4.7
    },
    {
      id: 3,
      name: user?.role === 'au_pair' ? 'The Wilson Family' : 'Sophie Dubois',
      location: user?.role === 'au_pair' ? 'Toronto, Canada' : 'Paris, France',
      age: user?.role === 'au_pair' ? null : 26,
      children: user?.role === 'au_pair' ? '3 children (ages 4, 7, 10)' : null,
      languages: 'English, French',
      bio: user?.role === 'au_pair'
        ? 'Active family loves outdoor activities. Looking for an au pair who enjoys sports and adventures.'
        : 'Art student with childcare experience. Enjoys cultural activities and helping children learn.',
      match: 82,
      image: 'https://via.placeholder.com/300x200',
      rating: 4.8
    }
  ]

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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Your Matches
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Discover {user.role === 'au_pair' ? 'host families' : 'au pairs'} that match your preferences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockMatches.map((match) => (
            <Card key={match.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={match.image}
                  alt={match.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                  {match.match}% match
                </div>
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{match.name}</CardTitle>
                    <div className="flex items-center text-gray-500 mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{match.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm ml-1">{match.rating}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2 mb-4">
                  {match.age && (
                    <p className="text-sm"><strong>Age:</strong> {match.age}</p>
                  )}
                  {match.children && (
                    <p className="text-sm"><strong>Children:</strong> {match.children}</p>
                  )}
                  <p className="text-sm"><strong>Languages:</strong> {match.languages}</p>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {match.bio}
                </p>
                
                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1">
                    <Heart className="w-4 h-4 mr-1" />
                    Like
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
