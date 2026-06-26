import type { RouteRecordRaw } from 'vue-router'
import AdminLayout from '../../layouts/AdminLayout.vue'

const placeholderRoute = (title: string, description: string) => ({
  component: () => import('../../shared/components/PlaceholderPage.vue'),
  props: { title, description },
})

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AdminLayout,
    redirect: '/students',
    meta: { title: '教务后台' },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        ...placeholderRoute('工作台', '用于后续展示学校概览、教务待办、今日课程和异常提醒。'),
        meta: { title: '工作台' },
      },
      {
        path: 'students',
        name: 'StudentList',
        component: () => import('../../modules/students/pages/StudentListPage.vue'),
        meta: { title: '学生档案' },
      },
      {
        path: 'students/create',
        name: 'StudentCreate',
        component: () => import('../../modules/students/pages/StudentCreatePage.vue'),
        meta: { title: '新增学生' },
      },
      {
        path: 'students/:id/edit',
        name: 'StudentEdit',
        component: () => import('../../modules/students/pages/StudentEditPage.vue'),
        meta: { title: '编辑学生' },
      },
      {
        path: 'students/:id',
        name: 'StudentDetail',
        component: () => import('../../modules/students/pages/StudentDetailPage.vue'),
        meta: { title: '学生详情' },
      },
      {
        path: 'classes',
        name: 'Classes',
        component: () => import('../../modules/classes/pages/ClassManagementPage.vue'),
        meta: { title: '班级管理' },
      },
      {
        path: 'teachers',
        name: 'Teachers',
        ...placeholderRoute('教师管理', '后续维护教师档案、任课科目、所带班级和工作量统计。'),
        meta: { title: '教师管理' },
      },
      {
        path: 'courses',
        name: 'Courses',
        ...placeholderRoute('课程管理', '后续维护科目、年级课程配置、教学计划和教学进度。'),
        meta: { title: '课程管理' },
      },
      {
        path: 'schedules',
        name: 'Schedules',
        ...placeholderRoute('排课管理', '后续维护学期课表、班级课表、调课、停课和冲突检测。'),
        meta: { title: '排课管理' },
      },
      {
        path: 'attendance',
        name: 'Attendance',
        ...placeholderRoute('考勤请假', '后续维护学生考勤、请假申请、审批和缺勤统计。'),
        meta: { title: '考勤请假' },
      },
      {
        path: 'exams',
        name: 'Exams',
        ...placeholderRoute('考试成绩', '后续维护考试计划、成绩录入、成绩查询和成绩分析。'),
        meta: { title: '考试成绩' },
      },
      {
        path: 'notices',
        name: 'Notices',
        ...placeholderRoute('通知公告', '后续维护校园公告、班级通知、家长通知和已读未读统计。'),
        meta: { title: '通知公告' },
      },
      {
        path: 'analytics',
        name: 'Analytics',
        ...placeholderRoute('数据分析', '后续建设校长驾驶舱、班级分析、出勤分析和成绩趋势。'),
        meta: { title: '数据分析' },
      },
      {
        path: 'system',
        name: 'System',
        ...placeholderRoute('系统设置', '后续维护学年学期、用户账号、角色权限、数据字典和操作日志。'),
        meta: { title: '系统设置' },
      },
    ],
  },
]
