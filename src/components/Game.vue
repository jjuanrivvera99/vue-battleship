<template>
  <div class="row playground">
    <div class="col-md-6">
      <Board />
    </div>
    <div class="col-md-2">
      <button @click="start">
        Start Game
      </button>
      <button> Turns </button>
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
    computed: {
      ...mapGetters({
        mode: "game/mode",
        status: "game/status",
        board: "game/board",
        spaces: "game/spaces",
        ships: "game/ships",
      }),
      shipsLeft: function () {
        return this.ships.filter(ship => !ship.sunk).length;
      }
    },
    watch: {
      shipsLeft: function () {
        if (this.shipsLeft === 0) {
          this.end();
        }
      }
    },
    mounted() {
      this.drawBoard();
      if (!this.ships.length) {
        this.initShips();
      }
      this.placeShips();
    },
    methods: {
      ...mapActions("game", ["drawBoard", "initShips", "start", "end", "hit", "sunk", "placeShips"])
    }
  }
</script>

<style>
  .playground {
    margin-top: 20px;
  }

  ul {
    list-style-type: none;
  }

  .board {
    border: 1px solid black;
    border-radius: 5px;
    padding: 10px;
  }
</style>