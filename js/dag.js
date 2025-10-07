// DAG-based optimization (common subexpression elimination)
class DAG {
    constructor() {
        this.nodes = {};
    }

    add(expr, left, right) {
        const key = expr + "(" + left + "," + right + ")";
        if (!this.nodes[key]) {
            this.nodes[key] = { expr, left, right, temp: "t" + (Object.keys(this.nodes).length + 1) };
        }
        return this.nodes[key].temp;
    }

    optimize(irList) {
        let optimized = [];
        let dag = new DAG();

        irList.forEach(instr => {
            if (instr.includes("=")) {
                let [lhs, rhs] = instr.split("=");
                lhs = lhs.trim();
                rhs = rhs.trim();

                if (rhs.includes("+")) {
                    let [a, b] = rhs.split("+").map(x => x.trim());
                    let t = dag.add("+", a, b);
                    optimized.push(`${lhs} = ${t}`);
                } else if (rhs.includes("*")) {
                    let [a, b] = rhs.split("*").map(x => x.trim());
                    let t = dag.add("*", a, b);
                    optimized.push(`${lhs} = ${t}`);
                } else {
                    optimized.push(instr);
                }
            }
        });

        return { optimized, dag: dag.nodes };
    }
}
