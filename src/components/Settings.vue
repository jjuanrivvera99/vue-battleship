<template>
  <div class="row settings">
    <div class="col-md-12">
      <div class="form">
        <label
          for="mode"
        > MODE: </label>
        <select
          id="mode"
          v-model="currentMode"
          @change="changeMode(currentMode)"
        >
          <option
            v-for="(mod, index) in listableModes"
            :key="index"
            :value="mod.name"
          >
            {{ mod.name }}
          </option>
        </select>
      </div>
      <div class="form">
        <label for="turns"> TURNS: </label>
        <input
          id="turns"
          v-model="currentTurns"
          :type="typeof currentTurns == 'string' ? 'text' : 'number'"
        >
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: "Settings",
  data() {
    return {
      currentMode: "",
      currentTurns: 0,
    }
  },
  computed: {
    ...mapGetters({
      mode: "game/mode",
      modes: "game/modes",
      turns: "game/turns",
    }),
    listableModes() {
      return this.modes.filter(function (mode) {
        return mode.listable;
      })
    },
  },
  watch: {
    currentTurns(newValue) {
      if (newValue) {
        this.setTurns(parseInt(newValue));
      }

      const mode = this.modes.find(m => m.turns === newValue);

      if (!mode) {
        this.currentMode = "custom";
        this.setMode("custom");
      }
    },
  },
  mounted() {
    this.currentMode = this.mode;
    this.currentTurns = this.turns || "infinite";
  },
  methods: {
    ...mapActions("game", ["setMode", "setTurns"]),
    changeMode(mode) {
      const turns = this.modes.find(function (m) {
        return m.name === mode;
      }).turns;

      this.currentTurns = turns;
      this.setMode(mode);
    }
  },
}
</script>

<style>
.settings {
  margin-top: 200px;
  text-align: center;
}

.form {
  width: 100%;
  margin-bottom: 100px;
}

label {
  font-size: 2em;
}

select, input {
  background-color: rgb(195, 77, 132);
  border: 3px solid #3d008d;
  font-size: 2em;
  text-align: center;
}

select {
  width: 230px;
  height: 60px;
  border-radius: 5px;
  padding: 10px;
}

input {
  width: 200px;
  height: 30px;
  border-radius: 5px;
  padding: 10px;
}

</style>