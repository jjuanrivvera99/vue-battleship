<template>
  <div class="row playground">
    <div class="col-md-6">
      <Board />
    </div>
    <div class="col-md-2">
      <div class="controls row">
        <label
          v-if="status === 'unstarted'"
          class="label"
          for="turns"
        >TURNS:</label>
        <input
          v-if="status === 'unstarted'"
          v-model="currentTurns"
          class="input"
          name="turns"
          :type="typeof currentTurns == 'string' ? 'text' : 'number'"
          :disabled="mode == 'easy'"
          min="1"
        >
        <button
          v-if="status === 'unstarted'"
          class="button"
          @click="start"
        >
          STAR GAME
        </button>
        <button
          v-if="status === 'over'"
          class="button"
          @click="replay"
        >
          PLAY AGAIN
        </button>
        <!-- <button> Turns </button> -->
      </div>
    </div>
    <div class="col-md-4">
      <Console />
    </div>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from "vuex";
  import Board from "@/components/Board";
  import Console from "@/components/Console";

  export default {
    name: 'Game',
    components: {
      Board,
      Console
    },
    data() {
      return {
        currentTurns: 0,
      }
    },
    computed: {
      ...mapGetters({
        mode: "game/mode",
        modes: "game/modes",
        status: "game/status",
        board: "game/board",
        turns: "game/turns",
        spaces: "game/spaces",
        ships: "game/ships",
      }),
      shipsLeft() {
        return this.ships.filter(ship => !ship.sunk).length;
      }
    },
    watch: {
      shipsLeft() {
        if (this.shipsLeft === 0) {
          this.setStatus("over");
        }
      },
      status() {
        if (this.status === "over") {
          this.endGame();
        }
      },
      currentTurns(newValue) {
        this.setTurns(parseInt(this.currentTurns));

        const mode = this.modes.find(m => m.turns === newValue);

        if (!mode) {
          this.currentMode = "custom";
          this.setMode("custom");
        }
      },
    },
    mounted() {
      this.reset();
      this.currentTurns = this.board.turns || this.turns;
    },
    beforeUnmount() {
      this.reset();
    },
    methods: {
      ...mapActions("game", [
        "replay",
        "drawBoard",
        "log",
        "initShips",
        "start",
        "end",
        "hit",
        "sunk",
        "placeShips",
        "clearLogs",
        "setStatus",
        "resetTurns",
        "wipeShips",
        "setTurns",
        "setMode"
      ]),
      reset() {
        this.drawBoard();
        this.clearLogs();
        this.setStatus("unstarted");
        this.resetTurns();
        this.wipeShips();

        if (!this.ships.length) {
          this.initShips();
          this.log({
            message: "Welcome to Battleship!"
          });
        }

        this.placeShips();
      },
      endGame() {
        this.end(this.shipsLeft === 0);
      }
    }
  }
</script>

<style scoped>
  .playground {
    margin-top: 20px;
  }

  ul {
    list-style-type: none;
  }

  .board {
    border: 3px solid #3d008d;
    border-radius: 5px;
    padding: 10px;
  }

  .controls {
    margin: 200px 0;
    margin-left: -50px;
  }

  .label {
    margin: 10px auto;
    text-align: center;
    margin-bottom: 10px;
    font-size: 1.5rem;
  }

  .button {
    border: 3px solid #3d008d;
    border-radius: 10px;
    height: 50px;
    width: 100%;
    background-color: rgb(195, 77, 132);
    font-size: 1.5em;
  }

  .input {
    border: 3px solid #3d008d;
    border-radius: 10px;
    height: 50px;
    width: 100%;
    margin-bottom: 30px;
    text-align: center;
    font-size: 2em;
    background-color: rgb(195, 77, 132);
  } 
</style>