<script setup lang="ts">
import { Loading } from '@element-plus/icons-vue'
import { globalLoadingState } from '../hooks/useGlobalLoading'
</script>

<template>
  <Teleport to="body">
    <Transition name="global-loading-fade">
      <div v-if="globalLoadingState.visible" class="global-loading" :class="{ 'is-fullscreen': globalLoadingState.fullscreen }">
        <div class="loading-box">
          <el-icon class="loading-icon"><Loading /></el-icon>
          <span>{{ globalLoadingState.text }}</span>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.global-loading {
  position: fixed;
  inset: 0;
  z-index: 3000;
  display: grid;
  place-items: center;
  background: rgba(15, 23, 42, 0.18);
}

.global-loading:not(.is-fullscreen) {
  position: absolute;
}

.loading-box {
  display: flex;
  min-width: 150px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 18px;
  border: 1px solid var(--app-border);
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 14px 36px rgba(15, 23, 42, 0.16);
  color: var(--app-text);
  font-size: 14px;
  font-weight: 500;
}

.loading-icon {
  color: var(--app-primary);
  font-size: 20px;
  animation: loading-spin 1s linear infinite;
}

.global-loading-fade-enter-active,
.global-loading-fade-leave-active {
  transition: opacity 0.15s ease;
}

.global-loading-fade-enter-from,
.global-loading-fade-leave-to {
  opacity: 0;
}

@keyframes loading-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
