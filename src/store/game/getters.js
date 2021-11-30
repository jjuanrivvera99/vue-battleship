// getters
const getters = {
    status: state => state.status,
    logs: state => state.logs,
    mode: state => state.mode,
    board: state => state.board,
    spaces: state => state.board.spaces,
    ships: state => state.board.ships,
    turns: state => state.turns,
    history: state => state.history,
    modes: state => state.modes,
    won: state => state.won,
    moves: state => state.moves,
}

export default getters
