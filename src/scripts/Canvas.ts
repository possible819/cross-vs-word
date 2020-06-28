import { AbstractLifeCycle } from "./abstracts"
import $ from "jquery"

export class Canvas extends AbstractLifeCycle {
  private canvas!: JQuery<HTMLCanvasElement>
  public context: CanvasRenderingContext2D | undefined

  private ACTION_MAP: { [key: string]: () => any } = {
    new: this.createAction,
  }

  initializeMemberVariables(): void {
    this.canvas = $("canvas")
    this.context = this.canvas
      .get(0)
      .getContext("2d") as CanvasRenderingContext2D
  }

  registerEventListeners(): void {}

  doAction(action: string): void {
    if (
      this.ACTION_MAP[action] &&
      typeof this.ACTION_MAP[action] === "function"
    )
      this.ACTION_MAP[action].call(this)
  }

  createAction(): void {
    this.renderBoard()
  }

  renderBoard(): void {
    const canvasWidth: number = this.canvas.width() as number
    const canvasHeight: number = this.canvas.height() as number

    const smallerLength: number =
      canvasWidth < canvasHeight ? canvasWidth : canvasHeight

    const unitWidth: number = smallerLength / this.app.size

    // 10
    // 2
    // 5

    // 0, 0, 5, 5
    // 5, 0, 5, 5
    // 0, 5, 5, 5
    // 5, 5, 5, 5

    for (let i: number = 0; i < this.app.size; i++) {
      const y: number = i * unitWidth
      // Row 별로 그리기
      for (let j: number = 0; j < this.app.size; j++) {
        const x: number = j * unitWidth
        this.context?.strokeRect(x, y, unitWidth, unitWidth)
      }
    }

    // console.log(canvasWidth, canvasHeight)
    // this.app.size
  }
}
