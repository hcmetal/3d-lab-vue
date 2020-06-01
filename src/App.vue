<template>
  <div id="app">
    <VirtualExhibition />
  </div>
</template>

<script>
import VirtualExhibition from "./components/VirtualExhibition";

export default {
  name: "App",
  components: {
    VirtualExhibition,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}

#app {
  overflow: hidden;
}
</style>
