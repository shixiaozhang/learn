
<template>
  <div class="app-list-page">

    <div class="custom-tab">
      <span v-for="(item, index) in tabList" :key="index"
        v-bind:style="{'background-color':activeTab===item?dppPrimaryColor:''}"
        v-bind:class="{'active-tab':activeTab===item}" @click="changeTab(item)">{{$t(`athena.${item}_title`)}}</span>
    </div>
    <query v-show="activeTab==='query'"></query>
    <router-view v-if="activeTab!=='query'"></router-view>

  </div>

</template>
<script>
import "codemirror/lib/codemirror.css";
import "codemirror/theme/idea.css";
import "codemirror/theme/panda-syntax.css";
import "codemirror/addon/hint/show-hint.css";

require("codemirror/lib/codemirror");
require("codemirror/mode/sql/sql");
require("codemirror/addon/hint/show-hint");
require("codemirror/addon/hint/sql-hint");

let CodeMirror = require("codemirror/lib/codemirror");
import constant from "@/shared/config/constant";
import { mapState } from "vuex";

import Query from "./Query.vue";

export default {
  data() {
    return {
      tabList: ["query", "saved", "schedule", "history", "analysis"],
    };
  },
  computed: {
    ...mapState({
      dppPrimaryColor: (state) => state.app.dppPrimaryColor,
    }),
    activeTab() {
      let routePathArray = this.$route.path.split("/");
      if (routePathArray.length >= 4) {
        return routePathArray[routePathArray.length - 1];
      } else {
        return "query";
      }
    },
  },
  components: {
    Query,
  },
  mounted() {
    constant.SQL_CUSTOM_KEYWORDS.forEach((words) => {
      CodeMirror.resolveMode("text/x-mariadb").keywords[words] = true;
    });
  },
  methods: {
    changeTab(path) {
      if (this.activeTab === path) {
        return;
      }
      this.activeTab = path;
      if (path === "query") {
        this.$router.push(`/tools/athena`);
      } else {
        this.$router.push(`/tools/athena/${path}`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-tab {
  border-bottom: 1px solid #dcdfe6;
  padding: 5px 0 5px 20px;
  margin-bottom: 0px !important;
}
</style>

