<template>

  <div class="app-list-page">
    <handlerForm :handlerForm='handlerForm' @close="getHandlerConfigList" :taskTypeArray='taskTypeArray'></handlerForm>

    <div class="filter-list-title">
      {{$t('handler.title')}}
    </div>

    <div class="filter-list-content">
      <el-form label-position="left" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item :label="$t('handler.name')">
              <el-input v-model="query.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('task_type.title')">
              <el-select :placeholder="$t('common.placeholder_select')" v-model="query.task_type" style="width:100%">
                <el-option v-for="item in taskTypeArray" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-button type="primary" @click="searchHandlerList()">
            <i class="iconfont iconsearch"></i>
            {{$t('btn.search')}}</el-button>
          <el-button type="primary" style="margin-bottom:16px" icon="el-icon-plus" @click="showRegisterForm()">
            {{$t('btn.new')}}</el-button>
        </el-row>
      </el-form>

      <list-count-tip i18="handler.tips" :counts="total">
      </list-count-tip>

      <el-table :data='tableData' v-loading="loading">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div class="table-expand-row">
              <div class="info">
                <span class="label">{{$t('handler.path')}}</span>
                <span class="value">{{ scope.row.component.component_path }}</span>
              </div>
               <div class="info">
                <span class="label">{{$t('common.description')}}</span>
                <span class="value"> {{scope.row.component.component_desc||'--'}}</span>
              </div>
            </div>
         
            <div class="table-expand-row">
              <div class="info">
                <span class="label">{{$t('handler.meta')}}</span>
                <VueJsonPretty :data="scope.row.component.component_meta" :highlightMouseoverNode="true">
                </VueJsonPretty>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="component_name" :label="$t('handler.name')"></el-table-column>
        <el-table-column :label="$t('task_type.title')">
          <template slot-scope="scope">
            <el-tag size="small" effect="plain" style="margin-right:5px" v-for="item in scope.row.task_type_names" :key="item.id">
              {{
                    item.name
                  }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('handler.env')" width="250">
          <template slot-scope="scope">
            <span class="tag-github">
              {{scope.row.component.component_env}}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop='create_ts' :label="$t('common.create_time')" width="200">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top" :open-delay="300">
              {{ common.formatExactTs(scope.row.create_ts) }}
              <div slot="reference">
                {{common.getDateDiff(scope.row.create_ts)}}
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column :label='$t("common.operate")' width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="copyHandler(scope.row)">{{$t('btn.copy')}}</el-button>
            <el-button type="text" @click="updateHandler(scope.row)">{{$t('btn.edit')}}</el-button>
            <el-button type="text" @click="deleteHandler(scope.row)">{{$t('btn.delete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-area">
        <el-pagination @current-change="handleHandlerCurrentChange" @size-change="handleHandlerSizeChange"
          :current-page.sync='query.current' :page-sizes='[10, 20, 50, 100]' layout='prev, pager, next, sizes'
          :total='total'>
        </el-pagination>
      </div>

    </div>
  </div>
</template>

<script>
import handlerForm from "./handlerForm.vue";
import configAPI from "@/api/config";
import taskAPI from "@/api/task";
import VueJsonPretty from "vue-json-pretty";
import ListCountTip from "@/shared/components/ListCountTip";

export default {
  name: "handler",
  components: {
    handlerForm,
    VueJsonPretty,
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
      visible: false,
      handlerForm: undefined,
      loading: false,
      taskTypeArray: []
    };
  },
  mounted() {
    this.getTaskTypes();
  },
  methods: {
    showRegisterForm(form) {
      if (!form) {
        this.handlerForm = {};
      } else {
        this.handlerForm = form;
      }
    },

    handleHandlerCurrentChange(val) {
      this.query.current = val;
      this.getHandlerConfigList();
    },
    handleHandlerSizeChange(size) {
      this.query.current = 1;
      this.query.size = size;
      this.getHandlerConfigList();
    },
    searchHandlerList() {
      this.query.current = 1;
      this.getHandlerConfigList();
    },

    getHandlerConfigList() {
      this.loading = true;
      configAPI
        .searchHandlerConfig(this.query)
        .then(response => {
            this.loading = false;
            this.tableData = response.records;
            this.total = response.total;
            this.tableData.map(item => {
              item.task_type_names = [];
              item.task_types.forEach(typeId => {
                const activeTaskType = this.taskTypeArray.find(typeItem => {
                  return typeItem.id === typeId;
                });
                item.task_type_names.push({
                  id: typeId,
                  name: activeTaskType.name
                });
              });
            });
        })
        .catch(err => {
          this.loading = false;
        });
    },
    translateTaskTypeName() {},
    copyHandler(row) {
      let cloneForm = JSON.parse(JSON.stringify(row));
      delete cloneForm.id;
      this.showRegisterForm(cloneForm);
    },
    updateHandler(row) {
      let cloneForm = JSON.parse(JSON.stringify(row));
      this.showRegisterForm(cloneForm);
    },
    getTaskTypes() {
      taskAPI
        .getTaskTypes()
        .then(response => {
            this.taskTypeArray = response;
            this.getHandlerConfigList();
        })
        .catch(err => {
          console.error(err);
        });
    },
    deleteHandler(row) {
      this.$confirm(
        this.$t("common.confirm_delete", { name: row.component_name }),
        this.$t("common.tips"),
        {
          confirmButtonText: this.$t("btn.confirm"),
          cancelButtonText: this.$t("btn.cancel"),
          type: "warning"
        }
      )
        .then(() => {
          configAPI
            .deleteHandler({ id: row.id })
            .then(response => {
              if (response.success) {
                this.getHandlerConfigList();
              } 
            })
        })
        .catch(() => {});
    }
  }
};
</script>
