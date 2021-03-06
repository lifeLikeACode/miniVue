class Observer {
  constructor(data) {
    this.walk(data);
  }
  walk(data) {
    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key]);
    });
  }
  defineReactive(obj, key, value) {
    const dep = new Dep();
    if (typeof obj[key] === "object") {
      this.walk(obj[key]);
    }
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      get() {
        Dep.target && dep.addSub(Dep.target);
        return value;
      },
      set(newVal) {
        if (newVal === value) {
          return;
        }
        value = newVal;
        dep.notify();
      },
    });
  }
}
