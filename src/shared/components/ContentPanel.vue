<template>
  <section class="content-panel">
    <slot />
  </section>
</template>

<style scoped>
.content-panel {
  border: 1px solid var(--app-border);
  border-radius: 8px;
  background: var(--app-surface);
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
}
</style>
