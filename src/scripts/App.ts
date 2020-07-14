import "bootstrap/dist/css/bootstrap.min.css"
import $ from "jquery"
import Swal, { SweetAlertOptions, SweetAlertResult } from "sweetalert2"
import "../assets/styles/common-styles.css"
import "../assets/styles/theme.css"
import { Canvas } from "./Canvas"
import { ButtonTypes, ControlPannel } from "./ControlPannel"
import { Drawer, MenuInterface } from "./Drawer"
import { Header } from "./Header"

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
          action: () => console.log("Move to page for creating new game"),
        },
        { title: "Demo 1", action: () => console.log("Load Demo 1") },
        { title: "Demo 2", action: () => console.log("Load Demo 2") },
        { title: "Demo 3", action: () => console.log("Load Demo 3") },
      ],
    },
    {
      title: "Play Games",
      menus: [
        {
          title: "Saved Game 1",
          action: () => console.log("Play Saved Game 1"),
        },
        {
          title: "Saved Game 2",
          action: () => console.log("Play Saved Game 2"),
        },
        {
          title: "Saved Game 3",
          action: () => console.log("Play Saved Game 3"),
        },
      ],
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
}

window.onload = () => new App()
