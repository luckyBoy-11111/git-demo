import { ElMessage } from 'element-plus'

export const showSuccess = (message: string) => ElMessage.success(message)

export const showError = (message: string) => ElMessage.error(message)

export const showWarning = (message: string) => ElMessage.warning(message)

export const showInfo = (message: string) => ElMessage.info(message)
