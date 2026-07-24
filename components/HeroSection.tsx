import Link from 'next/link'
import { Post, getMetafieldValue } from '@/types'

interface HeroSectionProps {
  featuredPost: Post | null
}

export default function HeroSection({ featuredPost }: HeroSectionProps) {
  if (!featuredPost) {
    return (
      <section className="bg-gradient-to-br from-amber-600 via-orange-600 to-red-700 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-7xl mb-6 block">🍜</span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Taste the World
          </h1>
          <p className="text-amber-100 text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
            Food travel stories, culinary adventures, and the flavors that connect us all.
          </p>
          <Link
            href="/posts"
            className="inline-block bg-white text-amber-700 px-10 py-4 rounded-full font-bold text-lg hover:bg-amber-50 transition-colors shadow-xl"
          >
            Start Exploring
          </Link>
        </div>
      </section>
    )
  }

  const category = featuredPost.metadata?.category
  const author = featuredPost.metadata?.author
  const excerpt = getMetafieldValue(featuredPost.metadata?.excerpt)

  return (
    <section className="relative h-[70vh] min-h-[500px] max-h-[700px] overflow-hidden">
      {featuredPost.metadata?.featured_image ? (
        <img
          src={`${featuredPost.metadata.featured_image.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
          alt={featuredPost.title}
          className="w-full h-full object-cover"
          width={1600}
          height={900}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-amber-600 via-orange-600 to-red-700" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-3 items-center mb-4">
            <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              Featured Story
            </span>
            {category && (
              <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                {category.title}
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            {featuredPost.title}
          </h1>

          {excerpt && (
            <p className="text-white/80 text-lg md:text-xl mb-6 max-w-2xl line-clamp-2">
              {excerpt}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={`/posts/${featuredPost.slug}`}
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full font-bold transition-colors shadow-lg"
            >
              Read Story →
            </Link>
            {author && (
              <Link
                href={`/authors/${author.slug}`}
                className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
              >
                {author.metadata?.profile_photo ? (
                  <img
                    src={`${author.metadata.profile_photo.imgix_url}?w=48&h=48&fit=crop&auto=format,compress`}
                    alt={author.title}
                    className="w-8 h-8 rounded-full object-cover border-2 border-white/50"
                    width={48}
                    height={48}
                  />
                ) : (
                  <span className="w-8 h-8 rounded-full bg-amber-300 flex items-center justify-center text-amber-900 font-bold text-sm border-2 border-white/50">
                    {author.title.charAt(0)}
                  </span>
                )}
                <span className="text-sm font-medium">By {author.title}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}