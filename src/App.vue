<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <List />
    <!-- <button @click="hello">hello</button> -->
    <br /><br /><br />
    <br /><br /><br />
    <LongList
      v-if="this.$store.state.musicList.isShow"
      :listData="this.$store.state.musicList.AllList"
      :itemSize="100"
      style="width: 70%; margin: auto"
    />
  </div>
</template>

<script>
import List from "./components/List.vue";
import LongList from "./components/musiclists.vue";
import axios from "axios";
export default {
  name: "App",
  components: {
    List,
    LongList,
  },
  data() {
    return {
      datas: this.$store.state.musicList.AllList,
    };
  },
  methods: {
    // hello() {
    //   axios.post("http://127.0.0.1:3007/api/search", "music=4875127").then(
    //     (res) => {
    //       console.log(res.data);
    //     },
    //     (err) => {
    //       console.log(err.message);
    //     }
    //   );
    // },
  },
};
</script>

<style scope >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 100%;
}
html {
  height: 100%;
}
body {
  height: 100%;
  margin: 0;
}
</style>
