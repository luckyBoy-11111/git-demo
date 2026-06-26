<script setup lang="ts">
import type { ParentInfo } from '../types/parent'

defineProps<{
  parents: ParentInfo[]
}>()
</script>

<template>
  <div class="parent-panel">
    <el-table :data="parents" row-key="id">
      <el-table-column prop="name" label="家长姓名" min-width="120" />
      <el-table-column prop="relation" label="关系" min-width="90" />
      <el-table-column prop="phone" label="手机号" min-width="130" />
      <el-table-column prop="workplace" label="工作单位" min-width="180" />
      <el-table-column prop="job" label="职业" min-width="110" />
      <el-table-column label="主要联系人" width="110">
        <template #default="{ row }"><el-tag v-if="row.isPrimaryContact" type="success">是</el-tag><span v-else>否</span></template>
      </el-table-column>
      <el-table-column label="紧急联系人" width="110">
        <template #default="{ row }"><el-tag v-if="row.isEmergencyContact" type="warning">是</el-tag><span v-else>否</span></template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
.parent-panel {
  padding: 18px;
}
</style>
