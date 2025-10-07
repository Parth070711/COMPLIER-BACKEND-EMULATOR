class SymbolTable {
  constructor() {
    this.table = new Map();
    this.nextAddr = 0;
  }
  add(name, type='int', size=4) {
    if (!this.table.has(name)) {
      this.table.set(name, {type, address: this.nextAddr, size});
      this.nextAddr += size;
    }
    return this.table.get(name);
  }
  get(name) { return this.table.get(name); }
  has(name) { return this.table.has(name); }
}
