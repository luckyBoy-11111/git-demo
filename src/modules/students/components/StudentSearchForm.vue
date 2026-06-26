<script setup lang="ts">
import { Search, Refresh } from '@element-plus/icons-vue'
import type { StudentSearchParams } from '../types/student'
import { boardingTypeOptions, classOptions, gradeOptions, studentStatusOptions } from '../utils/options'

const model = defineModel<StudentSearchParams>({ required: true })
const emit = defineEmits<{
  search: []
  reset: []
}>()
</script>

<template>
  <el-form class="student-search-form" :model="model" label-width="76px">
    <el-row :gutter="14">
      <el-col :span="6">
        <el-form-item label="关键词">
          <el-input v-model="model.keyword" clearable placeholder="姓名 / 学号 / 身份证 / 学籍号" />
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="年级">
          <el-select v-model="model.gradeId" clearable placeholder="全部">
            <el-option v-for="item in gradeOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="班级">
          <el-select v-model="model.classId" clearable placeholder="全部">
            <el-option v-for="item in classOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-form-item label="学籍状态">
          <el-select v-model="model.studentStatus" clearable placeholder="全部">
            <el-option v-for="item in studentStatusOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item label="入学年份">
          <el-input-number v-model="model.enrollmentYear" :controls="false" :min="2020" :max="2035" placeholder="全部" />
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item label="住宿">
          <el-select v-model="model.boardingType" clearable placeholder="全部">
            <el-option v-for="item in boardingTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <div class="form-actions">
      <el-button :icon="Refresh" @click="emit('reset')">重置</el-button>
      <el-button type="primary" :icon="Search" @click="emit('search')">查询</el-button>
    </div>
  </el-form>
</template>

<style scoped>
.student-search-form {
  padding: 18px 18px 4px;
  border-bottom: 1px solid var(--app-border);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-bottom: 12px;
}

:deep(.el-input-number) {
  width: 100%;
}
</style>
