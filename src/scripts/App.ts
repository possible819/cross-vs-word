import "bootstrap/dist/css/bootstrap.min.css"
import "../assets/styles/common-styles.css"
import "../assets/styles/theme.css"
import { Canvas } from "./Canvas"
import { CreateGameController } from "./controllers"
import { ButtonTypes, ControlPannel } from "./ControlPannel"
import { Drawer, MenuInterface } from "./Drawer"
import { Header } from "./Header"
import { LocalStorageUtil } from "./utils"

export class App {
  private readonly header: Header
  private readonly drawer: Drawer
  private readonly controlPannel: ControlPannel
  private readonly canvas: Canvas
  private readonly createGameController: CreateGameController

  private readonly menus: MenuInterface[] = [
    {
      title: "My Games",
      menus: [
        {
          title: "New Game",
          action: () => this.showCreateGame(),
        },
        ...LocalStorageUtil.getItem("my_games", [
          { title: "Demo 1", action: () => console.log("Load Demo 1") },
          { title: "Demo 2", action: () => console.log("Load Demo 2") },
          { title: "Demo 3", action: () => console.log("Load Demo 3") },
          { title: "Demo 4", action: () => console.log("Load Demo 4") },
          { title: "Demo 5", action: () => console.log("Load Demo 5") },
        ]),
      ],
    },
    {
      title: "Play Games",
      menus: LocalStorageUtil.getItem("my_games", [
        { title: "Demo 1", action: () => console.log("Load Demo 1") },
        { title: "Demo 2", action: () => console.log("Load Demo 2") },
        { title: "Demo 3", action: () => console.log("Load Demo 3") },
        { title: "Demo 4", action: () => console.log("Load Demo 4") },
        { title: "Demo 5", action: () => console.log("Load Demo 5") },
      ]),
    },
    {
      title: "Setting",
      action: () => console.log("Show setting page"),
    },
  ]

  constructor() {
    this.header = new Header(this)
    this.drawer = new Drawer(this)
    this.controlPannel = new ControlPannel(this)
    this.canvas = new Canvas(this)
    this.createGameController = new CreateGameController(this.canvas)
    this.drawer.setMenus(this.menus)
  }

  drawerBtnClickHandler(): void {
    this.drawer.toggleDrawer()
  }

  showCreateGame(): void {
    this.drawer.closeDrawer()
    this.createGameController.renderCanvas()
    this.controlPannel.setButtons([
      {
        text: "Up",
        type: ButtonTypes.neutral,
        action: () => this.createGameController.sizeUp(),
      },
      {
        text: "Down",
        type: ButtonTypes.neutral,
        action: () => this.createGameController.sizeDown(),
      },
      {
        text: "Reset",
        type: ButtonTypes.negative,
        action: () => this.createGameController.reset(),
      },
    ])
  }
}

window.onload = () => new App()
