import { App } from "../App"

export interface LifeCycleInterface {
  app: App
  initializeMemberVariables: () => void
  registerEventListeners: () => void
}
