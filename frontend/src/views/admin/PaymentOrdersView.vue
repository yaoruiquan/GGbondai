<template>
  <AppLayout>
    <ConstructionState
      title-key="ggbond.adminConstruction.paymentOrders.title"
      description-key="ggbond.adminConstruction.paymentOrders.description"
      :capability-keys="capabilityKeys"
    />
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import ConstructionState from '@/components/common/ConstructionState.vue'

const capabilityKeys = [
  'ggbond.adminConstruction.paymentOrders.capabilities.search',
  'ggbond.adminConstruction.paymentOrders.capabilities.reconciliation',
  'ggbond.adminConstruction.paymentOrders.capabilities.refunds',
  'ggbond.adminConstruction.paymentOrders.capabilities.export'
]
</script>
