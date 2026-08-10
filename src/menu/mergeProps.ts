import type { HTMLAttributes } from 'react'

type EventHandler = ((event: unknown) => void) | undefined

/** Merges two prop objects; both event handlers run (child first, then parent). */
export function mergeProps<T extends HTMLAttributes<HTMLElement>>(
  parent: T,
  child: Partial<T>,
): T {
  const result = { ...parent, ...child }

  for (const key of Object.keys(child) as string[]) {
    const parentVal = parent[key as keyof T]
    const childVal = child[key as keyof T]
    if (
      key.startsWith('on') &&
      typeof parentVal === 'function' &&
      typeof childVal === 'function'
    ) {
      result[key as keyof T] = ((event: unknown) => {
        ;(childVal as EventHandler)?.(event)
        ;(parentVal as EventHandler)?.(event)
      }) as T[keyof T]
    }
  }

  return result
}
