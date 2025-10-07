let tempCounter = 0;
function newTemp() { return `t${++tempCounter}`; }

function genIR(node, irList=[]) {
  if (node instanceof Const) return node.value;
  if (node instanceof Var) return node.name;
  if (node instanceof BinOp) {
    const l = genIR(node.left, irList);
    const r = genIR(node.right, irList);
    const t = newTemp();
    irList.push(`${t} = ${l} ${node.op} ${r}`);
    return t;
  }
  if (node instanceof Assign) {
    const rhs = genIR(node.expr, irList);
    irList.push(`${node.lhs} = ${rhs}`);
    return irList;
  }
  return null;
}
