<template>
  <div class="app-list-page">
    <versionForm :versionControlForm='versionControlForm' @close="getVersionList"></versionForm>
    <div class="app-title-desc">
      <div class="left">
        <h4 class="title">{{$t('version.title')}}</h4>
        <p class="description">{{$t('version.sub_title')}}</p>
        <el-button type="text" @click="showRegisterForm()">
          <i class="icon el-icon-circle-plus-outline"></i>
          {{$t('btn.new')}}</el-button>
      </div>

      <div class="right">
        <i class="iconfont iconapp_icons-- "></i>
      </div>

    </div>

    <div class="filter-list-content">
      <el-table :data='tableData' border v-loading="loading">
        <el-table-column prop="version" :label="$t('version.version')"></el-table-column>
        <el-table-column prop="summary" :label="$t('version.summary')"></el-table-column>
        <el-table-column prop="update_content" :label="$t('version.content')" width="500">
          <template slot-scope="scope">
            <div v-if="common.ifDomHtml(scope.row.update_content)"
            v-html="scope.row.update_content"
            >
            </div>
            <div
            v-else
             style="white-space: pre-wrap;word-break: break-all;">{{scope.row.update_content}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="notify_open" :label="$t('version.notify')" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.notify_open">
              <i class="iconfont icontianjiachenggong success-icon"></i>
            </div>
            <div v-else>
              <i class="iconfont iconshibai failure-icon"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop='create_ts' :label="$t('version.time')">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <span>{{ common.formatExactTs(scope.row.create_ts) }}</span>
              <div slot="reference">
                <span>{{common.getDateDiff(scope.row.create_ts)}}</span>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column :label='$t("common.operate")' width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="updateVersionControl(scope.row)" v-show="permission">
              {{$t('btn.edit')}}</el-button>
            <el-button type="text" @click="deleteVersionControl(scope.row)" v-show="permission">
              {{$t('btn.delete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-area">
        <el-pagination @current-change="handleVersionCurrentChange" @size-change="handleVersionSizeChange"
          :current-page.sync='query.current' :page-sizes='[10, 20, 50, 100]' layout='prev, pager, next, sizes'
          :total='total'>
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import versionForm from "./versionForm.vue";
import configAPI from "@/api/config";

export default {
  name: "version",
  components: {
    versionForm
  },
  data() {
    return {
      tableData: [],
      query: {
        size: 20,
        current: 1,
        name: ""
      },
      total: 0,
      visible: false,
      versionControlForm: undefined,
      loading: true,
      authority: undefined,
      permission: false
    };
  },
  methods: {
    showRegisterForm(form) {
      if (!form) {
        this.versionControlForm = {};
      } else {
        this.versionControlForm = form;
      }
    },
    handleVersionCurrentChange(val) {
      this.query.current = val;
      this.getVersionList();
    },
    handleVersionSizeChange(size) {
      this.query.current = 1;
      this.query.size = size;
      this.getVersionList();
    },
    getVersionList() {
      this.loading = true;
      configAPI
        .searchVersionControl(this.query)
        .then(response => {
          this.loading = false;
            this.authority = response.auth[0].authority;
            this.hasPermission();
            this.tableData = response.page.records;
            this.total = response.page.total;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    hasPermission() {
      if (this.authority && this.authority.indexOf("ROLE_ADMIN") > -1) {
        this.permission = true;
      } else {
        this.permission = false;
      }
    },
    updateVersionControl(row) {
      let cloneForm = JSON.parse(JSON.stringify(row));
      this.showRegisterForm(cloneForm);
    },
    deleteVersionControl(row) {
      this.$confirm(
        this.$t("common.confirm_delete", { name: row.version }),
        this.$t("common.tips"),
        {
          confirmButtonText: this.$t("btn.confirm"),
          cancelButtonText: this.$t("btn.cancel"),
          type: "warning"
        }
      )
        .then(() => {
          configAPI
            .deleteVersionControl({ id: row.id })
            .then(response => {
              if (response.success) {
                this.getVersionList();
              } 
            })
        })
    }
  },
  mounted() {
    this.getVersionList();
  }
};
</script>
