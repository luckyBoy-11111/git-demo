<script setup lang="ts">
import type { Student } from '../types/student'

defineProps<{
  student: Student
}>()
</script>

<template>
  <el-descriptions class="boarding-panel" :column="3" border>
    <el-descriptions-item label="住宿状态">{{ student.boardingType }}</el-descriptions-item>
    <el-descriptions-item label="宿舍楼">{{ student.dormBuilding || '-' }}</el-descriptions-item>
    <el-descriptions-item label="宿舍号">{{ student.dormRoom || '-' }}</el-descriptions-item>
    <el-descriptions-item label="床位号">{{ student.bedNo || '-' }}</el-descriptions-item>
    <el-descriptions-item label="入住日期">{{ student.boardingDate || '-' }}</el-descriptions-item>
    <el-descriptions-item label="住宿备注">{{ student.remark || '-' }}</el-descriptions-item>
  </el-descriptions>
</template>

<style scoped>
.boarding-panel {
  padding: 18px;
}
</style>
