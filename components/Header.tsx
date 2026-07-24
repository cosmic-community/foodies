'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/posts', label: 'Stories' },
    { href: '/categories', label: 'Categories' },
    { href: '/authors', label: 'Authors' },
  ]

  return (
    <header className="bg-white border-b border-amber-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🍜</span>
            <span className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
              Foodies
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-full text-gray-700 font-medium hover:bg-amber-50 hover:text-amber-700 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/posts"
              className="hidden md:inline-block bg-amber-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-amber-700 transition-colors"
            >
              Explore Stories
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-amber-50 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <nav className="md:hidden py-3 pb-4 border-t border-amber-100">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 text-gray-700 font-medium hover:bg-amber-50 hover:text-amber-700 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}