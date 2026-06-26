<script setup lang="ts">
import { Edit, Files, Switch } from '@element-plus/icons-vue'
import StatusTag from '../../../shared/components/StatusTag.vue'
import type { Student } from '../types/student'

const props = defineProps<{
  student: Student
}>()

const emit = defineEmits<{
  edit: []
  statusChange: []
  export: []
}>()
</script>

<template>
  <section class="student-profile-card">
    <el-avatar :size="72">{{ props.student.name.slice(0, 1) }}</el-avatar>
    <div class="profile-main">
      <div class="profile-title">
        <h1>{{ props.student.name }}</h1>
        <StatusTag :value="props.student.studentStatus" type="success" />
        <StatusTag :value="props.student.boardingType" :type="props.student.boardingType === '住宿' ? 'primary' : 'info'" />
      </div>
      <div class="profile-meta">
        <span>学号：{{ props.student.studentNo }}</span>
        <span>年级班级：高一 1 班</span>
        <span>联系人：{{ props.student.primaryContactPhone }}</span>
      </div>
    </div>
    <div class="profile-actions">
      <el-button :icon="Edit" @click="emit('edit')">编辑</el-button>
      <el-button :icon="Switch" @click="emit('statusChange')">学籍异动</el-button>
      <el-button type="primary" :icon="Files" @click="emit('export')">导出档案</el-button>
    </div>
  </section>
</template>

<style scoped>
.student-profile-card {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 22px;
  border-bottom: 1px solid var(--app-border);
}

.profile-main {
  min-width: 0;
  flex: 1;
}

.profile-title,
.profile-meta,
.profile-actions {
  display: flex;
  align-items: center;
}

.profile-title {
  gap: 10px;
}

.profile-title h1 {
  margin: 0;
  font-size: 22px;
  line-height: 30px;
}

.profile-meta {
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 8px;
  color: var(--app-text-secondary);
  font-size: 13px;
}

.profile-actions {
  gap: 10px;
}
</style>
