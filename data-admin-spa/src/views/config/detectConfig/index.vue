
  <template>
  <div class="app-list-page">

    <detectForm :detectForm="detectForm" :readonly="readonly" @save="getScheduleList"></detectForm>
    <div class="app-title-desc">
      <div class="left">
        <h4 class="title">{{$t('detect.title')}}</h4>
        <p class="description">{{$t('detect.sub_title')}}
        </p>
      </div>
      <div class="right">
        <i class="iconfont iconleidatance"></i>
      </div>
    </div>

    <div class="filter-list-content">

      <el-form label-width="100px" label-position="left">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item :label="$t('detect.name')">
              <el-input v-model="query.name" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('detect.email')">
              <el-input v-model="query.email" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-button type="primary" @click="searchScheduleList">
            <i class="iconfont iconsearch"></i>
            {{$t('btn.search')}}</el-button>
          <el-button type="primary" style="margin-bottom:16px" icon="el-icon-plus" @click="showDetectForm()">
            {{$t('btn.new')}}</el-button>
        </el-row>
      </el-form>

      <list-count-tip i18="common.table_total" :counts="total">
      </list-count-tip>

      <el-table v-loading="loading" :data='tableData'>

        <el-table-column type="expand">
          <template slot-scope="scope">
            <div class="table-expand-row">
              <div class="info">
                <span class="label">{{$t('detect.email')}}</span>
                <span class="value">{{ scope.row.email }}</span>
              </div>
              <div class="info">
                <span class="label">{{$t('detect.template')}}</span>
                <span class="value">
                  {{scope.row.template_name}}
                </span>
              </div>
            </div>
            <div class="table-expand-row">
              <div class="info">
                <span class="label">{{$t('detect.date_value')}}</span>
                <span class="value">{{ scope.row.date_value }}</span>
              </div>
              <div class="info">
                <span class="label">{{$t('detect.time_forward')}}</span>
                <span class="value">
                  {{scope.row.time_forward}}
                </span>
              </div>
            </div>
            <div class="table-expand-row">
              <div class="info">
                <span class="label">{{$t('detect.comment')}}</span>
                <span class="value"
                  style="white-space:pre-wrap;word-break:break-all;">{{ scope.row.comment||'--' }}</span>
              </div>
              <div class="info">
                <span class="label">{{$t('common.update_time')}}</span>
                <span class="value">
                  {{common.formatExactTs( scope.row.update_ts) }}
                </span>
              </div>
            </div>

            <div class="table-expand-row">
              <div class="info">
                <span class="label">{{$t('detect.type')}}</span>
                <span class="value">
                  <span class="tag-github">
                    {{scope.row.config_type}}
                  </span>
                </span>
              </div>

            </div>

          </template>
        </el-table-column>
        <el-table-column prop="name" :label="$t('detect.name')" width="400"></el-table-column>

        <el-table-column :label="$t('detect.next')" width="250" align="center">
          <template slot-scope="scope">
            {{common.formatExactTs(scope.row.next_fire_time) }}
          </template>
        </el-table-column>

        <el-table-column prop="time" :label="$t('detect.cron')" align="center"></el-table-column>
        <el-table-column :label="$t('detect.interval')" align="center">
          <template slot-scope="scope">
            <span class="tag-github">
              {{scope.row.schedule_interval}}
            </span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('common.status')" width="100" align="center">
          <template slot-scope="scope">
            <el-tag effect="plain" size="small" :type="scope.row.state==='NORMAL'?'primary':'danger'">
              {{scope.row.state==='NONE'?'PENDING':scope.row.state}}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column :label='$t("common.operate")' width="200">
          <template slot-scope="scope">

            <el-button style="margin:0 10px" v-if="scope.row.state==='NORMAL'" type="text"
              @click="pauseJob(scope.row.name)">
              {{$t('btn.pause')}}
            </el-button>

            <el-button style="margin:0 10px" v-if="scope.row.state!=='NORMAL'" type="text"
              @click="resumeJob(scope.row.name)"> {{$t('btn.resume')}}
            </el-button>

            <el-dropdown>
              <el-button type="text">
                {{$t('btn.operations')}} <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown" class="app-dropdown-menu">
                <el-dropdown-item @click.native="viewLogList(scope.row.logList)">
                  <i class="iconfont iconshuju"></i>
                  {{$t('btn.logs')}}</el-dropdown-item>
                <el-dropdown-item @click.native="copyDetectConfig(scope.row)">
                  <i class="iconfont iconfuzhi"></i>
                  {{$t("btn.copy")}}</el-dropdown-item>
                <el-dropdown-item @click.native="updateDetectConfig(scope.row)">
                  <i class="iconfont iconbianji"></i>
                  {{$t("btn.edit")}}</el-dropdown-item>
                <el-dropdown-item @click.native="deleteDetectConfig(scope.row)">
                  <i class="iconfont iconshanchu"></i>
                  {{$t("btn.delete")}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :close-on-click-modal="false" :title="$t('detect.logs')" width="30vw"
        :visible.sync="viewLogListVisible">
        <div style="height:60vh;overflow:auto">
          <template v-if="viewLogListData.length>0">
            <div class="comment-item" v-for="(activity, index) in viewLogListData" :key="index">
              <div class="divider" v-if="index!==viewLogListData.length-1"></div>
              <div class="icon-area">
                <i :class="handleTaskStatus(activity.operation).icon"
                  :style="{'color':handleTaskStatus(activity.operation).color}"></i>
              </div>
              <span class="title"> {{activity.operation}}
                <span class="time">{{common.formatExactTs(activity.update_ts)}}</span>
              </span>
            </div>
          </template>

          <template v-else>
            <div class="no-log">
              <i class="iconfont iconwushuju"></i>
            </div>
          </template>

        </div>
      </el-dialog>

      <div class="pagination-area">
        <el-pagination @current-change="handleScheduleCurrentChange" @size-change="handleScheduleSizeChange"
          :current-page.sync='query.current' :page-sizes='[10, 20, 50, 100]' layout='prev, pager, next, sizes'
          :total="total">
        </el-pagination>
      </div>

    </div>

  </div>

</template>
<script>
import detectForm from "./detectForm.vue";
import configAPI from "@/api/config";
import constant from "@/shared/config/constant";
import ListCountTip from "@/shared/components/ListCountTip";
import { mapState, mapGetters } from "vuex";

export default {
  name: "detect",
  components: {
    detectForm,
    ListCountTip
  },
  computed: {
    ...mapState({
      userName: state => state.user.name
    })
  },
  data() {
    return {
      tableData: [],
      query: {
        size: 10,
        current: 1,
        email: "",
        name: ""
      },
      total: 0,
      logStatusList: constant.SCHEDULE_LOG_STATUS,
      detectForm: undefined,
      readonly: false,
      viewLogListVisible: false,
      viewLogListData: [],
      loading: false
    };
  },
  mounted() {
    this.query.email = this.userName;
    this.getScheduleList();
  },
  methods: {
    showDetectForm(form) {
      if (!form) {
        this.readonly = false;
        this.detectForm = {};
      } else {
        this.detectForm = form;
      }
    },
    handleTaskStatus(operation) {
      let logStatusIndex = this.logStatusList.findIndex(log => {
        return log.operation === operation;
      });
      return this.logStatusList[logStatusIndex];
    },
    pauseJob(name) {
      configAPI
        .pauseJob({
          name: name
        })
        .then(response => {
          if (response.success) {
            this.getScheduleList();
          }
        });
    },
    resumeJob(name) {
      configAPI
        .resumeJob({
          name: name
        })
        .then(response => {
          if (response.success) {
            this.getScheduleList();
          }
        });
    },
    copyDetectConfig(row) {
      let cloneForm = JSON.parse(JSON.stringify(row));
      delete cloneForm.name;
      delete cloneForm.category_id;
      this.readonly = false;
      this.showDetectForm(cloneForm);
    },
    updateDetectConfig(row) {
      let cloneForm = JSON.parse(JSON.stringify(row));
      this.readonly = true;
      this.showDetectForm(cloneForm);
    },

    handleScheduleCurrentChange(val) {
      this.query.current = val;
      this.getScheduleList();
    },
    handleScheduleSizeChange(size) {
      this.query.current = 1;
      this.query.size = size;
      this.getScheduleList();
    },
    searchScheduleList() {
      this.query.current = 1;
      this.getScheduleList();
    },

    getScheduleList() {
      this.loading = true;
      configAPI
        .searchDetectConfig(this.query)
        .then(response => {
          this.loading = false;
          this.tableData = response.records;
          this.total = response.total;
        })
        .catch(err => {
          this.loading = false;
        });
    },

    deleteDetectConfig(row) {
      this.$confirm(
        this.$t("common.confirm_delete", { name: row.name }),
        this.$t("common.tips"),
        {
          confirmButtonText: this.$t("btn.confirm"),
          cancelButtonText: this.$t("btn.cancel"),
          type: "warning"
        }
      ).then(() => {
        configAPI.deleteDetectConfig({ name: row.name }).then(response => {
          if (response.success) {
            this.getScheduleList();
          }
        });
      });
    },
    viewLogList(value) {
      this.viewLogListVisible = true;
      this.viewLogListData = value;
    }
  }
};
</script>

<style lang="scss" scoped>
.comment-item {
  padding: 13px 29px 9px 29px;
  display: inline-flex;
  width: 80%;
  cursor: pointer;
  position: relative;
  .divider {
    position: absolute;
    width: 3px;
    height: 30px;
    top: 40px;
    left: 50px;
    background: #a3aac3;
  }
  .icon-area {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px dotted #576493;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
  }
  i {
    font-weight: 400;
    font-size: 12px;
  }
  .title {
    color: #2a396d;
    font-size: 14px;
    font-weight: 600;
    word-wrap: break-word;
    word-break: normal;
  }
  .time {
    display: block;
    font-size: 12px;
    color: #a3aac3;
    margin-top: 5px;
  }
  &:hover {
    background: #f9fbfd;
  }
}
</style>
