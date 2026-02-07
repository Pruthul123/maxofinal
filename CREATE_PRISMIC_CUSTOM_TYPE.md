# Prismic Custom Type Setup Guide

## Create `research_insight` Custom Type

### Step-by-Step Setup in Prismic Dashboard

---

## ✅ Step 1: Navigate to Custom Types

1. Go to **Prismic Dashboard**
2. Click on **Settings** (gear icon)
3. Select **Custom Types** from the sidebar
4. Click **Create new** button

---

## ✅ Step 2: Choose Type

### **Option A: Repeatable Type** (RECOMMENDED) ⭐

**Best for:** Multiple Research & Insights cards that can be created, edited, and deleted independently

- Click **Repeatable**
- Name: `research_insight`
- Click **Create**

**Why Repeatable?**
- You can create multiple documents (3, 5, 10, etc.)
- Each document is independent
- Easy to add/remove cards
- Scalable for future content

---

### **Option B: Single Type**

**Best for:** One global page with static content

- Click **Single**
- Name: `research_insight`
- Click **Create**

**When to use:**
- If you only want ONE research insights page
- Not recommended for your use case

---

## ✅ Step 3: Add Fields (Same for Both Types)

Once you've created the custom type, you'll see the field editor. Add these fields in order:

### **Field 1: Title**
- **Field Name:** `title`
- **Field Type:** Text
- **Settings:**
  - ✅ Check "Make this field required"
  - Max length: Optional
- Click **Add**

### **Field 2: Date**
- **Field Name:** `date`
- **Field Type:** Text
- **Example:** "October 2024"
- **Settings:**
  - ✅ Check "Make this field required"
- Click **Add**

### **Field 3: Description**
- **Field Name:** `description`
- **Field Type:** Rich Text
- **Settings:**
  - ✅ Check "Make this field required"
  - Single line: No (allow multiple lines)
- **Help text:** "Short summary of the insight (1-2 sentences)"
- Click **Add**

### **Field 4: Content**
- **Field Name:** `content`
- **Field Type:** Rich Text
- **Settings:**
  - ✅ Check "Make this field required"
- **Help text:** "Main body content of the research insight"
- Click **Add**

### **Field 5: Author**
- **Field Name:** `author`
- **Field Type:** Text
- **Example:** "Sarah Johnson, Creative Director"
- **Settings:**
  - ✅ Check "Make this field required"
- Click **Add**

### **Field 6: Image**
- **Field Name:** `image`
- **Field Type:** Image
- **Settings:**
  - ✅ Check "Make this field required"
  - Recommended thumbnail size: 800x600px
- Click **Add**

---

## ✅ Step 4: Save Custom Type

1. Click **Save** button (top right)
2. You'll see confirmation: "Custom type has been created"

---

## ✅ Step 5: Create First Document

### If you chose **Repeatable Type:**

1. Go to **Documents** (main menu)
2. Click **Create new**
3. Select **research_insight**
4. Fill in all fields:

**Example Document 1:**
```
Title: Climate-Responsive Architecture
Date: October 2024
Description: Advanced sustainable systems including bio-responsive facades, renewable energy integration, and water management solutions.
Content: Buildings of the future will actively respond to environmental conditions. From self-cooling facades to rain-harvesting systems, architecture is becoming a living, breathing organism.
Author: Michael Chen, Lead Architect
Image: [Upload or select image]
```

5. Click **Publish** (top right)
6. Repeat for other 2 documents

---

## 📋 Complete Field Configuration Reference

```
Field Name      | Type       | Required | Example Value
----------------|------------|----------|------------------------
title           | Text       | Yes      | "Climate-Responsive Architecture"
date            | Text       | Yes      | "October 2024"
description     | Rich Text  | Yes      | "Advanced sustainable systems..."
content         | Rich Text  | Yes      | "Buildings of the future will..."
author          | Text       | Yes      | "Michael Chen, Lead Architect"
image           | Image      | Yes      | [800x600px image]
```

---

## 📸 Field Type Details

### **Text Field**
- Single line of text
- Used for: title, date, author
- Max characters: 255 (default)

### **Rich Text Field**
- Allows formatting (bold, italic, links)
- Multi-line support
- Used for: description, content

### **Image Field**
- Accepts JPG, PNG, WebP, GIF
- Recommended: 800x600px
- Stored in Prismic CDN (automatic)

---

## ✅ Step 6: Verify Setup

After creating the custom type and documents:

1. **Check Custom Type Exists:**
   - Settings > Custom Types
   - Should see `research_insight` in the list

2. **Check Documents Exist:**
   - Documents menu
   - Filter by `research_insight`
   - Should see your created documents

3. **Check API Endpoint:**
   - Settings > API & Security
   - Your documents should be queryable

---

## 🔗 API Integration

Your website queries this custom type with:

```typescript
const response = await prismicClient.getByType('research_insight');
```

This fetches all published documents of type `research_insight`.

---

## 📝 Document Naming Convention

When creating documents, name them:
- `Climate-Responsive Architecture`
- `Digital-Physical Integration`
- `The Future of Work Environments`

Or use generic names:
- `research-insight-1`
- `research-insight-2`
- `research-insight-3`

---

## 🔄 Publishing Documents

**Important:** Documents must be **Published** to appear on your website

1. After filling in fields, click **Publish** (not "Save as draft")
2. Confirm publication
3. Website will automatically fetch and display

---

## 📊 Example Complete Document

```
Title: 
"The Future of Work Environments"

Date: 
"November 2024"

Description: 
"Flexible workspace design with integrated wellness features and collaborative zones for hybrid work models."

Content: 
"As remote work becomes permanent for many, office spaces are evolving into collaboration hubs rather than individual workstations. We're designing spaces that prioritize flexibility, wellness, and community building."

Author: 
"Sarah Johnson, Creative Director"

Image: 
[Upload workplace/office image 800x600px]
```

---

## ✅ Verification Checklist

- [ ] Custom type `research_insight` created in Prismic
- [ ] All 6 fields added (title, date, description, content, author, image)
- [ ] At least 3 documents created
- [ ] All documents are **Published**
- [ ] `.env` file has correct Prismic credentials
- [ ] Dev server restarted after `.env` changes
- [ ] Browser console shows "Fetching insights from Prismic..."
- [ ] Modal displays data from Prismic documents

---

## 🚀 Next Steps

1. Create the custom type using these instructions
2. Create 3 documents with your content
3. Publish all documents
4. Restart dev server: `npm run dev`
5. Visit `/future` page
6. Click Research & Insights cards to see your content!

---

## 📞 Need Help?

- Prismic Dashboard: https://prismic.io/dashboard
- Custom Types Doc: https://prismic.io/docs/core-concepts/custom-types
- Fields Doc: https://prismic.io/docs/core-concepts/field-types
