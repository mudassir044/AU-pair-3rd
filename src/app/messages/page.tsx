
"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Send, Search } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  role: 'au_pair' | 'host_family'
  name: string
}

interface Message {
  id: number
  text: string
  sender: 'me' | 'other'
  timestamp: string
}

interface Conversation {
  id: number
  name: string
  lastMessage: string
  timestamp: string
  unread: boolean
  avatar: string
}

export default function MessagesPage() {
  const [user, setUser] = useState<User | null>(null)
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push('/auth/login')
    }
  }, [router])

  const mockConversations: Conversation[] = [
    {
      id: 1,
      name: user?.role === 'au_pair' ? 'The Johnson Family' : 'Maria Rodriguez',
      lastMessage: 'Looking forward to our video call tomorrow!',
      timestamp: '2 min ago',
      unread: true,
      avatar: 'MR'
    },
    {
      id: 2,
      name: user?.role === 'au_pair' ? 'The Smith Family' : 'Anna Mueller',
      lastMessage: 'Thank you for sharing your experience with children.',
      timestamp: '1 hour ago',
      unread: false,
      avatar: 'AM'
    },
    {
      id: 3,
      name: user?.role === 'au_pair' ? 'The Wilson Family' : 'Sophie Dubois',
      lastMessage: 'When would be a good time to meet?',
      timestamp: '1 day ago',
      unread: true,
      avatar: 'SD'
    }
  ]

  const mockMessages: Message[] = [
    {
      id: 1,
      text: 'Hi! I saw your profile and think you might be a great fit for our family.',
      sender: 'other',
      timestamp: '10:30 AM'
    },
    {
      id: 2,
      text: 'Thank you! I would love to learn more about your family and the position.',
      sender: 'me',
      timestamp: '10:32 AM'
    },
    {
      id: 3,
      text: 'Great! We have two children, ages 5 and 8. Are you comfortable with that age range?',
      sender: 'other',
      timestamp: '10:35 AM'
    },
    {
      id: 4,
      text: 'Absolutely! I have experience with children in that age group and really enjoy working with them.',
      sender: 'me',
      timestamp: '10:37 AM'
    },
    {
      id: 5,
      text: 'Looking forward to our video call tomorrow!',
      sender: 'other',
      timestamp: '10:40 AM'
    }
  ]

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In real app, send message via Socket.io
      console.log('Sending message:', newMessage)
      setNewMessage('')
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Messages</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Conversations</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Search messages..." className="pl-10" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {mockConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 border-b ${
                      selectedConversation === conversation.id ? 'bg-primary-50 dark:bg-primary-900' : ''
                    }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary font-semibold text-sm">
                          {conversation.avatar}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {conversation.name}
                          </p>
                          <p className="text-xs text-gray-500">{conversation.timestamp}</p>
                        </div>
                        <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                      </div>
                      {conversation.unread && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2 flex flex-col">
            {selectedConversation ? (
              <>
                <CardHeader className="border-b">
                  <CardTitle>
                    {mockConversations.find(c => c.id === selectedConversation)?.name}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    {mockMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.sender === 'me'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                
                <div className="border-t p-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Select a conversation to start messaging</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
