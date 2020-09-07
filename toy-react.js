class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type);
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value)
  }
  appendChild(component) {
    this.root.appendChild(component.root)
  }
}

class TextWrapper {
  constructor(content) {
    this.root = document.createTextNode(content);
  }
}

export class Component {
  constructor() {
    this.props = Object.create(null);
    this.children = [];
    this._root = null;
  }
  setAttribute(name, value) {
    this.props[name] = value;
  }
  appendChild(component) {
    this.children.push(component)
  }
  get root() {
    if (!this._root) {
      this._root = this.render().root;
    }
    return this._root
  }
}

export function createElement(type, attr, ...children) {
  let e;
  if (typeof type === 'string') {
    // html'标签
    e = new ElementWrapper(type);
  } else {
    // 组件
    e = new type();
  }
   
  // 设置节点属性 或者 组件props
  for(let key in attr) {
    e.setAttribute(key, attr[key]);
  } 

  // 递归插入节点
  let insertChildren = (children) => {
    for(let child of children) {
      if (typeof child === 'string') {
        // 文本节点
        child = new TextWrapper(child);
      }
      if ((typeof child === 'object') && (child instanceof Array)) {
        // 处理组件props children的情况
        insertChildren(child)
      } else {
        // 插入节点
        e.appendChild(child)
      }
    } 
  }
  
  insertChildren(children);
  return e;
}

export function render (component, element) {
  element.appendChild(component.root);
}