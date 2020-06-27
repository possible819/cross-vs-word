import { App } from "../App"
import { LifeCycleInterface } from "../interfaces/LifeCycleInterface"

export abstract class AbstractLifeCycle implements LifeCycleInterface {
  public app: App

  constructor(app: App) {
    this.app = app
    this.initializeMemberVariables()
    this.registerEventListeners()
  }

  initializeMemberVariables(): void {
    throw new Error(
      `This method should be implemented by extended class ${this}`
    )
  }

  registerEventListeners(): void {
    throw new Error(
      `This method should be implemented by extended class ${this}`
    )
  }
}
