class MiniVue {
  constructor(options) {
    this.$options = options || {};
    this.$data = this.$options.data || {};
    this.$el = this.$options.el
      ? document.querySelector(this.$options.el)
      : this.$options.el;
    new Observer(this.$data);
    this._proxyData(this.$data);
    new Compiler(this);
  }
  _proxyData(data) {
    Object.keys(data).forEach((key) => {
      Object.defineProperty(this, key, {
        configurable: true,
        enumerable: true,
        get() {
          return data[key];
        },
        set(newVal) {
          if (newVal === data[key]) {
            return;
          }
          data[key] = newVal;
        },
      });
    });
  }
}
