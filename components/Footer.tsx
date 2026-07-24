import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-400 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🍜</span>
              <span className="text-xl font-bold text-white">Foodies</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Exploring the world one bite at a time. Stories, flavors, and culinary adventures from passionate food travelers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/posts', label: 'All Stories' },
                { href: '/categories', label: 'Categories' },
                { href: '/authors', label: 'Authors' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-amber-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Powered by */}
          <div>
            <h3 className="text-white font-semibold mb-4">Powered by</h3>
            <p className="text-sm mb-2">Content managed with</p>
            <a
              href="https://www.cosmicjs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 transition-colors font-medium text-sm"
            >
              Cosmic →
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-sm text-center">
          <p>© {currentYear} Foodies. All rights reserved. Built with ❤️ and great food.</p>
        </div>
      </div>
    </footer>
  )
}