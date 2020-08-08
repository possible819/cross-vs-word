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
import { MenuNode } from "./Menu"

export class App {
  private readonly header: Header
  private readonly drawer: Drawer
  private readonly controlPannel: ControlPannel
  private readonly canvas: Canvas
  private readonly rootMenu: MenuNode

  public size: number = 2

  constructor() {
    this.header = new Header(this)
    this.drawer = new Drawer(this)
    this.controlPannel = new ControlPannel(this)
    this.canvas = new Canvas(this)

    this.rootMenu = new MenuNode("")
    this.initMenuTree()
    this.drawer.setMenus(this.rootMenu)
  }

  initMenuTree(): void {
    const root = this.rootMenu

    // My Games
    const myGames = root.insert("My Games")
    myGames.insert("New Game", () => this.showCreateGame())
    myGames.insert("Demo 1", () => console.log("Load Demo 1"))
    myGames.insert("Demo 2", () => console.log("Load Demo 2"))
    myGames.insert("Demo 3", () => console.log("Load Demo 3"))
    myGames.insert("Demo 4", () => console.log("Load Demo 4"))
    myGames.insert("Demo 5", () => console.log("Load Demo 5"))

    // Play Games
    const playGames = root.insert("Play Games")
    playGames.insert("Demo 1", () => console.log("Load Demo 1"))
    playGames.insert("Demo 2", () => console.log("Load Demo 2"))
    playGames.insert("Demo 3", () => console.log("Load Demo 3"))
    playGames.insert("Demo 4", () => console.log("Load Demo 4"))
    playGames.insert("Demo 5", () => console.log("Load Demo 5"))

    // Setting
    const setting = root.insert("Setting")

    const sound = setting.insert("Sound", () => console.log("Sound Setting"))
    sound.insert("BGM", () => console.log("BGM Setting"))
    sound.insert("SE", () => console.log("SE Setting"))

    const game = setting.insert("Game", () => console.log("Game Setting"))
    game.insert("Language", () => console.log("Language Setting"))
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
