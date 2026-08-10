import { useCallback, useState } from 'react'

/**
 * Controlled / uncontrolled state helper (same idea as Radix).
 * Lets headless primitives work with external state or manage their own.
 */
export function useControllableState<T>({
  prop,
  defaultProp,
  onChange,
}: {
  prop?: T
  defaultProp?: T
  onChange?: (value: T) => void
}): [T, (value: T) => void] {
  const [uncontrolled, setUncontrolled] = useState(defaultProp as T)
  const isControlled = prop !== undefined
  const value = isControlled ? prop : uncontrolled

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) {
        setUncontrolled(next)
      }
      onChange?.(next)
    },
    [isControlled, onChange],
  )

  return [value, setValue]
}
