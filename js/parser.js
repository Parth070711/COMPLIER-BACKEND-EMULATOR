class Node {}
class BinOp extends Node {
  constructor(op, left, right) { super(); this.op = op; this.left = left; this.right = right; }
}
class Assign extends Node {
  constructor(lhs, expr) { super(); this.lhs = lhs; this.expr = expr; }
}
class Var extends Node {
  constructor(name) { super(); this.name = name; }
}
class Const extends Node {
  constructor(value) { super(); this.value = value; }
}

function tokenize(s) {
  return s.match(/\w+|[()+\-*/=]/g) || [];
}

function parse(tokens) {
  let i = 0;
  const peek = () => tokens[i];
  const next = () => tokens[i++];

  function parsePrimary() {
    const t = peek();
    if (!t) return null;
    if (/^\d+$/.test(t)) { next(); return new Const(Number(t)); }
    if (/^[a-zA-Z_]\w*$/.test(t)) { next(); return new Var(t); }
    if (t === '(') { next(); const e = parseExpr(); if (peek() === ')') next(); return e; }
    return null;
  }

  function parseMulDiv() {
    let node = parsePrimary();
    while (peek() === '*' || peek() === '/') {
      const op = next();
      node = new BinOp(op, node, parsePrimary());
    }
    return node;
  }

  function parseExpr() {
    let node = parseMulDiv();
    while (peek() === '+' || peek() === '-') {
      const op = next();
      node = new BinOp(op, node, parseMulDiv());
    }
    return node;
  }

  const first = parsePrimary();
  if (peek() === '=') {
    if (first instanceof Var) {
      next();
      const expr = parseExpr();
      return new Assign(first.name, expr);
    } else {
      throw new Error("Left side must be variable");
    }
  } else {
    return first || parseExpr();
  }
}
