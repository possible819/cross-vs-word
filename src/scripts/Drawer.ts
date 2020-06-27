import $ from "jquery"
import "../assets/styles/drawer.css"
import { AbstractLifeCycle } from "./abstracts"

export class Drawer extends AbstractLifeCycle {
  private drawer!: JQuery<HTMLElement>
  private menu!: JQuery<HTMLDivElement>
  private modal!: JQuery<HTMLDivElement>
  private isOpened: boolean = false

  initializeMemberVariables(): void {
    this.drawer = $("aside")
    this.menu = $("#menu")
    this.modal = $("#modal")
  }

  registerEventListeners(): void {
    this.modal.on("click", this.closeDrawer.bind(this))
  }

  toggleDrawer(): void {
    this.isOpened = !this.isOpened
    this.flipMenu()
  }

  openDrawer(): void {
    this.isOpened = true
    this.flipMenu()
  }

  closeDrawer(): void {
    this.isOpened = false
    this.flipMenu()
  }

  flipMenu() {
    if (this.isOpened) {
      this.drawer.addClass("opened")
    } else {
      this.drawer.removeClass("opened")
    }
  }
}
