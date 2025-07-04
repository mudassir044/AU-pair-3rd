"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { Upload, FileText, CheckCircle, XCircle, Clock, Download, Eye } from 'lucide-react'
import { documentsAPI } from '@/lib/api'

interface User {
  id: string
  email: string
  role: 'au_pair' | 'host_family'
  name: string
}

interface Document {
  id: number
  name: string
  type: string
  status: 'pending' | 'approved' | 'rejected'
  uploadDate: string
  size?: string
}

export default function DocumentsPage() {
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

  const mockDocuments: Document[] = [
    {
      id: 1,
      name: 'Passport Copy',
      type: 'Identity',
      status: 'approved',
      uploadDate: '2025-01-10',
      size: '2.4 MB'
    },
    {
      id: 2,
      name: 'Background Check',
      type: 'Security',
      status: 'pending',
      uploadDate: '2025-01-12',
      size: '1.8 MB'
    },
    {
      id: 3,
      name: 'First Aid Certificate',
      type: 'Certification',
      status: 'approved',
      uploadDate: '2025-01-08',
      size: '0.9 MB'
    },
    {
      id: 4,
      name: 'Reference Letter',
      type: 'Reference',
      status: 'rejected',
      uploadDate: '2025-01-05',
      size: '1.2 MB'
    }
  ]

  const requiredDocuments = user?.role === 'au_pair' ? [
    'Passport Copy',
    'Background Check',
    'First Aid Certificate',
    'Reference Letters (2)',
    'Educational Certificates',
    'Medical Certificate'
  ] : [
    'Family Introduction Letter',
    'Home Photos',
    'Background Check',
    'Reference Letters',
    'Insurance Documents'
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // In real app, upload file via API
      console.log('Uploading file:', file.name)
      alert(`File "${file.name}" uploaded successfully!`)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-100'
      case 'rejected':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-yellow-600 bg-yellow-100'
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
              <Link href="/bookings" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Bookings
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Documents</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Drag and drop your files here, or click to browse
                </p>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                />
                <label htmlFor="file-upload">
                  <Button variant="outline" className="cursor-pointer">
                    Choose Files
                  </Button>
                </label>
                <p className="text-xs text-gray-500 mt-2">
                  Supported formats: PDF, JPG, PNG, DOC, DOCX (max 10MB)
                </p>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-3">Required Documents:</h3>
                <ul className="space-y-2">
                  {requiredDocuments.map((doc, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Document Status */}
          <Card>
            <CardHeader>
              <CardTitle>Document Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-8 h-8 text-gray-400" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-gray-500">
                          {doc.type} • {doc.size} • {new Date(doc.uploadDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {getStatusIcon(doc.status)}
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(doc.status)}`}>
                        {doc.status}
                      </span>
                    </div>
                  </div>
                ))
            }
            </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  Document Review Process
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Documents are typically reviewed within 2-3 business days. You'll receive an email notification once the review is complete.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}