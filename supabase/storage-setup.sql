-- ============================================
-- STORAGE BUCKETS SETUP
-- ============================================

-- Create storage buckets for file uploads
insert into storage.buckets (id, name, public) values
  ('business-logos', 'business-logos', true),
  ('listing-images', 'listing-images', true),
  ('coupon-images', 'coupon-images', true),
  ('banner-ads', 'banner-ads', true),
  ('admin-uploads', 'admin-uploads', false)
on conflict (id) do nothing;

-- ============================================
-- STORAGE POLICIES
-- ============================================

-- Business Logos bucket policies
CREATE POLICY "Public can view business logos" ON storage.objects
  FOR SELECT USING (bucket_id = 'business-logos');

CREATE POLICY "Business owners can upload own logos" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'business-logos' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Business owners can update own logos" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'business-logos' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Business owners can delete own logos" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'business-logos' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Listing Images bucket policies
CREATE POLICY "Public can view listing images" ON storage.objects
  FOR SELECT USING (bucket_id = 'listing-images');

CREATE POLICY "Business owners can upload own images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'listing-images' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Business owners can update own images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'listing-images' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Business owners can delete own images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'listing-images' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Coupon Images bucket policies
CREATE POLICY "Public can view coupon images" ON storage.objects
  FOR SELECT USING (bucket_id = 'coupon-images');

CREATE POLICY "Business owners can upload own coupon images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'coupon-images' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Banner Ads bucket policies
CREATE POLICY "Public can view banner ads" ON storage.objects
  FOR SELECT USING (bucket_id = 'banner-ads');

CREATE POLICY "VIP businesses can upload banner ads" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'banner-ads' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Admin uploads bucket policies (private)
CREATE POLICY "Admins can manage admin uploads" ON storage.objects
  FOR ALL USING (
    bucket_id = 'admin-uploads' AND
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );
