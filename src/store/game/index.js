import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"

const inistialState = () => ({
    won: false,
    status: "unstarted",
    mode: "hard",
    moves: 0,
    board: {
        ships: [],
        spaces: [],
        turns: 50,
        size: 11
    },
    history: [],
    turns: 50,
    logs: [],
    modes: [
        {
            name: "easy",
            listable: true,
            turns: "infinite"
        },
        {
            name: "medium",
            listable: true,
            turns: 100
        },
        {
            name: "hard",
            listable: true,
            turns: 50
        },
        {
            name: "custom",
            listable: true,
        }
    ]
})

const state = inistialState()

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}