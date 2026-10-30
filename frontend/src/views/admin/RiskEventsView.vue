<template>
  <AppLayout>
    <ConstructionState
      title-key="ggbond.adminConstruction.riskEvents.title"
      description-key="ggbond.adminConstruction.riskEvents.description"
      :capability-keys="capabilityKeys"
    />
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import ConstructionState from '@/components/common/ConstructionState.vue'

const capabilityKeys = [
  'ggbond.adminConstruction.riskEvents.capabilities.rules',
  'ggbond.adminConstruction.riskEvents.capabilities.alerts',
  'ggbond.adminConstruction.riskEvents.capabilities.reviewQueue',
  'ggbond.adminConstruction.riskEvents.capabilities.reporting'
]
</script>
