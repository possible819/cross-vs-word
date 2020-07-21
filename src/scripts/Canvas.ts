import $ from "jquery"
import { AbstractLifeCycle } from "./abstracts"
import { BlockColors, BlockTypes } from "./enums"

export type Block = {
  row: number
  column: number
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
  public blocks: Block[] = []

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

  generateEmptyBlocks(size: number = 5): Block[] {
    const cellSize: number = this.canvas.prop("width") / size

    this.clearBlocks()
    for (let column: number = 0; column < size; column++) {
      const x: number = column * cellSize

      for (let row: number = 0; row < size; row++) {
        const y: number = row * cellSize
        this.blocks.push({
          row,
          column,
          xFrom: x,
          xTo: x + cellSize,
          yFrom: y,
          yTo: y + cellSize,
          type: BlockTypes.Obstacle,
        })
      }
    }

    return this.blocks
  }

  switchBlockByClick(e: JQuery.MouseEventBase, types: BlockTypes[]): void {
    const offsetX: number = e.offsetX
    const offsetY: number = e.offsetY

    const clickedBlock: Block = this.blocks.find(
      (b: Block) =>
        offsetX > b.xFrom &&
        offsetX < b.xTo &&
        offsetY > b.yFrom &&
        offsetY < b.yTo
    ) as Block

    let currentIdx: number = types.indexOf(clickedBlock.type)
    const nextIdx: number = (currentIdx + 1) % types.length
    clickedBlock.type = types[nextIdx]
    this.renderBlock(clickedBlock)
  }

  renderBlocks(
    blocks: Block[],
    eventHandlers?: { [event: string]: any } | undefined
  ): void {
    this.blocks = blocks
    for (const block of this.blocks) {
      this.renderBlock(block)
    }

    if (eventHandlers) {
      for (const event in eventHandlers) {
        this.canvas.unbind(event)
        this.canvas.on(event, eventHandlers[event])
      }
    }
  }

  renderBlock(block: Block): void {
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

  clearBlocks(): void {
    this.blocks = []
  }
}
