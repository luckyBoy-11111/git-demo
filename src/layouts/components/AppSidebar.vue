<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  Avatar,
  Bell,
  Calendar,
  Clock,
  DataBoard,
  PieChart,
  Reading,
  School,
  Setting,
  Tickets,
  TrendCharts,
  User,
} from '@element-plus/icons-vue'
import { appMenus } from '../../shared/constants/menus'

const route = useRoute()

const iconMap = {
  Avatar,
  Bell,
  Calendar,
  Clock,
  DataBoard,
  PieChart,
  Reading,
  School,
  Setting,
  Tickets,
  TrendCharts,
  User,
}

const activePath = computed(() => {
  if (route.path.startsWith('/students')) {
    return '/students'
  }
  if (route.path.startsWith('/classes')) {
    return '/classes'
  }
  return route.path
})
</script>

<template>
  <aside class="app-sidebar">
    <div class="brand">
      <div class="brand-mark">教</div>
      <div>
        <div class="brand-title">教务后台</div>
        <div class="brand-subtitle">Academic Admin</div>
      </div>
    </div>

    <el-menu :default-active="activePath" router class="sidebar-menu" background-color="#111827" text-color="#cbd5e1" active-text-color="#ffffff">
      <template v-for="menu in appMenus" :key="menu.path">
        <el-sub-menu v-if="menu.children?.length" :index="menu.path">
          <template #title>
            <el-icon><component :is="iconMap[menu.icon as keyof typeof iconMap]" /></el-icon>
            <span>{{ menu.title }}</span>
          </template>
          <el-menu-item v-for="child in menu.children" :key="child.path" :index="child.path">
            <el-icon><component :is="iconMap[child.icon as keyof typeof iconMap]" /></el-icon>
            <span>{{ child.title }}</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="menu.path">
          <el-icon><component :is="iconMap[menu.icon as keyof typeof iconMap]" /></el-icon>
          <span>{{ menu.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </aside>
</template>

<style scoped>
.app-sidebar {
  width: var(--app-sidebar-width);
  min-height: 100vh;
  flex: 0 0 var(--app-sidebar-width);
  background: var(--app-sidebar);
  color: #fff;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 64px;
  padding: 0 18px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.16);
}

.brand-mark {
  display: grid;
  width: 36px;
  height: 36px;
  place-items: center;
  border-radius: 8px;
  background: var(--app-primary);
  font-weight: 700;
}

.brand-title {
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
}

.brand-subtitle {
  color: #94a3b8;
  font-size: 12px;
  line-height: 18px;
}

.sidebar-menu {
  border-right: 0;
  padding: 10px 8px;
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title) {
  height: 42px;
  border-radius: 8px;
  line-height: 42px;
}

:deep(.el-menu-item.is-active) {
  background: var(--app-sidebar-active);
}

:deep(.el-sub-menu .el-menu) {
  background: transparent;
}
</style>
