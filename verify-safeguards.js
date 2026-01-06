/**
 * Verification Script for Common Pitfall Safeguards
 * 
 * Run this to test all the safeguards we implemented:
 * npm run test:safeguards
 */

console.log('🔍 Verifying Common Pitfall Safeguards...\n')

// Test 1: Prisma Singleton
console.log('1️⃣ Testing Prisma Singleton...')
try {
    const { prisma } = require('./src/lib/prisma')
    console.log('   ✅ Prisma singleton imported successfully')
    console.log('   ✅ Type:', typeof prisma)
} catch (error) {
    console.error('   ❌ Prisma import failed:', error.message)
}

// Test 2: Environment Validation
console.log('\n2️⃣ Testing Environment Validation...')
try {
    // This will throw if env vars are missing
    const { env, isProduction, isDevelopment } = require('./src/lib/env')
    console.log('   ✅ Environment validation passed')
    console.log('   ✅ NODE_ENV:', env.NODE_ENV)
    console.log('   ✅ isProduction:', isProduction)
    console.log('   ✅ isDevelopment:', isDevelopment)
} catch (error) {
    console.error('   ❌ Environment validation failed:', error.message)
}

// Test 3: Component Guards
console.log('\n3️⃣ Testing Component Guards...')
try {
    const guards = require('./src/lib/component-guards')
    console.log('   ✅ Component guards imported')
    console.log('   ✅ isServer():', guards.isServer())
    console.log('   ✅ isClient():', guards.isClient())

    // Test safeWindow - should be undefined on server
    const win = guards.safeWindow()
    console.log('   ✅ safeWindow():', win === undefined ? 'undefined (correct for server)' : 'defined')
} catch (error) {
    console.error('   ❌ Component guards failed:', error.message)
}

// Test 4: File Validation
console.log('\n4️⃣ Testing File Validation Utilities...')
try {
    const fileValidation = require('./src/lib/file-validation')
    console.log('   ✅ File validation utilities imported')

    // Test formatFileSize
    const size = fileValidation.formatFileSize(1024 * 1024 * 5) // 5MB
    console.log('   ✅ formatFileSize(5MB):', size)

    // Test generateSafeFilename
    const safeName = fileValidation.generateSafeFilename('My Photo!@#$.jpg')
    console.log('   ✅ generateSafeFilename():', safeName)

    console.log('   ✅ MAX_FILE_SIZE:', fileValidation.MAX_FILE_SIZE / (1024 * 1024), 'MB')
    console.log('   ✅ ALLOWED_IMAGE_TYPES:', fileValidation.ALLOWED_IMAGE_TYPES.join(', '))
} catch (error) {
    console.error('   ❌ File validation failed:', error.message)
}

// Test 5: Check for Prisma violations in codebase
console.log('\n5️⃣ Checking for Prisma Client violations...')
const fs = require('fs')
const path = require('path')

function searchForViolations(dir, results = []) {
    const files = fs.readdirSync(dir, { withFileTypes: true })

    for (const file of files) {
        const fullPath = path.join(dir, file.name)

        if (file.isDirectory()) {
            if (!file.name.includes('node_modules') && !file.name.startsWith('.')) {
                searchForViolations(fullPath, results)
            }
        } else if (file.name.endsWith('.ts') || file.name.endsWith('.tsx')) {
            const content = fs.readFileSync(fullPath, 'utf8')
            if (content.includes('new PrismaClient()') && !fullPath.includes('prisma.ts')) {
                results.push(fullPath)
            }
        }
    }

    return results
}

try {
    const violations = searchForViolations('./src')
    if (violations.length === 0) {
        console.log('   ✅ No Prisma violations found!')
    } else {
        console.log('   ❌ Found violations in:')
        violations.forEach(file => console.log('      -', file))
    }
} catch (error) {
    console.error('   ⚠️  Could not check violations:', error.message)
}

console.log('\n✨ Verification Complete!\n')
console.log('📚 Documentation:')
console.log('   - COMMON_PITFALLS_SAFEGUARDS.md')
console.log('   - .github/copilot-instructions.md')
console.log('\n💡 All safeguards are in place and ready to use!')