<script setup lang="ts">
import ContentPanel from './ContentPanel.vue'
import EmptyState from './EmptyState.vue'
import PageHeader from './PageHeader.vue'

defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <PageHeader :title="title" :description="description" />
  <ContentPanel>
    <EmptyState title="模块待建设" description="基础路由和菜单入口已预留，后续可按业务阶段逐步实现。" />
  </ContentPanel>
</template>
