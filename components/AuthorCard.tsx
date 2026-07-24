import Link from 'next/link'
import { Author, getMetafieldValue } from '@/types'

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  return (
    <Link href={`/authors/${author.slug}`} className="group block">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-50 card-hover text-center h-full">
        {author.metadata?.profile_photo ? (
          <img
            src={`${author.metadata.profile_photo.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
            alt={author.title}
            className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 border-amber-100 group-hover:border-amber-400 transition-colors"
            width={160}
            height={160}
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-200 to-orange-200 flex items-center justify-center text-amber-800 font-bold text-3xl mx-auto mb-4 border-4 border-amber-100 group-hover:border-amber-400 transition-colors">
            {author.title.charAt(0)}
          </div>
        )}

        <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-700 transition-colors mb-1">
          {author.title}
        </h3>

        {author.metadata?.location && (
          <p className="text-sm text-gray-500 flex items-center justify-center gap-1 mb-3">
            📍 {getMetafieldValue(author.metadata.location)}
          </p>
        )}

        {author.metadata?.bio && (
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
            {getMetafieldValue(author.metadata.bio)}
          </p>
        )}

        <div className="mt-4 pt-4 border-t border-gray-50">
          <span className="text-amber-600 text-sm font-semibold group-hover:text-amber-800 transition-colors">
            View Profile →
          </span>
        </div>
      </div>
    </Link>
  )
}