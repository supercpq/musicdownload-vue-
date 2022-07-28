<template>
  <div class="search">
    <h1 v-show="this.$store.state.musicList.info.isLoading">Loading</h1>
    <h1 v-show="this.$store.state.musicList.info.isSucc">Congratulation</h1>
    <h1 v-show="this.$store.state.musicList.info.isFatal">Sorry</h1>
    <el-link
      type="success"
      v-if="this.$store.state.musicList.ifDonwload"
      :href="this.$store.state.musicList.DownloadUrl"
      >点我下载</el-link
    >
    <div class="demo-input-suffix">
      <span>
        <el-autocomplete
          class="inline-input"
          v-model="yourInput"
          maxlength:5
          :fetch-suggestions="querySearch"
          placeholder="请输入音乐名称或id"
          :trigger-on-focus="false"
          :clearable="true"
          @keyup.enter.native="SearchName"
          @select="SearchName"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-autocomplete>
      </span>
    </div>
  </div>
</template>

<script>
import _ from "lodash"; //防抖
export default {
  name: "LisT",
  data() {
    return {
      yourInput: "",
      musicList: [],
    };
  },
  methods: {
    querySearch(queryString, cb) {
      //调用 callback 返回建议列表的数据
      this.getRemote();
      cb(this.$store.state.musicList.MList);
      // console.log(this.$store.state.musicList.MList);
      this.callb = cb; //以后调用callback用
    },
    getRemote: _.debounce(function () {
      this.$store.dispatch("searchByName", this.yourInput);
    }, 500),
    getAllResult: _.debounce(function () {
      this.$store.dispatch("searchAll", this.yourInput);
    }, 500),
    SearchName() {
      this.getAllResult();
    },
  },
  mounted() {},
};
</script>

<style>
.search {
  margin: auto;
  width: 60%;
}
.el-autocomplete {
  width: 530px;
}
</style>