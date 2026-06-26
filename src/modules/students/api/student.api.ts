import { http } from '../../../shared/api/http'
import type { Student, StudentSearchParams } from '../types/student'

type StudentPayload = Omit<Student, 'id' | 'createdAt' | 'updatedAt'>
type StudentQueryParams = Omit<StudentSearchParams, 'keyword'> & {
  q?: string
}

const now = () => new Date().toLocaleString('sv-SE')

const cleanSearchParams = (params?: StudentSearchParams) => {
  if (!params) return undefined

  const { keyword, ...rest } = params
  const queryParams: StudentQueryParams = {}

  Object.entries(rest).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      queryParams[key as keyof Omit<StudentSearchParams, 'keyword'>] = value as never
    }
  })

  if (keyword?.trim()) {
    queryParams.q = keyword.trim()
  }

  return queryParams
}

export const getStudents = async (params?: StudentSearchParams) =>
  (await http.get<Student[]>('/students', { params: cleanSearchParams(params) })) as unknown as Student[]

export const getStudentById = async (id: string) =>
  (await http.get<Student>(`/students/${id}`)) as unknown as Student

export const createStudent = async (data: Partial<StudentPayload>) => {
  const currentTime = now()

  return (await http.post<Student>(
    '/students',
    {
      ...data,
      createdAt: currentTime,
      updatedAt: currentTime,
    },
    { showLoading: true, loadingText: '正在保存学生档案...' },
  )) as unknown as Student
}

export const updateStudent = async (id: string, data: Partial<Student>) =>
  (await http.patch<Student>(
    `/students/${id}`,
    { ...data, updatedAt: now() },
    { showLoading: true, loadingText: '正在更新学生档案...' },
  )) as unknown as Student

export const deleteStudent = async (id: string) =>
  (await http.delete(`/students/${id}`, { showLoading: true, loadingText: '正在删除学生档案...' })) as unknown as void
