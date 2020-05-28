<template>
  <canvas ref="canvas3D" />
</template>

<script>
import DataStore from "../DataStore";
import { Engine } from "@babylonjs/core";
import Director from "./Director";

export default {
  name: "Canvas3D",
  components: {},
  mounted() {
    const dataStore = DataStore.getInstance();

    const canvas = this.$refs.canvas3D;
    dataStore.put("canvas", canvas);

    setTimeout(() => {
      const engine = new Engine(canvas, true);
      engine.setHardwareScalingLevel(1.0);
      dataStore.put("engine", engine);

      const onResizeWindow = () => {
        engine.resize();
      };
      window.addEventListener("resize", onResizeWindow);

      const director = Director.getInstance();

      director.initialize();
      director.createScene("school");
    }, 200);
  }
};
</script>

<style scoped>
canvas {
  position: absolute;
  width: 100%;
  height: 100%;
  touch-action: none;
}
</style>