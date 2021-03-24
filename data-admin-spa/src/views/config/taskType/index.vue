<template>
  <div class="app-list-page">
    <edit-task-type-form :taskTypeForm="taskTypeForm" @done="getTaskTypeList"></edit-task-type-form>
    <div class="filter-list-title">
      {{$t('task_type.title')}}
    </div>

    <div class="filter-list-content">
      <el-form label-position="left" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item :label="$t('task_type.name')">
              <el-input v-model="query.name"></el-input>
            </el-form-item>
          </el-col>
          <el-button type="primary" @click="searchTaskTypeList(query.name)">
            <i class="iconfont iconsearch"></i>
            {{$t('btn.search')}}</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="editTaskType()">{{$t('btn.new')}}</el-button>
        </el-row>
      </el-form>

      <list-count-tip i18="common.table_total" :counts="total">
      </list-count-tip>

      <el-table :data='tableData' v-loading="loading">
        <el-table-column prop="name" :label="$t('task_type.name')"></el-table-column>
        <el-table-column prop="category.name" :label="$t('task_type.category')"></el-table-column>
        <el-table-column prop="is_mq" :label="$t('task_type.is_mq')">
          <template slot-scope="scope">
            <div v-if="scope.row.is_mq">
              <i class="iconfont icontianjiachenggong success-icon"></i>
            </div>
            <div v-else>
              <i class="iconfont iconshibai failure-icon"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label='$t("common.operate")' width="200">
          <template slot-scope="scope">
            <el-button type="text" @click="editTaskType(scope.row)" class="table-pop-btn">{{$t('btn.edit')}}</el-button>

            <el-popconfirm @onConfirm="deleteTaskType(scope.row.id)" :confirmButtonText="$t('btn.confirm')"
              :cancelButtonText="$t('btn.cancel')" :title="$t('common.delete_popconfirm')">
              <el-button slot="reference" type="text">{{$t('btn.delete')}}</el-button>
            </el-popconfirm>

          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-area">
        <el-pagination @current-change="handleTaskTypeCurrentChange" @size-change="handleTaskTypeSizeChange"
          :current-page.sync='query.current' :page-sizes='[10, 20, 50, 100]' layout='prev, pager, next, sizes'
          :total='total'>
        </el-pagination>
      </div>
    </div>
  </div>

</template>
<script>
import commonAPI from "@/api/common";
import EditTaskTypeForm from "./EditTaskTypeForm";
import ListCountTip from "@/shared/components/ListCountTip";

export default {
  name: "taskType",
  components: {
    EditTaskTypeForm,
    ListCountTip
  },
  data() {
    return {
      tableData: [],
      query: {
        size: 10,
        current: 1
      },
      total: 0,
      taskTypeForm: {},
      loading: false
    };
  },
  mounted() {
    this.getTaskTypeList();
  },
  methods: {
    handleTaskTypeCurrentChange(val) {
      this.query.current = val;
      this.getTaskTypeList();
    },
    handleTaskTypeSizeChange(size) {
      this.query.current = 1;
      this.query.size = size;
      this.getTaskTypeList();
    },
    searchTaskTypeList() {
      this.query.current = 1;
      this.getTaskTypeList();
    },
    getTaskTypeList() {
      this.loading = true;
      commonAPI.searchTaskType(this.query).then(response => {
        this.loading = false;
        this.tableData = response.records;
        this.total = response.total;
      });
    },
    editTaskType(row) {
      this.taskTypeForm = row ? _.cloneDeep(row) : {};
    },
    async deleteTaskType(typeId) {
      const response = await commonAPI.deleteTaskType({ id: typeId });
      if (response.success) {
        this.getTaskTypeList();
      }
    }
  }
};
</script>
