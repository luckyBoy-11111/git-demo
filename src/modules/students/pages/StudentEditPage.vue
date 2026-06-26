<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ContentPanel from '../../../shared/components/ContentPanel.vue'
import PageHeader from '../../../shared/components/PageHeader.vue'
import { showSuccess } from '../../../shared/utils/tip'
import StudentForm from '../components/StudentForm.vue'
import { mockStudents } from '../utils/mock-data'

const route = useRoute()
const router = useRouter()

const student = computed(() => mockStudents.find((item) => item.id === route.params.id))

const submitForm = () => {
  showSuccess('编辑学生保存入口已预留')
  router.push('/students')
}
</script>

<template>
  <PageHeader :title="student ? `编辑学生：${student.name}` : '编辑学生'" description="更新学生档案信息，后续将接入 json-server 保存。" />
  <ContentPanel>
    <StudentForm submit-label="保存修改" @submit="submitForm" @cancel="router.back()" />
  </ContentPanel>
</template>
