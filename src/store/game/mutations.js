// mutations
const mutations = {
    SET_SPACES: (state, spaces) => {
        state.board.spaces = spaces
    },
    SET_LOGS: (state, logs) => {
        state.logs = logs
    },
    SET_MODE: (state, mode) => {
        state.mode = mode
    },
    SET_STATUS: (state, status) => {
        state.status = status
    },
    SET_TURNS: (state, turns) => {
        state.turns = turns
    },
    SET_BOARD_TURNS: (state, turns) => {
        state.board.turns = turns
    },
    ADD_LOG: (state, log) => {
        state.logs.push(log)
    },
    SUSTRACT_TURN: (state) => {
        state.board.turns--
    },
    SET_WON: (state, won) => {
        state.won = won
    },
    ADD_SHIP: (state, ship) => {
        state.board.ships.push(ship)
    },
    RESET_BOARD: (state) => {
        state.board = {
            spaces: [],
            turns: 0,
            ships: []
        }
    },
    SET_HISTORY: (state, history) => {
        state.board.history = history
    },
    SET_MODES: (state, modes) => {
        state.modes = modes
    },
    RESET_LOGS: (state) => {
        state.logs = []
    },
    RESET_TURNS: (state) => {
        state.board.turns = state.modes.find(mode => mode.name === state.mode).turns
    },
    RESET_WON: (state) => {
        state.won = false
    },
    RESET_STATUS: (state) => {
        state.status = 'unstarted'
    },
    RESET_SPACES: (state) => {
        state.board.spaces = []
    },
    ADD_HISTORY: (state, history) => {
        state.history.push(history)
    },
    WIPE_SHIPS: (state) => {
        const spaces = state.board.spaces;
        spaces.forEach(row => {
            row.forEach(space => {
                space.ship = null
            });
        });

        state.board.spaces = spaces
    },
    RESET_SHIPS: (state) => {
        state.board.ships = [];
    },
    ADD_MOVE: (state) => {
        state.moves++
    },
    RESET_MOVES: (state) => {
        state.moves = 0
    }
}

export default mutations
