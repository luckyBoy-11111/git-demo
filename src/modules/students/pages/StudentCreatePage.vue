<script setup lang="ts">
import { useRouter } from 'vue-router'
import ContentPanel from '../../../shared/components/ContentPanel.vue'
import PageHeader from '../../../shared/components/PageHeader.vue'
import { showSuccess } from '../../../shared/utils/tip'
import StudentForm from '../components/StudentForm.vue'

const router = useRouter()

const submitForm = () => {
  showSuccess('新增学生保存入口已预留')
  router.push('/students')
}
</script>

<template>
  <PageHeader title="新增学生" description="维护学生基础信息、学籍信息、家庭信息、住宿信息和备注。" />
  <ContentPanel>
    <StudentForm submit-label="新增学生" @submit="submitForm" @cancel="router.back()" />
  </ContentPanel>
</template>
