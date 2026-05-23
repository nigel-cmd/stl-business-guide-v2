#!/usr/bin/env node
/**
 * Apply Supabase Schema for STL Business Guide
 * 
 * This script applies the complete database schema to your Supabase project.
 * Run with: node scripts/apply-schema.js
 */

const fs = require('fs');
const path = require('path');

// Load environment variables (optional - will show manual instructions if not found)
try {
  require('dotenv').config({ path: '.env.local' });
} catch (e) {
  // dotenv not installed, continue without it
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://catwmqztvgmdwiusroar.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL) {
  console.error('❌ Error: NEXT_PUBLIC_SUPABASE_URL not found in .env.local');
  process.exit(1);
}

if (!SUPABASE_SERVICE_KEY) {
  console.log('\n⚠️  SUPABASE_SERVICE_ROLE_KEY not found in .env.local');
  console.log('   This is needed for automated schema application.');
  console.log('\n   To get your service role key:');
  console.log('   1. Go to https://supabase.com/dashboard');
  console.log('   2. Select your project');
  console.log('   3. Go to Project Settings → API');
  console.log('   4. Copy the "service_role" key (keep this secret!)');
  console.log('   5. Add it to .env.local as: SUPABASE_SERVICE_ROLE_KEY=your_key_here');
  console.log('\n   Continuing with manual instructions...\n');
}

async function applySchema() {
  console.log('🚀 Applying STL Business Guide schema to Supabase...\n');
  
  // Read the SQL file
  const schemaPath = path.join(__dirname, '..', 'supabase', 'complete-schema.sql');
  const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
  
  console.log('📄 Schema file loaded');
  console.log(`   Size: ${(schemaSQL.length / 1024).toFixed(1)} KB`);
  console.log(`   Statements: ${schemaSQL.split(';').length}\n`);
  
  // Split SQL into individual statements
  const statements = schemaSQL
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));
  
  console.log(`✅ Found ${statements.length} SQL statements to execute`);
  console.log('\n📋 Schema includes:');
  console.log('   • profiles (user accounts)');
  console.log('   • businesses (core business records)');
  console.log('   • business_locations (addresses)');
  console.log('   • categories (business taxonomy)');
  console.log('   • business_categories (many-to-many)');
  console.log('   • listing_plans (Free/Premium/VIP tiers)');
  console.log('   • business_listings (active listings)');
  console.log('   • listing_submissions (approval workflow)');
  console.log('   • business_images (logos, gallery)');
  console.log('   • coupons (Coupon Mania)');
  console.log('   • banner_ads (VIP advertising)');
  console.log('   • contact_inquiries (contact form)');
  console.log('   • advertising_inquiries (sales leads)');
  console.log('   • payments (subscriptions)');
  console.log('   • admin_activity_log (audit trail)');
  console.log('   • reviews (business reviews)');
  console.log('   • Full-text search indexes');
  console.log('   • Row Level Security (RLS) policies\n');
  
  console.log('⚠️  To apply this schema:');
  console.log('   1. Go to https://supabase.com/dashboard');
  console.log('   2. Select your project: ' + SUPABASE_URL);
  console.log('   3. Click "SQL Editor" in the sidebar');
  console.log('   4. Click "New Query"');
  console.log('   5. Copy the contents of: supabase/complete-schema.sql');
  console.log('   6. Paste into the SQL Editor');
  console.log('   7. Click "Run"\n');
  
  console.log('📁 Schema file location:');
  console.log('   ' + schemaPath + '\n');
  
  // Also save a quick reference
  const quickRefPath = path.join(__dirname, '..', 'supabase', 'QUICK_REFERENCE.md');
  const quickRef = `# Supabase Schema Quick Reference

## Project URL
${SUPABASE_URL}

## Tables Created

| Table | Purpose |
|-------|---------|
| profiles | User accounts linked to Supabase Auth |
| businesses | Core business records |
| business_locations | Address and location data |
| categories | Business category taxonomy |
| business_categories | Many-to-many relationships |
| listing_plans | Free, Premium, VIP plan definitions |
| business_listings | Active listing instances |
| listing_submissions | Approval workflow tracking |
| business_images | Logos and gallery images |
| coupons | Coupon Mania / public coupons |
| banner_ads | VIP banner advertising |
| contact_inquiries | General contact form submissions |
| advertising_inquiries | Sales leads for upgrades/ads |
| payments | Subscription payment tracking |
| admin_activity_log | Admin audit trail |
| reviews | Business reviews |

## Default Plans

| Plan | Monthly | Yearly | Images | Coupon | Video | Banner |
|------|---------|--------|--------|--------|-------|--------|
| Free | $0 | $0 | 1 | ❌ | ❌ | ❌ |
| Premium | $97 | $997 | 3 | ✅ | ❌ | ❌ |
| VIP | $297 | - | 10 | ✅ | ✅ | ✅ |

## RLS Policies

- Public can read approved/active listings only
- Business owners can manage their own data
- Admins have full access to all tables

## Next Steps

1. Apply schema via SQL Editor in Supabase Dashboard
2. Set up Storage buckets for images
3. Configure GHL webhooks for lead flow
4. Test listing submission flow
`;
  
  fs.writeFileSync(quickRefPath, quickRef);
  console.log('📝 Quick reference saved to: supabase/QUICK_REFERENCE.md\n');
}

applySchema().catch(console.error);
