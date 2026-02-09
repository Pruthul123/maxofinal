# SEO Refactoring - Complete Documentation

## Overview
This document outlines the comprehensive SEO refactoring performed across the MAXO (https://www.maxo.co.in/) React/Vercel website. All changes follow modern SEO best practices and are production-ready.

---

## 🎯 Key Changes Summary

### 1. **New Universal SEO Component**
- **Location**: `src/components/SEO.tsx`
- **Technology**: `react-helmet-async` (replacing manual DOM manipulation)
- **Features**:
  - Automatic title formatting (adds "| MAXO" if not present)
  - Full Open Graph support (Facebook)
  - Twitter Card support
  - Canonical URL handling
  - Structured data (Schema.org JSON-LD) support
  - Article-specific meta tags (author, published time, etc.)
  - Automatic fallbacks for missing data

### 2. **SEO Implementation Across All Pages**

#### **Home Page** (`src/App.tsx`)
- **Title**: "MAXO | Award-Winning Architects & Designers"
- **Keywords**: architecture firm, architects, interior designers, sustainable architecture, contemporary design, etc.
- **Schema**: Organization schema with full contact details, address, logo
- **URL**: https://www.maxo.co.in/

#### **About Page** (`src/components/AboutUs.tsx`)
- **Title**: "About MAXO | Divya Patel - Founder & Principal Architect"
- **Keywords**: Divya Patel architect, MAXO founder, Bartlett School of Architecture, Benoy London, etc.
- **Image**: Founder photo
- **URL**: https://www.maxo.co.in/about

#### **Our Work Page** (`src/components/OurWork.tsx`)
- **Title**: "Our Work & Projects | MAXO Architects & Designers Portfolio"
- **Keywords**: MAXO projects, architecture portfolio, residential architecture, commercial architecture, etc.
- **URL**: https://www.maxo.co.in/work

#### **Future Thinking Page** (`src/components/FutureThinking.tsx`)
- **Title**: "Future Thinking & Research | MAXO Architects"
- **Keywords**: architectural research, future thinking, innovation in architecture, design research, etc.
- **URL**: https://www.maxo.co.in/future

#### **News Page** (`src/components/News.tsx`)
- **Title**: "News & Updates | MAXO Architects & Designers"
- **Keywords**: MAXO news, architecture updates, design news, architectural projects, etc.
- **URL**: https://www.maxo.co.in/news

#### **Contact Page** (`src/components/ContactUs.tsx`)
- **Title**: "Contact MAXO | Get In Touch With Our Architecture Team"
- **Keywords**: contact MAXO, architecture consultation, Ahmedabad architects, hire architects, etc.
- **URL**: https://www.maxo.co.in/contact

#### **Work Category Pages** (`src/components/work/WorkCategoryPage.tsx`)
- **Dynamic Title**: "{Category Name} Projects | MAXO Architects"
- **Dynamic Keywords**: Based on category name
- **Dynamic URL**: https://www.maxo.co.in/work/{categoryUid}

#### **Project Detail Pages** (`src/components/work/WorkProjectPage.tsx`)
- **Dynamic Title**: "{Project Name} | MAXO Architects"
- **Dynamic Description**: Includes project location and details
- **Dynamic Image**: Project hero image
- **Dynamic URL**: https://www.maxo.co.in/work/{categoryUid}/{projectUid}

#### **Research Insight Detail Pages** (`src/components/ResearchInsightPage.tsx`)
- **Dynamic Title**: Uses Prismic `seo_meta_title` field or falls back to article title
- **Dynamic Keywords**: Based on article title and author
- **Schema**: 
  - Article schema (with headline, author, datePublished, image, publisher)
  - Breadcrumb schema (Home → Future Thinking → Article)
- **Meta Tags**: Full Open Graph, Twitter Cards, article:published_time, article:author
- **Dynamic URL**: https://www.maxo.co.in/future/insight/{insightId}

---

## 🔧 Technical Implementation

### SEO Component API
```tsx
<SEO 
  title="Page Title"
  description="Page description for meta tags"
  keywords="keyword1, keyword2, keyword3"
  image="https://www.maxo.co.in/image.jpg"
  url="https://www.maxo.co.in/page"
  type="website" // or "article"
  author="Author Name" // for articles
  publishedTime="2024-01-01" // for articles
  modifiedTime="2024-01-15" // for articles
  schema={{...}} // Optional structured data
/>
```

### Structured Data Examples

#### Organization Schema (Home Page)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "MAXO",
  "legalName": "MAXO Architects & Designers",
  "url": "https://www.maxo.co.in",
  "logo": "https://www.maxo.co.in/maxo-logo.jpeg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1215, Maple Trade Centre, Thaltej",
    "addressLocality": "Ahmedabad",
    "addressRegion": "Gujarat",
    "postalCode": "380052",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-92270-01016",
    "contactType": "Customer Service",
    "email": "info@maxo.co.in"
  }
}
```

#### Article Schema (Research Insight Pages)
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "description": "Article description",
  "image": "https://www.maxo.co.in/article-image.jpg",
  "datePublished": "2024-01-01",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  },
  "publisher": {
    "@type": "Organization",
    "name": "MAXO",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.maxo.co.in/maxo-logo.jpeg"
    }
  }
}
```

#### Breadcrumb Schema (Research Insight Pages)
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.maxo.co.in/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Future Thinking",
      "item": "https://www.maxo.co.in/future"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Article Title",
      "item": "https://www.maxo.co.in/future/insight/article-slug"
    }
  ]
}
```

---

## 📄 Dynamic Sitemap Generation

### Features
- **Automatic**: Runs during build process (`npm run build`)
- **Dynamic Content**: Fetches all research insights, work categories, and projects from Prismic
- **Fallback**: Static sitemap generated if Prismic is unavailable
- **Location**: `public/sitemap.xml`

### Sitemap Script
- **Location**: `scripts/generate-sitemap.mjs`
- **Run Manually**: `npm run generate:sitemap`
- **Auto-run**: Executes before every production build

### Sitemap Structure
- Static pages (Home, About, Work, Future, News, Contact)
- Dynamic research insight pages (`/future/insight/{uid}`)
- Dynamic work category pages (`/work/{categoryUid}`)
- Dynamic project detail pages (`/work/{categoryUid}/{projectUid}`)

### Example Sitemap Entry
```xml
<url>
  <loc>https://www.maxo.co.in/future/insight/sustainable-architecture</loc>
  <lastmod>2024-02-09</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```

---

## 🤖 Robots.txt Configuration

**Location**: `public/robots.txt`

```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

Sitemap: https://www.maxo.co.in/sitemap.xml
```

- ✅ Allows all search engines
- ✅ Disallows admin and API routes
- ✅ Points to dynamic sitemap

---

## 🖼️ Image Alt Text

All images across the site have descriptive alt attributes:
- Homepage hero images
- About page team photos
- Work portfolio images
- Research insight images
- Navigation icons

Example:
```tsx
<img 
  src={insight.image} 
  alt={`${insight.title} - Research by MAXO`}
/>
```

---

## 🎨 Prismic CMS Integration

### SEO Fields in Prismic
Research Insight content type supports:
- `seo_meta_title`: Custom SEO title (fallback: article title)
- `seo_meta_description`: Custom SEO description (fallback: article description)
- `seo_og_image`: Custom Open Graph image (fallback: article main image)

### Fallback Logic
```tsx
const seoTitle = getText(data.seo_meta_title) || title || 'Research Insight | MAXO';
const seoDescription = getText(data.seo_meta_description) || description || content.substring(0, 160);
const seoImage = data.seo_og_image?.url || mainImage || 'https://www.maxo.co.in/maxo-logo.jpeg';
```

---

## 📊 SEO Best Practices Applied

### ✅ Meta Tags
- Title tags optimized (50-60 characters)
- Meta descriptions (150-160 characters)
- Keywords meta tags (natural language, no stuffing)
- Robots meta tag (`index, follow`)

### ✅ Open Graph
- og:type (website/article)
- og:title
- og:description
- og:url (canonical)
- og:image
- og:site_name

### ✅ Twitter Cards
- twitter:card (summary_large_image)
- twitter:title
- twitter:description
- twitter:image
- twitter:url

### ✅ Canonical URLs
- Every page has a canonical URL
- Matches exact route structure
- Uses `www.maxo.co.in` consistently

### ✅ Structured Data
- Organization schema (global)
- Article schema (research insights)
- Breadcrumb schema (research insights)
- JSON-LD format (Google-recommended)

### ✅ Technical SEO
- react-helmet-async for server-side rendering compatibility
- Clean URL structure
- Dynamic sitemap.xml
- Proper robots.txt
- Image alt attributes
- Semantic HTML

---

## 🚀 Deployment Instructions

### 1. Build & Deploy
```bash
npm run build
```

This will:
1. Generate dynamic sitemap from Prismic
2. Compile TypeScript
3. Build optimized production bundle
4. Output to `dist/` directory

### 2. Vercel Deployment
The site auto-deploys on push to GitHub. Vercel will:
- Run `npm run build` automatically
- Generate fresh sitemap with latest content
- Deploy to production

### 3. Verify Deployment
After deployment, verify:
- [ ] Sitemap accessible at https://www.maxo.co.in/sitemap.xml
- [ ] Robots.txt accessible at https://www.maxo.co.in/robots.txt
- [ ] Meta tags visible in page source (View Page Source)
- [ ] Open Graph preview works (Facebook Sharing Debugger)
- [ ] Structured data valid (Google Rich Results Test)

---

## 🧪 Testing & Validation

### Google Tools
1. **Google Search Console**
   - Submit sitemap: https://www.maxo.co.in/sitemap.xml
   - Monitor indexing status
   - Check for crawl errors

2. **Google Rich Results Test**
   - URL: https://search.google.com/test/rich-results
   - Test article pages for Article schema
   - Test home page for Organization schema

3. **PageSpeed Insights**
   - URL: https://pagespeed.web.dev/
   - Check SEO score
   - Verify meta tags visible

### Facebook & Twitter
1. **Facebook Sharing Debugger**
   - URL: https://developers.facebook.com/tools/debug/
   - Test Open Graph tags
   - Clear cache if needed

2. **Twitter Card Validator**
   - URL: https://cards-dev.twitter.com/validator
   - Test Twitter Cards
   - Verify image displays

### Manual Checks
- [ ] View page source and confirm meta tags
- [ ] Test all canonical URLs work as direct links
- [ ] Verify images have alt attributes
- [ ] Check sitemap contains all pages
- [ ] Confirm robots.txt is accessible

---

## 📝 SEO Configuration Mapping

### Page-by-Page Breakdown

| Page | Title | Description | Keywords | Schema | Priority |
|------|-------|-------------|----------|--------|----------|
| **Home** | MAXO \| Award-Winning Architects & Designers | Award-winning architecture and design firm... | architecture firm, architects, sustainable architecture | Organization | 1.0 |
| **About** | About MAXO \| Divya Patel | Meet Divya Patel, founder of MAXO... | Divya Patel architect, Bartlett School | - | 0.9 |
| **Work** | Our Work & Projects \| MAXO Portfolio | Explore MAXO's portfolio of innovative projects... | architecture portfolio, residential architecture | - | 0.9 |
| **Future** | Future Thinking & Research \| MAXO | Explore innovative research and insights... | architectural research, future thinking | - | 0.8 |
| **News** | News & Updates \| MAXO | Stay updated with latest news and projects... | MAXO news, architecture updates | - | 0.8 |
| **Contact** | Contact MAXO \| Get In Touch | Contact MAXO Architects for your project... | contact MAXO, architecture consultation | - | 0.7 |
| **Work Category** | {Category} Projects \| MAXO | Explore MAXO's {category} projects... | Dynamic based on category | - | 0.8 |
| **Project Detail** | {Project} \| MAXO | Discover {project} by MAXO Architects... | Dynamic based on project | - | 0.6 |
| **Research Insight** | Dynamic from Prismic | Dynamic from Prismic | Dynamic based on article | Article + Breadcrumb | 0.7 |

---

## 🔄 Maintenance & Updates

### Adding New Pages
1. Import SEO component: `import SEO from './components/SEO';`
2. Add SEO component to page:
```tsx
<SEO 
  title="New Page Title | MAXO"
  description="Page description"
  keywords="relevant, keywords, here"
  url="https://www.maxo.co.in/new-page"
  image="https://www.maxo.co.in/page-image.jpg"
/>
```
3. Update sitemap script if page is static

### Updating SEO for Existing Pages
1. Edit the relevant component file
2. Update title, description, keywords as needed
3. Rebuild and deploy

### Prismic Content Updates
- Sitemap regenerates automatically on each build
- New research insights appear in sitemap automatically
- SEO fields in Prismic take precedence over defaults

---

## ✅ Quality Assurance Checklist

### Pre-Deployment
- [ ] All pages have unique titles
- [ ] All descriptions are under 160 characters
- [ ] All canonical URLs use `www.maxo.co.in`
- [ ] All images have descriptive alt text
- [ ] Sitemap includes all pages
- [ ] Robots.txt is correct
- [ ] No TypeScript errors
- [ ] No console errors

### Post-Deployment
- [ ] Sitemap.xml is accessible
- [ ] Robots.txt is accessible
- [ ] Meta tags visible in page source
- [ ] Open Graph works in Facebook debugger
- [ ] Twitter Cards work in validator
- [ ] Structured data passes Rich Results Test
- [ ] Pages indexed in Google Search Console

---

## 📚 Resources & References

### Tools Used
- **react-helmet-async**: Client-side meta tag management
- **@prismicio/client**: Prismic CMS integration
- **Schema.org**: Structured data standards

### Documentation
- [react-helmet-async](https://github.com/staylor/react-helmet-async)
- [Schema.org](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards)
- [Google Search Central](https://developers.google.com/search)

### Support Contacts
- Technical Issues: Check Prismic dashboard
- SEO Questions: Refer to this documentation
- Deployment: Vercel dashboard

---

## 📞 Technical Support Information

### Environment Variables Required
```
VITE_PRISMIC_REPO_NAME=maxo-architecture
```

### Build Commands
```bash
# Development
npm run dev

# Generate sitemap only
npm run generate:sitemap

# Production build (includes sitemap generation)
npm run build

# Preview production build
npm run preview
```

### File Structure
```
src/
  components/
    SEO.tsx (Universal SEO component)
    AboutUs.tsx (SEO implemented)
    OurWork.tsx (SEO implemented)
    FutureThinking.tsx (SEO implemented)
    ContactUs.tsx (SEO implemented)
    News.tsx (SEO implemented)
    ResearchInsightPage.tsx (SEO + Schema implemented)
    work/
      WorkCategoryPage.tsx (SEO implemented)
      WorkProjectPage.tsx (SEO implemented)
  App.tsx (Home page SEO + Organization schema)

scripts/
  generate-sitemap.mjs (Dynamic sitemap generator)

public/
  robots.txt (Search engine directives)
  sitemap.xml (Generated automatically)
```

---

## 🎉 Summary

All SEO best practices have been implemented across the MAXO website:
- ✅ Universal SEO component with react-helmet-async
- ✅ Complete meta tags (title, description, keywords, OG, Twitter)
- ✅ Structured data (Organization, Article, Breadcrumb schemas)
- ✅ Dynamic sitemap generation from Prismic
- ✅ Proper robots.txt configuration
- ✅ Canonical URLs on all pages
- ✅ Image alt attributes throughout
- ✅ Fallback logic for missing data
- ✅ Production-ready and deployable
- ✅ No breaking changes to UI/UX

The website is now fully optimized for search engines and ready for Google indexing!

---

**Last Updated**: February 9, 2026
**Version**: 1.0.0
**Status**: ✅ Production Ready
