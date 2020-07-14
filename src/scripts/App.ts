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
        { title: "Demo 4", action: () => console.log("Load Demo 4") },
        { title: "Demo 5", action: () => console.log("Load Demo 5") },
        { title: "Demo 6", action: () => console.log("Load Demo 6") },
        { title: "Demo 7", action: () => console.log("Load Demo 7") },
        { title: "Demo 8", action: () => console.log("Load Demo 8") },
        { title: "Demo 9", action: () => console.log("Load Demo 9") },
        { title: "Demo 10", action: () => console.log("Load Demo 10") },
        { title: "Demo 11", action: () => console.log("Load Demo 11") },
        { title: "Demo 12", action: () => console.log("Load Demo 12") },
        { title: "Demo 13", action: () => console.log("Load Demo 13") },
        { title: "Demo 14", action: () => console.log("Load Demo 14") },
        { title: "Demo 15", action: () => console.log("Load Demo 15") },
        { title: "Demo 16", action: () => console.log("Load Demo 16") },
        { title: "Demo 17", action: () => console.log("Load Demo 17") },
        { title: "Demo 18", action: () => console.log("Load Demo 18") },
        { title: "Demo 19", action: () => console.log("Load Demo 19") },
        { title: "Demo 20", action: () => console.log("Load Demo 20") },
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
}

window.onload = () => new App()
