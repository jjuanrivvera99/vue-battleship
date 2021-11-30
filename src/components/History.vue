<template>
  <div class="panel">
    <h1>GAME HISTORY</h1>
    <div class="row history">
      <ul class="ul col-md-12">
        <li
          v-for="(record, index) in history"
          :key="index"
          class="li"
        >
          {{ index + 1 }}. Game {{ record.won ? 'won' : 'lost' }} - Moves: {{ record.moves }} - Mode: {{ record.mode }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "History",
  computed: {
    ...mapGetters({
      history: "game/history",
    })
  },
}
</script>

<style scoped>
.history {
  margin: 0 auto;
  margin-top: 40px;
  height: 550px;
  border: 3px solid #3d008d;
  scroll-behavior: auto;
  overflow-y: scroll;
}

.panel {
  text-align: center;
}

.ul {
  list-style-type: none;
  width: 100%;
}

.li {
  margin: 10px auto;
  text-align: center;
  padding: 10px;
  border: 1px solid #3d008d;
  border-radius: 10px;
}
</style>