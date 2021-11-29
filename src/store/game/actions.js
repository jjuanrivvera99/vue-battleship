class Log {
    constructor(message, type) {
        this.message = message
        this.type = type
    }

    static incrementId() {
        if (!this.latestId) this.latestId = 1
        else this.latestId++
        return this.latestId
    }
}

class Ship {
    constructor(size) {
        this.id = Ship.incrementId();
        this.size = size;
        this.hits = 0;
        this.sunk = false;
    }

    static incrementId() {
        if (!this.latestId) this.latestId = 1
        else this.latestId++
        return this.latestId
    }
}

const actions = {
    initShips({ dispatch }) {
        dispatch('addShip', new Ship(4));
        dispatch('addShip', new Ship(3));
        dispatch('addShip', new Ship(3));
        dispatch('addShip', new Ship(2));
        dispatch('addShip', new Ship(2));
        dispatch('addShip', new Ship(2));
        dispatch('addShip', new Ship(1));
        dispatch('addShip', new Ship(1));
        dispatch('addShip', new Ship(1));
        dispatch('addShip', new Ship(1));
    },
    hit({commit, state, dispatch }, {x, y}) {
        if (state.status == 'over' || state.status == 'unstarted') {
            return;
        }

        if (state.status == 'started' && state.mode != 'easy' && !state.board.spaces[x][y].missed && !state.board.spaces[x][y].hited) {
            commit("SUSTRACT_TURN")
        } else {
            return;
        }

        if (state.board.spaces[x][y].ship) {
            state.board.spaces[x][y].ship.hits++;
            state.board.spaces[x][y].hited = true;

            const log = new Log(`Ship ${state.board.spaces[x][y].ship.id} hited`, 'hit');
            commit('ADD_LOG', log);

            if (state.board.spaces[x][y].ship.hits == state.board.spaces[x][y].ship.size) {
                dispatch('sunk', { x, y});
            }
        } else {
            state.board.spaces[x][y].missed = true;
            const log = new Log(`Shot missed`, 'miss');
            commit('ADD_LOG', log);
        }
    },
    drawBoard({commit, state}) {
        const spaces = [];

        for (let i = 0; i < state.board.size; i++) {
            let row = [];
            for (let j = 0; j < state.board.size; j++) {
                row.push({
                    x: i,
                    y: j,
                    ship: null,
                    hited: false,
                    missed: false,
                });
            }

            spaces.push(row);
        }
        commit('SET_SPACES', spaces)
    },
    start({commit, state}) {
        const log = new Log(`Game started on ${state.mode} mode`, 'info');
        commit('ADD_LOG', log);
        commit('SET_TURNS', state.modes[state.mode].turns)
        commit('SET_STATUS', "started")
    },
    sunk({commit, state}, {x, y}) {
        const spaces = state.board.spaces;
        spaces[x][y].ship.sunk = true;
        const log = new Log(`Ship ${spaces[x][y].ship.id} destroyed`, 'info');
        commit('ADD_LOG', log);
        commit('SET_SPACES', spaces)
    },
    placeShips({commit, state}) {
        const spaces = state.board.spaces;

        for (const ship of state.board.ships) {
            let placed = false;

            const directions = ['horizontal', 'vertical'];

            while (!placed) {
                let x = Math.floor(Math.random() * state.board.size);
                let y = Math.floor(Math.random() * state.board.size);
                let direction = directions[Math.floor(Math.random() * 2)];

                ship.location = [];

                // Continue if the locations is not valid
                if (x == 0 || y == 0) {
                    continue;
                }

                if (direction == 'horizontal') {
                    if (x + ship.size > state.board.size) {
                        continue;
                    }

                    let used = false;

                    for (let j = 0; j < ship.size; j++) {
                        if (spaces[x + j][y].ship) {
                            used = true;
                            continue;
                        }
                    }

                    if (used) {
                        continue;
                    }

                    for (let j = 0; j < ship.size; j++) {
                        spaces[x + j][y].ship = ship;
                        ship.location.push({
                            x: x + j,
                            y: y
                        });
                    }
                    
                    placed = true;
                } else {
                    if (y + ship.size > state.board.size) {
                        continue;
                    }

                    let used = false;

                    for (let j = 0; j < ship.size; j++) {
                        if (spaces[x][y + j].ship) {
                            used = true;
                            continue;
                        }
                    }

                    if (used) {
                        continue;
                    }

                    for (let j = 0; j < ship.size; j++) {
                        spaces[x][y + j].ship = ship;
                        ship.location.push({
                            x: x,
                            y: y + j
                        });
                    }

                    placed = true;
                }
            }
        }

        commit('SET_SPACES', spaces)
    },
    end({commit}, won) {
        const log = new Log(`Game ended`, 'info');
        commit('ADD_LOG', log);
        commit('SET_STATUS', "over")
        commit('SET_WON', won)
    },
    addShip({commit}, ship) {
        commit('ADD_SHIP', ship)
    },
    clear({commit}) {
        commit('RESET_BOARD')
        commit('RESET_LOG')
        commit('RESET_STATUS')
        commit('RESET_WON')
    }
}

export default actions
