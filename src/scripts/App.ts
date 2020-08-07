import "bootstrap/dist/css/bootstrap.min.css"
import "../assets/styles/common-styles.css"
import "../assets/styles/theme.css"
import { Canvas } from "./Canvas"
import {
  ControlPannel,
  ControlButtonInterface,
  ButtonTypes,
} from "./ControlPannel"
import { Drawer, MenuInterface } from "./Drawer"
import { Header } from "./Header"
import { LocalStorageUtil } from "./utils"
import { MenuTree } from "./Menu"

export class App {
  private readonly header: Header
  private readonly drawer: Drawer
  private readonly controlPannel: ControlPannel
  private readonly canvas: Canvas
  private readonly menu: MenuTree

  public size: number = 2

  constructor() {
    this.header = new Header(this)
    this.drawer = new Drawer(this)
    this.controlPannel = new ControlPannel(this)
    this.canvas = new Canvas(this)

    this.menu = new MenuTree()
    this.initMenuTree()
    this.drawer.setMenus(this.menu.getCurrentNode())
  }

  initMenuTree(): void {
    const root = this.menu.getCurrentNode()

    // My Games
    const myGames = this.menu.insert(root, "My Games")
    this.menu.insert(myGames, "New Game", () => this.showCreateGame())
    this.menu.insert(myGames, "Demo 1", () => console.log("Load Demo 1"))
    this.menu.insert(myGames, "Demo 2", () => console.log("Load Demo 2"))
    this.menu.insert(myGames, "Demo 3", () => console.log("Load Demo 3"))
    this.menu.insert(myGames, "Demo 4", () => console.log("Load Demo 4"))
    this.menu.insert(myGames, "Demo 5", () => console.log("Load Demo 5"))

    // Play Games
    const playGames = this.menu.insert(root, "Play Games")
    this.menu.insert(myGames, "Demo 1", () => console.log("Load Demo 1"))
    this.menu.insert(myGames, "Demo 2", () => console.log("Load Demo 2"))
    this.menu.insert(myGames, "Demo 3", () => console.log("Load Demo 3"))
    this.menu.insert(myGames, "Demo 4", () => console.log("Load Demo 4"))
    this.menu.insert(myGames, "Demo 5", () => console.log("Load Demo 5"))

    // Setting
    const setting = this.menu.insert(root, "Setting")

    const sound = this.menu.insert(setting, "Sound", () =>
      console.log("Sound Setting")
    )
    this.menu.insert(sound, "BGM", () => console.log("BGM Setting"))
    this.menu.insert(sound, "SE", () => console.log("SE Setting"))

    const game = this.menu.insert(setting, "Game", () =>
      console.log("Game Setting")
    )
    this.menu.insert(game, "Language", () => console.log("Language Setting"))
  }

  drawerBtnClickHandler(): void {
    this.drawer.toggleDrawer()
  }

  showCreateGame(size: number = 5): void {
    this.drawer.closeDrawer()
    this.canvas.renderCreateGame(size)
    this.controlPannel.setButtons([
      {
        text: "Up",
        type: ButtonTypes.neutral,
        action: () => this.showCreateGame(size + 1),
      },
      {
        text: "Down",
        type: ButtonTypes.neutral,
        action: () => this.showCreateGame(size - 1),
      },
    ])
  }
}

window.onload = () => new App()
