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

export class App {
  private readonly header: Header
  private readonly drawer: Drawer
  private readonly controlPannel: ControlPannel
  private readonly canvas: Canvas

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

  public size: number = 2

  constructor() {
    this.header = new Header(this)
    this.drawer = new Drawer(this)
    this.controlPannel = new ControlPannel(this)
    this.canvas = new Canvas(this)
    this.drawer.setMenus(this.menus)
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
