import "../assets/styles/theme.css";
import "../assets/styles/common-styles.css";
import { Header } from "./Header";
import { Drawer } from "./Drawer";

export class App {
  private readonly header: Header;
  private readonly drawer: Drawer;

  constructor() {
    this.header = new Header(this);
    this.drawer = new Drawer(this);
  }

  drawerBtnClickHandler(): void {
    this.drawer.toggleDrawer();
  }
}

window.onload = () => new App();
