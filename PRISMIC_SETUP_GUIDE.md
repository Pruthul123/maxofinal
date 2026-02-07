# Prismic Setup Guide for Research & Insights

## Overview
The Research & Insights cards component is now integrated with Prismic CMS. Follow these steps to set up the custom type and create content in Prismic.

---

## Step 1: Create Custom Type in Prismic

### Repository Name
```
maxo-architecture
```

### Custom Type to Create: `research_insight`

1. Go to your Prismic dashboard
2. Navigate to **Settings > Custom Types**
3. Click **Create new** > **Custom Type**
4. Name it: **`research_insight`**
5. Use **Repeatable** type (if you want multiple documents) or **Single** (if just one)

---

## Step 2: Define Fields in Prismic

Add the following fields to your `research_insight` custom type:

| Field Name | Type | Required | Notes |
|-----------|------|----------|-------|
| **title** | Rich Text | ✅ Yes | Main heading of the insight |
| **date** | Text | ✅ Yes | Format: "November 2024" |
| **description** | Rich Text | ✅ Yes | Short summary (1-2 sentences) |
| **content** | Rich Text | ✅ Yes | Main paragraph content |
| **author** | Text | ✅ Yes | Author name and title |
| **image** | Image | ✅ Yes | Featured image for card |

### Field Configuration Details:

**Title Field:**
- Type: Rich Text (Single line)
- Max length: 100 characters

**Date Field:**
- Type: Text
- Example: "November 2024"

**Description Field:**
- Type: Rich Text (Paragraph)
- Example: "Flexible workspace design with integrated wellness features and collaborative zones for hybrid work models."

**Content Field:**
- Type: Rich Text (Multiple paragraphs)
- Example: "As remote work becomes permanent for many, office spaces are evolving into collaboration hubs rather than individual workstations..."

**Author Field:**
- Type: Text
- Example: "Sarah Johnson, Creative Director"

**Image Field:**
- Type: Image
- Recommended size: 800x600px
- Format: JPG or PNG

---

## Step 3: Environment Variables Setup

Update your `.env` file with Prismic credentials:

```env
VITE_PRISMIC_REPO_NAME=maxo-architecture
VITE_PRISMIC_ACCESS_TOKEN=your_prismic_access_token_here
```

### How to get your Access Token:
1. Go to Prismic Dashboard > Settings > API & Security
2. Generate a new **Permanent access token** (or use existing)
3. Copy and paste into `.env`

---

## Step 4: Create Documents in Prismic

### Document 1: The Future of Work Environments
- **Title:** The Future of Work Environments
- **Date:** November 2024
- **Description:** Flexible workspace design with integrated wellness features and collaborative zones for hybrid work models.
- **Content:** As remote work becomes permanent for many, office spaces are evolving into collaboration hubs rather than individual workstations. We're designing spaces that prioritize flexibility, wellness, and community building.
- **Author:** Sarah Johnson, Creative Director
- **Image:** Upload image of modern workspace

### Document 2: Climate-Responsive Architecture
- **Title:** Climate-Responsive Architecture
- **Date:** October 2024
- **Description:** Advanced sustainable systems including bio-responsive facades, renewable energy integration, and water management solutions.
- **Content:** Buildings of the future will actively respond to environmental conditions. From self-cooling facades to rain-harvesting systems, architecture is becoming a living, breathing organism.
- **Author:** Michael Chen, Lead Architect
- **Image:** Upload image of sustainable building

### Document 3: Digital-Physical Integration
- **Title:** Digital-Physical Integration
- **Date:** September 2024
- **Description:** Immersive AR/VR experiences integrated with physical architecture for enhanced user interaction and spatial awareness.
- **Content:** The boundary between digital and physical spaces is dissolving. We're creating environments where digital interfaces seamlessly blend with physical architecture to enhance user experience.
- **Author:** Emily Rodriguez, Interior Designer
- **Image:** Upload image of digital-integrated space

---

## Step 5: Publish Documents

1. For each document created above:
   - Click **Publish** button
   - Click **Release** to make it available to your website

---

## Step 6: Verify Integration

The component will:
1. Fetch documents from Prismic type `research_insight`
2. Display them in the 3-column card layout
3. Show images with hover zoom effect
4. Display all metadata (date, title, description, content, author)
5. Fall back to default data if Prismic is unavailable

### Testing:
1. Restart your dev server
2. Navigate to `/future` page
3. Scroll to "Research & Insights" section
4. You should see the cards populated from Prismic

---

## Component File Locations

- **Component:** `/src/components/FutureThinking.tsx`
- **Prismic Client:** `/src/prismicClient.ts`
- **Environment Config:** `.env` (root directory)

---

## API Query Reference

The component uses this Prismic query:
```typescript
const response = await prismicClient.getByType('research_insight');
```

This fetches all published documents of type `research_insight`.

---

## Fallback Data

If Prismic is not configured or unavailable, the component uses the default data array defined in the component. This ensures the page doesn't break.

---

## Troubleshooting

**Issue:** Cards not showing from Prismic
- ✅ Verify `VITE_PRISMIC_REPO_NAME` in .env
- ✅ Check access token is correct
- ✅ Ensure documents are published in Prismic
- ✅ Check browser console for errors

**Issue:** Images not displaying
- ✅ Ensure image field is populated in Prismic
- ✅ Check image is in supported format (JPG, PNG)
- ✅ Verify image dimensions (recommended 800x600px)

**Issue:** Text formatting issues
- ✅ Use Rich Text fields in Prismic for proper formatting
- ✅ Component handles both plain text and rich text

---

## Future Enhancements

- Add category tags to filter insights
- Implement pagination for more insights
- Add "Read More" link to individual insight pages
- Connect insights to blog/detailed pages
- Add search functionality

---

## Support

For Prismic documentation: https://prismic.io/docs
For custom types: https://prismic.io/docs/core-concepts/custom-types
