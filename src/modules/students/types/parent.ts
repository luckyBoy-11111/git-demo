export interface ParentInfo {
  id: string
  studentId: string
  name: string
  relation: string
  phone: string
  workplace?: string
  job?: string
  isPrimaryContact: boolean
  isEmergencyContact: boolean
  remark?: string
}
