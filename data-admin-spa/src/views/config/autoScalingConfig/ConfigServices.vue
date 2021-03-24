<template>
  <el-dialog :title="$t('service_config.title')" :visible.sync="visible" @close="hide" width="60%" top="10vh">
    <el-main>
      <el-table :data='tableData'>

        <el-table-column type="expand">
          <template slot-scope="scope">
            <div class="table-expand-row">
              <div class="info">
                <span class="label">{{$t('service_config.create_form.task_define')}}</span>
                <span class="value">{{ scope.row.service_task_define }}</span>
              </div>
              <div class="info">
                <span class="label">{{$t('service_config.create_form.commands')}}</span>
                <span class="value">
                  <span class="tag-github" v-for="item in scope.row.docker_cmds" :key="item.value">
                    {{item}}
                  </span>
                </span>
              </div>
            </div>
            <div class="table-expand-row">
              <div class="info">
                <span class="label">{{$t('service_config.create_form.cpu')}}</span>
                <span class="value">
                  {{scope.row.cpu_cores}}
                </span>
              </div>
              <div class="info">
                <span class="label">{{$t('service_config.create_form.memory')}}</span>
                <span class="value">
                  {{scope.row.memory_mb}}
                </span>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="name" :label="$t('service_config.name')"></el-table-column>
        <el-table-column prop="queue_name" :label="$t('service_config.queue_name')"></el-table-column>
        <el-table-column prop="enable" :label="$t('service_config.enable')">
          <template slot-scope="scope">
            <div v-if="scope.row.enable">
              <i class="iconfont icontianjiachenggong success-icon"></i>
            </div>
            <div v-else>
              <i class="iconfont iconshibai failure-icon"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="lanch_type" :label="$t('service_config.launch_type')"></el-table-column>

      </el-table>
    </el-main>

    <div class="pagination-area">
      <el-pagination @current-change="getConfigServices" @size-change="sizeChange" :current-page.sync='query.current'
        :page-sizes='[10, 20, 50, 100]' layout='prev, pager, next, sizes' :total='total'>
      </el-pagination>
    </div>
  </el-dialog>
</template>

<script>
import configAPI from "@/api/config";

export default {
  name: "ConfigServices",
  props: {
    configId: {
      type: Number
    }
  },
  watch: {
    configId(val) {
      if (!val || val === "") return;
      this.visible = true;
      this.query.scalingId = this.configId;
      this.getConfigServices();
    }
  },
  data() {
    return {
      tableData: [],
      query: {
        current: 1,
        size: 20,
        configId: ""
      },
      total: 0,
      visible: false
    };
  },
  methods: {
    hide() {
      this.$emit("close");
    },
    sizeChange(size) {
      this.query.current = 1;
      this.query.size = size;
      this.getConfigServices();
    },
    getConfigServices() {
      configAPI.getConfigServices(this.query).then(response => {
        this.tableData = response.records;
        this.total = response.total;
      });
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.tag-github {
  margin-bottom: 10px;
  margin-right: 10px;
}
</style>