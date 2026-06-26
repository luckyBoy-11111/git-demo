<script setup lang="ts">
import { Calendar, Download, Edit, Plus, Search, UserFilled, User, Van } from '@element-plus/icons-vue'
import { computed, ref } from 'vue'
import ContentPanel from '../../../shared/components/ContentPanel.vue'
import PageHeader from '../../../shared/components/PageHeader.vue'
import StatusTag from '../../../shared/components/StatusTag.vue'
import { showInfo } from '../../../shared/utils/tip'

interface ClassRecord {
  id: string
  gradeName: string
  className: string
  academicYear: string
  headTeacher: string
  studentCount: number
  boardingCount: number
  subjectTeacherCount: number
  classroom: string
  status: '正常' | '待编班'
  updatedAt: string
}

interface StudentRecord {
  id: string
  studentNo: string
  name: string
  gender: string
  status: string
  boardingType: string
  phone: string
}

const activeTab = ref('classes')
const selectedGrade = ref('')
const selectedStatus = ref('')
const keyword = ref('')

const gradeCards = [
  { name: '高一', classes: 6, students: 286, headTeachers: 6, status: '新生年级' },
  { name: '高二', classes: 6, students: 274, headTeachers: 6, status: '选科走班' },
  { name: '高三', classes: 5, students: 238, headTeachers: 5, status: '毕业年级' },
]

const classRecords: ClassRecord[] = [
  {
    id: 'class_1',
    gradeName: '高一',
    className: '高一 1 班',
    academicYear: '2026-2027 学年',
    headTeacher: '陈晓敏',
    studentCount: 48,
    boardingCount: 31,
    subjectTeacherCount: 9,
    classroom: '教学楼 A-301',
    status: '正常',
    updatedAt: '2026-06-26 10:12',
  },
  {
    id: 'class_2',
    gradeName: '高一',
    className: '高一 2 班',
    academicYear: '2026-2027 学年',
    headTeacher: '刘志远',
    studentCount: 46,
    boardingCount: 28,
    subjectTeacherCount: 9,
    classroom: '教学楼 A-302',
    status: '正常',
    updatedAt: '2026-06-26 09:30',
  },
  {
    id: 'class_3',
    gradeName: '高二',
    className: '高二 1 班',
    academicYear: '2026-2027 学年',
    headTeacher: '赵文静',
    studentCount: 45,
    boardingCount: 24,
    subjectTeacherCount: 10,
    classroom: '教学楼 B-201',
    status: '正常',
    updatedAt: '2026-06-25 17:45',
  },
  {
    id: 'class_4',
    gradeName: '高三',
    className: '高三 5 班',
    academicYear: '2026-2027 学年',
    headTeacher: '待配置',
    studentCount: 0,
    boardingCount: 0,
    subjectTeacherCount: 0,
    classroom: '待分配',
    status: '待编班',
    updatedAt: '2026-06-25 14:20',
  },
]

const classStudents: StudentRecord[] = [
  { id: 'stu_001', studentNo: '20260001', name: '张明', gender: '男', status: '在读', boardingType: '住宿', phone: '13900000000' },
  { id: 'stu_002', studentNo: '20260002', name: '李雨桐', gender: '女', status: '在读', boardingType: '走读', phone: '13900000001' },
  { id: 'stu_003', studentNo: '20260003', name: '周一鸣', gender: '男', status: '在读', boardingType: '住宿', phone: '13900000003' },
  { id: 'stu_004', studentNo: '20260004', name: '王思涵', gender: '女', status: '休学', boardingType: '走读', phone: '13900000004' },
]

const teacherAssignments = [
  { subject: '语文', teacher: '陈晓敏', role: '班主任', phone: '13810000001', weeklyLessons: 5 },
  { subject: '数学', teacher: '李建华', role: '任课教师', phone: '13810000002', weeklyLessons: 5 },
  { subject: '英语', teacher: '周琳', role: '任课教师', phone: '13810000003', weeklyLessons: 5 },
  { subject: '物理', teacher: '黄振宇', role: '任课教师', phone: '13810000004', weeklyLessons: 3 },
  { subject: '历史', teacher: '马珊', role: '任课教师', phone: '13810000005', weeklyLessons: 2 },
]

const timetable = [
  { time: '第一节', monday: '语文', tuesday: '数学', wednesday: '英语', thursday: '物理', friday: '语文' },
  { time: '第二节', monday: '数学', tuesday: '英语', wednesday: '化学', thursday: '语文', friday: '数学' },
  { time: '第三节', monday: '英语', tuesday: '历史', wednesday: '数学', thursday: '体育', friday: '政治' },
  { time: '第四节', monday: '物理', tuesday: '语文', wednesday: '音乐', thursday: '英语', friday: '班会' },
  { time: '第五节', monday: '地理', tuesday: '生物', wednesday: '体育', thursday: '数学', friday: '美术' },
]

const filteredClasses = computed(() => {
  return classRecords.filter((item) => {
    const gradeMatched = !selectedGrade.value || item.gradeName === selectedGrade.value
    const statusMatched = !selectedStatus.value || item.status === selectedStatus.value
    const keywordMatched =
      !keyword.value || [item.className, item.headTeacher, item.classroom].some((field) => field.includes(keyword.value))
    return gradeMatched && statusMatched && keywordMatched
  })
})

const classTotal = computed(() => classRecords.length)
const studentTotal = computed(() => classRecords.reduce((sum, item) => sum + item.studentCount, 0))
const teacherTotal = computed(() => teacherAssignments.length)
const boardingTotal = computed(() => classRecords.reduce((sum, item) => sum + item.boardingCount, 0))

const resetFilters = () => {
  selectedGrade.value = ''
  selectedStatus.value = ''
  keyword.value = ''
}

const showTodo = (name: string) => {
  showInfo(`${name}功能将在后续接入接口后实现`)
}
</script>

<template>
  <PageHeader title="班级管理" description="维护年级、行政班、班级学生、班主任、任课教师与班级课表等基础教务数据。">
    <template #actions>
      <el-button :icon="Download" @click="showTodo('导出班级数据')">导出</el-button>
      <el-button type="primary" :icon="Plus" @click="showTodo('新增班级')">新增班级</el-button>
    </template>
  </PageHeader>

  <div class="overview-grid">
    <div class="overview-card">
      <span>班级总数</span>
      <strong>{{ classTotal }}</strong>
      <small>覆盖高一至高三</small>
    </div>
    <div class="overview-card">
      <span>在班学生</span>
      <strong>{{ studentTotal }}</strong>
      <small>按行政班统计</small>
    </div>
    <div class="overview-card">
      <span>任课教师</span>
      <strong>{{ teacherTotal }}</strong>
      <small>当前示例班级配置</small>
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
          <el-select v-model="selectedGrade" placeholder="年级" clearable>
            <el-option label="高一" value="高一" />
            <el-option label="高二" value="高二" />
            <el-option label="高三" value="高三" />
          </el-select>
          <el-select v-model="selectedStatus" placeholder="班级状态" clearable>
            <el-option label="正常" value="正常" />
            <el-option label="待编班" value="待编班" />
          </el-select>
          <el-button @click="resetFilters">重置</el-button>
        </div>

        <el-table :data="filteredClasses" row-key="id">
          <el-table-column prop="className" label="班级" min-width="120" />
          <el-table-column prop="gradeName" label="年级" width="90" />
          <el-table-column prop="academicYear" label="学年" min-width="140" />
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
          <el-table-column label="操作" fixed="right" width="220">
            <template #default>
              <el-button link type="primary" :icon="Edit" @click="showTodo('编辑班级')">编辑</el-button>
              <el-button link type="primary" :icon="UserFilled" @click="activeTab = 'students'">学生</el-button>
              <el-button link type="primary" :icon="Calendar" @click="activeTab = 'timetable'">课表</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="年级管理" name="grades">
        <div class="grade-grid">
          <article v-for="grade in gradeCards" :key="grade.name" class="grade-card">
            <div>
              <strong>{{ grade.name }}</strong>
              <StatusTag :value="grade.status" type="primary" />
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
            <strong>高一 1 班学生</strong>
            <span>静态展示学生编班结果，后续可接入转入、转出和批量编班。</span>
          </div>
          <el-button type="primary" :icon="Plus" @click="showTodo('添加班级学生')">添加学生</el-button>
        </div>
        <el-table :data="classStudents" row-key="id">
          <el-table-column prop="studentNo" label="学号" min-width="110" />
          <el-table-column prop="name" label="姓名" min-width="100" />
          <el-table-column prop="gender" label="性别" width="80" />
          <el-table-column label="学籍状态" width="110">
            <template #default="{ row }">
              <StatusTag :value="row.status" :type="row.status === '在读' ? 'success' : 'warning'" />
            </template>
          </el-table-column>
          <el-table-column label="住宿状态" width="110">
            <template #default="{ row }">
              <StatusTag :value="row.boardingType" :type="row.boardingType === '住宿' ? 'primary' : 'info'" />
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="主要联系人电话" min-width="140" />
          <el-table-column label="操作" width="160">
            <template #default>
              <el-button link type="primary" :icon="Edit" @click="showTodo('调整学生班级')">调整</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="教师配置" name="teachers">
        <div class="section-toolbar">
          <div>
            <strong>班主任与任课教师</strong>
            <span>配置班主任、各学科任课教师与周课时，为排课模块保留数据入口。</span>
          </div>
          <el-button type="primary" :icon="User" @click="showTodo('配置任课教师')">配置教师</el-button>
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
              <el-button link type="primary" :icon="Edit" @click="showTodo('编辑教师配置')">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="班级课表" name="timetable">
        <div class="section-toolbar">
          <div>
            <strong>高一 1 班课表</strong>
            <span>当前为静态课表预览，后续由排课管理模块统一生成和调整。</span>
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
</style>
