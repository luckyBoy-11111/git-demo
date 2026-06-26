<script setup lang="ts">
import { Document } from '@element-plus/icons-vue'

withDefaults(
  defineProps<{
    title?: string
    description?: string
  }>(),
  {
    title: '暂无数据',
    description: '当前没有可展示的内容。',
  },
)
</script>

<template>
  <div class="empty-state">
    <el-icon><Document /></el-icon>
    <strong>{{ title }}</strong>
    <span>{{ description }}</span>
  </div>
</template>

<style scoped>
.empty-state {
  display: grid;
  min-height: 220px;
  place-items: center;
  align-content: center;
  gap: 8px;
  color: var(--app-text-secondary);
  text-align: center;
}

.el-icon {
  color: #94a3b8;
  font-size: 34px;
}

strong {
  color: var(--app-text);
  font-size: 15px;
}

span {
  font-size: 13px;
}
</style>
