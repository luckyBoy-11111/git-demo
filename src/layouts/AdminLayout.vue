<script setup lang="ts">
import AppBreadcrumb from './components/AppBreadcrumb.vue'
import AppHeader from './components/AppHeader.vue'
import AppSidebar from './components/AppSidebar.vue'
import GlobalLoading from '../shared/components/GlobalLoading.vue'
</script>

<template>
  <div class="admin-layout">
    <AppSidebar />
    <section class="admin-main">
      <AppHeader />
      <main class="admin-content">
        <AppBreadcrumb />
        <RouterView />
      </main>
    </section>
    <GlobalLoading />
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: var(--app-bg);
}

.admin-main {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
}

.admin-content {
  min-width: 0;
  flex: 1;
  padding: 18px 24px 28px;
}
</style>
