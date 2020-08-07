interface Indexable {
  [key: string]: MenuNode
}

export class MenuNode {
  public title: string
  public action?: () => void
  public parent?: MenuNode
  public children: Indexable

  constructor(title: string, action?: () => void, parent?: MenuNode) {
    this.title = title
    this.action = action
    this.parent = parent

    this.children = {}
  }
}

export class MenuTree {
  private root: MenuNode
  private currentNode: MenuNode

  constructor() {
    this.root = new MenuNode("")
    this.currentNode = this.root
  }

  public insert(targetNode: MenuNode, title: string, action?: () => void) {
    const newNode = new MenuNode(title, action)
    targetNode.children[title] = newNode

    const parentNode = Object.assign({}, targetNode) // shallow Copy
    parentNode.title = "Back" // title 강제 변경하여 저장함

    newNode.parent = parentNode

    return newNode
  }

  public getCurrentNode() {
    return this.currentNode
  }
}
