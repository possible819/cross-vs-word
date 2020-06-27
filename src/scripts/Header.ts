import "@material/mwc-icon"
import $ from "jquery"
import "../assets/styles/header.css"
import { AbstractLifeCycle } from "./abstracts/AbstractLifeCycle"
import { App } from "./App"

export class Header extends AbstractLifeCycle {
  private header!: JQuery<HTMLElement>
  private drawerBtn!: JQuery<HTMLButtonElement>
  private title!: JQuery<HTMLElement>

  initializeMemberVariables() {
    this.header = $("header")
    this.drawerBtn = $("#drawer-btn")
    this.title = $("#title")

    this.title.text("Cross VS Word")
  }

  registerEventListeners(): void {
    this.drawerBtn.on("click", this.app.drawerBtnClickHandler.bind(this.app))
  }
}
