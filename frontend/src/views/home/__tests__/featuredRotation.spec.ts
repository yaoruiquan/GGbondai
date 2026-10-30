import { describe, expect, it } from 'vitest'
import { advanceFeatured } from '../featuredRotation'

const ids = ['claude', 'openai', 'deepseek'] as const

describe('advanceFeatured', () => {
  it('changes only one side per step, alternating left and right', () => {
    const s0 = { left: 'claude', right: 'openai', nextSide: 'left' as const }
    const s1 = advanceFeatured(s0, ids)
    expect(s1).toEqual({ left: 'deepseek', right: 'openai', nextSide: 'right' })
    const s2 = advanceFeatured(s1, ids)
    expect(s2).toEqual({ left: 'deepseek', right: 'claude', nextSide: 'left' })
  })

  it('never shows the same id on both sides', () => {
    let state = { left: 'claude', right: 'openai', nextSide: 'left' as 'left' | 'right' }
    for (let i = 0; i < 12; i++) {
      state = advanceFeatured(state, ids)
      expect(state.left).not.toBe(state.right)
    }
  })

  it('returns a new object instead of mutating the input', () => {
    const s0 = { left: 'claude', right: 'openai', nextSide: 'left' as const }
    const s1 = advanceFeatured(s0, ids)
    expect(s1).not.toBe(s0)
    expect(s0).toEqual({ left: 'claude', right: 'openai', nextSide: 'left' })
  })

  it('keeps the state unchanged when there are not enough ids to rotate', () => {
    const s0 = { left: 'claude', right: 'openai', nextSide: 'left' as const }
    expect(advanceFeatured(s0, ['claude', 'openai'])).toEqual(s0)
  })
})
