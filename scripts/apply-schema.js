#!/usr/bin/env node
/**
 * Apply SQL Schema to Supabase
 * 
 * This script reads the schema.sql file and applies it to Supabase
 * using the Supabase Management API or SQL Editor
 */

const fs = require('fs');
const path = require('path');

// Configuration
const SUPABASE_URL = 'https://catwmqztvgmdwiusroar.supabase.co';
const SUPABASE_SERVICE_KEY = 'sb_service_role_4BC4HGaBheU_4fmnXFftwA_ViKSS6sj';

// Read the SQL file
const schemaPath = path.join(__dirname, '..', 'supabase', 'schema.sql');
const sql = fs.readFileSync(schemaPath, 'utf8');

console.log('========================================');
console.log('Supabase Schema Application');
console.log('========================================\n');

console.log('SQL Schema Preview:');
console.log('-------------------');
console.log(sql.substring(0, 500) + '...\n');

console.log('Instructions to apply schema:');
console.log('-----------------------------');
console.log('1. Go to: https://supabase.com/dashboard/project/catwmqztvgmdwiusroar');
console.log('2. Click "SQL Editor" in the left sidebar');
console.log('3. Click "New Query"');
console.log('4. Copy and paste the SQL below:');
console.log('\n--- COPY FROM HERE ---\n');
console.log(sql);
console.log('\n--- COPY TO HERE ---\n');
console.log('5. Click "Run" to execute the schema\n');

console.log('Tables that will be created:');
console.log('----------------------------');
console.log('• businesses - Main business listings table');
console.log('• reviews - Customer reviews table');
console.log('• Indexes for fast searching');
console.log('• Triggers for auto-updating timestamps and search vectors');
console.log('• Row Level Security policies');
console.log('• 6 sample business listings\n');

console.log('Sample businesses included:');
console.log('---------------------------');
console.log('• True Products Marketing (VIP)');
console.log('• AIM Training & Consultancy (Premium)');
console.log('• Missouri SEO Agency (Premium)');
console.log('• MJM Lawn & Land (VIP)');
console.log('• Schneider Roofing (Free)');
console.log('• Elite Dental Care (Premium)\n');

console.log('========================================');
console.log('Schema file location:');
console.log(schemaPath);
console.log('========================================');
