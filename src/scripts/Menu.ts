interface Indexable {
  [key: string]: MenuNode
}

export class MenuNode {
  public title: string
  public action?: () => void
  public parent?: MenuNode
  public children: Indexable

  private backBtnTitle: string = "Back"

  constructor(title: string, action?: () => void, parent?: MenuNode) {
    this.title = title
    this.action = action
    this.parent = parent

    this.children = {}
  }

  public insert(title: string, action?: () => void) {
    const newNode = new MenuNode(title, action)
    this.children[title] = newNode

    const parentNode = Object.assign({}, this)
    parentNode.title = this.backBtnTitle

    newNode.parent = parentNode

    return newNode
  }
}
