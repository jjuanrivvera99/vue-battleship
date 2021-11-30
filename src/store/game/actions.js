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
        }

        if (state.board.turns == 0) {
            commit('SET_STATUS', 'over');
        }

        if (state.board.spaces[x][y].ship) {
            if (state.board.spaces[x][y].hited) return; 
            state.board.spaces[x][y].ship.hits++;
            state.board.spaces[x][y].hited = true;

            const log = new Log(`Ship ${state.board.spaces[x][y].ship.id} hited`, 'hit');
            commit('ADD_LOG', log);
            commit("ADD_MOVE")

            if (state.board.spaces[x][y].ship.hits == state.board.spaces[x][y].ship.size) {
                dispatch('sunk', { x, y});
            }
        } else if (!state.board.spaces[x][y].missed) {
            state.board.spaces[x][y].missed = true;
            const log = new Log(`Shot missed`, 'miss');
            commit('ADD_LOG', log);
            commit("ADD_MOVE")
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
        commit('RESET_MOVES');
        commit('SET_BOARD_TURNS', state.modes.find(mode => mode.name === state.mode).turns || state.turns)
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
    end({commit, state}, won) {
        const log = new Log(`Game ended`, 'info');
        commit('ADD_LOG', log);
        commit('SET_STATUS', "over")
        commit('SET_WON', won)
        commit('ADD_HISTORY', {
            won: Boolean(won),
            moves: state.moves,
            mode: state.mode,
        })
    },
    addShip({commit}, ship) {
        commit('ADD_SHIP', ship)
    },
    replay({commit, dispatch, state}) {
        commit('SET_SPACES', [])
        dispatch('drawBoard')
        dispatch('resetShips')
        dispatch('initShips')
        dispatch('placeShips')
        commit('RESET_LOGS')
        commit('RESET_MOVES');
        commit('SET_STATUS', 'started')
        commit('SET_BOARD_TURNS', state.modes.find(mode => mode.name === state.mode).turns || state.turns)
        commit('RESET_WON')
    },
    log({commit}, {message, type = 'info'}) {
        const log = new Log(message, type);
        commit('ADD_LOG', log)
    },
    clearLogs({commit}) {
        commit("RESET_LOGS")
    },
    setMode({commit}, mode) {
        commit('SET_MODE', mode)
    },
    setTurns({commit}, turns) {
        commit('SET_TURNS', turns)
    },
    setStatus({commit}, status) {
        commit('SET_STATUS', status)
    },
    resetTurns({commit}) {
        commit('RESET_TURNS')
    },
    wipeShips({commit}) {
        commit('WIPE_SHIPS')
    },
    resetShips({commit}) {
        commit('RESET_SHIPS')
    }
}

export default actions
