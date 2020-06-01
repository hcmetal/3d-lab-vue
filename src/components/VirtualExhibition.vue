<template>
  <div class="fullScreen">
    <Canvas3D v-if="webGLSupport" />
    <h1 v-else>WebGL is not supported</h1>
  </div>
</template>

<script>
import Canvas3D from "../3d/Canvas3D";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "VirtualExhibition",
  methods: {
    ...mapActions(["checkWebGLSupport"]),
  },
  computed: mapGetters(["webGLSupport"]),
  created() {
    this.checkWebGLSupport();
  },
  components: {
    Canvas3D,
  },
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
