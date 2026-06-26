<script setup lang="ts">
import { Plus, Upload, Download } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ContentPanel from '../../../shared/components/ContentPanel.vue'
import PageHeader from '../../../shared/components/PageHeader.vue'
import { endLoading, startLoading } from '../../../shared/hooks/useGlobalLoading'
import { showInfo, showSuccess } from '../../../shared/utils/tip'
import StudentSearchForm from '../components/StudentSearchForm.vue'
import StudentTable from '../components/StudentTable.vue'
import StatusChangeDialog from '../components/StatusChangeDialog.vue'
import type { Student, StudentSearchParams } from '../types/student'
import { mockStudents } from '../utils/mock-data'

const router = useRouter()
const searchParams = ref<StudentSearchParams>({})
const students = ref<Student[]>(mockStudents)
const tableLoading = ref(false)
const statusDialogVisible = ref(false)
const currentStudent = ref<Student>()

const searchStudents = () => {
  startLoading({ text: '正在查询学生档案...' })
  tableLoading.value = true
  window.setTimeout(() => {
    tableLoading.value = false
    endLoading()
    showSuccess('查询完成')
  }, 350)
}

const resetSearch = () => {
  searchParams.value = {}
  students.value = mockStudents
}

const openStatusChange = (student: Student) => {
  currentStudent.value = student
  statusDialogVisible.value = true
}

const saveStatusChange = () => {
  statusDialogVisible.value = false
  showSuccess('学籍异动保存入口已预留')
}

const showTodo = (message: string) => {
  showInfo(`${message}将在后续阶段接入`)
}
</script>

<template>
  <PageHeader title="学生档案" description="查询、筛选和维护学生基础档案、家长信息、住宿信息与学籍异动记录。">
    <template #actions>
      <el-button :icon="Upload" @click="showTodo('批量导入')">批量导入</el-button>
      <el-button :icon="Download" @click="showTodo('导出学生档案')">导出</el-button>
      <el-button type="primary" :icon="Plus" @click="router.push('/students/create')">新增学生</el-button>
    </template>
  </PageHeader>

  <ContentPanel>
    <StudentSearchForm v-model="searchParams" @search="searchStudents" @reset="resetSearch" />
    <StudentTable
      :data="students"
      :loading="tableLoading"
      @view="(student) => router.push(`/students/${student.id}`)"
      @edit="(student) => router.push(`/students/${student.id}/edit`)"
      @status-change="openStatusChange"
    />
  </ContentPanel>

  <StatusChangeDialog v-model="statusDialogVisible" :student="currentStudent" @submit="saveStatusChange" />
</template>
