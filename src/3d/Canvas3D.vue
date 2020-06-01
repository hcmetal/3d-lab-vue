<template>
  <canvas ref="canvas3D" />
</template>

<script>
import Director from "./Director";

export default {
  name: "Canvas3D",
  components: {},
  mounted() {
    const canvas = this.$refs.canvas3D;

    setTimeout(() => {
      const director = Director.getInstance();
      director.initialize(canvas);
      director.createScene("school");
    }, 200);
  },
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
