import { describe, expect, it } from 'vitest'
import en from '../locales/en'
import zh from '../locales/zh'

describe('GGbond locale registration', () => {
  it.each([
    ['zh', zh],
    ['en', en]
  ] as const)('resolves migrated page namespaces in %s', (locale, messages) => {
    const keys = [
      'ggbond.finance.recharge.title',
      'ggbond.finance.orders.emptyTitle',
      'ggbond.plans.paymentPendingTitle',
      'ggbond.adminConstruction.badge',
      'ggbond.adminConstruction.fundTransactions.title',
      'ggbond.adminConstruction.paymentOrders.title',
      'ggbond.adminConstruction.riskEvents.title'
    ]

    for (const key of keys) {
      const value = key.split('.').reduce<unknown>((current, segment) => {
        return current && typeof current === 'object'
          ? (current as Record<string, unknown>)[segment]
          : undefined
      }, messages)
      expect(value, `${locale}: ${key}`).toBeDefined()
      expect(value, `${locale}: ${key}`).not.toBe('')
    }
  })
})
