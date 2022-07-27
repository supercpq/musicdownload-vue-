<template>
  <div class="search">
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
    },
    getRemote: _.debounce(function () {
      console.log("此处向后台发起请求:", this.yourInput);
    }, 500),
    SearchName() {
      alert(this.yourInput);
    },
  },
  mounted() {
    //console.log(this.$store.state);
  },
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