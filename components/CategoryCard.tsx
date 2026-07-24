import Link from 'next/link'
import { Category, getMetafieldValue } from '@/types'

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.slug}`} className="group block">
      <div className="relative rounded-2xl overflow-hidden shadow-sm card-hover h-44">
        {category.metadata?.cover_image ? (
          <img
            src={`${category.metadata.cover_image.imgix_url}?w=400&h=220&fit=crop&auto=format,compress`}
            alt={category.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            width={400}
            height={220}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-400 to-orange-500" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-bold text-lg leading-tight">{category.title}</h3>
          {category.metadata?.description && (
            <p className="text-white/80 text-xs mt-1 line-clamp-1">
              {getMetafieldValue(category.metadata.description)}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}