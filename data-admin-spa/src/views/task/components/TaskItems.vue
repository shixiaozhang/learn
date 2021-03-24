<template>
  <div>
    <el-dialog :fullscreen="true" :title="$t('job.task_records.title')" :visible.sync="visible" @close="hide"
      custom-class="task-items-modal bg-container" :close-on-click-modal="false">

      <div class="pd-20">

        <div class="bg-white px-20 pt-20">
          <el-form :model="query" ref="queryForm">
            <el-row :gutter="20">
              <el-col :span="5">
                <el-form-item>
                  <el-select :placeholder="$t('common.placeholder_select')" v-model="query.field" @change="reset"
                    style="width:100%">
                    <el-option label="[INDEX] task_id,status" value="status"></el-option>
                    <el-option label="[INDEX] task_id,inprogress_step" value="step"></el-option>
                    <el-option label="[INDEX] task_id,item_key" value="item_key"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item>
                  <el-select :placeholder="$t('common.placeholder_select')" v-model="query.expr" style="width:100%">
                    <el-option label="=" value="eq"></el-option>
                    <el-option v-if="query.field === 'step'" label=">" value="gt"></el-option>
                    <el-option v-if="query.field === 'step'" label=">=" value="gte"></el-option>
                    <el-option v-if="query.field === 'step'" label="<" value="lt"></el-option>
                    <el-option v-if="query.field === 'step'" label="<=" value="lte"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item>
                  <el-select :placeholder="$t('common.placeholder_select')" v-if="query.field === 'status'"
                    v-model="query.value" style="width:100%">
                    <el-option label="ALL" value></el-option>
                    <el-option label="SUCCESS" value="SUCCESS"></el-option>
                    <el-option label="FAILED" value="FAILED"></el-option>
                    <el-option label="RETRY" value="RETRY"></el-option>
                    <el-option label="RUNNING" value="RUNNING"></el-option>
                    <el-option label="PREPARED" value="PREPARED"></el-option>
                  </el-select>
                  <el-select :placeholder="$t('common.placeholder_select')" v-if="query.field === 'step'"
                    v-model="query.value" style="width:95%">
                    <el-option v-for="item in totalStep" :key="item.seq_number" :label="item.step_name"
                      :value="item.seq_number"></el-option>
                  </el-select>
                  <el-input v-if="query.field === 'item_key'" placeholder="enter item_key" v-model="query.value"
                    clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4" :push="5" class="align-right">
                <el-button type="primary" @click="searchItems">{{$t("btn.search")}}</el-button>
                <el-button type="plain" @click="reset">{{$t("btn.reset")}}</el-button>
              </el-col>
            </el-row>
          </el-form>

          <el-form :model="update" :rules="rules" ref="translateForm">
            <el-row :gutter="20">
              <el-col :span="5">
                <el-form-item :label="$t('job.task_records.from')" prop="original_step_id">
                  <el-select :placeholder="$t('common.placeholder_select')" v-model="update.original_step_id"
                    style="width:100%">
                    <el-option v-for="item in totalStep" :key="item.id" :label="item.step_name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item :label="$t('job.task_records.from_status')" prop="original_status">
                  <el-select :placeholder="$t('common.placeholder_select')" style="width:100%"
                    v-model="update.original_status">
                    <el-option label="RUNNING" value="-2"></el-option>
                    <el-option label="RETRY" value="0"></el-option>
                    <el-option label="FAILED" value="-1"></el-option>
                    <el-option label="SUCCESS" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item :label="$t('job.task_records.to')" prop="new_step_id">
                  <el-select :placeholder="$t('common.placeholder_select')" v-model="update.new_step_id"
                    style="width:100%">
                    <el-option v-for="item in totalStep" :key="item.id" :label="item.step_name" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item :label="$t('job.task_records.to_status')" prop="new_status">
                  <el-select :placeholder="$t('common.placeholder_select')" style="width:100%"
                    v-model="update.new_status">
                    <el-option label="RETRY" value="0"></el-option>
                    <el-option label="SUCCESS" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="4" class="align-right">
                <el-button type="primary" style="margin-top:40px;width:50%" icon="el-icon-refresh"
                  @click="updateStatus">{{ $t("btn.transfer") }}
                </el-button>
              </el-col>

            </el-row>
          </el-form>

        </div>

        <div v-if="selectedItemIds.length" class="mt-20">
          <el-button plain @click="resendMultiItems()">{{$t("job.multi_send")}}</el-button>
        </div>

        <list-count-tip class="mt-20" i18="common.multi_choosen_table" :counts="selectedItemIds.length"
          v-if="selectedItemIds.length">
          <b slot="action-button" class="mx-20" :style="{ color: dppPrimaryColor }"
            @click="clearAllSectionItems()">{{ $t("btn.clean") }}</b>
        </list-count-tip>

        <el-table ref="itemsTable" :data="tableData" @selection-change="selectChange" v-loading="loading"
          class="popover-over-ellipsis-table pd-20 mt-20">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="inprogress_step_name" :label="$t('job.task_records.inprocess_step')">
            <template slot-scope="scope">{{
                scope.row.inprogress_step_name
              }}</template>
          </el-table-column>

          <el-table-column :label="$t('job.task_records.key')" width="300px">
            <template slot-scope="scope">

              <el-popover placement="top-start" class="sql-popover" trigger="hover">
                <div>{{ scope.row.key }}</div>
                <div slot="reference">{{ scope.row.key }}</div>
              </el-popover>
            </template>

          </el-table-column>
          <el-table-column prop="status" :label="$t('common.status')" align="center">
            <template slot-scope="scope">
              <el-tag effect="plain" size="small" :type="handleTaskStatus(scope.row.status).type">
                {{ handleTaskStatus(scope.row.status).name }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="update_ts" :label="$t('common.update_time')" align="center">
            <template slot-scope="scope">
              <div class="time-item">
                <el-tooltip placement="top" :open-delay="300" :content="common.formatExactTs(scope.row.update_ts)">
                  <div>
                    {{ common.getDateDiff(scope.row.update_ts) }}
                  </div>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('job.task_records.error')">
            <template slot-scope="scope">
              <el-popover placement="top-start" class="sql-popover"  width="300px"
                trigger="hover" :visible-arrow="false">
                <div style="white-space: pre-wrap;word-break: break-all;">
                  {{ scope.row.error_message }}
                </div>
                <div slot="reference">{{ scope.row.error_message }}</div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column :label="$t('common.operate')" width="200">
            <template slot-scope="scope">
              <el-button type="text" @click="getDetail(scope.row)">{{ $t("btn.detail") }}</el-button>

              <el-button type="text" @click="viewItemLifeCycle(scope.row.id)">{{
                  $t("job.task_records.lifecycle")
                }}</el-button>

              <el-button type="text" :disabled="scope.row.status === -2" @click="resendItem(scope.row.id)">
                {{ $t("btn.item_send") }}</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination-area">
          <el-pagination @current-change="handleItemListCurrentChange" @size-change="handleItemListSizeChange"
            :current-page.sync="query.current" :page-sizes="[10, 20, 50, 100]" layout="total,prev, pager, next, sizes"
            :total="total"></el-pagination>
        </div>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="showDetailDialog">

      <div class="table-expand-row">
        <div class="info">
          <span class="label">{{
                      $t("job.task_records.context")
                    }}</span>
          <VueJsonPretty :data="itemDetail.context" :highlightMouseoverNode="true"></VueJsonPretty>
        </div>
        <div class="info">
          <span class="label">{{
                      $t("job.task_records.result")
                    }}</span>
          <VueJsonPretty :data="itemDetail.result" :highlightMouseoverNode="true"></VueJsonPretty>
        </div>
      </div>
      <div class="table-expand-row">
        <div class="info">
          <span class="label">{{
                      $t("job.task_records.statisic")
                    }}</span>
          <VueJsonPretty :data="itemDetail.statistic" :highlightMouseoverNode="true"></VueJsonPretty>
        </div>
        <div class="info">
          <span class="label">{{ $t("common.create_time") }}</span>
          <span class="value">{{
                      common.formatExactTs(itemDetail.create_ts)
                    }}</span>
        </div>
      </div>

      <div slot="footer" style="margin-right:40px;margin-top:-20px">
        <el-button type="primary" v-if="itemDetail.context && itemDetail.context['FIX_SOURCE']"
          @click="showFix(itemDetail.context)">
          {{ $t("btn.fix") }}</el-button>
      </div>

    </el-dialog>
    <ManualFix :context="fixContext" @close="fixContext = undefined"></ManualFix>
    <TaskItemsLifecycle :taskId="taskId" :itemId="itemId" @close="itemId=null" :totalStep="totalStep"></TaskItemsLifecycle>
  </div>
</template>
<style></style>
<script>
import ItemRecords from "./ItemRecords";
import ManualFix from "./ManualFix";
import taskAPI from "@/api/task";
import VueJsonPretty from "vue-json-pretty";
import ListCountTip from "@/shared/components/ListCountTip";
import { mapState } from "vuex";
import constant from "@/shared/config/constant";
import TaskItemsLifecycle from "./TaskItemsLifecycle";
export default {
  name: "TaskItems",
  components: {
    ItemRecords,
    ManualFix,
    VueJsonPretty,
    ListCountTip,
    TaskItemsLifecycle,
  },
  props: {
    command: {
      type: String,
    },
    taskId: {
      type: Number,
    },
  },
  watch: {
    taskId(val) {
      if (!val || val === "") return;
      this.visible = true;
      this.query.taskId = this.taskId;
      this.query.field = "status";
      this.query.expr = "eq";
      this.query.value = this.command.toUpperCase();
      this.getItems();
      this.getStepSize();
    },
  },
  data() {
    return {
      query: {
        field: "status",
        expr: "eq",
        value: "",
        current: 1,
        size: 10,
        taskId: "",
      },
      loading: false,
      ifOperateAll: false,
      total: 0,
      viewStepsListVisible: false,
      viewStepsList: [],
      getStepsListLoading: false,
      update: {
        original_step_id: "",
        new_step_id: "",
        original_status: "",
        new_status: "",
      },
      selectedItemIds: [],
      itemId: undefined,
      tableData: [],
      visible: false,
      totalStep: [],
      fixContext: undefined,
      statusList: constant.JOB_ITEM_STATUS,
      showDetailDialog: false,
      itemDetail: {},
    };
  },
  computed: {
    rules() {
      return {
        original_step_id: [
          {
            required: true,
            message: this.$t("error.required"),
            trigger: "change",
          },
        ],
        original_status: [
          {
            required: true,
            message: this.$t("error.required"),
            trigger: "change",
          },
        ],
        new_step_id: [
          {
            required: true,
            message: this.$t("error.required"),
            trigger: "change",
          },
        ],
        new_status: [
          {
            required: true,
            message: this.$t("error.required"),
            trigger: "change",
          },
        ],
      };
    },

    ...mapState({
      dppPrimaryColor: (state) => state.app.dppPrimaryColor,
    }),
  },
  methods: {
    clearAllSectionItems() {
      this.$refs.itemsTable.clearSelection();
    },

    async getDetail(data) {
      this.showDetailDialog = true;
      this.itemDetail = await taskAPI.getItemsDetail({
        id: data.id,
        taskId: this.taskId,
      });
    },

    resendMultiItems() {
      this.$confirm(
        this.$t("job.confirm_send_items", {
          counts: this.selectedItemIds.length,
        }),
        this.$t("common.tips"),
        {
          confirmButtonText: this.$t("btn.confirm"),
          cancelButtonText: this.$t("btn.cancel"),
          type: "warning",
        }
      ).then(() => {
        let model = [];
        this.selectedItemIds.forEach((item) => {
          model.push({
            taskId: this.taskId,
            itemId: item,
          });
        });
        taskAPI.resendItems(model).then((response) => {
          if (response.success) {
            this.getItems();
          }
        });
      });
    },

    handleTaskStatus(statusId) {
      let jobIndex = this.statusList.findIndex((task) => {
        return task.id === statusId;
      });
      return this.statusList[jobIndex];
    },

    handleItemListSizeChange(size) {
      this.query.current = 1;
      this.query.size = size;
      this.getItems();
    },
    handleItemListCurrentChange(val) {
      this.query.current = val;
      this.getItems();
    },
    searchItems() {
      this.query.current = 1;
      this.getItems();
    },

    getContextKeys(value) {
      return _.keys(value);
    },
    getItems() {
      this.loading = true;
      taskAPI
        .searchItem(this.query)
        .then((response) => {
          this.tableData = response.records;
          this.total = response.total;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    selectChange(selections) {
      this.selectedItemIds = _.map(selections, "id");
    },
    updateStatus() {
      this.$refs.translateForm.validate((valid) => {
        if (valid) {
          if (this.selectedItemIds.length <= 0) {
            this.$confirm(
              this.$t("job.task_records.transfer_all"),
              this.$t("common.tips"),
              {
                confirmButtonText: this.$t("btn.confirm"),
                cancelButtonText: this.$t("btn.cancel"),
                type: "warning",
              }
            )
              .then(() => {
                this.updateStatusApi();
              })
              .catch(() => {
                return;
              });
          } else {
            this.updateStatusApi();
          }
        }
      });
    },
    updateStatusApi() {
      this.loading = true;
      this.update.taskId = this.taskId;
      this.update.itemIds = this.selectedItemIds;
      taskAPI
        .updateItemStatus(this.update)
        .then((response) => {
          this.loading = false;
          if (response.success) {
            this.$emit("updated");
            this.$notify({
              title: this.$t("common.tips"),
              message:
                response.msg ||
                this.$t("btn.transfer") + this.$t("common.done"),
              type: "success",
              position: "bottom-right",
            });
            this.getItems();
          }
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    resendItem(itemId) {
      this.$confirm(
        this.$t("job.confirm_resend", { counts: 1 }),
        this.$t("common.tips"),
        {
          confirmButtonText: this.$t("btn.confirm"),
          cancelButtonText: this.$t("btn.cancel"),
          type: "warning",
        }
      ).then(() => {
        taskAPI
          .resendTask({ taskId: this.taskId, itemId: itemId })
          .then((response) => {
            if (response.success) {
              this.getItems();
            }
          });
      });
    },
    reset() {
      this.query.expr = "eq";
      this.query.value = "";
      this.update.original_step_id = "";
      this.update.new_step_id = "";
      this.update.original_status = "";
      this.update.new_status = "";
    },
    hide() {
      this.$refs.queryForm.resetFields();
      this.$refs.translateForm.resetFields();
      this.reset();
      this.$emit("close");
    },
    showFix(itemContext) {
      if (!itemContext["FIX_SOURCE"]) {
        return;
      }
      this.showDetailDialog = false;
      this.fixContext = JSON.parse(JSON.stringify(itemContext));
    },
    getStepSize() {
      taskAPI.getTotalStep({ taskId: this.taskId }).then((response) => {
        this.totalStep = response;
      });
    },

    viewItemLifeCycle(itemId) {
      this.itemId = itemId;
    },

   
  },
  mounted() {
    this.reset();
  },
};
</script>
