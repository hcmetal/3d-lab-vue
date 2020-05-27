<template>
  <div class="fullScreen">
    <Canvas3D />
  </div>
</template>

<script>
import Canvas3D from "../3d/Canvas3D";

export default {
  name: "VirtualExibition",
  components: {
    Canvas3D
  }
};
</script>

<style scoped>
.fullScreen {
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>