<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ContentPanel from '../../../shared/components/ContentPanel.vue'
import EmptyState from '../../../shared/components/EmptyState.vue'
import PageHeader from '../../../shared/components/PageHeader.vue'
import { showSuccess } from '../../../shared/utils/tip'
import { getStudentById, updateStudent } from '../api/student.api'
import StudentForm from '../components/StudentForm.vue'
import type { Student } from '../types/student'

const route = useRoute()
const router = useRouter()
const student = ref<Student>()
const loading = ref(false)

const studentId = String(route.params.id)

const loadStudent = async () => {
  loading.value = true
  try {
    student.value = await getStudentById(studentId)
  } finally {
    loading.value = false
  }
}

const submitForm = async (data: Partial<Student>) => {
  await updateStudent(studentId, data)
  showSuccess('学生档案已更新')
  router.push('/students')
}

onMounted(loadStudent)
</script>

<template>
  <PageHeader :title="student ? `456编辑学生：${student.name}` : '456编辑学生'" description="更新学生档案信息，并保存到 json-server。" />
  <ContentPanel v-loading="loading">
    <StudentForm v-if="student" :value="student" submit-label="保存修改" @submit="submitForm" @cancel="router.back()" />
    <EmptyState v-else-if="!loading" title="未找到学生档案" description="请返回列表后重新选择学生。" />
  </ContentPanel>
</template>
