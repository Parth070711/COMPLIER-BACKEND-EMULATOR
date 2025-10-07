function runCompiler(inputCode) {
    let lines = inputCode.split("\n").map(l => l.trim()).filter(l => l);

    // 1. Symbol Table with Hashing
    let symtab = new HashTable();
    lines.forEach(line => {
        if (line.includes("=")) {
            let lhs = line.split("=")[0].trim();
            symtab.set(lhs, "int"); // assume int for demo
        }
    });

    // 2. Generate IR (basic)
    let ir = lines.map((line, idx) => `t${idx + 1}: ${line}`);

    // 3. DAG Optimization
    let dagOptimizer = new DAG();
    let optimized = dagOptimizer.optimize(lines);

    // 4. Register Allocation (simple)
    let registers = {};
    optimized.optimized.forEach((line, idx) => {
        let lhs = line.split("=")[0].trim();
        registers[lhs] = "R" + (idx + 1);
    });

    // 5. Fake Assembly
    let asm = optimized.optimized.map((line, idx) => {
        return `MOV ${registers[line.split("=")[0].trim()]}, ${line.split("=")[1].trim()}`;
    });

    // 6. Pipeline Simulation
    let pipeline = new Pipeline();
    let cycles = pipeline.simulate(asm);

    return {
        ir,
        optimizedIR: optimized.optimized,
        dag: optimized.dag,
        registers,
        assembly: asm,
        pipeline: pipeline.print(cycles)
    };
}
