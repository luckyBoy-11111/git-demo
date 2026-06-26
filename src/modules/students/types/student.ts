export type StudentGender = '男' | '女'
export type StudentStatus = '在读' | '休学' | '转出' | '退学' | '毕业'
export type BoardingType = '走读' | '住宿'

export interface Student {
  id: string
  studentNo: string
  name: string
  gender: StudentGender
  birthDate: string
  nation: string
  idCardNo: string
  politicalStatus: string
  phone: string
  address: string
  gradeId: string
  classId: string
  academicYearId: string
  semesterId: string
  enrollmentYear: number
  enrollmentDate: string
  studentStatus: StudentStatus
  studentRegistryNo: string
  boardingType: BoardingType
  dormBuilding?: string
  dormRoom?: string
  bedNo?: string
  boardingDate?: string
  primaryContactName: string
  primaryContactPhone: string
  remark?: string
  createdAt: string
  updatedAt: string
}

export interface StudentSearchParams {
  keyword?: string
  gradeId?: string
  classId?: string
  studentStatus?: StudentStatus
  enrollmentYear?: number
  boardingType?: BoardingType
}
