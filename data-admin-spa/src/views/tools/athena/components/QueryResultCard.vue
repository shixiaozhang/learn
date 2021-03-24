<template>
  <div>
    <el-card v-loading="queryLoading" :element-loading-text="$t('athena.quering')"
      element-loading-spinner="el-icon-loading" id="resultCard" class="result-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>
          {{ $t("athena.results") }}
          <el-tooltip effect="dark" :content="$t('athena.result_tip')" placement="top">
            <i class="iconfont iconinfo" style="color:#303133"></i>
          </el-tooltip>
        </span>

        <el-dropdown style="float: right;">
          <el-button type="text" style="padding:3px 0">
            <i class="iconfont iconmore"></i>
          </el-button>
          <el-dropdown-menu style="width:200px" slot="dropdown" class="app-dropdown-menu">
            <el-dropdown-item @click.native="copyTableSQL(queryResult.s3)" :disabled="!queryResult.s3">
              <i class="iconfont iconfuzhi"></i>
              {{ $t("athena.copy") }}
            </el-dropdown-item>
            <el-dropdown-item @click.native="resultDialog = true" :disabled="!queryResult.rows">
              <i class="iconfont iconquanping"></i>
              {{ $t("athena.fullscreen") }}
            </el-dropdown-item>
            <!-- <el-dropdown-item @click.native="toWidgetChartsPage()" :disabled="!queryResult.rows">
              <i class="iconfont iconshuju"></i>
              数据分析
            </el-dropdown-item> -->
            <el-dropdown-item @click.native="saveAsExcel()" :disabled="!queryResult.rows || !queryResult.rows.length">
              <i class="iconfont iconExcel" style="font-size:18px"></i>
              {{ $t("athena.export_excel") }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <div v-if="queryResult.rows && queryResult.rows.length" style="float: right;">
          <a :href="queryResult.url" target="_blank" class="downloads-link">
            <span v-if="getUrlIngAfterRunQuery">{{
              $t("athena.get_location")
            }}</span>
            <span v-else>{{
              queryResult.url ? $t("athena.download") : ""
            }}</span>
          </a>
        </div>
      </div>

      <!-- query is success,rows is [] or data-->

      <div v-if="queryResult.rows" style="height:100%">
        <pre v-if="
            queryResult.cols.length === 1 &&
              queryResult.cols[0].name === 'col_name'
          " class="query-cols-list">
              <span v-for="(item, index) in queryResult.rows" :key="index">
                {{item.col_name}}
              </span>
              </pre>

        <pre v-else-if="
            queryResult.cols.length === 1 &&
              queryResult.cols[0].name === 'createtab_stmt'
          " class="query-cols-list">
              <span v-for="(item, index) in queryResult.rows" :key="index">
                {{item.createtab_stmt}}
              </span>
              </pre>

        <!-- 查询已经完成，但是没有查询到结果 -->
        <div class="empty-with-text" v-else-if="!queryResult.rows.length && !queryLoading">
          <i class="iconfont iconresult"></i>
          <p class="tip">{{ $t("athena.query_with_no_result") }}</p>
        </div>

        <el-table :data="queryResult.rows" :max-height="resultTableMaxHeight" border id="result-table" size="mini"
          v-else-if="!queryLoading">
          <af-table-column v-for="col in queryResult.cols" :label="col.name" :prop="col.index" :key="col.index">
          </af-table-column>
        </el-table>

      </div>

      <!-- query is not start or fail -->

      <div v-else-if="!queryLoading" class="empty-with-text" style="height:100%">
        <i class="iconfont iconempty"></i>
        <p class="tip">{{$t('athena.no_query')}}</p>
      </div>

    </el-card>

    <el-dialog fullscreen :visible.sync="resultDialog">
      <div v-if="queryResult.rows">
        <pre v-if="
            queryResult.cols.length === 1 &&
              queryResult.cols[0].name === 'col_name'
          " class="query-cols-list">
              <span v-for="(item, index) in queryResult.rows" :key="index">
                {{item.col_name}}
              </span>
              </pre>

        <pre v-else-if="
            queryResult.cols.length === 1 &&
              queryResult.cols[0].name === 'createtab_stmt'
          " class="query-cols-list">
              <span v-for="(item, index) in queryResult.rows" :key="index">
                {{item.createtab_stmt}}
              </span>
              </pre>

        <el-table v-else :data="queryResult.rows" border size="mini">
          <af-table-column v-for="col in queryResult.cols" :prop="col.index" :label="col.name" :key="col.index">
          </af-table-column>
        </el-table>
      </div>

      <span slot="footer" class="dialog-footer" style="margin-right:10px;">
        <el-button type="primary" size="small" @click="resultDialog = false">{{
          $t("btn.back")
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    queryResult: {
      type: Object,
      default: () => {
        return {
          cols: null,
          rows: null,
          s3: "",
          url: "",
        };
      },
    },
    queryLoading: {
      type: Boolean,
      default: false,
    },
    getUrlIngAfterRunQuery: {
      type: Boolean,
      default: false,
    },
  },

  created() {
    window.addEventListener("resize", this.reCalcResultTableMaxHeight);
  },
  mounted() {
    this.reCalcResultTableMaxHeight();
  },
  data() {
    return {
      resultTableMaxHeight: 0,
      resultDialog: false,
    };
  },
  methods: {
    //屏幕变化时，计算查询结果表格的最大高度
    reCalcResultTableMaxHeight() {
      this.$nextTick(() => {
        const card = document.getElementById("resultCard");
        this.resultTableMaxHeight = card.clientHeight - 55;
      });
    },
    copyTableSQL(content) {
      this.$copyText(content).then((e) => {
        this.$message.success(this.$t("other.copy_done"));
      });
    },
    toWidgetChartsPage() {
      this.$router.push("/tools/athena/widgets");
      this.$store.dispatch("athena/setAthenaMetadata", this.queryResult);
    },
    saveAsExcel() {
      this.downloadLoading = true;
      import("@/utils/ExportToExcel").then((excel) => {
        const tHeader = _.map(this.queryResult.cols, "name");
        const filterVal = _.map(this.queryResult.cols, "name");
        const list = this.queryResult.rows;
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "result",
          autoWidth: true,
          bookType: "xlsx",
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          return v[j];
        })
      );
    },
  },
  destroyed() {
    window.removeEventListener("resize", this.reCalcResultTableMaxHeight);
  },
};
</script>

<style lang="scss">
.result-card {
  height: 100%;
  margin-top: 10px;
  .el-card__header {
    padding: 10px 20px;
  }
  .el-card__body {
    height: calc(100% - 54px);
    padding: 5px;
  }
}
</style>

<style lang="scss" scoped>
.query-cols-list {
  height: 100%;
  overflow: auto;
  margin: 0;
  font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
  overflow: auto;
  font-size: 14px;
  line-height: 1.2;
  background-color: #f6f8fa;
  border-radius: 3px;
  word-break: normal;
}
.downloads-link {
  color: #198fff;
  font-size: 13px;
  margin-right: 20px;
}
</style>