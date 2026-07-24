import { getAllAuthors } from '@/lib/cosmic'
import AuthorCard from '@/components/AuthorCard'

export const metadata = {
  title: 'Our Authors — Foodies',
  description: 'Meet the passionate food travelers and culinary explorers behind Foodies.',
}

export default async function AuthorsPage() {
  const authors = await getAllAuthors()

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="bg-gradient-to-br from-orange-700 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-5xl mb-4 block">👤</span>
          <h1 className="text-4xl font-bold mb-3">Our Foodies</h1>
          <p className="text-orange-200 text-lg max-w-2xl mx-auto">
            Passionate travelers and culinary explorers sharing their love for food from around the world.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {authors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {authors.map((author) => (
              <AuthorCard key={author.id} author={author} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">👥</span>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">No authors yet</h2>
            <p className="text-gray-500">Our team of food adventurers is coming soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}