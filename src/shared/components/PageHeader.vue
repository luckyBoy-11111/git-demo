<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <div class="page-header">
    <div>
      <h1>{{ title }}</h1>
      <p v-if="description">{{ description }}</p>
    </div>
    <div v-if="$slots.actions" class="page-header-actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<style scoped>
.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

h1 {
  margin: 0;
  color: var(--app-text);
  font-size: 22px;
  font-weight: 700;
  line-height: 30px;
}

p {
  margin: 4px 0 0;
  color: var(--app-text-secondary);
  font-size: 13px;
  line-height: 20px;
}

.page-header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
