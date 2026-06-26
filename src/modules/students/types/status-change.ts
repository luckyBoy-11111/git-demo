import type { StudentStatus } from './student'

export type StudentStatusChangeType = '转班' | '休学' | '复学' | '转出' | '退学' | '毕业'

export interface StudentStatusChange {
  id: string
  studentId: string
  type: StudentStatusChangeType
  fromGradeId?: string
  fromClassId?: string
  toGradeId?: string
  toClassId?: string
  fromStatus: StudentStatus
  toStatus: StudentStatus
  changeDate: string
  reason: string
  operator: string
  remark?: string
}
