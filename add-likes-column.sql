-- Add likes column to blog_posts table
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS likes INTEGER DEFAULT 0;

-- Update existing posts to have 0 likes
UPDATE blog_posts SET likes = 0 WHERE likes IS NULL;
