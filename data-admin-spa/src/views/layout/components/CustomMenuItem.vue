<template>
  <div style="display: flex;">
    <div class="app-menu-icon-item">
      <div>
        <a :href="constantApp.HELP_CENTER" target="_blank">
            <i class="iconfont iconyiwen"></i>
        </a>
      </div>
    </div>

    <div class="app-menu-icon-item">
        <i class="iconfont icontheme" @click="changeSkinDrawer = true"></i>
    </div>

    <div class="app-menu-icon-item">
      <el-dropdown trigger="click" placement="top-start">
          <i class="iconfont iconlanguage1"></i>
        <el-dropdown-menu slot="dropdown" class="app-dropdown-menu">
          <el-dropdown-item @click.native="switchLanguage('zh')">
            <span v-bind:style="{
                color: currentLanguage === 'zh' ? primaryColor : '#8590a6',
              }">中文</span>
          </el-dropdown-item>
          <el-dropdown-item @click.native="switchLanguage('en')">
            <span v-bind:style="{
                color: currentLanguage === 'en' ? primaryColor : '#8590a6',
              }">English</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <div>
      <el-popover :visible-arrow="true" placement="top-start" trigger="click">
        <div class="app-menu-platforms-item">
          <a href="#/others/release">
            <i class="iconfont iconbanben"></i>
            {{ $t("menu.release") }}
          </a>
          <a href="#/accounts/change-password">
            <i class="iconfont iconxiugaimima"></i>
            {{ $t("menu.change_password") }}
          </a>
          <div class="divider"></div>
          <a @click="logout()">
            <i class="iconfont icontuichu"></i>
            {{ $t("menu.signOut") }}
          </a>
        </div>
        <div class="app-menu-avater-item" slot="reference">
          {{ firstNameChar }}
        </div>
      </el-popover>
    </div>

    <ThemePicker :changeSkinDrawer="changeSkinDrawer" @onClose="changeSkinDrawer = false"></ThemePicker>
  </div>
</template>

<script>
import { getUsername } from "@/utils/auth";
import constantAPP from "@/shared/config/app";
import ThemePicker from '@/shared/components/ThemePicker'

import { mapState } from "vuex";
export default {
  computed: {
    firstNameChar() {
      return getUsername()
        .substr(0, 1)
        .toUpperCase();
    },
    ...mapState({
      primaryColor: state => state.app.dppPrimaryColor
    })
  },
  components: { ThemePicker },
  data() {
    return {
      currentLanguage: localStorage.getItem("language") || "zh",
      constantApp: constantAPP,
      changeSkinDrawer: false
    };
  },

  methods: {
    logout() {
      this.$store.dispatch("FedLogOut").then(() => {
        location.reload();
      });
    },
    switchLanguage(lang) {
      localStorage.setItem("language", lang);
      this.currentLanguage = lang;
      this.$root.$i18n.locale = lang;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-menu-icon-item {
  color: #ffffff;
  cursor: pointer;
  i {
    padding: 8px 15px;
    text-align: center;
    color: #ffffff;
    font-size: 18px;
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 2px;
    }
  }
  .iconyiwen,
  .iconlanguage1 {
    font-weight: 600;
    font-size: 19px;
  }
}

.app-menu-avater-item {
  color: #eb2e95;
  height: 35px;
  line-height: 35px;
  margin: 9px 0 9px 15px;
  padding: 0 15px;
  font-size: 25px;
  cursor: pointer;
  border-radius: 3px;
  background-color: #ffffff;
}
</style>
