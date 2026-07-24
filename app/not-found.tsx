import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center px-4">
      <div className="text-center">
        <span className="text-8xl mb-6 block">🍽️</span>
        <h1 className="text-6xl font-bold text-amber-600 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Looks like this dish isn't on the menu. Let's get you back to something delicious.
        </p>
        <Link
          href="/"
          className="inline-block bg-amber-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-700 transition-colors"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  )
}