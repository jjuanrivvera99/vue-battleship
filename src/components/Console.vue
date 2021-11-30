<template>
  <div
    ref="logs"
    class="console"
  >
    <ul>
      <li
        v-for="log in logs"
        :key="log.id"
        class="log"
        :class="{ 'log-miss': log.type === 'miss', 'log-hit': log.type === 'hit', 'log-info': log.type === 'info'}"
      >
        {{ log.message }}
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: 'Console',
    ...mapGetters({
        logs: "game/logs",
    }),
    computed: {
        ...mapGetters({
            logs: "game/logs",
        }),
    },
    watch: {
        logs: function () {
            this.scrollToBottom();
        }
    },
    methods: {
        scrollToBottom() {
            this.$refs.logs.scrollTop = this.$refs.logs.scrollHeight + 200;
        }
    }
}
</script>

<style>
.console {
    border: 3px solid #3d008d;
    border-radius: 5px;
    height: 500px;
    scroll-behavior: auto;
    overflow-y: scroll;
    text-align: center;
    /* background-color: white; */
}

.log {
    padding: 10px;
    border: 1px solid black;
    border-radius: 5px;
    margin-bottom: 10px;
    margin-left: -30px;
    border: 1.5px solid #3d008d;
}

/* .log-miss {
    border: 1px solid rgb(19, 1, 29);
} */

/* .log-hit {
    border: 1px solid #8d006e;
} */

/* .log-info {
    border: 1px solid greenyellow;
} */
</style>