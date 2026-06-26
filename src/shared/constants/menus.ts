export interface AppMenuItem {
  title: string
  path: string
  icon: string
  children?: AppMenuItem[]
}

export const appMenus: AppMenuItem[] = [
  { title: '工作台', path: '/dashboard', icon: 'DataBoard' },
  {
    title: '学生管理',
    path: '/students',
    icon: 'User',
    children: [{ title: '学生档案', path: '/students', icon: 'Tickets' }],
  },
  { title: '班级管理', path: '/classes', icon: 'School' },
  { title: '教师管理', path: '/teachers', icon: 'Avatar' },
  { title: '课程管理', path: '/courses', icon: 'Reading' },
  { title: '排课管理', path: '/schedules', icon: 'Calendar' },
  { title: '考勤请假', path: '/attendance', icon: 'Clock' },
  { title: '考试成绩', path: '/exams', icon: 'TrendCharts' },
  { title: '通知公告', path: '/notices', icon: 'Bell' },
  { title: '数据分析', path: '/analytics', icon: 'PieChart' },
  { title: '系统设置', path: '/system', icon: 'Setting' },
]
