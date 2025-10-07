// Pipeline Hazard Simulation
class Pipeline {
    constructor() {
        this.stages = ["IF", "ID", "EX", "MEM", "WB"];
    }

    simulate(instructions) {
        let cycles = [];
        let clock = 0;

        instructions.forEach((inst, i) => {
            let start = i === 0 ? 0 : cycles[i - 1][2]; // wait for previous EX
            let stages = this.stages.map((s, idx) => start + idx + 1);
            cycles.push([inst, stages, stages[stages.length - 1]]);
        });

        return cycles;
    }

    print(cycles) {
        let output = "Pipeline Hazard Simulation:\n";
        cycles.forEach(([inst, stages]) => {
            output += inst + " → " + stages.join(" | ") + "\n";
        });
        return output;
    }
}
