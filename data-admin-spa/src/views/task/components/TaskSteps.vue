<template>
  <el-dialog :fullscreen="true" :title="$t('job.task_steps.title')" :visible.sync="visible" @close="hide"
    :close-on-click-modal="false">
    <div class="refresh-area">
      <el-button type="success" @click='getStepInfos' plain>
        <i class="el-icon-refresh"></i> {{$t('btn.refresh')}}</el-button>
    </div>

    <list-count-tip style="margin-top:16px" i18="job.task_steps.tip" :counts="tableData.length">
    </list-count-tip>

    <el-table :data='tableData' v-loading="loading">
      <el-table-column prop='seq_number' :label="$t('job.task_steps.index')">
      </el-table-column>
      <el-table-column prop='step_name' :label="$t('job.task_steps.name')">
      </el-table-column>
      <el-table-column prop='stepInfo.success_count' :label="$t('job.task_steps.success')">
      </el-table-column>
      <el-table-column prop='stepInfo.retry_count' :label="$t('job.task_steps.retry')">
      </el-table-column>
      <el-table-column prop='stepInfo.fail_count' :label="$t('job.task_steps.fail')">
      </el-table-column>
      <el-table-column prop='stepInfo.running_count' :label="$t('job.task_steps.pending')">
      </el-table-column>
      <el-table-column prop='stepInfo.queue_size' :label="$t('job.task_steps.queue_size')">
      </el-table-column>
      <el-table-column prop='stepInfo.dequeue_size' :label="$t('job.task_steps.dequeue')">
      </el-table-column>
      <el-table-column prop='stepInfo.enqueue_size' :label="$t('job.task_steps.enqueue')">
      </el-table-column>
      <el-table-column prop='records' :label="$t('common.operate')" width='180'>
        <template slot-scope="scope">
          <el-popconfirm v-if="scope.row.stepInfo.queue_size > 0" @onConfirm="deleteQueue(scope.row.id)"
            :confirmButtonText="$t('btn.confirm')" :cancelButtonText="$t('btn.cancel')"
            :title="$t('job.task_steps.delete_queue')">
            <el-button slot="reference" type="text">{{$t('btn.delete')}}</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>
<style>
</style>
<script>
import taskAPI from "@/api/task";
import ListCountTip from "@/shared/components/ListCountTip";

export default {
  name: "TaskSteps",
  props: {
    command: {
      type: String
    },
    taskId: {
      type: Number
    }
  },
  components: {
    ListCountTip
  },
  watch: {
    taskId(val) {
      if (!val || val === "") return;
      this.visible = true;
      this.query.taskId = this.taskId;
      this.getStepInfos();
    }
  },
  data() {
    return {
      query: {
        taskId: ""
      },
      loading: false,
      total: 0,
      tableData: [],
      visible: false
    };
  },
  methods: {
    getStepInfos() {
      this.loading = true;
      taskAPI
        .getStepInfos(this.query.taskId)
        .then(response => {
            this.tableData = response;
            this.loading = false;
        })
    },
    hide() {
      this.$emit("close");
    },
    async deleteQueue(id) {
      const response = await taskAPI.deleteMessages({
        id: id,
        taskId: this.taskId
      });
      if (response.success) {
        this.getStepInfos();
      } 
    }
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
.refresh-area {
  margin-bottom: 20px;

  .el-button {
    background: #ffffff;
    border: 1px solid #a3aac3;
    color: #576493;
  }
}
</style>
