import { http } from '../../../shared/api/http'
import type { ParentInfo } from '../types/parent'

export const getParentsByStudentId = async (studentId: string) =>
  (await http.get<ParentInfo[]>('/parents', { params: { studentId } })) as unknown as ParentInfo[]

export const saveParentInfo = async (data: ParentInfo) =>
  (await http.put<ParentInfo>(`/parents/${data.id}`, data, { showLoading: true, loadingText: '正在保存家长信息...' })) as unknown as ParentInfo
