<template>
  <div class="app-list-page">

    <div class="filter-list-title">
      {{$t('emr_service.title')}}
    </div>

    <div class="filter-list-content">
      <el-form label-position="left" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item :label="$t('service_config.name')">
              <el-input v-model="query.name"></el-input>
            </el-form-item>
          </el-col>
          <el-button type="primary" @click="searchEMRList()">
            <i class="iconfont iconsearch"></i>
            {{$t('btn.search')}}
          </el-button>
          <el-button type="primary" icon="el-icon-plus" @click="openEmrFormDialog()">{{$t('btn.new')}}</el-button>
        </el-row>
      </el-form>

      <list-count-tip i18="common.table_total" :counts="total">
      </list-count-tip>

      <el-table :data='emrServiceList' v-loading="getListLoading">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <p>{{$t('emr_service.params')}}</p>
            <VueJsonPretty :data="scope.row.params" :highlightMouseoverNode="true">
            </VueJsonPretty>
          </template>
        </el-table-column>

        <el-table-column prop="name" :label="$t('emr_service.name')" width="400"></el-table-column>
        <el-table-column prop="tag" :label="$t('emr_service.tag')"></el-table-column>
        <el-table-column prop='status' :label='$t("common.status")'>
          <template slot-scope="scope">
            <el-tag effect="plain" size="small">{{taskStatus[scope.row.status]}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop='create_ts' :label="$t('common.create_time')">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top" :open-delay="300">
              {{ common.formatExactTs(scope.row.create_ts) }}
              <div slot="reference">
                {{common.getDateDiff(scope.row.create_ts)}}
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="username" :label="$t('emr_service.user')"></el-table-column>
        <el-table-column :label='$t("common.operate")' width="100">
          <template slot-scope="scope">
            <el-button type="text" v-if="scope.row.status!==3" @click="stopEMR(scope.row)">
              {{$t('btn.stop')}}
            </el-button>

          </template>
        </el-table-column>

      </el-table>

      <div class="pagination-area">
        <el-pagination @current-change="handleEMRCurrentChange" @size-change="handleEMRSizeChange"
          :current-page.sync='query.current' :page-sizes='[10, 20, 50, 100]' layout='prev, pager, next, sizes'
          :total='total'>
        </el-pagination>
      </div>

    </div>

    <div>
      <edit-emr-form :originEmrForm="originEmrForm" @onSuccess="getEmrList">
      </edit-emr-form>
    </div>
  </div>
</template>

<script>
import EmrServiceAPI from "@/api/config";
import EditEmrForm from "./EditEmrForm";
import VueJsonPretty from "vue-json-pretty";
import ListCountTip from "@/shared/components/ListCountTip";
import { mapGetters, mapState } from "vuex";

export default {
  components: {
    EditEmrForm,
    VueJsonPretty,
    ListCountTip,
  },
  data() {
    return {
      query: {
        current: 1,
        size: 10,
      },
      total: 0,
      originEmrForm: {},
      getListLoading: false,
      emrServiceList: [],
    };
  },
  computed: {
    ...mapState({
      taskStatus: (state) => state.app.taskStatus,
    }),
  },
  mounted() {
    this.getEmrList();
  },
  methods: {
    searchEMRList() {
      this.query.current = 1;
      this.getEmrList();
    },
    handleEMRCurrentChange(val) {
      this.query.current = val;
      this.getEmrList();
    },
    handleEMRSizeChange(size) {
      this.query.current = 1;
      this.query.size = size;
      this.getEmrList();
    },
    getEmrList() {
      EmrServiceAPI.getEMRServiceList(this.query).then((result) => {
        this.total = result.total;
        this.emrServiceList = result.records;
        this.emrServiceList.map((item) => {
          item.params = JSON.parse(item.params);
          item.name ? null : (item.name = item.cluster_id);
        });
      });
    },

    stopEMR(row) {
      this.$confirm(
        this.$t("emr_service.stop", { name: row.cluster_id }),
        this.$t("common.tips"),
        {
          confirmButtonText: this.$t("btn.confirm"),
          cancelButtonText: this.$t("btn.cancel"),
          type: "warning",
        }
      ).then(() => {
        EmrServiceAPI.stopEMRService({
          config_id: row.id,
        }).then((result) => {
          if (result.success) {
            this.getEmrList();
          }
        });
      });
    },
    openEmrFormDialog(formModel) {
      if (formModel) {
        this.originEmrForm = formModel;
      } else {
        this.originEmrForm = {};
      }
    },
  },
};
</script>