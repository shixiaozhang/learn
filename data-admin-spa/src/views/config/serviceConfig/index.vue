<template>
  <div class="app-list-page">
    <EditServiceForm :serviceForm="serviceForm" @done="getServiceConfigList"></EditServiceForm>
    <ConfigTasks :configId="configId" @close="configId = undefined"></ConfigTasks>

    <div class="filter-list-title">{{$t('service_config.title')}}</div>

    <div class="filter-list-content">
      <el-form label-position="left" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item :label="$t('service_config.name')">
              <el-input v-model="query.name"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item :label="$t('common.tag')" prop="tags">
              <el-select :placeholder="$t('common.placeholder_select')" v-model="query.tags" style="width:100%;"
                multiple clearable filterable allow-create></el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item :label="$t('service_config.launch_type')" prop="tags">
              <el-select clean @change="changeTypeOptions()" :placeholder="$t('common.placeholder_select')" clearable
                v-model="query.lanchType" style="width:100%;">
                <el-option v-for="(item,index) in launchTypeList" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6" v-if="query.lanchType!=='K8S'">
            <el-form-item :label="$t('service_config.create_form.cluster')" prop="tags">
              <el-select :placeholder="$t('common.placeholder_select')" v-model="query.serviceCluster" clearable
                style="width:100%;">

                <el-option v-for="item in serviceClusterList" :key="item" :label="item" :value="item"></el-option>

              </el-select>
            </el-form-item>
          </el-col>

        </el-row>
      </el-form>

      <div style="margin-bottom:20px">
        <el-button type="primary" @click="searchServiceConfigList()">
          <i class="iconfont iconsearch"></i>
          {{$t('btn.search')}}
        </el-button>
        <el-button type="primary" icon="el-icon-plus" @click="editServiceConfig()">{{$t('btn.new')}}</el-button>
      </div>

      <list-count-tip i18="common.table_total" :counts="total"></list-count-tip>

      <el-table :data="tableData" v-loading="loading">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div class="table-expand-row">
              <div class="info">
                <span class="label">{{$t('service_config.queue_size')}}</span>
                <span class="value">{{ scope.row.queue_size }}</span>
              </div>
              <div class="info">
                <span class="label">{{$t('service_config.rate')}}</span>
                <span class="value">{{scope.row.rate}}</span>
              </div>
            </div>
            <div class="table-expand-row">
              <div class="info">
                <span class="label">{{$t('service_config.auto_scaling')}}</span>
                <span class="value">{{scope.row.autoscaling_info}}</span>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column :label="$t('service_config.name')" width="350">
          <template slot-scope="scope">
            {{scope.row.name}}
            <el-tooltip v-if="scope.row.lanch_type==='K8S'&&scope.row.processServiceConfigImage" effect="dark"
              :content="$t('service_config.image_is_not_latest_list')" placement="top">
              <i style="margin-left:10px;color:#e6a23c" class="iconfont iconinfo"></i>
            </el-tooltip>
          </template>
        </el-table-column>

        <el-table-column :label="$t('common.tag')">
          <template slot-scope="scope">
            <el-tag size="small" style="margin:0 10px 10px 0" effect="dark" v-for="(item,index) in scope.row.tags"
              :key="index">
              {{item}}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="queue_name" :label="$t('service_config.queue_name')"></el-table-column>
        <el-table-column :label="$t('service_config.create_form.mq_type')">
          <template slot-scope="scope">
            {{getMQName(scope.row.mq_type)}}
          </template>
        </el-table-column>

        <el-table-column prop="enable" :label="$t('service_config.enable')">
          <template slot-scope="scope">
            <div>
              <el-switch v-model="scope.row.enable" @change="toggleEnable(scope.row)"></el-switch>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('service_config.launch_type')">
          <template slot-scope="scope">
            <el-tag effect="plain">
              {{scope.row.lanch_type}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('common.operate')" width="250">
          <template slot-scope="scope">
            <el-button type="text" @click="showConfigDetail(scope.row.id)">{{$t('service_config.running')}}</el-button>

            <el-button type="text" class="table-pop-btn" @click="editServiceConfig(scope.row)">{{$t("btn.edit")}}
            </el-button>

            <el-popconfirm @onConfirm="stopServiceConfig(scope.row.id)" :confirmButtonText="$t('btn.confirm')"
              :cancelButtonText="$t('btn.cancel')" :title="$t('service_config.stop')">
              <el-button slot="reference" class="table-pop-btn" type="text">{{$t('btn.stop')}}</el-button>
            </el-popconfirm>

            <el-popconfirm @onConfirm="deleteServiceConfig(scope.row.id)" :confirmButtonText="$t('btn.confirm')"
              :cancelButtonText="$t('btn.cancel')" :title="$t('common.delete_popconfirm')">
              <el-button slot="reference" class="table-pop-btn" type="text">{{$t('btn.delete')}}</el-button>
            </el-popconfirm>

          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-area">
        <el-pagination @current-change="handleServiceConfigCurrentChange" @size-change="handleServiceConfigSizeChange"
          :current-page.sync="query.current" :page-sizes="[10, 20, 50, 100]" layout="prev, pager, next, sizes"
          :total="total"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import configAPI from "@/api/config";
import EditServiceForm from "./EditServiceForm";
import ConfigTasks from "./ConfigTasks";
import ListCountTip from "@/shared/components/ListCountTip";
import constant from "@/shared/config/constant";
export default {
  name: "service",
  components: {
    EditServiceForm,
    ConfigTasks,
    ListCountTip,
  },
  data() {
    return {
      tableData: [],
      configId: undefined,
      query: {
        size: 10,
        current: 1,
        serviceCluster:undefined
      },
      total: 0,
      serviceForm: {},
      loading: false,
      mqTypeList: constant.SERVICE_MQ_TYPE,
      launchTypeList: [],
      serviceClusterList: [],
    };
  },
  mounted() {
    this.getServiceConfigList();
    this.getLaunchTypeList();
  },
  methods: {
    handleServiceConfigCurrentChange(val) {
      this.query.current = val;
      this.getServiceConfigList();
    },
    handleServiceConfigSizeChange(size) {
      this.query.current = 1;
      this.query.size = size;
      this.getServiceConfigList();
    },
    searchServiceConfigList() {
      this.query.current = 1;
      this.getServiceConfigList();
    },

    getServiceConfigList() {
      this.loading = true;
      configAPI
        .searchServiceConfig(this.query)
        .then((response) => {
          this.loading = false;
          this.tableData = response.records;
          this.total = response.total;
        })
        .catch((err) => {
          this.loading = false;
        });
    },

    getMQName(typeId) {
      return _.get(
        _.find(this.mqTypeList, (data) => {
          return data.id === typeId;
        }),
        "name"
      );
    },

    toggleEnable(item) {
      configAPI.saveServiceConfig(item).then((response) => {
        if (!response.success) {
          item.enable = !item.enable;
        } else {
          if (!item.enable) {
            this.stopServiceConfig(item.id);
          }
        }
      });
    },

    showConfigDetail(selectConfigId) {
      this.configId = selectConfigId;
    },
    editServiceConfig(row) {
      this.serviceForm = row ? _.cloneDeep(row) : {};
    },
    async stopServiceConfig(serviceId) {
      const response = await configAPI.stopServiceConfig(serviceId);
      if (response.success) {
        this.getServiceConfigList();
      }
    },
    async deleteServiceConfig(serviceId) {
      const response = await configAPI.deleteServiceConfig({ id: serviceId });
      if (response.success) {
        this.getServiceConfigList();
      }
    },

    // get EcsType/Launch Type list
    async getLaunchTypeList() {
      this.launchTypeList = await configAPI.getECSTypeList();
    },

    changeTypeOptions() {
      if (["EC2", "FARGATE"].includes(this.query.lanchType)) {
        this.getServiceClusters(this.query.lanchType);
      } else {
        this.query.serviceCluster = undefined;
      }
    },

    //get cluster/namesapce list
    async getServiceClusters() {
      this.serviceClusterList = await configAPI.searchServiceCluster(
        this.query.lanchType
      );
    },
  },
};
</script>