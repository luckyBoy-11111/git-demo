import { http } from '../../../shared/api/http'
import type { AcademicYear, ClassInfo, ClassPayload, Grade } from '../types/class'

const now = () => new Date().toLocaleString('sv-SE')

export const getGrades = async () => (await http.get<Grade[]>('/grades')) as unknown as Grade[]

export const getAcademicYears = async () =>
  (await http.get<AcademicYear[]>('/academicYears')) as unknown as AcademicYear[]

export const getClasses = async () => (await http.get<ClassInfo[]>('/classes')) as unknown as ClassInfo[]

export const createClass = async (data: ClassPayload) => {
  const currentTime = now()

  return (await http.post<ClassInfo>(
    '/classes',
    {
      ...data,
      createdAt: currentTime,
      updatedAt: currentTime,
    },
    { showLoading: true, loadingText: '正在保存班级信息...' },
  )) as unknown as ClassInfo
}

export const updateClass = async (id: string, data: Partial<ClassPayload>) =>
  (await http.patch<ClassInfo>(
    `/classes/${id}`,
    { ...data, updatedAt: now() },
    { showLoading: true, loadingText: '正在更新班级信息...' },
  )) as unknown as ClassInfo

export const deleteClass = async (id: string) =>
  (await http.delete(`/classes/${id}`, { showLoading: true, loadingText: '正在删除班级信息...' })) as unknown as void
