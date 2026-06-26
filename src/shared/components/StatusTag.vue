<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    value: string
    type?: 'success' | 'warning' | 'danger' | 'info' | 'primary'
  }>(),
  { type: 'info' },
)
</script>

<template>
  <el-tag :type="props.type" effect="light" round>{{ value }}</el-tag>
</template>
