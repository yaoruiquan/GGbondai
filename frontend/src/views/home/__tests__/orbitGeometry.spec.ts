import { describe, expect, it } from 'vitest'
import {
  assignToRings,
  buildRingArc,
  layoutForWidth,
  pointOnRing,
  type RingSpec
} from '../orbitGeometry'

const flatRing: RingSpec = { cx: 100, cy: 50, rx: 80, ry: 20, tilt: 0 }

describe('pointOnRing', () => {
  it('puts angle 0 at the right end of the ring, at middle depth', () => {
    const p = pointOnRing(flatRing, 0)
    expect(p.x).toBeCloseTo(180)
    expect(p.y).toBeCloseTo(50)
    expect(p.depth).toBeCloseTo(0)
  })

  it('treats the lower half as the front (closer to the viewer)', () => {
    const front = pointOnRing(flatRing, Math.PI / 2)
    const back = pointOnRing(flatRing, -Math.PI / 2)
    expect(front.y).toBeCloseTo(70)
    expect(front.depth).toBeCloseTo(1)
    expect(back.y).toBeCloseTo(30)
    expect(back.depth).toBeCloseTo(-1)
  })

  it('rotates the ring by its tilt around the center', () => {
    const p = pointOnRing({ ...flatRing, tilt: 90 }, 0)
    expect(p.x).toBeCloseTo(100)
    expect(p.y).toBeCloseTo(130)
  })
})

describe('buildRingArc', () => {
  it('draws the front and back halves between the two side ends', () => {
    const front = buildRingArc(flatRing, 'front')
    const back = buildRingArc(flatRing, 'back')
    expect(front).toBe('M 180 50 A 80 20 0 0 1 20 50')
    expect(back).toBe('M 20 50 A 80 20 0 0 1 180 50')
  })
})

describe('assignToRings', () => {
  it('fills rings in order without dropping or duplicating items', () => {
    const items = ['a', 'b', 'c', 'd', 'e', 'f']
    expect(assignToRings(items, [2, 3, 5])).toEqual([['a', 'b'], ['c', 'd', 'e'], ['f']])
  })

  it('drops items beyond the total capacity', () => {
    expect(assignToRings(['a', 'b', 'c'], [2])).toEqual([['a', 'b']])
  })

  it('does not mutate the input', () => {
    const items = ['a', 'b']
    assignToRings(items, [1, 1])
    expect(items).toEqual(['a', 'b'])
  })
})

describe('layoutForWidth', () => {
  it('uses three rings on desktop, two on tablet and one on phones', () => {
    expect(layoutForWidth(690).capacities).toHaveLength(3)
    expect(layoutForWidth(520).capacities).toHaveLength(2)
    expect(layoutForWidth(343).capacities).toHaveLength(1)
  })

  it('gives every ring a different speed so they never line up', () => {
    const speeds = layoutForWidth(900).rings.map((r) => r.speed)
    expect(new Set(speeds).size).toBe(speeds.length)
  })
})
