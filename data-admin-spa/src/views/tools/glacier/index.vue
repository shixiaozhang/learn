<template>
  <div class="app-list-page">
    <glacierRestoreForm :visible="visible" @close="visible = false;searchGlacierList()"></glacierRestoreForm>

    <div class="filter-list-title">
      {{$t('glacier.title')}}
    </div>

    <div class="filter-list-content">
      <el-form label-position="left" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item :label="$t('user.name')">
              <el-input v-model="query.user_name" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-button type="primary" @click="searchGlacierList()">
            <i class="iconfont iconsearch"></i>
            {{$t('btn.search')}}</el-button>
          <el-button type="primary" style="margin-left:20px" @click="showRestoreForm()">
            {{$t('glacier.restore')}}</el-button>
        </el-row>
      </el-form>

      <list-count-tip i18="common.table_total" :counts="total">
      </list-count-tip>

      <el-table :data='tableData' v-loading="queryLoading">

        <el-table-column type="expand">
          <template slot-scope="scope">
            <div class="table-expand-row">
              <div class="info">
                <span class="label">{{$t('common.create_time')}}</span>
                <span class="value">
                  <el-popover trigger="hover" placement="top">
                    <div>{{ common.formatExactTs(scope.row.create_ts) }}</div>
                    <div slot="reference">
                      <div>{{common.getDateDiff(scope.row.create_ts)}}</div>
                    </div>
                  </el-popover>
                </span>
              </div>
              <div class="info">
                <span class="label">{{$t('glacier.error_message')}}</span>
                <span class="value">
                  {{scope.row.error_message}}
                </span>
              </div>
            </div>

            <div class="table-expand-row">
              <div class="info">
                <span class="label">{{$t('glacier.options')}}</span>
                <span class="value">
                  <el-link>{{scope.row.options}}</el-link>
                </span>
              </div>

              <div class="info">
                <span class="label">{{$t('glacier.duration')}}</span>
                <span class="value">
                  <el-link>{{scope.row.duration}}</el-link>
                </span>
              </div>
            </div>

            <div class="table-expand-row">
              <div class="info">
                <span class="label">{{$t('glacier.fail_file')}}
                </span>
                <span class="value">
                  <p v-for="(item, index) in handleFailFile(scope.row.fail_file)" :key="index">
                    <i class="iconfont iconshibai failure-icon"></i>
                    {{item}}</p>
                </span>
              </div>
            </div>

          </template>
        </el-table-column>

        <el-table-column prop="username" :label="$t('user.name')" width="250px">
        </el-table-column>
        <el-table-column :label="$t('glacier.path')">
          <template slot-scope="scope">
            {{scope.row.file_path||'--'}}
          </template>
        </el-table-column>
        <el-table-column :label="$t('glacier.list')">
          <template slot-scope="scope">
            {{scope.row.list_file||'--'}}
          </template>
        </el-table-column>
        <el-table-column :label="$t('common.update_time')" width="150px">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <div>{{ common.formatExactTs(scope.row.update_ts) }}</div>
              <div slot="reference">
                <div>{{common.getDateDiff(scope.row.update_ts)}}</div>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="status" :label="$t('common.status')" width="100px">
          <template slot-scope="scope">
            <el-tag size="small" :type="handleGlacierStatus(scope.row.status).type" effect="plain">
              {{handleGlacierStatus(scope.row.status).text}}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-area">
        <el-pagination @current-change="handleGlacierCurrentChange" @size-change="handleGlacierSizeChange"
          :current-page.sync='query.current' :page-sizes='[10, 20, 50, 100]' layout='prev, pager, next, sizes'
          :total='total'>
        </el-pagination>
      </div>
    </div>
  </div>

</template>

<script>
import toolsAPI from "@/api/tools";
import glacierRestoreForm from "./glacierRestoreForm";
import constant from "@/shared/config/constant";
import { mapState } from "vuex";

import ListCountTip from "@/shared/components/ListCountTip";

export default {
  components: {
    glacierRestoreForm,
    ListCountTip,
  },
  computed: {
    ...mapState({
      userName: (state) => state.user.name,
    }),
  },
  data() {
    return {
      visible: false,
      query: {
        size: 10,
        current: 1,
        user_name: "",
      },
      tableData: [],
      total: 0,
      queryLoading: false,
      glacierStatus: constant.GLACIER_STATUS,
    };
  },
  mounted() {
    this.query.user_name = this.userName;
    this.getGlacierList();
  },
  methods: {
    showRestoreForm() {
      this.visible = true;
    },
    handleGlacierCurrentChange(current) {
      this.query.current = current;
      this.getGlacierList();
    },
    handleGlacierSizeChange(size) {
      this.query.current = 1;
      this.query.size = size;
      this.getGlacierList();
    },
    searchGlacierList() {
      this.query.current = 1;
      this.getGlacierList();
    },
    getGlacierList() {
      this.queryLoading = true;
      toolsAPI
        .listGlacierRecords(this.query)
        .then((response) => {
          this.queryLoading = false;
          this.tableData = response.records;
          this.total = response.total;
        })
        .catch((err) => {
          this.queryLoading = false;
        });
    },
    handleGlacierStatus(status) {
      if (!status) {
        return;
      }
      const statusInfo = _.find(this.glacierStatus, (item) => {
        return item.value === status;
      });
      return statusInfo;
    },
    handleFailFile(fileString) {
      if (!fileString) {
        return;
      }
      return fileString.split(";");
    },
  },
};
</script>
