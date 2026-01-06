/**
 * Component Type Safety Helpers
 * 
 * Utilities to prevent common mistakes when working with
 * Next.js Server and Client Components.
 */

/**
 * Type guard to ensure a component is being used in a client context
 * Use this in hooks or event handlers to catch server/client mixing early
 * 
 * @throws Error if called on the server
 * 
 * @example
 * ```tsx
 * export function MyComponent() {
 *   assertClientComponent()
 *   const [state, setState] = useState(0) // Safe to use hooks
 * }
 * ```
 */
export function assertClientComponent(): void {
  if (typeof window === 'undefined') {
    throw new Error(
      'This component must be marked with "use client" directive. ' +
      'It contains client-side logic (hooks, event handlers, or browser APIs) ' +
      'that cannot run on the server.'
    )
  }
}

/**
 * Check if code is running on the server
 */
export function isServer(): boolean {
  return typeof window === 'undefined'
}

/**
 * Check if code is running on the client
 */
export function isClient(): boolean {
  return typeof window !== 'undefined'
}

/**
 * Safe window accessor that returns undefined on server
 * Use this instead of direct window access in shared code
 * 
 * @example
 * ```ts
 * const width = safeWindow()?.innerWidth ?? 1024
 * ```
 */
export function safeWindow(): Window | undefined {
  return typeof window !== 'undefined' ? window : undefined
}

/**
 * Safe document accessor that returns undefined on server
 * Use this instead of direct document access in shared code
 * 
 * @example
 * ```ts
 * const title = safeDocument()?.title ?? 'Default'
 * ```
 */
export function safeDocument(): Document | undefined {
  return typeof document !== 'undefined' ? document : undefined
}

/**
 * Hook to safely use browser APIs with SSR
 * Returns true when component has mounted on the client
 * 
 * @example
 * ```tsx
 * export function MyComponent() {
 *   const isMounted = useMounted()
 *   
 *   if (!isMounted) {
 *     return <LoadingSpinner />
 *   }
 *   
 *   return <div>Client-only content</div>
 * }
 * ```
 */
export function useMounted(): boolean {
  // This is a simplified version - actual implementation would use useState + useEffect
  // See theme-toggle.tsx for the full pattern
  return isClient()
}

/**
 * Type for components that must be client components
 * Use this to document component requirements
 */
export type ClientComponent<P = {}> = React.FC<P> & {
  __clientComponent: true
}

/**
 * Type for components that must be server components
 * Use this to document component requirements
 */
export type ServerComponent<P = {}> = React.FC<P> & {
  __serverComponent: true
}

/**
 * Common pitfalls and solutions
 * 
 * ❌ WRONG: Mixing server and client logic
 * ```tsx
 * export default function Page() {
 *   const [state, setState] = useState(0) // Error: Can't use hooks in server component
 *   return <div>{state}</div>
 * }
 * ```
 * 
 * ✅ CORRECT: Add 'use client' directive
 * ```tsx
 * 'use client'
 * 
 * export default function Page() {
 *   const [state, setState] = useState(0) // Works!
 *   return <div>{state}</div>
 * }
 * ```
 * 
 * ❌ WRONG: Using browser APIs in server component
 * ```tsx
 * export default function Page() {
 *   const width = window.innerWidth // Error: window is undefined on server
 *   return <div>{width}</div>
 * }
 * ```
 * 
 * ✅ CORRECT: Use safe accessors or client component
 * ```tsx
 * 'use client'
 * 
 * export default function Page() {
 *   const width = safeWindow()?.innerWidth ?? 1024
 *   return <div>{width}</div>
 * }
 * ```
 */
