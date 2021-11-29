import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"

const inistialState = () => ({
    won: false,
    status: "unstarted",
    mode: "medium",
    board: {
        ships: [],
        spaces: [],
        size: 11
    },
    history: [],
    turns: 0,
    logs: [],
    modes: {
        "easy": {
            turns: 1
        },
        "medium": {
            turns: 100
        },
        "hard": {
            turns: 50
        }
    }
})

const state = inistialState()

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}