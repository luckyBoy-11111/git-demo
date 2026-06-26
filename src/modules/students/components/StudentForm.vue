<script setup lang="ts">
import { reactive, watch } from 'vue'
import FormSection from '../../../shared/components/FormSection.vue'
import type { Student } from '../types/student'
import { boardingTypeOptions, classOptions, genderOptions, gradeOptions, studentStatusOptions } from '../utils/options'

const props = withDefaults(
  defineProps<{
    submitLabel?: string
    value?: Partial<Student>
  }>(),
  { submitLabel: '保存' },
)

const emit = defineEmits<{
  submit: [data: Partial<Student>]
  cancel: []
}>()

const defaultForm = (): Partial<Student> => ({
  gender: '男',
  studentStatus: '在读',
  boardingType: '走读',
  academicYearId: 'year_2026',
  semesterId: 'semester_2026_1',
  enrollmentYear: 2026,
})

const form = reactive<Partial<Student>>(defaultForm())

const resetForm = (value?: Partial<Student>) => {
  Object.keys(form).forEach((key) => {
    delete form[key as keyof Student]
  })
  Object.assign(form, defaultForm(), value ?? {})
}

watch(() => props.value, resetForm, { immediate: true, deep: true })

const submitForm = () => {
  emit('submit', { ...form })
}
</script>

<template>
  <el-form class="student-form" :model="form" label-width="110px">
    <FormSection title="基本信息">
      <el-row :gutter="18">
        <el-col :span="6"><el-form-item label="学号"><el-input v-model="form.studentNo" /></el-form-item></el-col>
        <el-col :span="6"><el-form-item label="姓名"><el-input v-model="form.name" /></el-form-item></el-col>
        <el-col :span="6"><el-form-item label="性别"><el-select v-model="form.gender"><el-option v-for="item in genderOptions" :key="item.value" :label="item.label" :value="item.value" /></el-select></el-form-item></el-col>
        <el-col :span="6"><el-form-item label="出生日期"><el-date-picker v-model="form.birthDate" value-format="YYYY-MM-DD" type="date" /></el-form-item></el-col>
        <el-col :span="6"><el-form-item label="民族"><el-input v-model="form.nation" /></el-form-item></el-col>
        <el-col :span="6"><el-form-item label="身份证号"><el-input v-model="form.idCardNo" /></el-form-item></el-col>
        <el-col :span="6"><el-form-item label="政治面貌"><el-input v-model="form.politicalStatus" /></el-form-item></el-col>
        <el-col :span="6"><el-form-item label="联系电话"><el-input v-model="form.phone" /></el-form-item></el-col>
        <el-col :span="24"><el-form-item label="居住地址"><el-input v-model="form.address" /></el-form-item></el-col>
      </el-row>
    </FormSection>

    <FormSection title="学籍信息">
      <el-row :gutter="18">
        <el-col :span="6"><el-form-item label="年级"><el-select v-model="form.gradeId"><el-option v-for="item in gradeOptions" :key="item.value" :label="item.label" :value="item.value" /></el-select></el-form-item></el-col>
        <el-col :span="6"><el-form-item label="班级"><el-select v-model="form.classId"><el-option v-for="item in classOptions" :key="item.value" :label="item.label" :value="item.value" /></el-select></el-form-item></el-col>
        <el-col :span="6"><el-form-item label="入学年份"><el-input-number v-model="form.enrollmentYear" :controls="false" /></el-form-item></el-col>
        <el-col :span="6"><el-form-item label="入学日期"><el-date-picker v-model="form.enrollmentDate" value-format="YYYY-MM-DD" type="date" /></el-form-item></el-col>
        <el-col :span="6"><el-form-item label="学籍号"><el-input v-model="form.studentRegistryNo" /></el-form-item></el-col>
        <el-col :span="6"><el-form-item label="学籍状态"><el-select v-model="form.studentStatus"><el-option v-for="item in studentStatusOptions" :key="item.value" :label="item.label" :value="item.value" /></el-select></el-form-item></el-col>
      </el-row>
    </FormSection>

    <FormSection title="家庭信息">
      <el-row :gutter="18">
        <el-col :span="6"><el-form-item label="主要联系人"><el-input v-model="form.primaryContactName" /></el-form-item></el-col>
        <el-col :span="6"><el-form-item label="联系人电话"><el-input v-model="form.primaryContactPhone" /></el-form-item></el-col>
        <el-col :span="12"><el-form-item label="家庭住址"><el-input v-model="form.address" /></el-form-item></el-col>
      </el-row>
    </FormSection>

    <FormSection title="住宿信息">
      <el-row :gutter="18">
        <el-col :span="6"><el-form-item label="住宿状态"><el-select v-model="form.boardingType"><el-option v-for="item in boardingTypeOptions" :key="item.value" :label="item.label" :value="item.value" /></el-select></el-form-item></el-col>
        <el-col :span="6"><el-form-item label="宿舍楼"><el-input v-model="form.dormBuilding" /></el-form-item></el-col>
        <el-col :span="6"><el-form-item label="宿舍号"><el-input v-model="form.dormRoom" /></el-form-item></el-col>
        <el-col :span="6"><el-form-item label="床位号"><el-input v-model="form.bedNo" /></el-form-item></el-col>
      </el-row>
    </FormSection>

    <FormSection title="备注信息">
      <el-form-item label="备注"><el-input v-model="form.remark" type="textarea" :rows="3" /></el-form-item>
      <div class="form-footer">
        <el-button @click="emit('cancel')">取消</el-button>
        <el-button type="primary" @click="submitForm">{{ submitLabel }}</el-button>
      </div>
    </FormSection>
  </el-form>
</template>

<style scoped>
.student-form {
  background: var(--app-surface);
}

:deep(.el-select),
:deep(.el-date-editor),
:deep(.el-input-number) {
  width: 100%;
}

.form-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
