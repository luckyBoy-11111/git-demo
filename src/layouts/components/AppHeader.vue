<script setup lang="ts">
import { Search, UserFilled } from '@element-plus/icons-vue'
</script>

<template>
  <header class="app-header">
    <div class="header-search">
      <el-icon><Search /></el-icon>
      <span>搜索学生、班级、通知</span>
    </div>
    <div class="header-actions">
      <el-button text>帮助</el-button>
      <el-divider direction="vertical" />
      <div class="user-entry">
        <el-avatar :size="30" :icon="UserFilled" />
        <span>教务管理员</span>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--app-header-height);
  padding: 0 24px;
  border-bottom: 1px solid var(--app-border);
  background: var(--app-surface);
}

.header-search {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 320px;
  height: 34px;
  padding: 0 12px;
  border: 1px solid var(--app-border);
  border-radius: 8px;
  color: var(--app-text-secondary);
  font-size: 13px;
}

.header-actions,
.user-entry {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-entry {
  color: var(--app-text);
  font-size: 14px;
  font-weight: 500;
}
</style>
