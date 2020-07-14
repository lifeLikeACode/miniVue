class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm;
    this.key = key;
    this.cb = cb;
    Dep.target = this;
    vm[key];
    Dep.target = null;
    this.update(vm, key, cb);
  }
  update(vm, key, cb) {}
}

// new Watcher(vm,key, cb)

// new Watcher()
