import $ from "jquery"
import "../assets/styles/drawer.css"
import { AbstractLifeCycle } from "./abstracts"
import { App } from "./App"
import { MenuNode } from "./Menu"

export interface MenuInterface {
  title: string
  action?: () => void
  menus?: MenuInterface[]
}
export class Drawer extends AbstractLifeCycle {
  private drawer!: JQuery<HTMLElement>
  private menu!: JQuery<HTMLElement>
  private modal!: JQuery<HTMLElement>
  private isOpened: boolean = false
  private backBtnTitle: string

  /**
   * @param {App} app
   * @param {String} backBtnTitle 서브 메뉴에서 상위 메뉴로 이동하는 버튼의 타이틀
   */
  constructor(app: App, backBtnTitle?: string) {
    super(app)
    this.backBtnTitle = backBtnTitle || "Back"
  }

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

  public openDrawer(): void {
    this.isOpened = true
    this.flipMenu()
  }

  public closeDrawer(): void {
    this.isOpened = false
    this.flipMenu()
  }

  private flipMenu() {
    if (this.isOpened) {
      this.drawer.addClass("opened")
    } else {
      this.drawer.removeClass("opened")
    }
  }

  public setMenus(currentNode: MenuNode) {
    if (currentNode.children) {
      this.clearMenus()

      if (currentNode.parent) {
        // Back Btn
        this.menu.append(this.menuCardFactory(currentNode.parent))
      }

      for (const child in currentNode.children) {
        this.menu.append(this.menuCardFactory(currentNode.children[child]))
      }
    }
  }

  public clearMenus() {
    while (this.menu.children().length) {
      this.menu.children().remove()
    }
  }

  private menuCardFactory(menu: MenuNode): JQuery<HTMLElement> {
    const menuCard: JQuery<HTMLElement> = $("<div></div>")
      .addClass("shadow card bg-danger m-1 p-1")
      .append($("<span></span>").addClass("text-white m-auto").text(menu.title))

    if (menu.action) {
      menuCard.on("click", menu.action)
    }

    if (Object.keys(menu.children).length) {
      menuCard.on("click", () => {
        this.setMenus(menu)
      })
    }

    return menuCard
  }
}
