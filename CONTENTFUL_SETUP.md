# Contentful Setup Guide

This guide explains how to set up your Contentful space and content models for your Fundrise project.

## 1. Create Contentful Account and Space

1. Go to [contentful.com](https://contentful.com) and create an account
2. Create a new space called "Fundrise"
3. Note down your Space ID and Access Token

## 2. Environment Variables

Create a `.env.local` file in your frontend directory:

```env
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=your_space_id_here
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your_access_token_here
NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_token_here
```

## 3. Content Models to Create

### 3.1 About Us (Single Entry)
**Content Type ID:** `aboutUs`

**Fields:**
- `section` (Short text) - "Трошки про нас"
- `header` (Object)
  - `title` (Short text) - "2 МЕХ.БАТАЛЬЙОН"
  - `subtitle` (Short text) - "ВИНИК ЯК ДОБРОВОЛЬЧИЙ ПІДРОЗДІЛ"
- `descriptionBlocks` (Array of Objects)
  - `value` (Long text)
- `button` (Short text) - "Дізнатись більше"

### 3.2 Important Foundries (Single Entry)
**Content Type ID:** `importantFoundries`

**Fields:**
- `section` (Short text) - "Важливі збори"
- `foundries` (Array of Objects)
  - `title` (Short text)
  - `description` (Long text)
  - `button` (Short text)
  - `image` (Media - Images)
  - `variant` (Short text) - "horizontal" or "vertical"
  - `size` (Short text) - "small", "medium", or "large"

### 3.3 Payment Details (Single Entry)
**Content Type ID:** `paymentDetails`

**Fields:**
- `section` (Short text) - "Способи оплати"
- `title` (Short text) - "Як підтримати"
- `description` (Long text)
- `paymentMethods` (Array of Objects)
  - `name` (Short text)
  - `details` (Short text)
  - `icon` (Media - Images, optional)

### 3.4 Commander (Single Entry)
**Content Type ID:** `commander`

**Fields:**
- `section` (Short text) - "Командир"
- `title` (Short text)
- `description` (Long text)
- `image` (Media - Images)
- `button` (Short text)

### 3.5 Divisions (Single Entry)
**Content Type ID:** `divisions`

**Fields:**
- `section` (Short text) - "Підрозділи"
- `title` (Short text)
- `description` (Long text)
- `divisions` (Array of Objects)
  - `name` (Short text)
  - `description` (Long text)
  - `image` (Media - Images)

### 3.6 Reports (Single Entry)
**Content Type ID:** `reports`

**Fields:**
- `section` (Short text) - "Звіти"
- `title` (Short text)
- `description` (Long text)
- `reports` (Array of Objects)
  - `title` (Short text)
  - `date` (Date)
  - `description` (Long text)
  - `file` (Media - Files, optional)

## 4. How to Create Content Models in Contentful

1. **Go to Content Model tab** in your Contentful space
2. **Click "Add content type"**
3. **Set the Content Type ID** (e.g., `aboutUs`)
4. **Add fields** as described above
5. **Save the content type**
6. **Repeat for all content types**

## 5. Creating Content Entries

1. **Go to Content tab** in your Contentful space
2. **Click "Add entry"**
3. **Select the content type** you want to create
4. **Fill in the fields** with your content
5. **Publish the entry**

## 6. API Keys Setup

1. **Go to Settings > API keys**
2. **Copy your Space ID**
3. **Copy your Content Delivery API access token**
4. **Add these to your `.env.local` file**

## 7. Testing the Integration

1. **Start your development server:**
   ```bash
   cd frontend
   npm run dev
   ```

2. **Check the browser console** for any API errors
3. **Verify content is loading** from Contentful instead of hardcoded data

## 8. Troubleshooting

### Common Issues:

1. **"Space not found" error:**
   - Check your Space ID is correct
   - Ensure the space exists and is accessible

2. **"Access token invalid" error:**
   - Check your Access Token is correct
   - Ensure the token has read permissions

3. **"Entry not found" error:**
   - Check the entry ID matches your content type ID
   - Ensure the entry is published

4. **Content not loading:**
   - Check browser console for errors
   - Verify environment variables are set correctly
   - Ensure entries are published in Contentful

### Debug Steps:

1. **Check environment variables:**
   ```javascript
   console.log('Space ID:', process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID)
   console.log('Access Token:', process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN)
   ```

2. **Test API connection:**
   ```javascript
   import client from '@/lib/contentful'
   
   // Test connection
   client.getEntries()
     .then(entries => console.log('Connected!', entries))
     .catch(error => console.error('Connection failed:', error))
   ```

## 9. Next Steps

1. **Create all content models** in Contentful
2. **Add sample content** to each entry
3. **Test the frontend** to ensure content loads
4. **Customize content** as needed
5. **Deploy to production** with proper environment variables

## 10. Production Deployment

When deploying to Vercel:

1. **Add environment variables** in Vercel dashboard
2. **Set the same values** as your `.env.local`
3. **Redeploy your application**
4. **Test the production site** to ensure content loads correctly
