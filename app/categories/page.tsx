import { getAllCategories } from '@/lib/cosmic'
import CategoryCard from '@/components/CategoryCard'

export const metadata = {
  title: 'Categories — Foodies',
  description: 'Explore food and travel stories by cuisine and destination category.',
}

export default async function CategoriesPage() {
  const categories = await getAllCategories()

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="bg-gradient-to-br from-amber-700 to-yellow-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-5xl mb-4 block">🏷️</span>
          <h1 className="text-4xl font-bold mb-3">Categories</h1>
          <p className="text-amber-200 text-lg max-w-2xl mx-auto">
            Explore our curated collection of cuisines, destinations, and culinary experiences.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">🌍</span>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">No categories yet</h2>
            <p className="text-gray-500">Categories are coming soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}