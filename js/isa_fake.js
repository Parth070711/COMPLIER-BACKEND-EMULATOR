function genAssembly(irList, regMap) {
  const asm = [];
  for (const instr of irList) {
    if (instr.includes('=')) {
      const [lhs, rhs] = instr.split('=').map(s => s.trim());
      if (rhs.match(/\s/)) {
        const [op1, op, op2] = rhs.split(/\s+/);
        const r1 = regMap.get(op1) || op1;
        const r2 = regMap.get(op2) || op2;
        const rd = regMap.get(lhs) || lhs;
        asm.push(`${op.toUpperCase()} ${rd}, ${r1}, ${r2}`);
      } else {
        const rd = regMap.get(lhs) || lhs;
        const rs = regMap.get(rhs) || rhs;
        asm.push(`MOV ${rd}, ${rs}`);
      }
    }
  }
  return asm;
}
