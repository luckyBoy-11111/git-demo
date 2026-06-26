export interface PaginationParams {
  page: number
  pageSize: number
}

export interface PageResult<T> {
  list: T[]
  total: number
}

export interface SelectOption<T = string> {
  label: string
  value: T
}
