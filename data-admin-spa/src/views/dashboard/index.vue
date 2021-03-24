<template>
  <div>

    <app-loading :loading="loading"></app-loading>

    <el-tabs v-model="activeName" style="padding:10px 30px">

      <el-tab-pane v-for="(item, index) in dashboardUrlList" :key="index" :name="item.key">
        <span slot="label">
          {{$t(`dashboard.${item.key}`)}}
        </span>

        <iframe ref="iframe" v-bind:style="{'height':loading?'0':'950px'}" :src="item.value" class="iframe"
          frameborder="0" allowtransparency></iframe>

      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import configAPI from "@/api/config";
import AppLoading from "@/shared/components/AppLoading.vue";
export default {
  name: "dashboard",
  data() {
    return {
      dashboardUrlList: [],
      loading: "",
      activeName: ""
    };
  },
  components: {
    AppLoading
  },
  methods: {
  
    getIframeList() {
      this.loading = true;
      configAPI.getHomeIframeLinks().then(response => {
        if (response.success) {
          for (let [key, value] of Object.entries(response.result)) {
            this.dashboardUrlList.push({
              key: key,
              value: value
            });
          }
          this.activeName = this.dashboardUrlList[0].key;
          this.$nextTick(()=>{
            this.$refs.iframe[0].onload = () => {
              this.loading = false;
            };
          })
        }
      });
    }
  },

  mounted() {
    this.getIframeList();
  }
};
</script>

<style lang="scss" scoped>
.iframe {
  width: 100%;
}
</style>