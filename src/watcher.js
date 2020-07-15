class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm;
    this.key = key;
    this.cb = cb;
    Dep.target = this;
    this.oldValue = this.vm[key];
    Dep.target = null;
    this.update(vm, key, cb);
  }
  update() {
    const newValue = this.vm[this.key];
    if (newValue === this.oldValue) {
      return;
    }
    this.cb && this.cb(newValue);
  }
}

// new Watcher(vm,key, cb)

// new Watcher()
