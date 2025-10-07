function allocateRegisters(irList, regs=['R1','R2','R3','R4']) {
  const regMap = new Map();
  const free = [...regs];
  const spills = new Map();

  for (const instr of irList) {
    const parts = instr.split(/\s+/);
    const dest = parts[0];
    const srcs = parts.slice(2).filter(x => /^[a-zA-Z_]\w*$|^t\d+$/.test(x));

    srcs.forEach(src => {
      if (/^t\d+$/.test(src) && !regMap.has(src)) {
        if (free.length) regMap.set(src, free.shift());
        else spills.set(src, `mem_${src}`);
      }
    });

    if (/^t\d+$/.test(dest) && !regMap.has(dest)) {
      if (free.length) regMap.set(dest, free.shift());
      else spills.set(dest, `mem_${dest}`);
    }
  }
  return {regMap, spills};
}
