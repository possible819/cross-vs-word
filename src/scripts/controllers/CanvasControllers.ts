import { Block, Canvas } from "../Canvas"

export class CanvasController {
  public canvas: Canvas

  constructor(canvas: Canvas) {
    this.canvas = canvas
  }

  getCurrentSize(blocks: Block[] = this.canvas.blocks): number {
    return Math.sqrt(blocks.length)
  }
}
