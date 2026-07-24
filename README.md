# Foodies — Food Travel Blog
![App Preview](https://imgix.cosmicjs.com/b86a22b0-8721-11f1-817f-3dbddbac1389-autopilot-photo-1504674900247-0877df9cc836-1784871432270.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, modern food travel blog built with Next.js 16 and Cosmic CMS. Explore culinary adventures across the globe through rich posts, author profiles, and curated categories.

## Features

- 🍜 **Homepage** — Hero banner, featured posts grid, category showcase, and author spotlight
- 📰 **Posts Listing** — Card-based grid with filtering, excerpts, and featured images
- 📖 **Post Detail** — Full rich-text content, author info, category badge, and tags
- 👤 **Author Pages** — Profile photos, bios, locations, websites, and post listings
- 🏷️ **Category Pages** — Cover images, descriptions, and filtered post listings
- 📱 **Fully Responsive** — Beautiful on mobile, tablet, and desktop
- ⚡ **Fast & SEO-Friendly** — Server-side rendering with Next.js App Router
- 🎨 **Warm Food Design** — Appetizing amber/orange palette with elegant typography

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=6a62f99e0133ac8646c4104c&clone_repository=6a62fb09ccf582983a434784)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a blog with posts (including featured images, content, and tags), authors, and categories. A food travel blog with posts, authors, and categories"

### Code Generation Prompt

> "Build a Next.js application for a creative portfolio called "Foodies". The content is managed in Cosmic CMS with the following object types: authors, categories, posts. Create a beautiful, modern, responsive design with a homepage and pages for each content type. A food travel blog with posts, authors, and categories"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- **[Next.js 16](https://nextjs.org/)** — React framework with App Router
- **[Cosmic](https://www.cosmicjs.com)** — Headless CMS for content management
- **[Tailwind CSS](https://tailwindcss.com/)** — Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org/)** — Type-safe JavaScript
- **[@cosmicjs/sdk](https://www.cosmicjs.com/docs)** — Official Cosmic SDK

## Getting Started

### Prerequisites

- Node.js 18+
- [Bun](https://bun.sh/) package manager
- A [Cosmic](https://www.cosmicjs.com) account with bucket configured

### Installation

```bash
git clone <your-repo>
cd foodies
bun install
```

### Environment Variables

Create a `.env.local` file in the root:

```bash
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

### Run Development Server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Cosmic SDK Examples

### Fetch all posts with author and category
```typescript
const response = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata', 'created_at'])
  .depth(2)
```

### Fetch single post by slug
```typescript
const response = await cosmic.objects
  .findOne({ type: 'posts', slug: 'my-post' })
  .depth(2)
```

### Fetch authors
```typescript
const response = await cosmic.objects
  .find({ type: 'authors' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

Content is managed in [Cosmic](https://www.cosmicjs.com) with three object types:

| Type | Fields |
|------|--------|
| **posts** | excerpt, content, featured_image, author, category, tags, published_date |
| **authors** | bio, profile_photo, location, website |
| **categories** | description, cover_image |

## Deployment

### Vercel (Recommended)
```bash
bun run build
vercel deploy
```

Set environment variables in your Vercel project dashboard.

### Netlify
```bash
bun run build
netlify deploy --prod
```

<!-- README_END -->