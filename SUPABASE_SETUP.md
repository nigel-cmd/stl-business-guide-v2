# Supabase Setup Guide for STL Business Guide

## Step 1: Create Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Sign up with your email or GitHub
3. Create a new project
   - Name: `stl-business-guide`
   - Database Password: (generate a strong one)
   - Region: Choose closest to St. Louis (US East)

## Step 2: Get Your API Keys

Once the project is created:

1. Go to **Project Settings** (gear icon)
2. Click **API** in the sidebar
3. Copy these values:
   - **Project URL**: `https://xxxxxxxx.supabase.co`
   - **anon public**: `eyJhbG...` (long string)

## Step 3: Set Up Database

1. Go to **SQL Editor** in the sidebar
2. Click **New Query**
3. Copy the entire contents of `supabase/schema.sql` from this project
4. Paste into the SQL Editor
5. Click **Run**

This will create:
- `businesses` table with all fields
- `reviews` table
- Indexes for fast searching
- Sample data (6 businesses)

## Step 4: Configure Environment Variables

1. In your Vercel project, go to **Settings** → **Environment Variables**
2. Add these variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

3. Redeploy the site

## Step 5: Test the Search

1. Visit your deployed site
2. Try searching for:
   - "marketing" (should find True Products Marketing)
   - "Chesterfield" (should find businesses in Chesterfield)
   - "roofing" (should find Schneider Roofing)

## Database Schema

### businesses table
- `id`: UUID (primary key)
- `name`: Business name
- `slug`: URL-friendly name
- `category`: Business category
- `subcategories`: Array of subcategories
- `city`, `state`, `zip_code`: Location
- `phone`, `email`, `website`: Contact info
- `description`: Full description
- `short_description`: For cards/previews
- `services`: Array of services
- `tier`: 'free', 'premium', or 'vip'
- `is_featured`: Boolean
- `rating`: Decimal (0-5)
- `review_count`: Integer
- `logo_url`, `photos`, `cover_image`: Media URLs
- `is_verified`: Boolean

### Search Features

The search supports:
- **Text search**: Name, description, category
- **Location filter**: City and state
- **Category filter**: Exact category match
- **Tier filter**: Free, Premium, or VIP
- **Featured filter**: Show only featured businesses

Results are sorted by:
1. Tier (VIP first, then Premium, then Free)
2. Rating (highest first)

## Adding More Businesses

You can add businesses through:
1. **Supabase Dashboard**: Table Editor → businesses → Insert row
2. **SQL**: Write INSERT statements
3. **API**: Use the Supabase client library

## Next Steps

1. ✅ Set up Supabase project
2. ✅ Run the schema SQL
3. ✅ Add environment variables to Vercel
4. ✅ Test search functionality
5. 🔄 Add more business listings
6. 🔄 Add image upload functionality
7. 🔄 Add review system

## Support

If you need help:
- Supabase Docs: https://supabase.com/docs
- Check the SQL schema in `supabase/schema.sql`
- Review the API routes in `src/app/api/search/`
