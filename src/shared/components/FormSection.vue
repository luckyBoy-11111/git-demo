<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <section class="form-section">
    <header>
      <h2>{{ title }}</h2>
      <p v-if="description">{{ description }}</p>
    </header>
    <div class="form-section-body">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.form-section {
  padding: 20px 22px;
  border-bottom: 1px solid var(--app-border);
}

.form-section:last-child {
  border-bottom: 0;
}

header {
  margin-bottom: 16px;
}

h2 {
  margin: 0;
  color: var(--app-text);
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
}

p {
  margin: 3px 0 0;
  color: var(--app-text-secondary);
  font-size: 13px;
}

.form-section-body {
  min-width: 0;
}
</style>
