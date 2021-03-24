<template>
  <div class="app-list-page">
    <contextKeysForm :contextKeysForm="contextKeysForm" 
    @done="getContextKeysList" 
    :taskTypes='taskTypes'>
    </contextKeysForm>

    <div class="filter-list-title">
      {{$t('context_keys.title')}}
    </div>

    <div class="filter-list-content">

      <el-button type="primary" style="margin-bottom:16px" icon="el-icon-plus" @click="showContextKeysForm()">
        {{$t('btn.new')}}</el-button>

      <list-count-tip i18="common.table_total" :counts="total">
      </list-count-tip>

      <el-table :data='tableData' v-loading="loading">
        <el-table-column prop="key" :label="$t('context_keys.key')"></el-table-column>
        <el-table-column  :label="$t('context_keys.type')">
          <template slot-scope="scope">
            <el-tag effect="plain" size="small">
              {{scope.row.key_type}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column  :label="$t('task_type.title')">
           <template slot-scope="scope">
            <el-tag effect="dark" size="small">
              {{scope.row.task_type_name}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" :label="$t('context_keys.remark')">
          <template slot-scope="scope">
            <div style="white-space:pre-wrap;word-break:break-all;">{{scope.row.remark||'--'}}</div>
          </template>
        </el-table-column>
        <el-table-column :label='$t("common.operate")' width="200">
          <template slot-scope="scope">
            <!-- <el-button type="text" @click="copyContextKeys(scope.row)">Copy</el-button> -->
            <el-button type="text" @click="updateContextKeys(scope.row)">{{$t('btn.edit')}}</el-button>
            <el-button type="text" @click="deleteContextKeys(scope.row)">{{$t('btn.delete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-area">
        <el-pagination @current-change="handleContextKeysCurrentChange" @size-change="handleContextKeysSizeChange"
          :current-page.sync='query.current' :page-sizes='[10, 20, 50, 100]' layout='prev, pager, next, sizes'
          :total='total'>
        </el-pagination>
      </div>

    </div>
  </div>
</template>

<script>
import configAPI from "@/api/config";
import contextKeysForm from "./contextKeysForm";
import taskAPI from "@/api/task";
import ListCountTip from "@/shared/components/ListCountTip";

export default {
  name: "contextKeys",
  data() {
    return {
      query: {
        size: 10,
        current: 1
      },
      tableData: [],
      total: 0,
      contextKeysForm: undefined,
      taskTypes: [],
      loading: false
    };
  },
  components: {
    contextKeysForm,
    ListCountTip
  },
  methods: {
    showContextKeysForm(form) {
      if (!form) {
        this.contextKeysForm = {};
      } else {
        this.contextKeysForm = form;
      }
    },

    handleContextKeysCurrentChange(val) {
      this.query.current = val;
      this.getContextKeysList();
    },
    handleContextKeysSizeChange(size) {
      this.query.current = 1;
      this.query.size = size;
      this.getContextKeysList();
    },
    getContextKeysList() {
      this.loading = true;
      configAPI
        .searchContextKeys(this.query)
        .then(response => {
            this.loading = false;
            this.tableData = response.records;
            this.total = response.total;
            this.tableData.map(data => {
              let taskType = _.find(this.taskTypes, o => {
                return o.id === data.task_type;
              });
              data.task_type_name = taskType.name;
            });
        })
        .catch(err => {
          this.loading = false;
        });
    },
    getTaskTypes() {
      taskAPI
        .getTaskTypes()
        .then(response => {
            this.taskTypes = response;
            this.getContextKeysList();
        })
        .catch(err => {
          console.error(err);
        });
    },
    copyContextKeys(row) {
      let cloneForm = JSON.parse(JSON.stringify(row));
      delete cloneForm.id;
      this.showContextKeysForm(cloneForm);
    },
    updateContextKeys(row) {
      let cloneForm = JSON.parse(JSON.stringify(row));
      this.showContextKeysForm(cloneForm);
    },
    deleteContextKeys(row) {
      this.$confirm(
        this.$t("common.confirm_delete", { name: row.key }),
        this.$t("common.tips"),
        {
          confirmButtonText: this.$t("btn.confirm"),
          cancelButtonText: this.$t("btn.cancel"),
          type: "warning"
        }
      )
        .then(() => {
          configAPI
            .deleteContextKeys({ id: row.id })
            .then(response => {
              if (response.success) {
                this.getContextKeysList();
              }
            })
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.getTaskTypes();
  }
};
</script>
