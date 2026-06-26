import type { SelectOption } from '../../../shared/types/common'
import type { BoardingType, StudentGender, StudentStatus } from '../types/student'

export const genderOptions: SelectOption<StudentGender>[] = [
  { label: '男', value: '男' },
  { label: '女', value: '女' },
]

export const studentStatusOptions: SelectOption<StudentStatus>[] = [
  { label: '在读', value: '在读' },
  { label: '休学', value: '休学' },
  { label: '转出', value: '转出' },
  { label: '退学', value: '退学' },
  { label: '毕业', value: '毕业' },
]

export const boardingTypeOptions: SelectOption<BoardingType>[] = [
  { label: '走读', value: '走读' },
  { label: '住宿', value: '住宿' },
]

export const gradeOptions: SelectOption[] = [
  { label: '高一', value: 'grade_1' },
  { label: '高二', value: 'grade_2' },
  { label: '高三', value: 'grade_3' },
]

export const classOptions: SelectOption[] = [
  { label: '高一 1 班', value: 'class_1' },
  { label: '高一 2 班', value: 'class_2' },
  { label: '高二 1 班', value: 'class_3' },
]
