import "bootstrap/dist/css/bootstrap.min.css"
import $ from "jquery"
import "../assets/styles/common-styles.css"
import "../assets/styles/theme.css"

import { Canvas } from "./Canvas"
import { MENUS } from "./constants"
import { ControlPannel, ButtonTypes } from "./ControlPannel"
import { Drawer } from "./Drawer"
import { Header } from "./Header"

import Swal, { SweetAlertOptions, SweetAlertResult } from "sweetalert2"

export class App {
  private readonly header: Header
  private readonly drawer: Drawer
  private readonly controlPannel: ControlPannel
  private readonly canvas: Canvas

  public size: number = 2

  constructor() {
    this.header = new Header(this)
    this.drawer = new Drawer(this)
    this.controlPannel = new ControlPannel(this)
    this.canvas = new Canvas(this)
    this.drawer.setMenus(MENUS, this.menuSelectHandler.bind(this))
  }

  drawerBtnClickHandler(): void {
    this.drawer.toggleDrawer()
  }

  menuSelectHandler(e: JQueryEventObject): void {
    this.canvas.doAction($(e.currentTarget).prop("action"))
    this.drawer.closeDrawer()
    this.controlPannel.setButtons([
      {
        text: "Size",
        type: ButtonTypes.neutral,
        action: this.showSizeSetting.bind(this),
      },
      {
        text: "Save",
        type: ButtonTypes.positive,
        action: () => console.log("save current quiz"),
      },
      {
        text: "Reset",
        type: ButtonTypes.negative,
        action: () => console.log("reset current creating page"),
      },
    ])
  }

  private async showSizeSetting(): Promise<void> {
    const option: SweetAlertOptions = {
      title: "Size?",
      input: "range",
      inputAttributes: { min: "2", max: "10", step: "0" },
      inputValue: "2",
      confirmButtonText: "Confirm",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      allowOutsideClick: false,
    }
    const result: SweetAlertResult<number> = await Swal.fire(option)
    if (result.value !== undefined) this.size = result.value
  }
}

window.onload = () => new App()
