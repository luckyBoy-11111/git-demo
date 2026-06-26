export type ClassStatus = '正常' | '待编班'

export interface Grade {
  id: string
  name: string
}

export interface AcademicYear {
  id: string
  name: string
}

export interface ClassInfo {
  id: string
  gradeId: string
  name: string
  academicYearId?: string
  headTeacher?: string
  classroom?: string
  status?: ClassStatus
  createdAt?: string
  updatedAt?: string
}

export interface ClassSearchParams {
  keyword?: string
  gradeId?: string
  status?: ClassStatus
}

export type ClassPayload = Omit<ClassInfo, 'id' | 'createdAt' | 'updatedAt'>
