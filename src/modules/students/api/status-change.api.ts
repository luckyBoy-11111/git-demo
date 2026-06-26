import { http } from '../../../shared/api/http'
import type { StudentStatusChange } from '../types/status-change'

export const getStatusChangesByStudentId = async (studentId: string) =>
  (await http.get<StudentStatusChange[]>('/studentStatusChanges', { params: { studentId } })) as unknown as StudentStatusChange[]

export const createStatusChange = async (data: Omit<StudentStatusChange, 'id'>) =>
  (await http.post<StudentStatusChange>('/studentStatusChanges', data, {
    showLoading: true,
    loadingText: '正在记录学籍异动...',
  })) as unknown as StudentStatusChange
