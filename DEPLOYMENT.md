# Deployment Guide for Vercel

This guide explains how to deploy your Next.js frontend with Contentful CMS to Vercel.

## Project Structure

- `frontend/` - Next.js application with Contentful integration
- `backend-archive/` - Archived Strapi CMS (no longer needed)

## Deployment Options

### Option 1: Frontend with Contentful (Recommended)

Deploy your Next.js frontend to Vercel with Contentful as your CMS.

#### Steps:

1. **Deploy Frontend to Vercel:**
   ```bash
   cd frontend
   npx vercel
   ```

2. **Configure Environment Variables in Vercel Dashboard:**
   - `NEXT_PUBLIC_CONTENTFUL_SPACE_ID` - Your Contentful Space ID
   - `NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN` - Your Contentful Access Token
   - `NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN` - Your Contentful Preview Token (optional)

3. **Set up Contentful:**
   - Create your Contentful space
   - Set up content models as described in `CONTENTFUL_SETUP.md`
   - Add your content

## Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=your_contentful_space_id
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your_contentful_access_token
NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_contentful_preview_token
```

## Contentful Setup

No database setup needed! Contentful handles everything:

1. **Create Contentful Account:**
   - Go to [contentful.com](https://contentful.com)
   - Create a new space

2. **Set up Content Models:**
   - Follow the guide in `CONTENTFUL_SETUP.md`
   - Create all required content types
   - Add your content

3. **Get API Keys:**
   - Space ID from Settings > General
   - Access Token from Settings > API keys

## Deployment Commands

### Frontend Deployment
```bash
cd frontend
npm run build
npx vercel --prod
```

## Post-Deployment

1. **Test Contentful Connection:**
   - Verify frontend can connect to Contentful
   - Test content loading
   - Verify images load correctly

2. **Content Management:**
   - Update content through Contentful dashboard
   - Test preview functionality
   - Verify all content types work

## Troubleshooting

### Common Issues:

1. **Contentful Connection Errors:**
   - Check Space ID and Access Token
   - Verify environment variables are set
   - Ensure content is published

2. **Content Not Loading:**
   - Check browser console for errors
   - Verify content is published in Contentful
   - Test API connection

3. **Images Not Loading:**
   - Check image URLs in Contentful
   - Verify image assets are published
   - Test image URLs directly

### Useful Commands:

```bash
# Test Contentful connection
cd frontend
npm run dev

# Check environment variables
echo $NEXT_PUBLIC_CONTENTFUL_SPACE_ID
echo $NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN
```

## Recommended Architecture

For production, this setup provides optimal performance and scalability:

1. **Frontend:** Vercel (Next.js)
2. **CMS:** Contentful (Headless CMS)
3. **CDN:** Contentful's global CDN (included)
4. **File Storage:** Contentful (included)
5. **Analytics:** Vercel Analytics (optional)

This architecture provides:
- ✅ **Zero server maintenance**
- ✅ **Global CDN performance**
- ✅ **Automatic scaling**
- ✅ **Built-in security**
- ✅ **Cost effective**
