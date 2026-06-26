import { reactive } from 'vue'

export interface GlobalLoadingOptions {
  text?: string
  fullscreen?: boolean
  lock?: boolean
}

interface GlobalLoadingState extends Required<GlobalLoadingOptions> {
  visible: boolean
}

const defaultOptions: Required<GlobalLoadingOptions> = {
  text: '加载中...',
  fullscreen: true,
  lock: true,
}

export const globalLoadingState = reactive<GlobalLoadingState>({
  visible: false,
  ...defaultOptions,
})

export const startLoading = (options: GlobalLoadingOptions = {}) => {
  Object.assign(globalLoadingState, defaultOptions, options, { visible: true })

  if (globalLoadingState.lock) {
    document.body.style.overflow = 'hidden'
  }
}

export const endLoading = () => {
  globalLoadingState.visible = false
  document.body.style.overflow = ''
}
