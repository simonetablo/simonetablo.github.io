class Attack {
    constructor(M, N, p) {
        this.systems = [];
        this.prob = p;

        for (let i = 0; i < M; i++) {
            this.systems.push([]);
            for (let j = 0; j < N; j++) {
                this.systems[i].push(0);
            }
        }
    }

    simulateAttack() {
        for (let i = 0; i < this.systems.length; i++) {
            for (let j = 0; j < this.systems[0].length; j++) {
                const nextRandom = Math.random();
                this.systems[i][j] = nextRandom <= this.prob ? -1 : 1;
            }
        }
    }

    getSystems() {
        return this.systems;
    }
}