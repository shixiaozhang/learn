<template>
  <el-drawer :before-close="handleClose" class="change-skin-drawer" :visible.sync="changeSkinDrawer">

    <div class="change-theme">
      <div class="change-skin-title">推荐主题</div>

      <el-row :gutter="20">
        <el-col :span="6" v-for="(item, index) in defaultThemes" :key="index">
          <div class="grid-content" @click="theme = item.value">
            <div class="color-panel" :style="{ background: item.value }">
              <i class="el-icon-check icon" v-if="item.value === theme"></i>
            </div>
          </div>
        </el-col>
      </el-row>

      <div class="change-skin-title custom-title">自定义</div>

      <el-color-picker v-model="theme"
        :predefine="['#409EFF', '#1890ff', '#304156','#212121','#11a983', '#13c2c2', '#6959CD', '#f5222d', ]"
        class="theme-picker" popper-class="theme-picker-dropdown" />

      <el-divider></el-divider>
      <div class="color-buttons">
        <el-button type="primary" size="small" @click="changeTheme(theme)">{{
            $t("btn.confirm")
          }}</el-button>
        <el-button size="small" plain @click="resetStyleColor()">{{
            $t("btn.reset")
          }}</el-button>
      </div>

    </div>
  </el-drawer>

</template>

<script>
const ORIGINAL_THEME = "#409EFF"; // default color
import constantConfig from "@/shared/config/constant";

export default {
  data() {
    return {
      chalk: "", // content of theme-chalk css
      theme: "",
      defaultThemes: constantConfig.DPP_THEME_LIST,
    };
  },
  props: {
    changeSkinDrawer: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    defaultTheme() {
      return this.$store.state.app.dppPrimaryColor;
    }
  },
  watch: {
    defaultTheme: {
      handler: function(val, oldVal) {
        this.theme = val;
        this.changeTheme(this.theme);
      },
      immediate: true
    }
  },
  methods: {
    updateStyle(style, oldCluster, newCluster) {
      let newStyle = style;
      oldCluster.forEach((color, index) => {
        newStyle = newStyle.replace(new RegExp(color, "ig"), newCluster[index]);
      });
      return newStyle;
    },
    getCSSString(url, variable) {
      return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, "");
            resolve();
          }
        };
        xhr.open("GET", url);
        xhr.send();
      });
    },
    getThemeCluster(theme) {
      const tintColor = (color, tint) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);
        if (tint === 0) {
          // when primary color is in its rgb space
          return [red, green, blue].join(",");
        } else {
          red += Math.round(tint * (255 - red));
          green += Math.round(tint * (255 - green));
          blue += Math.round(tint * (255 - blue));
          red = red.toString(16);
          green = green.toString(16);
          blue = blue.toString(16);
          return `#${red}${green}${blue}`;
        }
      };
      const shadeColor = (color, shade) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);
        red = Math.round((1 - shade) * red);
        green = Math.round((1 - shade) * green);
        blue = Math.round((1 - shade) * blue);
        red = red.toString(16);
        green = green.toString(16);
        blue = blue.toString(16);
        return `#${red}${green}${blue}`;
      };
      const clusters = [theme];
      for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
      }
      clusters.push(shadeColor(theme, 0.1));
      return clusters;
    },

    async changeTheme(val) {
      const oldVal = this.chalk ? this.theme : ORIGINAL_THEME;
      if (typeof val !== "string") return;
      const themeCluster = this.getThemeCluster(val.replace("#", ""));
      const originalCluster = this.getThemeCluster(oldVal.replace("#", ""));
      const $message = this.$message({
        message: "  Compiling the theme",
        customClass: "theme-message",
        type: "success",
        duration: 0,
        iconClass: "el-icon-loading"
      });
      const getHandler = (variable, id) => {
        return () => {
          const originalCluster = this.getThemeCluster(
            ORIGINAL_THEME.replace("#", "")
          );
          const newStyle = this.updateStyle(
            this[variable],
            originalCluster,
            themeCluster
          );
          let styleTag = document.getElementById(id);
          if (!styleTag) {
            styleTag = document.createElement("style");
            styleTag.setAttribute("id", id);
            document.head.appendChild(styleTag);
          }
          styleTag.innerText = newStyle;
        };
      };
      if (!this.chalk) {
        const url =
          "https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/theme-chalk/index.css";
        await this.getCSSString(url, "chalk");
      }
      const chalkHandler = getHandler("chalk", "chalk-style");
      chalkHandler();
      const styles = [].slice
        .call(document.querySelectorAll("style"))
        .filter(style => {
          const text = style.innerText;
          return (
            new RegExp(oldVal, "i").test(text) && !/Chalk Variables/.test(text)
          );
        });
      styles.forEach(style => {
        const { innerText } = style;
        if (typeof innerText !== "string") return;
        style.innerText = this.updateStyle(
          innerText,
          originalCluster,
          themeCluster
        );
      });
      this.changeNewStyleDone();
      this.$emit("change", val);
      $message.close();
    },

    changeNewStyleDone() {
      this.$store.dispatch("app/setPrimaryColor", this.theme);
      localStorage.setItem("themeColor", this.theme);
    },

    resetStyleColor() {
      this.theme = ORIGINAL_THEME;
      this.$store.dispatch("app/setPrimaryColor", ORIGINAL_THEME);
      localStorage.removeItem("themeColor");
    },

    handleClose() {
      this.$emit("onClose");
    }
  }
};
</script>

<style lang="scss">
.theme-message,
.theme-picker-dropdown {
  z-index: 99999 !important;
}
.theme-picker .el-color-picker__trigger {
  height: 26px !important;
  width: 26px !important;
  padding: 2px;
}
/* .theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
} */

.change-theme {
  padding: 0 20px;
}
.grid-content {
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s;
  &:hover {
    background-color: #ececec;
  }
  .color-panel {
    width: 50px;
    height: 50px;
    margin: auto;
    border-radius: 50%;
    position: relative;
    .icon {
      position: absolute;
      top: 10px;
      left: 10px;
      color: #ffffff;
      font-size: 30px;
    }
  }
}
.change-skin-title {
  font-size: 20px;
}

.custom-title {
  margin-top: 30px;
}
</style>