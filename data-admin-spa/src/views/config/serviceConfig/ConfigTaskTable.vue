<template>
  <el-table border size="small" v-loading="loading" :data='tableData'>
    <el-table-column prop="config.name" :label="$t('service_config.name')"></el-table-column>
    <el-table-column prop="config.queue_name" :label="$t('service_config.queue_name')"></el-table-column>
    <el-table-column prop="ecs_task_id" :label="$t('job.task_id')"></el-table-column>
    <el-table-column prop="status" :label="$t('common.status')"></el-table-column>
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
    <template v-if="activeTabName==='stopped'">
      <el-table-column prop="exit_code" :label="$t('service_config.exit_code')">
      </el-table-column>
      <el-table-column prop="message" :label="$t('service_config.stop_reason')">
      </el-table-column>
    </template>

    <template v-else>
      <el-table-column :label="$t('common.operate')" width="120">
        <template slot-scope="scope" v-if="activeTabName==='running'">
          <el-popover :ref="scope.row.ecs_task_id" placement="top" width="200" :title="$t('common.tips')">
            <p>{{$t("service_config.stop", { name:scope.row.config.name })}}</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.ecs_task_id].doClose()">
                {{$t('btn.cancel')}}
              </el-button>
              <el-button type="primary" size="mini" @click="stopTask(scope.row)">
                {{$t('btn.confirm')}}</el-button>
            </div>
            <el-button type="text" size="small" slot="reference">
              {{$t('btn.stop')}}
            </el-button>
          </el-popover>
        </template>
      </el-table-column>
    </template>

  </el-table>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean
    },
    tableData: {
      type: Array
    },
    activeTabName: {
      type: String
    }
  },
  methods: {
    stopTask(taskItem) {
      this.$emit("stop-task", taskItem);
    }
  }
};
</script>