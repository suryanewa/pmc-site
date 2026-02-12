import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn utility', () => {
  it('merges class names correctly', () => {
    const result = cn('px-4', 'py-2')
    expect(result).toBe('px-4 py-2')
  })

  it('handles conditional classes', () => {
    const result = cn('text-base', false && 'text-lg', 'font-bold')
    expect(result).toBe('text-base font-bold')
  })

  it('deduplicates conflicting tailwind classes', () => {
    const result = cn('px-2', 'px-4')
    expect(result).toBe('px-4')
  })

  it('handles empty inputs', () => {
    const result = cn()
    expect(result).toBe('')
  })

  it('handles undefined and null values', () => {
    const result = cn('text-sm', undefined, null, 'font-medium')
    expect(result).toBe('text-sm font-medium')
  })
})
