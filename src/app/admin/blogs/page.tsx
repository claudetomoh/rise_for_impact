'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import AdminNav from '@/components/layout/admin-nav'
import ImageUpload from '@/components/ui/image-upload'

interface MediaItem {
  id: string
  type: 'image' | 'video'
  url: string
  caption?: string
}

interface BlogPost {
  id: number
  title: string
  excerpt: string
  category: string
  url: string
  image: string
  author: string
  date: string
  content?: string
  mediaGallery?: string | null
  createdAt: string
}

export default function BlogsManagementPage() {
  const { status } = useSession()
  const router = useRouter()
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [mediaGallery, setMediaGallery] = useState<MediaItem[]>([])
  const [newMediaUrl, setNewMediaUrl] = useState('')
  const [newMediaType, setNewMediaType] = useState<'image' | 'video'>('image')
  const [newMediaCaption, setNewMediaCaption] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: '',
    url: '',
    image: '',
    author: '',
    date: new Date().toISOString().split('T')[0],
    content: '',
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchBlogs()
    }
  }, [status])

  const fetchBlogs = () => {
    fetch('/api/blogs')
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          mediaGallery: mediaGallery.length > 0 ? JSON.stringify(mediaGallery) : null,
        }),
      })

      if (response.ok) {
        setFormData({
          title: '',
          excerpt: '',
          category: '',
          url: '',
          image: '',
          author: '',
          date: new Date().toISOString().split('T')[0],
          content: '',
        })
        setMediaGallery([])
        setShowForm(false)
        fetchBlogs()
      }
    } catch (error) {
      console.error('Error creating blog:', error)
    }
  }

  const addMediaItem = () => {
    if (!newMediaUrl.trim()) return
    
    const newItem: MediaItem = {
      id: Date.now().toString(),
      type: newMediaType,
      url: newMediaUrl,
      caption: newMediaCaption || undefined,
    }
    
    setMediaGallery([...mediaGallery, newItem])
    setNewMediaUrl('')
    setNewMediaCaption('')
  }

  const removeMediaItem = (id: string) => {
    setMediaGallery(mediaGallery.filter(item => item.id !== id))
  }

  const getVideoEmbedUrl = (url: string): string => {
    // Convert YouTube/Vimeo URLs to embed format
    if (url.includes('youtube.com/watch')) {
      const videoId = url.split('v=')[1]?.split('&')[0]
      return `https://www.youtube.com/embed/${videoId}`
    } else if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0]
      return `https://www.youtube.com/embed/${videoId}`
    } else if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0]
      return `https://player.vimeo.com/video/${videoId}`
    }
    return url
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-emerald-600 text-xl">Loading...</div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-emerald-100 to-teal-50">
      <AdminNav />
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-emerald-600 mb-2">Content Management</h1>
              <p className="text-gray-600">Manage blog posts and media assets</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => router.push('/admin/media-assets')}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Media Library
              </button>
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
              >
                Back to Dashboard
              </button>
              <button
                onClick={() => setShowForm(!showForm)}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors"
              >
                {showForm ? 'Cancel' : '+ New Blog Post'}
              </button>
            </div>
          </div>

          {showForm && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Blog Post</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Blog post title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Climate Action, Youth Leadership"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author *
                  </label>
                  <Input
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Author name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    External URL
                  </label>
                  <Input
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder="https://medium.com/article-url"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blog Image
                  </label>
                  <ImageUpload
                    currentImage={formData.image}
                    onUploadComplete={(url) => setFormData({ ...formData, image: url })}
                  />
                  <div className="mt-2">
                    <label className="block text-xs text-gray-500 mb-1">Or enter image URL manually:</label>
                    <Input
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="/images/blog-image.jpg or https://..."
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt/Description *
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief description of the blog post..."
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Content (Markdown Supported)
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write the full blog post content here... (Supports Markdown formatting)&#10;&#10;# Heading 1&#10;## Heading 2&#10;### Heading 3&#10;&#10;**Bold text**&#10;*Italic text*&#10;&#10;- Bullet point 1&#10;- Bullet point 2&#10;&#10;1. Numbered list&#10;2. Item 2&#10;&#10;> Blockquote&#10;&#10;![Image description](/images/backgrounds/image.jpg)"
                  rows={12}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-sm text-gray-900 bg-white"
                />
                <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs font-semibold text-blue-800 mb-2">✨ Markdown Formatting Tips:</p>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• Use <code className="bg-blue-100 px-1 rounded"># Heading</code> for large headings</li>
                    <li>• Use <code className="bg-blue-100 px-1 rounded">## Subheading</code> for smaller headings</li>
                    <li>• Use <code className="bg-blue-100 px-1 rounded">**bold**</code> for bold text</li>
                    <li>• Use <code className="bg-blue-100 px-1 rounded">*italic*</code> for italic text</li>
                    <li>• Add images: <code className="bg-blue-100 px-1 rounded">![Alt text](/images/backgrounds/photo.jpg)</code></li>
                    <li>• Create blockquotes: <code className="bg-blue-100 px-1 rounded">&gt; Quote text</code></li>
                    <li>• Use double line breaks for new paragraphs</li>
                  </ul>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Media Gallery (Images & Videos)
                </label>
                
                {/* Media Gallery Display */}
                {mediaGallery.length > 0 && (
                  <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mediaGallery.map((media) => (
                      <div key={media.id} className="relative group border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                        {media.type === 'image' ? (
                          <div className="aspect-video relative">
                            <img
                              src={media.url}
                              alt={media.caption || 'Gallery image'}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="aspect-video relative bg-black">
                            <iframe
                              src={getVideoEmbedUrl(media.url)}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        )}
                        
                        {media.caption && (
                          <p className="px-2 py-1 text-xs text-gray-600 bg-white border-t border-gray-200">
                            {media.caption}
                          </p>
                        )}
                        
                        <button
                          type="button"
                          onClick={() => removeMediaItem(media.id)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        
                        <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 text-white text-xs rounded-md font-medium">
                          {media.type === 'image' ? '📷 Image' : '🎥 Video'}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Media Form */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                  <div className="flex flex-col space-y-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setNewMediaType('image')}
                        className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                          newMediaType === 'image'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        📷 Add Image
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewMediaType('video')}
                        className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                          newMediaType === 'video'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        🎥 Add Video
                      </button>
                    </div>

                    <Input
                      value={newMediaUrl}
                      onChange={(e) => setNewMediaUrl(e.target.value)}
                      placeholder={
                        newMediaType === 'image'
                          ? 'Enter image URL (e.g., /images/photo.jpg or https://...)'
                          : 'Enter YouTube or Vimeo URL (e.g., https://youtube.com/watch?v=...)'
                      }
                      className="w-full"
                    />

                    <Input
                      value={newMediaCaption}
                      onChange={(e) => setNewMediaCaption(e.target.value)}
                      placeholder="Caption (optional)"
                      className="w-full"
                    />

                    <button
                      type="button"
                      onClick={addMediaItem}
                      disabled={!newMediaUrl.trim()}
                      className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-md font-medium transition-colors"
                    >
                      + Add to Gallery
                    </button>
                  </div>

                  <div className="mt-3 text-xs text-gray-500 space-y-1">
                    <p>• <strong>Images:</strong> Upload to /public/images/ or use external URLs</p>
                    <p>• <strong>Videos:</strong> YouTube and Vimeo URLs will be automatically embedded</p>
                    <p>• <strong>Gallery count:</strong> {mediaGallery.length} item{mediaGallery.length !== 1 ? 's' : ''}</p>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Create Blog Post
              </Button>
            </form>
          </div>
        )}

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {blogs.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No blog posts yet. Create your first one!
              </div>
            ) : (
              <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-emerald-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Title</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Author</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Media</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {blogs.map((blog) => {
                    let mediaCount = 0
                    let imageCount = 0
                    let videoCount = 0
                    
                    if (blog.mediaGallery) {
                      try {
                        const gallery = JSON.parse(blog.mediaGallery)
                        mediaCount = gallery.length
                        imageCount = gallery.filter((m: MediaItem) => m.type === 'image').length
                        videoCount = gallery.filter((m: MediaItem) => m.type === 'video').length
                      } catch (e) {
                        // Invalid JSON, ignore
                      }
                    }
                    
                    return (
                    <tr key={blog.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-md">{blog.excerpt}</div>
                        {blog.content && (
                          <div className="text-xs text-emerald-600 mt-1">✓ Has full content</div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          {blog.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{blog.author}</td>
                      <td className="px-6 py-4 text-sm">
                        {mediaCount > 0 ? (
                          <div className="flex gap-2 text-xs">
                            {imageCount > 0 && (
                              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded font-medium">
                                📷 {imageCount}
                              </span>
                            )}
                            {videoCount > 0 && (
                              <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded font-medium">
                                🎥 {videoCount}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-xs">No media</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(blog.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {blog.url && (
                          <a
                            href={blog.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-600 hover:text-emerald-700 font-medium"
                          >
                            View →
                          </a>
                        )}
                      </td>
                    </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  )
}
