<script setup lang="ts">
import { Calendar, Delete, Download, Edit, Plus, Search, User, UserFilled, Van } from '@element-plus/icons-vue'
import { ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import { computed, onMounted, reactive, ref } from 'vue'
import ContentPanel from '../../../shared/components/ContentPanel.vue'
import PageHeader from '../../../shared/components/PageHeader.vue'
import StatusTag from '../../../shared/components/StatusTag.vue'
import { showInfo, showSuccess, showWarning } from '../../../shared/utils/tip'
import { getStudents, updateStudent } from '../../students/api/student.api'
import type { Student } from '../../students/types/student'
import { createClass, deleteClass, getAcademicYears, getClasses, getGrades, updateClass } from '../api/class.api'
import type { AcademicYear, ClassInfo, ClassPayload, ClassStatus, Grade } from '../types/class'

interface ClassRow extends ClassInfo {
  gradeName: string
  academicYearName: string
  studentCount: number
  boardingCount: number
  subjectTeacherCount: number
  headTeacher: string
  classroom: string
  status: ClassStatus
  updatedAt: string
}

interface ClassStudentRow extends Student {
  gradeName: string
  className: string
}

const activeTab = ref('classes')
const selectedGradeId = ref('')
const selectedStatus = ref<ClassStatus | ''>('')
const keyword = ref('')
const tableLoading = ref(false)
const studentLoading = ref(false)
const dialogVisible = ref(false)
const transferDialogVisible = ref(false)
const editingClassId = ref('')
const selectedClassId = ref('')
const currentStudent = ref<ClassStudentRow>()
const formRef = ref<FormInstance>()
const transferFormRef = ref<FormInstance>()

const grades = ref<Grade[]>([])
const academicYears = ref<AcademicYear[]>([])
const classes = ref<ClassInfo[]>([])
const students = ref<Student[]>([])

const classForm = reactive<ClassPayload>({
  gradeId: '',
  name: '',
  academicYearId: '',
  headTeacher: '',
  classroom: '',
  status: '正常',
})

const transferForm = reactive({
  targetClassId: '',
})

const classRules: FormRules<ClassPayload> = {
  gradeId: [{ required: true, message: '请选择年级', trigger: 'change' }],
  name: [{ required: true, message: '请输入班级名称', trigger: 'blur' }],
  status: [{ required: true, message: '请选择班级状态', trigger: 'change' }],
}

const transferRules: FormRules<typeof transferForm> = {
  targetClassId: [{ required: true, message: '请选择目标班级', trigger: 'change' }],
}

const gradeNameMap = computed(() => new Map(grades.value.map((grade) => [grade.id, grade.name])))
const academicYearNameMap = computed(() => new Map(academicYears.value.map((year) => [year.id, year.name])))
const classNameMap = computed(() => new Map(classes.value.map((item) => [item.id, item.name])))

const decoratedClasses = computed<ClassRow[]>(() =>
  classes.value.map((item) => {
    const classStudents = students.value.filter((student) => student.classId === item.id)
    return {
      ...item,
      gradeName: gradeNameMap.value.get(item.gradeId) || '未设置',
      academicYearName: academicYearNameMap.value.get(item.academicYearId || '') || '未设置',
      studentCount: classStudents.length,
      boardingCount: classStudents.filter((student) => student.boardingType === '住宿').length,
      subjectTeacherCount: 0,
      headTeacher: item.headTeacher || '待配置',
      classroom: item.classroom || '待分配',
      status: item.status || '正常',
      updatedAt: item.updatedAt || '-',
    }
  }),
)

const filteredClasses = computed(() => {
  const value = keyword.value.trim()

  return decoratedClasses.value.filter((item) => {
    const gradeMatched = !selectedGradeId.value || item.gradeId === selectedGradeId.value
    const statusMatched = !selectedStatus.value || item.status === selectedStatus.value
    const keywordMatched =
      !value || [item.name, item.gradeName, item.headTeacher, item.classroom].some((field) => field.includes(value))
    return gradeMatched && statusMatched && keywordMatched
  })
})

const selectedClass = computed(() => decoratedClasses.value.find((item) => item.id === selectedClassId.value))

const classStudentRows = computed<ClassStudentRow[]>(() =>
  students.value
    .filter((student) => !selectedClassId.value || student.classId === selectedClassId.value)
    .map((student) => ({
      ...student,
      gradeName: gradeNameMap.value.get(student.gradeId) || '未设置',
      className: classNameMap.value.get(student.classId) || '未编班',
    })),
)

const gradeCards = computed(() =>
  grades.value.map((grade) => {
    const gradeClasses = decoratedClasses.value.filter((item) => item.gradeId === grade.id)
    const gradeStudents = students.value.filter((student) => student.gradeId === grade.id)
    const headTeacherCount = gradeClasses.filter((item) => item.headTeacher !== '待配置').length

    return {
      id: grade.id,
      name: grade.name,
      classes: gradeClasses.length,
      students: gradeStudents.length,
      headTeachers: headTeacherCount,
      status: gradeClasses.some((item) => item.status === '待编班') ? '待完善' : '正常',
    }
  }),
)

const classTotal = computed(() => classes.value.length)
const studentTotal = computed(() => students.value.length)
const teacherTotal = computed(() => decoratedClasses.value.filter((item) => item.headTeacher !== '待配置').length)
const boardingTotal = computed(() => students.value.filter((item) => item.boardingType === '住宿').length)

const teacherAssignments = computed(() => [
  {
    subject: '班主任',
    teacher: selectedClass.value?.headTeacher || '待配置',
    role: '班主任',
    phone: '-',
    weeklyLessons: 0,
  },
])

const timetable = [
  { time: '第一节', monday: '待排课', tuesday: '待排课', wednesday: '待排课', thursday: '待排课', friday: '待排课' },
  { time: '第二节', monday: '待排课', tuesday: '待排课', wednesday: '待排课', thursday: '待排课', friday: '待排课' },
  { time: '第三节', monday: '待排课', tuesday: '待排课', wednesday: '待排课', thursday: '待排课', friday: '待排课' },
  { time: '第四节', monday: '待排课', tuesday: '待排课', wednesday: '待排课', thursday: '待排课', friday: '待排课' },
  { time: '第五节', monday: '待排课', tuesday: '待排课', wednesday: '待排课', thursday: '待排课', friday: '待排课' },
]

const loadData = async () => {
  tableLoading.value = true
  studentLoading.value = true
  try {
    const [gradeList, academicYearList, classList, studentList] = await Promise.all([
      getGrades(),
      getAcademicYears(),
      getClasses(),
      getStudents(),
    ])
    grades.value = gradeList
    academicYears.value = academicYearList
    classes.value = classList
    students.value = studentList

    if (!selectedClassId.value && classList[0]) {
      selectedClassId.value = classList[0].id
    }
  } finally {
    tableLoading.value = false
    studentLoading.value = false
  }
}

const resetClassForm = () => {
  editingClassId.value = ''
  classForm.gradeId = grades.value[0]?.id || ''
  classForm.name = ''
  classForm.academicYearId = academicYears.value[0]?.id || ''
  classForm.headTeacher = ''
  classForm.classroom = ''
  classForm.status = '正常'
  formRef.value?.clearValidate()
}

const resetFilters = () => {
  selectedGradeId.value = ''
  selectedStatus.value = ''
  keyword.value = ''
}

const openCreateDialog = () => {
  resetClassForm()
  dialogVisible.value = true
}

const openEditDialog = (row: ClassRow) => {
  editingClassId.value = row.id
  classForm.gradeId = row.gradeId
  classForm.name = row.name
  classForm.academicYearId = row.academicYearId || ''
  classForm.headTeacher = row.headTeacher === '待配置' ? '' : row.headTeacher
  classForm.classroom = row.classroom === '待分配' ? '' : row.classroom
  classForm.status = row.status
  formRef.value?.clearValidate()
  dialogVisible.value = true
}

const saveClass = async () => {
  await formRef.value?.validate()

  if (editingClassId.value) {
    await updateClass(editingClassId.value, classForm)
    showSuccess('班级信息已更新')
  } else {
    await createClass(classForm)
    showSuccess('班级已新增')
  }

  dialogVisible.value = false
  await loadData()
}

const removeClass = async (row: ClassRow) => {
  if (row.studentCount > 0) {
    showWarning('该班级下还有学生，需先完成学生转班后再删除')
    return
  }

  try {
    await ElMessageBox.confirm(`确定删除“${row.name}”吗？删除后不可恢复。`, '删除确认', {
      type: 'warning',
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      confirmButtonClass: 'el-button--danger',
    })
  } catch {
    return
  }

  await deleteClass(row.id)
  showSuccess('班级已删除')
  await loadData()
}

const viewClassStudents = (row: ClassRow) => {
  selectedClassId.value = row.id
  activeTab.value = 'students'
}

const viewClassTimetable = (row: ClassRow) => {
  selectedClassId.value = row.id
  activeTab.value = 'timetable'
}

const openTransferDialog = (student: ClassStudentRow) => {
  currentStudent.value = student
  transferForm.targetClassId = student.classId
  transferFormRef.value?.clearValidate()
  transferDialogVisible.value = true
}

const saveStudentTransfer = async () => {
  await transferFormRef.value?.validate()

  if (!currentStudent.value) return

  const targetClass = classes.value.find((item) => item.id === transferForm.targetClassId)
  if (!targetClass) return

  await updateStudent(currentStudent.value.id, {
    classId: targetClass.id,
    gradeId: targetClass.gradeId,
  })
  showSuccess('学生班级已调整')
  transferDialogVisible.value = false
  selectedClassId.value = targetClass.id
  await loadData()
}

const exportClasses = () => {
  showInfo('导出班级数据将在后续接入文件导出能力')
}

const showTodo = (name: string) => {
  showInfo(`${name}功能将在后续接入接口后实现`)
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <PageHeader title="班级管理123" description="维护年级、行政班、班级学生、班主任、任课教师与班级课表等基础教务数据。">
    <template #actions>
      <el-button :icon="Download" @click="exportClasses">导出</el-button>
      <el-button type="primary" :icon="Plus" @click="openCreateDialog">新增班级</el-button>
    </template>
  </PageHeader>

  <div class="overview-grid">
    <div class="overview-card">
      <span>班级总数</span>
      <strong>{{ classTotal }}</strong>
      <small>来自班级接口</small>
    </div>
    <div class="overview-card">
      <span>在班学生</span>
      <strong>{{ studentTotal }}</strong>
      <small>按学生档案统计</small>
    </div>
    <div class="overview-card">
      <span>班主任</span>
      <strong>{{ teacherTotal }}</strong>
      <small>已配置班主任数</small>
    </div>
    <div class="overview-card">
      <span>住宿学生</span>
      <strong>{{ boardingTotal }}</strong>
      <small>用于后续宿舍联动</small>
    </div>
  </div>

  <ContentPanel>
    <el-tabs v-model="activeTab" class="class-tabs">
      <el-tab-pane label="班级列表" name="classes">
        <div class="filter-bar">
          <el-input v-model="keyword" :prefix-icon="Search" placeholder="搜索班级、班主任、教室" clearable />
          <el-select v-model="selectedGradeId" placeholder="年级" clearable>
            <el-option v-for="grade in grades" :key="grade.id" :label="grade.name" :value="grade.id" />
          </el-select>
          <el-select v-model="selectedStatus" placeholder="班级状态" clearable>
            <el-option label="正常" value="正常" />
            <el-option label="待编班" value="待编班" />
          </el-select>
          <el-button @click="resetFilters">重置</el-button>
        </div>

        <el-table v-loading="tableLoading" :data="filteredClasses" row-key="id">
          <el-table-column prop="name" label="班级" min-width="120" />
          <el-table-column prop="gradeName" label="年级" width="90" />
          <el-table-column prop="academicYearName" label="学年" min-width="140" />
          <el-table-column prop="headTeacher" label="班主任" min-width="110" />
          <el-table-column prop="studentCount" label="学生数" width="90" />
          <el-table-column prop="boardingCount" label="住宿数" width="90" />
          <el-table-column prop="subjectTeacherCount" label="任课教师" width="100" />
          <el-table-column prop="classroom" label="固定教室" min-width="130" />
          <el-table-column label="状态" width="100">
            <template #default="{ row }">
              <StatusTag :value="row.status" :type="row.status === '正常' ? 'success' : 'warning'" />
            </template>
          </el-table-column>
          <el-table-column prop="updatedAt" label="更新时间" min-width="150" />
          <el-table-column label="操作" fixed="right" width="260">
            <template #default="{ row }">
              <el-button link type="primary" :icon="Edit" @click="openEditDialog(row)">编辑</el-button>
              <el-button link type="primary" :icon="UserFilled" @click="viewClassStudents(row)">学生</el-button>
              <el-button link type="primary" :icon="Calendar" @click="viewClassTimetable(row)">课表</el-button>
              <el-button link type="danger" :icon="Delete" @click="removeClass(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="年级管理" name="grades">
        <div class="grade-grid">
          <article v-for="grade in gradeCards" :key="grade.id" class="grade-card">
            <div>
              <strong>{{ grade.name }}</strong>
              <StatusTag :value="grade.status" :type="grade.status === '正常' ? 'success' : 'warning'" />
            </div>
            <dl>
              <div>
                <dt>班级数</dt>
                <dd>{{ grade.classes }}</dd>
              </div>
              <div>
                <dt>学生数</dt>
                <dd>{{ grade.students }}</dd>
              </div>
              <div>
                <dt>班主任</dt>
                <dd>{{ grade.headTeachers }}</dd>
              </div>
            </dl>
            <el-button :icon="Edit" @click="showTodo(`${grade.name}设置`)">年级设置</el-button>
          </article>
        </div>
      </el-tab-pane>

      <el-tab-pane label="班级学生" name="students">
        <div class="section-toolbar">
          <div>
            <strong>{{ selectedClass?.name || '全部班级' }}学生</strong>
            <span>学生数据来自学生档案接口，转班会同步更新学生当前年级和班级。</span>
          </div>
          <el-select v-model="selectedClassId" placeholder="选择班级" class="class-selector" clearable>
            <el-option v-for="item in decoratedClasses" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </div>
        <el-table v-loading="studentLoading" :data="classStudentRows" row-key="id">
          <el-table-column prop="studentNo" label="学号" min-width="110" />
          <el-table-column prop="name" label="姓名" min-width="100" />
          <el-table-column prop="gender" label="性别" width="80" />
          <el-table-column prop="gradeName" label="年级" width="90" />
          <el-table-column prop="className" label="班级" min-width="120" />
          <el-table-column label="学籍状态" width="110">
            <template #default="{ row }">
              <StatusTag :value="row.studentStatus" :type="row.studentStatus === '在读' ? 'success' : 'warning'" />
            </template>
          </el-table-column>
          <el-table-column label="住宿状态" width="110">
            <template #default="{ row }">
              <StatusTag :value="row.boardingType" :type="row.boardingType === '住宿' ? 'primary' : 'info'" />
            </template>
          </el-table-column>
          <el-table-column prop="primaryContactPhone" label="主要联系人电话" min-width="140" />
          <el-table-column label="操作" width="160">
            <template #default="{ row }">
              <el-button link type="primary" :icon="Edit" @click="openTransferDialog(row)">转班</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="教师配置" name="teachers">
        <div class="section-toolbar">
          <div>
            <strong>{{ selectedClass?.name || '班级' }}班主任与任课教师</strong>
            <span>班主任字段已接入班级接口，任课教师明细待教师模块数据表补齐后接入。</span>
          </div>
          <el-button type="primary" :icon="User" @click="selectedClass && openEditDialog(selectedClass)">配置班主任</el-button>
        </div>
        <el-table :data="teacherAssignments" row-key="subject">
          <el-table-column prop="subject" label="科目" width="110" />
          <el-table-column prop="teacher" label="教师" min-width="110" />
          <el-table-column label="职责" width="120">
            <template #default="{ row }">
              <StatusTag :value="row.role" :type="row.role === '班主任' ? 'success' : 'info'" />
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="联系电话" min-width="140" />
          <el-table-column prop="weeklyLessons" label="周课时" width="100" />
          <el-table-column label="操作" width="160">
            <template #default>
              <el-button link type="primary" :icon="Edit" @click="selectedClass && openEditDialog(selectedClass)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="班级课表" name="timetable">
        <div class="section-toolbar">
          <div>
            <strong>{{ selectedClass?.name || '班级' }}课表</strong>
            <span>课表数据表暂未建立，当前保留排课模块接入入口。</span>
          </div>
          <el-button type="primary" :icon="Van" @click="showTodo('调课')">调课</el-button>
        </div>
        <el-table :data="timetable" row-key="time" class="timetable">
          <el-table-column prop="time" label="节次" width="110" />
          <el-table-column prop="monday" label="周一" />
          <el-table-column prop="tuesday" label="周二" />
          <el-table-column prop="wednesday" label="周三" />
          <el-table-column prop="thursday" label="周四" />
          <el-table-column prop="friday" label="周五" />
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </ContentPanel>

  <el-dialog v-model="dialogVisible" :title="editingClassId ? '编辑班级' : '新增班级'" width="560px">
    <el-form ref="formRef" :model="classForm" :rules="classRules" label-width="92px">
      <el-form-item label="所属年级" prop="gradeId">
        <el-select v-model="classForm.gradeId" placeholder="请选择年级">
          <el-option v-for="grade in grades" :key="grade.id" :label="grade.name" :value="grade.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="班级名称" prop="name">
        <el-input v-model="classForm.name" placeholder="例如：高一 1 班" />
      </el-form-item>
      <el-form-item label="学年" prop="academicYearId">
        <el-select v-model="classForm.academicYearId" placeholder="请选择学年" clearable>
          <el-option v-for="year in academicYears" :key="year.id" :label="year.name" :value="year.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="班主任" prop="headTeacher">
        <el-input v-model="classForm.headTeacher" placeholder="请输入班主任姓名" />
      </el-form-item>
      <el-form-item label="固定教室" prop="classroom">
        <el-input v-model="classForm.classroom" placeholder="例如：教学楼 A-301" />
      </el-form-item>
      <el-form-item label="班级状态" prop="status">
        <el-select v-model="classForm.status" placeholder="请选择班级状态">
          <el-option label="正常" value="正常" />
          <el-option label="待编班" value="待编班" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="saveClass">保存</el-button>
    </template>
  </el-dialog>

  <el-dialog v-model="transferDialogVisible" title="调整学生班级" width="460px">
    <el-form ref="transferFormRef" :model="transferForm" :rules="transferRules" label-width="92px">
      <el-form-item label="学生">
        <el-input :model-value="currentStudent?.name" disabled />
      </el-form-item>
      <el-form-item label="目标班级" prop="targetClassId">
        <el-select v-model="transferForm.targetClassId" placeholder="请选择目标班级">
          <el-option v-for="item in decoratedClasses" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="transferDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="saveStudentTransfer">保存</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
.overview-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 16px;
}

.overview-card {
  display: grid;
  gap: 6px;
  padding: 16px;
  border: 1px solid var(--app-border);
  border-radius: 8px;
  background: var(--app-surface);
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
}

.overview-card span,
.overview-card small,
.section-toolbar span {
  color: var(--app-text-secondary);
  font-size: 13px;
}

.overview-card strong {
  color: var(--app-text);
  font-size: 28px;
  line-height: 34px;
}

.class-tabs {
  padding: 0 16px 16px;
}

.filter-bar {
  display: grid;
  grid-template-columns: minmax(260px, 1fr) 160px 160px auto;
  gap: 12px;
  padding: 2px 0 16px;
}

.grade-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.grade-card {
  display: grid;
  gap: 16px;
  padding: 16px;
  border: 1px solid var(--app-border);
  border-radius: 8px;
  background: var(--app-surface-muted);
}

.grade-card > div:first-child,
.section-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.grade-card strong,
.section-toolbar strong {
  color: var(--app-text);
  font-size: 15px;
}

.class-selector {
  width: 220px;
}

dl {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin: 0;
}

dt {
  color: var(--app-text-secondary);
  font-size: 12px;
}

dd {
  margin: 4px 0 0;
  color: var(--app-text);
  font-size: 20px;
  font-weight: 700;
}

.section-toolbar {
  padding: 2px 0 16px;
}

.section-toolbar > div {
  display: grid;
  gap: 4px;
}

.timetable :deep(.cell) {
  font-weight: 500;
}

@media (max-width: 1100px) {
  .overview-grid,
  .grade-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .filter-bar {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 720px) {
  .overview-grid,
  .grade-grid,
  .filter-bar {
    grid-template-columns: 1fr;
  }

  .section-toolbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .class-selector {
    width: 100%;
  }
}
</style>
