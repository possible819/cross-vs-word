import { AbstractLifeCycle } from "./abstracts"
import $ from "jquery"

export enum ButtonTypes {
  positive = "btn-success",
  neutral = "btn-primary",
  negative = "btn-danger",
}

export interface ControlButtonInterface {
  text: string
  type: ButtonTypes
  action: () => void
}

export class ControlPannel extends AbstractLifeCycle {
  private controlPannel!: JQuery<HTMLDivElement>

  initializeMemberVariables(): void {
    this.controlPannel = $("#ctrl-pannel")
    this.controlPannel.addClass("d-flex justify-content-end")
  }

  registerEventListeners(): void {}

  show(): void {
    this.controlPannel.show()
  }

  hide(): void {
    this.controlPannel.hide()
  }

  setButtons(buttons: ControlButtonInterface[]): void {
    if (buttons?.length) {
      this.clearButtons()

      for (const button of buttons) {
        this.controlPannel.append(this.buttonFactory(button))
      }
    }
  }

  buttonFactory(button: ControlButtonInterface): JQuery<HTMLElement> {
    return $("<button></button>")
      .addClass(`btn shadow ${button.type} mx-auto`)
      .text(button.text)
      .on("click", button.action)
  }

  private clearButtons(): void {
    while (this.controlPannel.children().length) {
      this.controlPannel.children().remove()
    }
  }
}
