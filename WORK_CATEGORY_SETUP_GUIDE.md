# Work Category Custom Type - Updated Setup Guide

## ✅ Updated Structure (No Description, Multiple Photos)

Your `work_category` custom type should have:

1. **UID** - Unique identifier
2. **Title** - Category name
3. **Card Image** - Single image for the category card
4. **Order** - Number field to control display order
5. **Gallery** - Multiple photos (NEW - Repeatable)

---

## 📋 How to Update in Prismic Dashboard

### Step 1: Go to Custom Types
1. Open **Prismic Dashboard**
2. Click **Settings** (gear icon)
3. Select **Custom Types**
4. Find and click on `work_category`
5. Click **Edit** (pencil icon)

### Step 2: Remove Description Field
1. Find the "description" field
2. Click the **trash icon** to delete it
3. Confirm deletion

### Step 3: Add Gallery (Multiple Photos)

#### Option A: Using Repeatable Group (Recommended)
1. Click **Add new field**
2. Select **Repeatable Group**
3. Set:
   - **Field Name:** `photos`
   - **Label:** "Gallery Photos"
4. Inside the group, add:
   - **Field Name:** `photo`
   - **Field Type:** Image
   - **Label:** "Photo"
5. Click **Save**

#### Option B: Using Slices (Advanced)
1. Click **Add new field**
2. Select **Slices**
3. Set:
   - **Field Name:** `gallery`
   - **Label:** "Gallery Photos"
4. Click **Create Slice** → `photo_item`
5. Inside the slice, add:
   - **Field Name:** `image`
   - **Field Type:** Image
6. Click **Save**

### Step 4: Final Field Order
Your fields should now be:
1. UID (auto)
2. Title
3. Card Image
4. Order
5. Gallery/Photos (multiple images)

---

## ✅ Updated Code Changes Needed

Since you're removing the description field, update these files:

### 1. **OurWork.tsx** - Remove description mapping
```tsx
// Before:
description: (doc.data?.description as string) || '',

// After:
// Remove this line entirely
```

### 2. **WorkGallery.tsx** - Remove description mapping
```tsx
// Before:
description: (doc.data?.description as string) || '',

// After:
// Remove this line entirely
```

### 3. **Component TypeScript interface**
```tsx
// Before:
type CategoryCard = {
  id: string;
  uid: string;
  title: string;
  image: string;
  description: string;  // Remove this
};

// After:
type CategoryCard = {
  id: string;
  uid: string;
  title: string;
  image: string;
  photos?: Array<{ image: string }>; // Add this for gallery
};
```

---

## 📸 Example Data Structure in Prismic

Once updated, your documents will look like:

```
work_category:
├── uid: "commercial-architecture"
├── title: "Commercial Architecture"
├── card_image: [image URL]
├── order: 1
└── photos: [
    { photo: [image URL 1] },
    { photo: [image URL 2] },
    { photo: [image URL 3] }
  ]
```

---

## 🚀 After Updating Prismic

1. Update your component code (see above)
2. Test that categories still load correctly
3. Add multiple photos to a category in Prismic
4. The gallery will be available for display on category pages

---

## Questions?

- **Can I keep the old description field?** Yes, leave it as is if you want
- **How many photos can I add?** Unlimited! That's the power of repeatable fields
- **Will existing data break?** No, Prismic keeps old fields safe

