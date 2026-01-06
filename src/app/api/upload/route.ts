import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import { validateFile, generateSafeFilename, formatFileSize } from '@/lib/file-validation'

export async function POST(request: NextRequest) {
  try {
    // Check for authorization cookie directly as a fallback
    const cookies = request.cookies
    const sessionToken = cookies.get('next-auth.session-token') || cookies.get('__Secure-next-auth.session-token')
    
    if (!sessionToken) {
      console.error('Upload failed: No session token found in cookies')
      return NextResponse.json({ 
        error: 'Unauthorized - No session found. Please refresh the page and try again.' 
      }, { status: 401 })
    }

    console.log('Session token found, proceeding with upload')

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      console.error('Upload failed: No file in form data')
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    console.log('Uploading file:', file.name, 'Type:', file.type, 'Size:', formatFileSize(file.size))

    // Validate file using centralized validation
    const validation = validateFile(file)
    if (!validation.success) {
      console.error('Upload failed:', validation.error)
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads')
    console.log('Uploads directory:', uploadsDir)
    
    if (!existsSync(uploadsDir)) {
      console.log('Creating uploads directory...')
      await mkdir(uploadsDir, { recursive: true })
    }

    // Generate safe filename with centralized utility
    const filename = generateSafeFilename(file.name)
    const filepath = join(uploadsDir, filename)

    console.log('Writing file to:', filepath)

    // Write file
    await writeFile(filepath, buffer)

    console.log('File uploaded successfully:', filename)

    // Return public URL
    const url = `/uploads/${filename}`

    return NextResponse.json({
      success: true,
      url,
      filename,
    })
  } catch (error) {
    console.error('Upload error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: `Failed to upload file: ${errorMessage}` },
      { status: 500 }
    )
  }
}

