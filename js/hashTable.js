// Hash Table for Symbol Table
class HashTable {
    constructor(size = 50) {
        this.size = size;
        this.table = new Array(size);
    }

    // Simple hash function
    _hash(key) {
        let hash = 0;
        for (let char of key) {
            hash += char.charCodeAt(0);
        }
        return hash % this.size;
    }

    set(key, value) {
        const index = this._hash(key);
        if (!this.table[index]) {
            this.table[index] = [];
        }
        for (let pair of this.table[index]) {
            if (pair[0] === key) {
                pair[1] = value;
                return;
            }
        }
        this.table[index].push([key, value]);
    }

    get(key) {
        const index = this._hash(key);
        if (!this.table[index]) return undefined;
        for (let pair of this.table[index]) {
            if (pair[0] === key) return pair[1];
        }
        return undefined;
    }

    print() {
        console.log("Symbol Table (HashTable):");
        this.table.forEach((bucket, idx) => {
            if (bucket) {
                bucket.forEach(pair => {
                    console.log(`[${idx}] ${pair[0]} => ${pair[1]}`);
                });
            }
        });
    }
}
