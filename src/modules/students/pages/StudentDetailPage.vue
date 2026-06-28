<script setup lang="ts">
import { Back } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ContentPanel from '../../../shared/components/ContentPanel.vue'
import EmptyState from '../../../shared/components/EmptyState.vue'
import PageHeader from '../../../shared/components/PageHeader.vue'
import { showInfo, showSuccess } from '../../../shared/utils/tip'
import { getParentsByStudentId } from '../api/parent.api'
import { getStudentById } from '../api/student.api'
import BoardingInfoPanel from '../components/BoardingInfoPanel.vue'
import ParentInfoPanel from '../components/ParentInfoPanel.vue'
import StatusChangeDialog from '../components/StatusChangeDialog.vue'
import StudentProfileCard from '../components/StudentProfileCard.vue'
import type { ParentInfo } from '../types/parent'
import type { Student } from '../types/student'

const route = useRoute()
const router = useRouter()
const statusDialogVisible = ref(false)
const activeTab = ref('base')
const loading = ref(false)
const student = ref<Student>()
const parents = ref<ParentInfo[]>([])

const studentId = String(route.params.id)

const loadDetail = async () => {
  loading.value = true
  try {
    const studentDetail = await getStudentById(studentId)
    student.value = studentDetail
    parents.value = await getParentsByStudentId(studentDetail.id)
  } finally {
    loading.value = false
  }
}

const saveStatusChange = () => {
  statusDialogVisible.value = false
  showSuccess('学籍异动保存入口已预留')
}

onMounted(loadDetail)
</script>

<template>
  <PageHeader title="学生详情123456" description="集中展示学生档案、家长信息、住宿信息、学籍记录和后续扩展记录。">
    <template #actions>
      <el-button :icon="Back" @click="router.push('/students')">返回列表</el-button>
    </template>
  </PageHeader>

  <ContentPanel v-loading="loading">
    <template v-if="student">
      <StudentProfileCard
        :student="student"
        @edit="router.push(`/students/${student.id}/edit`)"
        @status-change="statusDialogVisible = true"
        @export="showInfo('导出档案将在后续阶段接入')"
      />

      <el-tabs v-model="activeTab" class="detail-tabs">
        <el-tab-pane label="基础档案" name="base">
          <el-descriptions :column="3" border>
            <el-descriptions-item label="姓名">{{ student.name }}</el-descriptions-item>
            <el-descriptions-item label="学号">{{ student.studentNo }}</el-descriptions-item>
            <el-descriptions-item label="性别">{{ student.gender }}</el-descriptions-item>
            <el-descriptions-item label="出生日期">{{ student.birthDate }}</el-descriptions-item>
            <el-descriptions-item label="民族">{{ student.nation }}</el-descriptions-item>
            <el-descriptions-item label="身份证号">{{ student.idCardNo }}</el-descriptions-item>
            <el-descriptions-item label="联系电话">{{ student.phone }}</el-descriptions-item>
            <el-descriptions-item label="学籍号">{{ student.studentRegistryNo }}</el-descriptions-item>
            <el-descriptions-item label="入学日期">{{ student.enrollmentDate }}</el-descriptions-item>
            <el-descriptions-item label="居住地址" :span="3">{{ student.address }}</el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>
        <el-tab-pane label="家长信息" name="parents"><ParentInfoPanel :parents="parents" /></el-tab-pane>
        <el-tab-pane label="住宿信息" name="boarding"><BoardingInfoPanel :student="student" /></el-tab-pane>
        <el-tab-pane label="学籍记录" name="records"><EmptyState title="暂无学籍异动记录" description="后续接入 json-server 后展示异动时间线。" /></el-tab-pane>
        <el-tab-pane label="请假考勤" name="attendance"><EmptyState title="暂无请假考勤记录" description="该功能在后续阶段建设。" /></el-tab-pane>
        <el-tab-pane label="成绩记录" name="scores"><EmptyState title="暂无成绩记录" description="该功能在后续阶段建设。" /></el-tab-pane>
        <el-tab-pane label="操作日志" name="logs"><EmptyState title="暂无操作日志" description="该功能在后续阶段建设。" /></el-tab-pane>
      </el-tabs>
    </template>
    <EmptyState v-else-if="!loading" title="未找到学生档案" description="请返回列表后重新选择学生。" />
  </ContentPanel>

  <StatusChangeDialog v-model="statusDialogVisible" :student="student" @submit="saveStatusChange" />
</template>

<style scoped>
.detail-tabs {
  padding: 0 18px 18px;
}

:deep(.el-descriptions) {
  padding: 8px 0 18px;
}
</style>
