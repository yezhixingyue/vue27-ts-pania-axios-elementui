declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    MessageBox: typeof import('element-ui/lib/message-box')['default']
    Message: typeof import('element-ui/lib/message')['default']
    Loading: typeof import('element-ui/lib/loading')['default']
  }
}