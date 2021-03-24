<template>
  <div>
    <el-table :data='tableData' border stripe size="small">
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
      <!-- <el-table-column prop='records' :label="$t('common.operate')" width='180'>
        <template slot-scope="scope">
          <el-popconfirm v-if="scope.row.stepInfo.queue_size > 0" @onConfirm="deleteQueue(scope.row.id)"
            :confirmButtonText="$t('btn.confirm')" :cancelButtonText="$t('btn.cancel')"
            :title="$t('job.task_steps.delete_queue')">
            <el-button slot="reference" size="mini" type="text">{{$t('btn.delete')}}</el-button>
          </el-popconfirm>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>
<script>
import taskAPI from "@/api/task";

export default {
  props: {
    taskId: {
      type: Number
    },
    tableData: {
      type: Array,
      default: []
    }
  },

  methods: {
    async deleteQueue(id) {
      const response = await taskAPI.deleteMessages({
        id: id,
        taskId: this.taskId
      });
      if (response.success) {
        this.$emit("cleanQueueDone");
      }
    }
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
