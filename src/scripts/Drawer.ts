import $ from "jquery"
import "../assets/styles/drawer.css"
import { AbstractLifeCycle } from "./abstracts"

export interface MenuInterface {
  title: string
  action: string
}

export class Drawer extends AbstractLifeCycle {
  private drawer!: JQuery<HTMLElement>
  private menu!: JQuery<HTMLElement>
  private modal!: JQuery<HTMLElement>
  private isOpened: boolean = false

  initializeMemberVariables(): void {
    this.drawer = $("aside")
    this.menu = $("#menu")
    this.modal = $("#modal")
  }

  registerEventListeners(): void {
    this.modal.on("click", this.closeDrawer.bind(this))
  }

  public toggleDrawer(): void {
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

  public setMenus(
    menus: MenuInterface[],
    menuSelectHandler: (e: JQueryEventObject) => void
  ): void {
    if (menus?.length) {
      this.clearMenuCards()
      for (const menu of menus) {
        this.menu.append(this.menuCardFactory(menu, menuSelectHandler))
      }
    }
  }

  private menuCardFactory(
    menu: MenuInterface,
    menuSelectHandler: (e: JQueryEventObject) => void
  ): JQuery<HTMLElement> {
    return $("<div></div>")
      .addClass("shadow card text-white bg-danger m-1 p-1")
      .text(menu.title)
      .prop("action", menu.action)
      .on("click", menuSelectHandler)
  }

  private clearMenuCards() {
    while (this.menu.children().length) {
      this.menu.children().remove()
    }
  }

  protected menuSelectHandler(e: JQueryEventObject): void {
    console.warn(
      `Menu is selected, ${$(e.currentTarget).prop(
        "action"
      )}, You can customize it to do something else.`
    )
  }
}
