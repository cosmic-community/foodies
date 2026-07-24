import Link from 'next/link'
import { Post, getMetafieldValue } from '@/types'

interface PostCardProps {
  post: Post
  compact?: boolean
}

export default function PostCard({ post, compact = false }: PostCardProps) {
  const publishedDate = post.metadata?.published_date
    ? new Date(post.metadata.published_date).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric',
      })
    : new Date(post.created_at).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric',
      })

  const category = post.metadata?.category
  const author = post.metadata?.author

  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-amber-50 card-hover h-full flex flex-col">
        {/* Image */}
        <div className={`relative overflow-hidden ${compact ? 'h-36' : 'h-52'} flex-shrink-0`}>
          {post.metadata?.featured_image ? (
            <img
              src={`${post.metadata.featured_image.imgix_url}?w=600&h=320&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              width={600}
              height={320}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-amber-200 to-orange-200 flex items-center justify-center">
              <span className="text-5xl">🍽️</span>
            </div>
          )}
          {category && (
            <span className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {category.title}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-bold text-gray-900 text-lg leading-snug mb-2 group-hover:text-amber-700 transition-colors line-clamp-2">
            {post.title}
          </h3>

          {post.metadata?.excerpt && !compact && (
            <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
              {getMetafieldValue(post.metadata.excerpt)}
            </p>
          )}

          {/* Footer Meta */}
          <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
            {author && (
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {author.metadata?.profile_photo ? (
                  <img
                    src={`${author.metadata.profile_photo.imgix_url}?w=40&h=40&fit=crop&auto=format,compress`}
                    alt={author.title}
                    className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                    width={40}
                    height={40}
                  />
                ) : (
                  <span className="w-7 h-7 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-bold text-xs flex-shrink-0">
                    {author.title.charAt(0)}
                  </span>
                )}
                <span className="text-xs text-gray-600 truncate">{author.title}</span>
              </div>
            )}
            <time className="text-xs text-gray-400 flex-shrink-0">{publishedDate}</time>
          </div>
        </div>
      </article>
    </Link>
  )
}