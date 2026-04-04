export const jwt = {
  _jwt: null,
  set(jwt) {
    this._jwt = jwt;
  },
  clear(jwt) {
    this._jwt = null;
  },
  get() {
    return this._jwt;
  }
};
