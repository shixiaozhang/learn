<template>
  <div class="app-list-page">
    <autoScalingForm :autoScalingForm="autoScalingForm" @done="getAutoScalingList"></autoScalingForm>
    <ConfigServices :configId='configId' @close="configId = undefined"></ConfigServices>

    <div class="filter-list-title">
      {{$t('autoscaling.title')}}
    </div>

    <div class="filter-list-content">
      <el-form label-position="left" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item :label="$t('autoscaling.name')">
              <el-select :placeholder="$t('common.placeholder_select')" clearable v-model="query.serviceName" filterable
                style="width:100%">
                <el-option v-for="item in serviceNames" :key="item.id" :label="item.name" :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-button type="primary" @click="searchAutoScalingList()">
            <i class="iconfont iconsearch"></i>
            {{$t('btn.search')}}</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="showAutoScalingForm()">{{$t('btn.new')}}</el-button>
        </el-row>
      </el-form>

      <list-count-tip i18="common.table_total" :counts="total">
      </list-count-tip>

      <el-table :data='tableData' v-loading="loading">
        <el-table-column prop="max_size" :label="$t('autoscaling.max')"></el-table-column>
        <el-table-column prop="min_size" :label="$t('autoscaling.min')"></el-table-column>
        <el-table-column prop="desire_size" :label="$t('autoscaling.require')"></el-table-column>
        <el-table-column prop="task_queue_num" :label="$t('autoscaling.queue')"></el-table-column>
        <el-table-column :label='$t("common.operate")' width="250">
          <template slot-scope="scope">
            <!-- <el-button type="text" @click="copyAutoScalingConfig(scope.row)">Copy</el-button> -->
            <el-button type="text" @click="updateAutoScalingConfig(scope.row)">{{$t('btn.edit')}}</el-button>
            <el-button type="text" @click="showServiceConfig(scope.row)">{{$t('service_config.title')}}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-area">
        <el-pagination @current-change="handleAutoScalingCurrentChange" @size-change="handleAutoScalingSizeChange"
          :current-page.sync='query.current' :page-sizes='[10, 20, 50, 100]' layout='prev, pager, next, sizes'
          :total='total'>
        </el-pagination>
      </div>

    </div>
  </div>
</template>

<script>
import configAPI from "@/api/config";
import autoScalingForm from "./autoScalingForm";
import ConfigServices from "./ConfigServices";
import ListCountTip from "@/shared/components/ListCountTip";

export default {
  name: "autoScaling",
  data() {
    return {
      max_size: 1,
      min_size: 1,
      desire_size: 1,
      task_queue_num: 1,
      serviceNames: [],
      configId: undefined,
      query: {
        size: 10,
        current: 1,
        serviceName: ""
      },
      tableData: [],
      total: 0,
      autoScalingForm: undefined,
      loading: false
    };
  },
  components: {
    ConfigServices,
    autoScalingForm,
    ListCountTip
  },
  methods: {
    showAutoScalingForm(form) {
      if (!form) {
        this.autoScalingForm = {};
      } else {
        this.autoScalingForm = form;
      }
    },
    resetForm() {
      this.max_size = 1;
      this.min_size = 1;
      this.desire_size = 1;
      this.task_queue_num = 1;
    },

    handleAutoScalingCurrentChange(val) {
      this.query.current = val;
      this.getAutoScalingList();
    },
    handleAutoScalingSizeChange(size) {
      this.query.current = 1;
      this.query.size = size;
      this.getAutoScalingList();
    },
    searchAutoScalingList() {
      this.query.current = 1;
      this.getAutoScalingList();
    },

    getAutoScalingList() {
      this.loading = true;
      configAPI
        .searchAutoScalingConfig(this.query)
        .then(response => {
            this.loading = false;
            this.tableData = response.records;
            this.total = response.total;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    getServiceNames() {
      configAPI
        .getServiceNames()
        .then(response => {
            this.serviceNames = response;
        })
    },
    copyAutoScalingConfig(row) {
      let cloneForm = JSON.parse(JSON.stringify(row));
      delete cloneForm.id;
      this.showAutoScalingForm(cloneForm);
    },
    updateAutoScalingConfig(row) {
      let cloneForm = JSON.parse(JSON.stringify(row));
      this.showAutoScalingForm(cloneForm);
    },
    showServiceConfig(row) {
      this.configId = row.id;
    }
  },
  mounted() {
    this.getAutoScalingList();
    this.getServiceNames();
  }
};
</script>
