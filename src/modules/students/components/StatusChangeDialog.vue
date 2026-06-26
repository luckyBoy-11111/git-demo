<script setup lang="ts">
import { reactive } from 'vue'
import type { Student } from '../types/student'
import { classOptions, gradeOptions, studentStatusOptions } from '../utils/options'

const visible = defineModel<boolean>({ required: true })
const props = defineProps<{
  student?: Student
}>()
const emit = defineEmits<{
  submit: []
}>()

const form = reactive({
  type: '转班',
  toGradeId: '',
  toClassId: '',
  toStatus: '在读',
  changeDate: '',
  reason: '',
  operator: '教务老师',
  remark: '',
})
</script>

<template>
  <el-dialog v-model="visible" title="新增学籍异动" width="640px">
    <el-alert v-if="props.student" :closable="false" type="info" show-icon>
      当前学生：{{ props.student.name }}，学籍状态：{{ props.student.studentStatus }}
    </el-alert>
    <el-form class="status-change-form" :model="form" label-width="96px">
      <el-row :gutter="14">
        <el-col :span="12"><el-form-item label="异动类型"><el-select v-model="form.type"><el-option label="转班" value="转班" /><el-option label="休学" value="休学" /><el-option label="复学" value="复学" /><el-option label="转出" value="转出" /><el-option label="退学" value="退学" /><el-option label="毕业" value="毕业" /></el-select></el-form-item></el-col>
        <el-col :span="12"><el-form-item label="异动日期"><el-date-picker v-model="form.changeDate" value-format="YYYY-MM-DD" type="date" /></el-form-item></el-col>
        <el-col :span="12"><el-form-item label="新年级"><el-select v-model="form.toGradeId" clearable><el-option v-for="item in gradeOptions" :key="item.value" :label="item.label" :value="item.value" /></el-select></el-form-item></el-col>
        <el-col :span="12"><el-form-item label="新班级"><el-select v-model="form.toClassId" clearable><el-option v-for="item in classOptions" :key="item.value" :label="item.label" :value="item.value" /></el-select></el-form-item></el-col>
        <el-col :span="12"><el-form-item label="新状态"><el-select v-model="form.toStatus"><el-option v-for="item in studentStatusOptions" :key="item.value" :label="item.label" :value="item.value" /></el-select></el-form-item></el-col>
        <el-col :span="12"><el-form-item label="经办人"><el-input v-model="form.operator" /></el-form-item></el-col>
        <el-col :span="24"><el-form-item label="异动原因"><el-input v-model="form.reason" type="textarea" :rows="3" /></el-form-item></el-col>
        <el-col :span="24"><el-form-item label="备注"><el-input v-model="form.remark" /></el-form-item></el-col>
      </el-row>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="emit('submit')">保存异动</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
.status-change-form {
  margin-top: 16px;
}

:deep(.el-select),
:deep(.el-date-editor) {
  width: 100%;
}
</style>
