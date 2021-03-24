<template>
  <div>
    <el-menu :default-active="activeRouterPath" router mode="horizontal"
      :style="{ 'background-color': dppPrimaryColor }" text-color="#fff" class="dpp-menu" active-text-color="#FADB14">
      <div class="left-more-menu">
        <el-popover placement="right" width="200" trigger="click" ref="nav-more-menu">
          <div class="app-menu-platforms-item">
            <a :href="constantConfig.CATALOG" target="_blank">
              <i class="iconfont iconyuanshujupeizhi"></i>
              {{$t('menu.catalog')}}
            </a>
            <a :href="constantConfig.RULE_ENGINE" target="_blank">
              <i class="iconfont iconguizeyinqing"></i>
              {{$t('menu.rule_engine')}}
            </a>
          </div>
          <i class="iconfont iconego-menu" slot="reference" style="color:#fff;font-size:20px;"></i>
        </el-popover>
      </div>

      <menu-bar-item v-for="menu in menuList" :key="menu.path" :item="menu" :base-path="''" />

      <el-input :placeholder="$t('menu.search_job')" v-model="searchJobName" @keyup.enter.native="searchJob"
        class="dpp-search-task-input"></el-input>

      <div class="right-menus">
        <custom-menu-item></custom-menu-item>
      </div>
    </el-menu>

    <div class="app-content">
      <router-view></router-view>
    </div>

    <el-dialog :title="$t('common.notify')" :visible.sync="versionUpdateVisible" width="50%">

      <h3 style="margin-top:0">{{versionUpdate.summary}}</h3>
      <p>版本号：{{versionUpdate.version}}</p>

      <p>更新时间：{{ common.formatExactTs(versionUpdate.create_ts)}}</p>

      <div class="update-content" v-if="common.ifDomHtml(versionUpdate.update_content)"
        v-html="versionUpdate.update_content"></div>
      <div class="update-content" v-else>{{versionUpdate.update_content}}</div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="haveReadVersionUpdate()">{{$t('btn.read_already')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUsername } from "@/utils/auth";
import { mapState } from "vuex";
import constantAPP from "@/shared/config/app";
import MenuBarItem from "./components/MenuBarItem";
import CustomMenuItem from "./components/CustomMenuItem";

import configAPI from "@/api/config";

export default {
  computed: {
    ...mapState({
      menuList: (state) => state.menu.menuList,
      dppPrimaryColor: (state) => state.app.dppPrimaryColor,
      versionNotify: (state) => state.app.versionNotify,
    }),
    firstNameChar() {
      return getUsername().substr(0, 1).toUpperCase();
    },
    activeRouterPath() {
      return this.$route.path;
    },
  },
  components: {
    MenuBarItem,
    CustomMenuItem,
  },
  data() {
    return {
      searchJobName: "",
      constantConfig: constantAPP,
      versionUpdate: {},
      versionUpdateVisible: false,
    };
  },
  mounted() {
    // 刷新任意页面
    this.getVersionUpdate();
  },

  methods: {
    searchJob() {
      this.$router.push(`/job`);
      this.$store.dispatch("app/setTaskSearchName", this.searchJobName);
    },
    getVersionUpdate() {
      if (!this.versionNotify) {
        configAPI.getLastVersionControl().then((response) => {
          if (response.notify_open) {
            this.versionUpdateVisible = true;
            this.versionUpdate = response;
          }
        });
      }
    },
    haveReadVersionUpdate() {
      this.versionUpdateVisible = false;
      this.$store.dispatch("app/setVersionNotify", true);
      location.reload();
    },
  },
};
</script>
<style lang="scss">
.dpp-search-task-input {
  margin-right: 15px;
  margin-left: auto;
  height: 53px;
  line-height: 53px;
  flex: 0.4;
  .el-input__inner {
    height: 34px !important;
    margin: 10px 0;
    border: none;
    background-color: rgba(255, 255, 255, 0.2);
    &::-webkit-input-placeholder {
      color: #ffffff;
    }
    &:focus-within {
      background-color: #ffffff;
      &::-webkit-input-placeholder {
        color: #595959;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.app-content {
  min-height: calc(100vh - 55px);
  overflow-y: auto;
}
.dpp-menu {
  padding: 0 10px;
  height: 53px;
  line-height: 53px;
}
.left-more-menu {
  float: left;
  padding: 0 12px;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
  }
}
.right-menus {
  height: 53px;
  line-height: 53px;
}
.update-content {
  margin-bottom: 30px;
}
</style>