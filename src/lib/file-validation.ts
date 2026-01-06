/**
 * File Upload Validation Utilities
 * 
 * Centralized validation for file uploads to ensure consistent
 * security and size constraints across the application.
 * 
 * @see src/app/api/upload/route.ts for usage example
 */

import { z } from 'zod'

/**
 * Allowed image MIME types
 */
export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
] as const

/**
 * Maximum file size in bytes (10MB)
 */
export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

/**
 * File validation schema
 */
export const fileUploadSchema = z.object({
  file: z.instanceof(File)
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      { message: `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB` }
    )
    .refine(
      (file) => ALLOWED_IMAGE_TYPES.includes(file.type as any),
      { 
        message: `File type must be one of: ${ALLOWED_IMAGE_TYPES.join(', ')}` 
      }
    ),
})

/**
 * Validate uploaded file
 * 
 * @param file - File to validate
 * @returns Validation result with error message if invalid
 * 
 * @example
 * ```ts
 * const validation = validateFile(file)
 * if (!validation.success) {
 *   return NextResponse.json({ error: validation.error }, { status: 400 })
 * }
 * ```
 */
export function validateFile(file: File): {
  success: boolean
  error?: string
} {
  // Check file exists
  if (!file || !(file instanceof File)) {
    return {
      success: false,
      error: 'No file provided or invalid file object',
    }
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      success: false,
      error: `File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
    }
  }

  // Check file type
  if (!ALLOWED_IMAGE_TYPES.includes(file.type as any)) {
    return {
      success: false,
      error: `Invalid file type: ${file.type}. Allowed types: ${ALLOWED_IMAGE_TYPES.join(', ')}`,
    }
  }

  // Additional security check: verify file extension matches MIME type
  const extension = file.name.split('.').pop()?.toLowerCase()
  const expectedExtensions = {
    'image/jpeg': ['jpg', 'jpeg'],
    'image/png': ['png'],
    'image/gif': ['gif'],
    'image/webp': ['webp'],
  }

  const validExtensions = expectedExtensions[file.type as keyof typeof expectedExtensions]
  if (!validExtensions || !extension || !validExtensions.includes(extension)) {
    return {
      success: false,
      error: 'File extension does not match MIME type',
    }
  }

  return { success: true }
}

/**
 * Generate safe filename from original filename
 * Prevents directory traversal and special character issues
 * 
 * @param originalName - Original filename
 * @returns Safe filename with timestamp prefix
 * 
 * @example
 * ```ts
 * const safeName = generateSafeFilename('my photo.jpg')
 * // Returns: "1704567890123_my-photo.jpg"
 * ```
 */
export function generateSafeFilename(originalName: string): string {
  // Remove path traversal attempts
  const basename = originalName.replace(/^.*[\\/]/, '')
  
  // Replace unsafe characters with hyphens
  const safe = basename
    .replace(/[^a-zA-Z0-9._-]/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase()
  
  // Add timestamp prefix to prevent collisions
  return `${Date.now()}_${safe}`
}

/**
 * Format file size for display
 * 
 * @param bytes - File size in bytes
 * @returns Formatted string (e.g., "2.5 MB")
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}
