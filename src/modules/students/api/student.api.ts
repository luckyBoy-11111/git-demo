import { http } from '../../../shared/api/http'
import type { Student, StudentSearchParams } from '../types/student'

export const getStudents = async (params?: StudentSearchParams) =>
  (await http.get<Student[]>('/students', { params })) as unknown as Student[]

export const getStudentById = async (id: string) =>
  (await http.get<Student>(`/students/${id}`)) as unknown as Student

export const createStudent = async (data: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>) =>
  (await http.post<Student>('/students', data, { showLoading: true, loadingText: '正在保存学生档案...' })) as unknown as Student

export const updateStudent = async (id: string, data: Partial<Student>) =>
  (await http.patch<Student>(`/students/${id}`, data, { showLoading: true, loadingText: '正在更新学生档案...' })) as unknown as Student
