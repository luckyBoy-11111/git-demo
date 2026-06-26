<script setup lang="ts">
import { Delete, Edit, Switch, View } from '@element-plus/icons-vue'
import StatusTag from '../../../shared/components/StatusTag.vue'
import type { Student } from '../types/student'

const props = defineProps<{
  data: Student[]
  loading?: boolean
}>()

const emit = defineEmits<{
  view: [student: Student]
  edit: [student: Student]
  delete: [student: Student]
  statusChange: [student: Student]
}>()

const statusType = (status: Student['studentStatus']) => {
  if (status === '在读') return 'success'
  if (status === '休学') return 'warning'
  return 'info'
}
</script>

<template>
  <el-table :data="props.data" :loading="props.loading" row-key="id" class="student-table">
    <el-table-column prop="studentNo" label="学号" min-width="110" />
    <el-table-column prop="name" label="姓名" min-width="90" />
    <el-table-column prop="gender" label="性别" width="76" />
    <el-table-column label="年级" min-width="90">
      <template #default="{ row }">{{ row.gradeId === 'grade_1' ? '高一' : row.gradeId === 'grade_2' ? '高二' : '高三' }}</template>
    </el-table-column>
    <el-table-column label="班级" min-width="110">
      <template #default="{ row }">{{ row.classId === 'class_1' ? '高一 1 班' : row.classId === 'class_2' ? '高一 2 班' : '高二 1 班' }}</template>
    </el-table-column>
    <el-table-column label="学籍状态" min-width="100">
      <template #default="{ row }">
        <StatusTag :value="row.studentStatus" :type="statusType(row.studentStatus)" />
      </template>
    </el-table-column>
    <el-table-column label="住宿状态" min-width="90">
      <template #default="{ row }">
        <StatusTag :value="row.boardingType" :type="row.boardingType === '住宿' ? 'primary' : 'info'" />
      </template>
    </el-table-column>
    <el-table-column prop="primaryContactPhone" label="主要联系人电话" min-width="140" />
    <el-table-column prop="enrollmentYear" label="入学年份" width="96" />
    <el-table-column prop="updatedAt" label="更新时间" min-width="150" />
    <el-table-column label="操作" fixed="right" width="300">
      <template #default="{ row }">
        <el-button link type="primary" :icon="View" @click="emit('view', row)">详情</el-button>
        <el-button link type="primary" :icon="Edit" @click="emit('edit', row)">编辑</el-button>
        <el-button link type="primary" :icon="Switch" @click="emit('statusChange', row)">异动</el-button>
        <el-button link type="danger" :icon="Delete" @click="emit('delete', row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>
.student-table {
  width: 100%;
}
</style>
