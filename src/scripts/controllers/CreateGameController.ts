import { Block, Canvas } from "../Canvas"
import { BlockTypes } from "../enums"
import { CanvasController } from "./CanvasControllers"

export class CreateGameController extends CanvasController {
  private eventHandlers: { [event: string]: any }

  constructor(canvas: Canvas) {
    super(canvas)

    this.eventHandlers = {
      click: (e: JQuery.MouseEventBase) =>
        this.canvas.switchBlockByClick(e, [
          BlockTypes.Obstacle,
          BlockTypes.Input,
        ]),
    }
  }

  sizeUp(): void {
    const currentBlocks: Block[] = this.canvas.blocks
    let currentSize: number = this.getCurrentSize()

    let newBlocks: Block[] = this.canvas.generateEmptyBlocks(++currentSize)
    newBlocks = newBlocks.map(
      (bm: Block): Block => {
        const currentBlock: Block | undefined = currentBlocks.find(
          (cbm: Block) => cbm.row === bm.row && cbm.column === bm.column
        )
        if (currentBlock) {
          bm.type = currentBlock.type
        }
        return bm
      }
    )

    this.renderCanvas(newBlocks)
  }

  sizeDown(): void {
    const currentBlocks: Block[] = this.canvas.blocks
    let currentSize: number = this.getCurrentSize()

    if (
      currentBlocks.find(
        (cb: Block) =>
          cb.type === BlockTypes.Input &&
          (cb.row === currentSize - 1 || cb.column === currentSize - 1)
      )
    ) {
      alert(`There's editing block`)
      return
    }

    let newBlocks: Block[] = this.canvas.generateEmptyBlocks(--currentSize)
    newBlocks = newBlocks.map(
      (bm: Block): Block => {
        const currentBlock: Block | undefined = currentBlocks.find(
          (cbm: Block) => cbm.row === bm.row && cbm.column === bm.column
        )
        if (currentBlock) {
          bm.type = currentBlock.type
        }
        return bm
      }
    )

    this.renderCanvas(newBlocks)
  }

  reset(): void {
    const result = confirm("Are you sure?")
    if (result) {
      const newBlocks: Block[] = this.canvas.blocks.map((cb: Block) => {
        cb.type = BlockTypes.Obstacle
        return cb
      })

      this.renderCanvas(newBlocks)
    }
  }

  renderCanvas(blocks?: Block[]): void {
    if (!blocks?.length) blocks = this.canvas.generateEmptyBlocks()
    this.canvas.renderBlocks(blocks, this.eventHandlers)
  }
}
