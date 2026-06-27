<script setup lang="ts">
import { Download, Plus, Upload } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import ContentPanel from '../../../shared/components/ContentPanel.vue'
import PageHeader from '../../../shared/components/PageHeader.vue'
import { showInfo, showSuccess } from '../../../shared/utils/tip'
import { deleteStudent, getStudents } from '../api/student.api'
import StudentSearchForm from '../components/StudentSearchForm.vue'
import StudentTable from '../components/StudentTable.vue'
import StatusChangeDialog from '../components/StatusChangeDialog.vue'
import type { Student, StudentSearchParams } from '../types/student'

const router = useRouter()
const searchParams = ref<StudentSearchParams>({})
const students = ref<Student[]>([])
const tableLoading = ref(false)
const statusDialogVisible = ref(false)
const currentStudent = ref<Student>()

const loadStudents = async (showMessage = false) => {
  tableLoading.value = true
  try {
    students.value = await getStudents(searchParams.value)
    if (showMessage) {
      showSuccess('查询完成')
    }
  } finally {
    tableLoading.value = false
  }
}

const searchStudents = () => {
  loadStudents(true)
}

const resetSearch = () => {
  searchParams.value = {}
  loadStudents()
}

const openStatusChange = (student: Student) => {
  currentStudent.value = student
  statusDialogVisible.value = true
}

const removeStudent = async (student: Student) => {
  try {
    await ElMessageBox.confirm(`确定删除学生“${student.name}”的档案吗？删除后不可恢复。`, '删除确认', {
      type: 'warning',
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      confirmButtonClass: 'el-button--danger',
    })
  } catch {
    return
  }

  await deleteStudent(student.id)
  showSuccess('学生档案已删除')
  await loadStudents()
}

const saveStatusChange = () => {
  statusDialogVisible.value = false
  showSuccess('学籍异动保存入口已预留')
}

const showTodo = (message: string) => {
  showInfo(`${message}将在后续阶段接入`)
}

onMounted(() => {
  loadStudents()
})
</script>

<template>
  <PageHeader title="学生档案1234564567" description="查询、筛选和维护学生基础档案、家长信息、住宿信息与学籍异动记录。">
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
      @delete="removeStudent"
      @status-change="openStatusChange"
    />
  </ContentPanel>

  <StatusChangeDialog v-model="statusDialogVisible" :student="currentStudent" @submit="saveStatusChange" />
</template>
