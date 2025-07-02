import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Users, Globe, Star } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white dark:from-primary-950 dark:to-background py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Connect Au Pairs with <span className="text-primary">Host Families</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Find your perfect match for cultural exchange, childcare, and lifelong connections across the globe.
          </p>
          <div className="space-x-4">
            <Button asChild size="lg" className="rounded-2xl">
              <Link href="/auth/register">Get Started</Link>
            </Button>
            <Button variant="outline" asChild size="lg" className="rounded-2xl">
              <Link href="/matches">Browse Matches</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center rounded-2xl shadow-md">
              <CardHeader>
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Create Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Set up your profile with your preferences, experience, and what you're looking for in a match.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center rounded-2xl shadow-md">
              <CardHeader>
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Find Matches</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our smart matching algorithm connects you with compatible Au Pairs or Host Families.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center rounded-2xl shadow-md">
              <CardHeader>
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Start Your Journey</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Connect, communicate, and begin your cultural exchange experience with confidence.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="rounded-2xl shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "Finding the perfect host family through Au Pair Connect was life-changing. The platform made it so easy to connect and communicate before my arrival."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary font-semibold">MK</span>
                  </div>
                  <div>
                    <p className="font-semibold">Maria K.</p>
                    <p className="text-sm text-gray-500">Au Pair from Germany</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="rounded-2xl shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "We found an amazing au pair who became part of our family. The screening process and communication tools gave us confidence in our choice."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary font-semibold">JS</span>
                  </div>
                  <div>
                    <p className="font-semibold">Jennifer S.</p>
                    <p className="text-sm text-gray-500">Host Family from USA</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Au Pair Connect</h3>
              <p className="text-gray-400">
                Connecting cultures, families, and experiences worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Au Pairs</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/auth/register" className="hover:text-white">Find Families</Link></li>
                <li><Link href="/resources" className="hover:text-white">Resources</Link></li>
                <li><Link href="/support" className="hover:text-white">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Families</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/auth/register" className="hover:text-white">Find Au Pairs</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
                <li><Link href="/safety" className="hover:text-white">Safety</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Au Pair Connect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}