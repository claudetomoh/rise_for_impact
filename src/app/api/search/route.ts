import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')

    if (!query || query.length < 2) {
      return NextResponse.json({ results: [] })
    }

    const searchTerm = `%${query.toLowerCase()}%`

    // Search across multiple tables
    const [blogs, programs, team] = await Promise.all([
      prisma.blogPost.findMany({
        where: {
          OR: [
            { title: { contains: query } },
            { excerpt: { contains: query } },
            { category: { contains: query } },
          ],
        },
        take: 5,
      }),
      prisma.program.findMany({
        where: {
          OR: [
            { title: { contains: query } },
            { description: { contains: query } },
            { shortDesc: { contains: query } },
          ],
        },
        take: 5,
      }),
      prisma.teamMember.findMany({
        where: {
          OR: [
            { name: { contains: query } },
            { role: { contains: query } },
            { bio: { contains: query } },
          ],
        },
        take: 5,
      }),
    ])

    const results = {
      blogs: blogs.map((blog) => ({
        id: blog.id,
        title: blog.title,
        excerpt: blog.excerpt,
        category: blog.category,
        type: 'blog',
        url: blog.url || `/#blog`,
      })),
      programs: programs.map((program) => ({
        id: program.id,
        title: program.title,
        description: program.shortDesc || program.description,
        type: 'program',
        url: `/#programs`,
      })),
      team: team.map((member) => ({
        id: member.id,
        name: member.name,
        role: member.role,
        type: 'team',
        url: `/#team`,
      })),
      totalResults: blogs.length + programs.length + team.length,
    }

    return NextResponse.json(results)
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    )
  }
}
