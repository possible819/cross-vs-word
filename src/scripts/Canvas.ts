import $ from "jquery"
import { AbstractLifeCycle } from "./abstracts"
import { BlockColors, BlockTypes } from "./enums"

type BlockMapType = {
  xFrom: number
  xTo: number
  yFrom: number
  yTo: number
  type: BlockTypes
}

export class Canvas extends AbstractLifeCycle {
  private canvas!: JQuery<HTMLCanvasElement>
  private canvasSize!: number
  public context!: CanvasRenderingContext2D
  private blockMap: BlockMapType[] = []

  initializeMemberVariables(): void {
    this.canvas = $("canvas")
    this.canvasSize =
      window.innerWidth < window.innerHeight
        ? window.innerWidth - 20
        : window.innerHeight - 20

    this.canvas.prop("width", this.canvasSize).prop("height", this.canvasSize)
    this.context = this.canvas
      .get(0)
      .getContext("2d") as CanvasRenderingContext2D
  }

  registerEventListeners(): void {}

  renderCreateGame(size: number = 5): void {
    this.clearBlockMap()
    const cellSize: number = this.canvas.prop("width") / size

    for (let col: number = 0; col < size; col++) {
      const x: number = col * cellSize

      for (let row: number = 0; row < size; row++) {
        const y: number = row * cellSize

        this.context.fillStyle = BlockColors.ObstacleFill
        this.context.strokeStyle = BlockColors.ObstacleStroke
        this.context.fillRect(x, y, cellSize, cellSize)
        this.context.strokeRect(x, y, cellSize, cellSize)

        this.blockMap.push({
          xFrom: x,
          xTo: x + cellSize,
          yFrom: y,
          yTo: y + cellSize,
          type: BlockTypes.Obstacle,
        })
      }
    }

    this.canvas.unbind("click")
    this.canvas.on("click", this.switchBlockByClick.bind(this))
  }

  switchBlockByClick(e: JQuery.MouseEventBase): void {
    const offsetX: number = e.offsetX
    const offsetY: number = e.offsetY

    const clickedBlockMap: BlockMapType = this.blockMap.find(
      (bm: BlockMapType) =>
        offsetX > bm.xFrom &&
        offsetX < bm.xTo &&
        offsetY > bm.yFrom &&
        offsetY < bm.yTo
    ) as BlockMapType

    clickedBlockMap.type =
      clickedBlockMap.type === BlockTypes.Obstacle
        ? BlockTypes.Input
        : BlockTypes.Obstacle
    this.renderBlock(clickedBlockMap)
  }

  renderBlock(block: BlockMapType) {
    switch (block.type) {
      case BlockTypes.Obstacle:
        this.context.fillStyle = BlockColors.ObstacleFill
        this.context.strokeStyle = BlockColors.ObstacleStroke
        break

      case BlockTypes.Input:
        this.context.fillStyle = BlockColors.InputFill
        this.context.strokeStyle = BlockColors.InputStroke
        break
    }

    this.context.fillRect(
      block.xFrom,
      block.yFrom,
      block.xTo - block.xFrom,
      block.yTo - block.yFrom
    )
    this.context.strokeRect(
      block.xFrom,
      block.yFrom,
      block.xTo - block.xFrom,
      block.yTo - block.yFrom
    )
  }

  clearBlockMap(): void {
    this.blockMap = []
  }
}
