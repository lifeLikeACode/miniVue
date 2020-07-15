class Compiler {
  constructor(vm) {
    this.vm = vm;
    this.el = vm.$el;
    this.compiler(this.el);
  }
  compiler(el) {
    const childNodes = el.childNodes;
    Array.from(childNodes).forEach((node) => {
      if (this.isTextNode(node)) {
        this.compilerText(node);
      } else if (this.isElementNode(node)) {
        this.compilerElement(node);
      }
      if (node.childNodes && node.childNodes.length) {
        this.compiler(node);
      }
    });
  }
  compilerElement(node) {
    Array.from(node.attributes).forEach((attr) => {
      console.dir(attr);

      let attrName = attr.name;
      if (this.isDirective(attrName)) {
        attrName = attrName.substr(2);
        let updateFn = this[`${attrName}Update`];
        let key = attr.value;
        updateFn && updateFn.call(this, node, key);
      }
    });
  }
  modelUpdate(node, key) {
    node.value = this.vm[key];
    new Watcher(this.vm, key, (newValue) => {
      node.value = newValue;
    });
    node.addEventListener("input", (e) => {
      this.vm[key] = node.value;
    });
  }
  textUpdate(node, key) {
    node.textContent = this.vm[key];
    new Watcher(this.vm, key, (newValue) => {
      node.textContent = newValue;
    });
  }
  compilerText(node) {
    let reg = /\{\{(.+?)\}\}/;
    if (reg.test(node.textContent)) {
      let key = RegExp.$1.trim();
      console.log(key);

      node.textContent = node.textContent.replace(reg, this.vm[key]);
      new Watcher(this.vm, key, (newValue) => {
        node.textContent = newValue;
      });
    }
  }
  isTextNode(node) {
    return node.nodeType === 3;
  }
  isDirective(attrName) {
    return attrName.startsWith("v-");
  }
  isElementNode(node) {
    return node.nodeType === 1;
  }
}
