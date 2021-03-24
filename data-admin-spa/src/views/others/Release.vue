<template>
  <div class="release-body">

    <i class="iconfont iconback back" @click="back()"></i>
    <div class="right-info" v-loading=loading>
      <h1>{{$t('menu.version_log')}}</h1>
      <el-timeline>
        <el-timeline-item v-for="(item, aindex) in tableData" :key="aindex"
          :timestamp="common.formatExactTs(item.create_ts)" placement="top">

          <div class="time">{{$t('version.version') +' : '+item.version}}</div>

          <div v-if="common.ifDomHtml(item.update_content)" v-html="item.update_content"></div>
          <div v-else class="content" style="white-space:pre-wrap;word-break:break-all">{{item.update_content}}
          </div>
        </el-timeline-item>

      </el-timeline>

    </div>

  </div>
</template>
<script>
import configAPI from "@/api/config";

export default {
  data() {
    return {
      tableData: [],
      loading: false,
      query: {
        size: 20000000,
        current: 1
      }
    };
  },
  mounted() {
    this.listVersion();
  },
  methods: {
    listVersion() {
      this.loading = true;
      configAPI
        .searchVersionControl(this.query)
        .then(response => {
          this.tableData = response.page.records;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.release-body {
  margin: 0 10vw;
  display: flex;
  padding-top: 50px;
  .back {
    font-size: 50px;
    color: #555;
    cursor: pointer;
    margin-right: 20px;
  }
  h1 {
    color: #555;
    font-size: 28px;
    font-weight: 700;
    margin: 0 0 50px 0;
  }
}
.right-info {
  width: 100%;
  padding-bottom: 50px;
}

.time {
  font-weight: bold;
  margin-bottom: 10px;
}
</style>


