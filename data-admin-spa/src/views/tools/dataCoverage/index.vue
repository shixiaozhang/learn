<template>
  <div class="app-list-page">
    <coverageForm :coverageForm="coverageForm" @done="getDataCoverageList()"></coverageForm>

    <div class="app-title-desc">
      <div class="left">
        <h4 class="title">{{$t('coverage.title')}}</h4>
        <p class="description">{{$t('coverage.sub_title')}}
        </p>
        <el-row>
          <el-col :span="3">
            <el-button type="text" @click="showCoverageForm()">
              <i class="icon el-icon-circle-plus-outline"></i>
              {{$t('btn.new')}}</el-button>
          </el-col>
        </el-row>
      </div>

      <div class="right">
        <i class="iconfont iconfugai"></i>
      </div>

    </div>

    <div class="filter-list-content">
      <div class="custom-tab">
        <span v-for="(item, index) in tabList" :key="index"
          v-bind:style="{'background-color':activeTab===item?dppPrimaryColor:''}"
          v-bind:class="{'active-tab':activeTab===item}" @click="changeTab(item)">{{$t(`coverage.${item}`)}}</span>
      </div>

      <el-table :data='coverageListData' 
      height="calc(100vh - 120px)"
      v-loading="loading">

        <el-table-column type="expand">
          <template slot-scope="scope">
            <div class="table-expand-row">
              <div class="info">
                <span class="label">{{$t('coverage.start')}}</span>
                <div class="value">
                  <div v-for="item in scope.row.start_remark" :key="item.value">
                    {{`${item.type === 'from' ? '' : item.type} from ${common.formatTs(item.from)}`}}
                  </div>
                </div>
              </div>
              <div class="info">
                <span class="label">{{$t('common.update_time')}}</span>
                <span class="value">
                  {{common.formatTs(scope.row.last_update)}}
                </span>
              </div>
            </div>

          </template>
        </el-table-column>

        <el-table-column prop="country" :label="$t('coverage.country')"></el-table-column>
        <el-table-column prop="patent_type" :label="$t('coverage.patent_type')"></el-table-column>
        <el-table-column prop="field_status" :label="$t('coverage.biblio')">
          <template slot-scope="scope">
            <i v-if="scope.row.field_status&&scope.row.field_status.biblio === true"
              class="iconfont icontianjiachenggong success-icon"></i>
            <i v-else-if="scope.row.field_status&&scope.row.field_status.biblio === false"
              class="iconfont iconshibai failure-icon"></i>
          </template>
        </el-table-column>
        <el-table-column prop="field_status" :label="$t('coverage.fulltext')">
          <template slot-scope="scope">
            <i v-if="scope.row.field_status&&scope.row.field_status.fulltext === true"
              class="iconfont icontianjiachenggong success-icon"></i>
            <i v-else-if="scope.row.field_status&&scope.row.field_status.fulltext === false"
              class="iconfont iconshibai failure-icon"></i>
          </template>
        </el-table-column>
        <el-table-column prop="field_status" :label="$t('coverage.pdf')">
          <template slot-scope="scope">
            <i v-if="scope.row.field_status&&scope.row.field_status.pdf === true"
              class="iconfont icontianjiachenggong success-icon"></i>
            <i v-else-if="scope.row.field_status&&scope.row.field_status.pdf === false"
              class="iconfont iconshibai failure-icon"></i>
          </template>
        </el-table-column>
        <el-table-column prop="field_status" :label="$t('coverage.legal')">
          <template slot-scope="scope">
            <i v-if="scope.row.field_status&&scope.row.field_status.legal === true"
              class="iconfont icontianjiachenggong success-icon"></i>
            <i v-else-if="scope.row.field_status&&scope.row.field_status.legal === false"
              class="iconfont iconshibai failure-icon"></i>
          </template>
        </el-table-column>
        <el-table-column prop="field_status" :label="$t('coverage.family')">
          <template slot-scope="scope">
            <i v-if="scope.row.field_status&&scope.row.field_status.family === true"
              class="iconfont icontianjiachenggong success-icon"></i>
            <i v-else-if="scope.row.field_status&&scope.row.field_status.family === false"
              class="iconfont iconshibai failure-icon"></i>
          </template>
        </el-table-column>
        <el-table-column prop="field_status" :label="$t('coverage.citation')">
          <template slot-scope="scope">
            <i v-if="scope.row.field_status&&scope.row.field_status.citation === true"
              class="iconfont icontianjiachenggong success-icon"></i>
            <i v-else-if="scope.row.field_status&&scope.row.field_status.citation === false"
              class="iconfont iconshibai failure-icon"></i>
          </template>
        </el-table-column>

        <el-table-column :label='$t("common.operate")' width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="updateCoverageForm(scope.row)">{{$t('btn.edit')}}</el-button>
            <el-button type="text" @click="deleteCoverage(scope.row)">{{$t('btn.delete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
  </div>

</template>
<script>
import coverageForm from "./coverageForm";
import toolsAPI from "@/api/tools";
import { mapState } from "vuex";

export default {
  name: "dataCoverage",
  components: {
    coverageForm
  },
  computed: {
    ...mapState({
      dppPrimaryColor: state => state.app.dppPrimaryColor
    }),
    uploadUrl: () => {
      return `${process.env.VUE_APP_BASE_URL}/api/dataCoverage/upload`;
    }
  },
  data() {
    return {
      tabList: ["main", "other", "offline"],
      coverageForm: undefined,
      originListData: [],
      coverageListData: [],
      activeTab: "main",
      loading: false
    };
  },
  mounted() {
    this.getDataCoverageList();
  },

  methods: {
    showCoverageForm(form) {
      if (!form) {
        this.coverageForm = {};
      } else {
        this.coverageForm = form;
      }
    },
    updateCoverageForm(row) {
      let cloneForm = JSON.parse(JSON.stringify(row));
      this.showCoverageForm(cloneForm);
    },
    deleteCoverage(row) {
      this.$confirm(
        this.$t("common.confirm_delete", { name: row.coverage_id }),
        {
          confirmButtonText: this.$t("btn.confirm"),
          cancelButtonText: this.$t("btn.cancel"),
          type: "warning"
        }
      ).then(() => {
        toolsAPI.deleteDataCoverage(row).then(response => {
          if(response.success){
            this.getDataCoverageList();
          }
        });
      });
    },
    getDataCoverageList() {
      this.loading = true;
      toolsAPI
        .pageListDataCoverage()
        .then(response => {
            this.originListData = response.records;
            this.changeTab(this.activeTab);
            this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    changeTab(tabValue) {
      this.activeTab = tabValue;
      switch (tabValue) {
        case "main":
          this.coverageListData = _.filter(this.originListData, list => {
            return list.country_type === 1;
          });
          break;
        case "other":
          this.coverageListData = _.filter(this.originListData, list => {
            return list.country_type === 0;
          });
          break;
        case "offline":
          this.coverageListData = _.filter(this.originListData, list => {
            return list.country_type != 0 && list.country_type != 1;
          });
          break;
        default:
          break;
      }
    },
    beforeUpload(rawFile) {
      let formData = new FormData();
      formData.append("file", rawFile, rawFile.name);
      toolsAPI.uploadCoverageFile(formData).then(response => {
        if (response.success) {
          this.path = response.result;
        } 
      });
    }
  }
};
</script>