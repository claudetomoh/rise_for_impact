import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { ArrowLeft, Calendar, User, Share2, Facebook, Twitter, Linkedin, Clock, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// Type definition for blog post
interface BlogPost {
  id: number;
  title: string;
  excerpt: string | null;
  content: string | null;
  category: string | null;
  url: string | null;
  image: string | null;
  author: string | null;
  date: string | null;
  mediaGallery: string | null;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const blogs = await prisma.blogPost.findMany({
    select: { id: true }
  });
  
  return blogs.map((blog) => ({
    id: blog.id.toString(),
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await prisma.blogPost.findUnique({
    where: { id: parseInt(id) },
  });

  if (!blog) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  return {
    title: `${blog.title} | Rise for Impact`,
    description: blog.excerpt || 'Read more about Rise for Impact initiatives',
    openGraph: {
      title: blog.title,
      description: blog.excerpt || undefined,
      images: blog.image ? [blog.image] : [],
      type: 'article',
    },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await prisma.blogPost.findUnique({
    where: { id: parseInt(id) },
  });

  if (!blog) {
    notFound();
  }

  // Parse media gallery if it exists
  let mediaGallery: string[] = [];
  if (blog.mediaGallery) {
    try {
      mediaGallery = JSON.parse(blog.mediaGallery);
    } catch (e) {
      console.error('Failed to parse media gallery:', e);
    }
  }

  // Get related posts (same category, excluding current post)
  const relatedPosts = await prisma.blogPost.findMany({
    where: {
      category: blog.category,
      id: { not: blog.id }
    },
    take: 3,
  });

  // Get author info
  const authorImage = blog.author === 'Claude Tomoh' 
    ? '/images/team/Claude_Tomoh.jpeg' 
    : blog.author === 'Emmanuel Elikem Kpeli'
    ? '/images/team/Emmanuel.jpg'
    : blog.author === 'Esther Owusu Boahemaa'
    ? '/images/team/Esther.jpg'
    : null;

  const authorBio = blog.author === 'Claude Tomoh'
    ? 'Founder and Executive Director of Rise for Impact. Student at Ashesi University in Ghana, passionate about youth leadership and social impact across Africa.'
    : 'Team member at Rise for Impact, working to empower African youth leaders across the continent.';

  // Share URLs
  const currentUrl = `https://riseforimpact.org/blog/${blog.id}`;
  const shareText = `Check out this article: ${blog.title}`;
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950">
        {/* Hero Section with Featured Image */}
        <div className="relative h-[80vh] min-h-[700px] w-full overflow-hidden">
          {blog.image && (
            <>
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-dark-900/80 via-dark-900/60 to-dark-900" />
            </>
          )}
          
          {/* Back Button - Premium Glass Effect */}
          <div className="absolute top-8 left-8 z-20">
            <Link
              href="/#blog"
              className="group flex items-center gap-3 px-6 py-3 glass-card rounded-full hover:bg-white/20 transition-all duration-300 shadow-xl"
            >
              <ArrowLeft className="h-5 w-5 text-white group-hover:-translate-x-1 transition-transform" />
              <span className="text-white font-medium">Back to Blog</span>
            </Link>
          </div>

          {/* Content Overlay - Centered */}
          <div className="absolute inset-0 flex items-center justify-center py-20 px-4">
            <div className="container max-w-5xl text-center space-y-4">
              {blog.category && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full shadow-lg">
                  <Tag className="h-3.5 w-3.5 text-white" />
                  <span className="text-white font-bold text-xs tracking-wide uppercase">{blog.category}</span>
                </div>
              )}
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-black text-white leading-tight max-w-4xl mx-auto drop-shadow-2xl text-center">
                {blog.title}
              </h1>
              
              {blog.excerpt && (
                <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-lg text-center">
                  {blog.excerpt}
                </p>
              )}

              {/* Meta Info - Premium Glass Card - Centered */}
              <div className="flex justify-center">
                <div className="inline-flex flex-wrap items-center justify-center gap-4 px-6 py-3 glass-card rounded-2xl text-white/90 text-sm">
                  {blog.author && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-primary-400" />
                      <span className="font-semibold">{blog.author}</span>
                    </div>
                  )}
                  {blog.date && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary-400" />
                      <span className="font-medium">{blog.date}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary-400" />
                    <span className="font-medium">5 min read</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container-premium py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            {/* Share Buttons - Sticky */}
            <div className="flex items-center justify-center gap-4 mb-12 pb-8 border-b border-dark-700">
              <span className="text-dark-300 font-medium flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Share:
              </span>
              <a
                href={shareUrls.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass-card rounded-lg hover:bg-blue-600 transition-all duration-300 group"
                aria-label="Share on Facebook"
              >
                <Facebook className="h-5 w-5 text-white" />
              </a>
              <a
                href={shareUrls.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass-card rounded-lg hover:bg-sky-500 transition-all duration-300 group"
                aria-label="Share on Twitter"
              >
                <Twitter className="h-5 w-5 text-white" />
              </a>
              <a
                href={shareUrls.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass-card rounded-lg hover:bg-blue-700 transition-all duration-300 group"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-white" />
              </a>
            </div>

            {/* Blog Content - Premium Typography */}
            {blog.content && (
              <article className="prose prose-lg prose-invert max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({ ...props }) => <h1 className="text-5xl font-display font-bold mt-12 mb-6 text-white" {...props} />,
                    h2: ({ ...props }) => <h2 className="text-4xl font-display font-bold mt-10 mb-5 text-white" {...props} />,
                    h3: ({ ...props }) => <h3 className="text-3xl font-display font-semibold mt-8 mb-4 text-white" {...props} />,
                    h4: ({ ...props }) => <h4 className="text-2xl font-semibold mt-6 mb-3 text-dark-100" {...props} />,
                    p: ({ ...props }) => <p className="text-lg text-dark-200 leading-relaxed mb-6" {...props} />,
                    a: ({ ...props }) => <a className="text-primary-400 hover:text-primary-300 underline transition-colors" {...props} />,
                    ul: ({ ...props }) => <ul className="list-disc pl-6 mb-6 space-y-3" {...props} />,
                    ol: ({ ...props }) => <ol className="list-decimal pl-6 mb-6 space-y-3" {...props} />,
                    li: ({ ...props }) => <li className="text-lg text-dark-200" {...props} />,
                    blockquote: ({ ...props }) => (
                      <blockquote className="border-l-4 border-primary-500 pl-6 italic my-8 text-dark-200 bg-dark-800/50 py-4 rounded-r-lg" {...props} />
                    ),
                    hr: ({ ...props }) => <hr className="my-12 border-dark-700" {...props} />,
                    img: ({ ...props }) => (
                      <img className="my-8 rounded-2xl w-full" {...props} />
                    ),
                    strong: ({ ...props }) => <strong className="text-white font-bold" {...props} />,
                  }}
                >
                  {blog.content}
                </ReactMarkdown>
              </article>
            )}

            {/* Media Gallery - Premium Grid */}
            {mediaGallery.length > 0 && (
              <div className="mt-16">
                <h3 className="text-3xl font-display font-bold mb-8 text-white">
                  Gallery
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mediaGallery.map((imagePath, index) => (
                    <div key={index} className="relative h-80 rounded-2xl overflow-hidden group">
                      <Image
                        src={imagePath}
                        alt={`Gallery image ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio - Premium Card */}
            {blog.author && (
              <div className="mt-16 glass-card p-8 rounded-3xl">
                <h3 className="text-2xl font-display font-bold mb-6 text-white">
                  About the Author
                </h3>
                <div className="flex items-start gap-6">
                  <div className="relative h-20 w-20 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-primary-500 to-accent-500">
                    {authorImage ? (
                      <Image
                        src={authorImage}
                        alt={blog.author}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold">
                        {blog.author.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-white mb-2">
                      {blog.author}
                    </h4>
                    <p className="text-dark-300 leading-relaxed">
                      {authorBio}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Call to Action - Premium Gradient */}
            <div className="mt-16 p-10 bg-gradient-to-br from-green-500 via-green-600 to-emerald-500 rounded-3xl text-white text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
              <div className="relative z-10 space-y-6">
                <h3 className="text-3xl md:text-4xl font-display font-bold">
                  Join the Rise for Impact Movement
                </h3>
                <p className="text-xl text-green-50 max-w-2xl mx-auto">
                  Ready to make a difference? Apply for the Fellowship or explore other ways to get involved.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Link
                    href="/get-involved"
                    className="px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:bg-green-50 transition-all duration-300 hover:scale-105"
                  >
                    Get Involved
                  </Link>
                  <Link
                    href="/#programs"
                    className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/20 transition-all duration-300 border-2 border-white/30"
                  >
                    View Programs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts - Premium Section */}
        {relatedPosts.length > 0 && (
          <div className="bg-dark-800/50 py-16 md:py-24 border-t border-dark-700">
            <div className="container-premium">
              <div className="text-center mb-12">
                <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                  Continue Reading
                </h3>
                <p className="text-xl text-dark-300">
                  More stories from Rise for Impact
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {relatedPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.id}`}
                    className="group glass-card rounded-2xl overflow-hidden hover:scale-105 transition-all duration-500"
                  >
                    {post.image && (
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent" />
                      </div>
                    )}
                    <div className="p-6 space-y-3">
                      {post.category && (
                        <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-400 text-xs font-semibold rounded-full">
                          {post.category}
                        </span>
                      )}
                      <h4 className="font-display font-bold text-xl text-white group-hover:text-primary-400 transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-sm text-dark-300 line-clamp-2">
                        {post.excerpt}
                      </p>
                      {post.author && (
                        <div className="flex items-center gap-2 pt-3 border-t border-dark-700">
                          <User className="h-4 w-4 text-dark-400" />
                          <span className="text-sm text-dark-400">{post.author}</span>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
  );
}
