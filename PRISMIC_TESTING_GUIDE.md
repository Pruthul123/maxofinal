# Prismic Integration Testing Guide

## How the Modal Updates from Prismic

The Research & Insights modal is now fully integrated with Prismic CMS. Here's how it works:

---

## 🔄 Data Flow

```
1. Component mounts → FutureThinking.tsx
2. useEffect hook triggers → Calls createPrismicClient()
3. Prismic client fetches data → getByType('research_insight')
4. Data mapped to component format
5. State updated with setPrismicInsights()
6. If Prismic data exists → Use Prismic data
7. If no Prismic data → Fall back to default data
8. Modal opens with selected data
```

---

## ✅ Verify Setup Steps

### Step 1: Check Environment Variables
Ensure your `.env` file has:
```env
VITE_PRISMIC_REPO_NAME=maxo-architecture
VITE_PRISMIC_ACCESS_TOKEN=your_access_token_here
```

**To get your access token:**
1. Go to Prismic Dashboard
2. Settings > API & Security
3. Copy the Permanent Access Token
4. Paste in `.env`

### Step 2: Check Browser Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. You should see logs like:
   ```
   Fetching insights from Prismic...
   Prismic insights fetched: [...]
   Mapped insights: [...]
   ```

**If you see errors:**
- Check if `VITE_PRISMIC_REPO_NAME` is correct
- Verify the access token
- Ensure documents are published in Prismic

### Step 3: Verify Prismic Documents
1. Go to Prismic Dashboard
2. Navigate to your documents
3. Check that you have documents of type: `research_insight`
4. Ensure they are **Published** (not just drafts)

### Step 4: Test the Modal
1. Navigate to `/future` page
2. Scroll to "Research & Insights" section
3. Click any card to open modal
4. Verify the data shows:
   - ✅ Title from Prismic
   - ✅ Date from Prismic
   - ✅ Description from Prismic
   - ✅ Content from Prismic
   - ✅ Author from Prismic
   - ✅ Image from Prismic

---

## 📋 Expected Document Structure in Prismic

Each `research_insight` document should have:

| Field | Type | Value Example |
|-------|------|---|
| **title** | Text | "Climate-Responsive Architecture" |
| **date** | Text | "October 2024" |
| **description** | Rich Text | "Advanced sustainable systems..." |
| **content** | Rich Text | "Buildings of the future..." |
| **author** | Text | "Michael Chen, Lead Architect" |
| **image** | Image | [Upload your image] |

---

## 🔍 Debugging

### If cards don't show Prismic data:

**Check 1: Console Logs**
```javascript
// Open console and look for these messages
"Fetching insights from Prismic..."
"Prismic client not initialized" // means env vars missing
"Error fetching Prismic insights:" // means connection issue
```

**Check 2: Network Tab**
1. Open DevTools > Network tab
2. Reload page
3. Look for requests to `prismic.io`
4. Check if they succeed (200 status)

**Check 3: Application Tab**
1. DevTools > Application
2. Check local storage for Prismic data
3. Verify environment variables are loaded

---

## 🔧 How the Code Works

### Data Fetching (lines ~280-310)
```tsx
const response = await prismicClient.getByType('research_insight');
const mappedInsights = response.results.map((doc: any) => ({
  id: doc.id,
  title: doc.data?.title,
  date: doc.data?.date,
  content: doc.data?.content,
  description: doc.data?.description,
  author: doc.data?.author,
  image: doc.data?.image?.url,
  data: doc.data
}));
setPrismicInsights(mappedInsights);
```

### Conditional Rendering (lines ~540)
```tsx
{(prismaticInsights.length > 0 ? prismaticInsights : insights).map(...)
```

**Logic:**
- If `prismaticInsights` has data → Show Prismic data
- If `prismaticInsights` is empty → Show default data

### Modal Display (InsightModal component, lines ~10-230)
```tsx
{insight.title || insight.data?.title}
{insight.date || insight.data?.date}
// ... etc for all fields
```

**Fallback handling:**
- First tries direct field: `insight.title`
- If not found, tries nested data: `insight.data?.title`
- Ensures compatibility with both data sources

---

## 📊 Data Priority

1. **First Priority:** Direct Prismic field mapping
   ```
   insight.title
   insight.date
   insight.content
   ```

2. **Fallback:** Nested Prismic structure
   ```
   insight.data?.title
   insight.data?.date
   insight.data?.content
   ```

3. **Last Resort:** Default hardcoded data
   ```
   const insights = [...]
   ```

---

## 🚀 How to Update Content

### To change a card's content:
1. Go to Prismic Dashboard
2. Open the `research_insight` document
3. Edit any field (title, date, description, content, author, image)
4. Click **Publish**
5. Refresh the website (the card updates automatically)

### To add a new card:
1. Go to Prismic Dashboard
2. Click **Create new > research_insight**
3. Fill in all fields:
   - title
   - date (e.g., "January 2026")
   - description
   - content
   - author
   - image
4. Click **Publish**
5. New card appears automatically on the `/future` page

### To remove a card:
1. Go to Prismic Dashboard
2. Open the document
3. Click **Unpublish** or **Delete**
4. Card disappears from website

---

## 🧪 Real-Time Testing

### Test workflow:
1. Open `/future` page in one browser window
2. Open Prismic dashboard in another window
3. Edit a document in Prismic
4. Click Publish
5. Refresh the website
6. See the changes appear immediately!

---

## ⚠️ Common Issues & Solutions

### Issue: Modal shows default data instead of Prismic data
**Solution:**
- [ ] Check `.env` file has correct `VITE_PRISMIC_REPO_NAME`
- [ ] Verify access token is correct
- [ ] Ensure documents are **Published** (not drafts)
- [ ] Check browser console for errors
- [ ] Restart dev server: `npm run dev`

### Issue: Images not showing in modal
**Solution:**
- [ ] Upload image to Prismic `image` field
- [ ] Verify image format (JPG, PNG, WebP)
- [ ] Check image URL is accessible

### Issue: Modal opens but content is blank
**Solution:**
- [ ] Check all fields are filled in Prismic
- [ ] Verify field names match (case-sensitive)
- [ ] Ensure no special characters in fields

### Issue: "Prismic client not initialized"
**Solution:**
- [ ] Missing environment variables in `.env`
- [ ] Restart dev server after adding `.env`
- [ ] Check `VITE_PRISMIC_REPO_NAME` is exactly "maxo-architecture"

---

## 📞 Support

- Prismic Docs: https://prismic.io/docs
- Custom Types: https://prismic.io/docs/core-concepts/custom-types
- Query API: https://prismic.io/docs/core-concepts/query-the-api

---

## ✨ Success Indicators

You'll know it's working when:
1. ✅ Browser console shows "Fetching insights from Prismic..."
2. ✅ Modal opens with data from Prismic (not defaults)
3. ✅ Images display correctly
4. ✅ Changes in Prismic appear on site after refresh
5. ✅ No console errors or warnings
