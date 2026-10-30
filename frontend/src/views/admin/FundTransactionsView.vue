<template>
  <AppLayout>
    <ConstructionState
      title-key="ggbond.adminConstruction.fundTransactions.title"
      description-key="ggbond.adminConstruction.fundTransactions.description"
      :capability-keys="capabilityKeys"
    />
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import ConstructionState from '@/components/common/ConstructionState.vue'

const capabilityKeys = [
  'ggbond.adminConstruction.fundTransactions.capabilities.ledger',
  'ggbond.adminConstruction.fundTransactions.capabilities.adjustments',
  'ggbond.adminConstruction.fundTransactions.capabilities.auditTrail',
  'ggbond.adminConstruction.fundTransactions.capabilities.export'
]
</script>
