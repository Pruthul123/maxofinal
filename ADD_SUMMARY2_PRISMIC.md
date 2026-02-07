# Complete Research Insight Custom Type JSON for Prismic

## Steps to Update in Prismic Dashboard

1. Go to your Prismic dashboard
2. Navigate to **Custom Types**
3. Click on **research_insight** custom type
4. Click **JSON Editor** tab
5. **REPLACE ALL** the JSON with the complete code below
6. Click **Save**

## Complete JSON Code

Copy and paste this ENTIRE JSON into the JSON editor:

```json
{
  "Main": {
    "uid": {
      "type": "UID",
      "config": {
        "label": "UID",
        "placeholder": "unique-identifier-for-url"
      }
    },
    "title": {
      "type": "StructuredText",
      "config": {
        "label": "Title",
        "placeholder": "Research insight title",
        "single": "heading1"
      }
    },
    "date": {
      "type": "Date",
      "config": {
        "label": "Date",
        "placeholder": "Publication date"
      }
    },
    "author": {
      "type": "Text",
      "config": {
        "label": "Author",
        "placeholder": "Author name"
      }
    },
    "image": {
      "type": "Image",
      "config": {
        "label": "Main Image",
        "constraint": {},
        "thumbnails": []
      }
    },
    "subtitle": {
      "type": "StructuredText",
      "config": {
        "label": "Subtitle",
        "placeholder": "Brief subtitle or tagline for the research insight",
        "single": "paragraph"
      }
    },
    "summary": {
      "type": "StructuredText",
      "config": {
        "label": "Summary",
        "placeholder": "Detailed summary or description for card preview (150-200 characters)",
        "single": "paragraph"
      }
    },
    "description": {
      "type": "StructuredText",
      "config": {
        "label": "Description",
        "placeholder": "Opening description for the article page",
        "single": "paragraph"
      }
    },
    "content": {
      "type": "StructuredText",
      "config": {
        "label": "Content",
        "placeholder": "Full article content",
        "allowTargetBlank": true,
        "multi": "paragraph,heading2,heading3,heading4,strong,em,hyperlink,list-item,o-list-item"
      }
    },
    "gallery": {
      "type": "Group",
      "config": {
        "label": "Gallery",
        "fields": {
          "image": {
            "type": "Image",
            "config": {
              "label": "Image",
              "constraint": {},
              "thumbnails": []
            }
          }
        }
      }
    },
    "copyright": {
      "type": "StructuredText",
      "config": {
        "label": "Copyright",
        "placeholder": "Copyright notice or attribution text",
        "single": "paragraph"
      }
    }
  }
}
```

## Field Structure

- **uid**: Unique identifier for URL routing
- **title**: Main heading
- **date**: Publication date
- **author**: Author name
- **image**: Main featured image
- **subtitle**: Brief subtitle/tagline (replaces old "summary")
- **summary**: Detailed description for cards (new field)
- **description**: Opening paragraph for article page
- **content**: Full article body
- **gallery**: Multiple images repeatable group
- **copyright**: Copyright notice or attribution text

## After Saving

1. Go to your research insight documents
2. You'll see fields renamed: "subtitle" and "summary"
3. Fill in both fields:
   - **Subtitle**: Short tagline (1 line)
   - **Summary**: Longer description (2-3 sentences)
4. The frontend will be updated to display both fields
