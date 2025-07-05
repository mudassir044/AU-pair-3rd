import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Au Pair Connect
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Find Your Perfect Cultural Exchange Match
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/auth/register?role=host"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              I'm a Host Family
            </Link>
            <Link
              href="/auth/register?role=aupair"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
            >
              I'm an Au Pair
            </Link>
          </div>
          <div className="mt-8">
            <Link href="/auth/login" className="text-blue-600 hover:underline">
              Already have an account? Sign in
            </Link>
          </div>

          <div className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">Demo Mode</h3>
            <p className="text-yellow-700 mb-2">
              Supabase backend not configured. Use demo credentials:
            </p>
            <p className="text-sm text-yellow-600">
              Email: demo@example.com | Password: demo123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
