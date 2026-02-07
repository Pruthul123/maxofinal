# Research Insight Prismic Custom Type Update

## Updated Structure for Cards with Summary and Multiple Images

To match the new design with clean cards and detailed pages with image galleries, update your `research_insight` custom type in Prismic with this structure:

### Required Fields:

1. **title** (Title/Text) - Main heading
2. **date** (Date) - Publication date  
3. **author** (Text) - Author name
4. **image** (Image) - Main featured image for the card
5. **summary** (Rich Text) - SHORT preview text for cards (2-3 sentences, ~150 characters)
6. **content** (Rich Text) - FULL article content for detail page
7. **gallery** (Group - Repeatable) - Multiple images for detail page
   - image (Image field inside the group)

### How to Update in Prismic Dashboard:

1. Go to **Settings → Custom Types**
2. Find **research_insight** → Click **Edit**
3. **Add new field** called `summary`:
   - Type: Rich Text
   - Label: "Summary"
   - Placeholder: "Short preview for cards (150 chars)"
   
4. **Add repeatable group** called `gallery`:
   - Type: Group
   - Label: "Gallery Images"
   - Inside the group, add field `image`:
     - Type: Image
     - Label: "Gallery Photo"

5. Click **Save**

### JSON Structure (Reference Only):

```json
{
  "Main": {
    "title": {
      "type": "StructuredText",
      "config": {
        "label": "Title",
        "single": "heading1"
      }
    },
    "date": {
      "type": "Date",
      "config": {
        "label": "Date"
      }
    },
    "author": {
      "type": "Text",
      "config": {
        "label": "Author"
      }
    },
    "image": {
      "type": "Image",
      "config": {
        "label": "Featured Image",
        "thumbnails": []
      }
    },
    "summary": {
      "type": "StructuredText",
      "config": {
        "label": "Summary",
        "placeholder": "Short preview for cards (150 characters max)"
      }
    },
    "content": {
      "type": "StructuredText",
      "config": {
        "label": "Full Content",
        "placeholder": "Full article content"
      }
    },
    "gallery": {
      "type": "Group",
      "config": {
        "label": "Gallery Images",
        "fields": {
          "image": {
            "type": "Image",
            "config": {
              "label": "Gallery Photo",
              "thumbnails": []
            }
          }
        }
      }
    }
  }
}
```

### Usage:

- **Cards**: Display `summary` field (short text)
- **Detail Page**: Display `content` field (full article) + `gallery` images on the right side

This structure keeps card previews clean and short while allowing rich, detailed content on the full page.
