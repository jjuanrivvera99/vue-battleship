<template>
  <table class="board">
    <tr
      v-for="(row, xindex) in spaces"
      :key="xindex"
    >
      <td
        v-for="(cell, yindex) in row"
        :key="yindex"
        class="cell"
        @click="hit(cell)"
      >
        <div
          v-if="cell.y == 0 && cell.x > 0"
          class="rows"
        >
          {{ letters[xindex - 1] }}
        </div>
        <div
          v-if="cell.x == 0 && cell.y > 0"
          class="columns"
        >
          {{ cell.y }}
        </div>
        <div
          v-if="cell.x > 0 && cell.y > 0"
          class="space"
          :class="{ missed: cell.missed, hited: cell.hited, ship: status === 'over' && cell.ship }"
        />
      </td>
    </tr>
  </table>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
    name: 'Board',
    data() {
      return {
        letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
          'U', 'V', 'W', 'X', 'Y', 'Z'
        ]
      }
    },
    computed: {
        ...mapGetters({
            spaces: "game/spaces",
            status: "game/status",
        })
    },
    methods: {
        ...mapActions("game", ["hit"]),
    }
}
</script>

<style>
.board {
    border: 1px solid black;
    border-radius: 5px;
    padding: 10px;
}

.rows
.columns {
    width: 40px;
    height: 40px;
}

.columns {
    text-align: center;
}

.space {
    width: 40px;
    height: 40px;
    border: 1px solid black;
    background-color: aqua;
}

.space:hover {
    opacity: 0.2;
}

.ship {
    background-color: gray;
    width: 40px;
    height: 40px;
    border: 1px solid black;
}

.hited {
    background-color: red;
}

.missed {
    background-color: blue;
}

</style>