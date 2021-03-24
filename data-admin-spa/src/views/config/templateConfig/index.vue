<template>

  <div class="app-list-page">
    <templateForm :templateForm='templateForm' :taskTypes='taskTypes' @close="getTemplateList"></templateForm>
    <template-detail :taskId='detailTaskId' @close="detailTaskId = undefined"></template-detail>

    <div class="app-title-desc">
      <div class="left">
        <h4 class="title">{{$t('temlpate.title')}}</h4>
        <p class="description">
          {{$t('temlpate.sub_title')}}
        </p>
      </div>
      <div class="right">
        <i class="iconfont iconchuangjianmoban"></i>
      </div>
    </div>

    <div class="filter-list-content">

      <el-form label-position="left" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item :label="$t('temlpate.name')">
              <el-input v-model="query.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('task_type.title')">
              <el-select :placeholder="$t('common.placeholder_select')" v-model="query.task_type" style="width:100%">
                <el-option v-for="item in taskTypes" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-button type="primary" @click="searchTemplateList()">
            <i class="iconfont iconsearch"></i>
            {{$t('btn.search')}}</el-button>
          <el-button type="primary" style="margin-bottom:16px" icon="el-icon-plus" @click="showForm()">{{$t('btn.new')}}
          </el-button>

        </el-row>
      </el-form>

      <list-count-tip i18="common.table_total" :counts="total">
      </list-count-tip>

      <el-table :data='tableData'>
        <el-table-column prop="name" :label="$t('temlpate.name')"></el-table-column>
        <el-table-column :label="$t('common.description')">
          <template slot-scope="scope">
            {{scope.row.task.description||'--'}}
          </template>
        </el-table-column>

        <el-table-column :label='$t("common.operate")' width="250">
          <template slot-scope="scope">
            <el-button type="text" @click="copyTemplate(scope.row)">{{$t('btn.copy')}}</el-button>
            <el-button type="text" @click="updateTemplate(scope.row)">{{$t('btn.edit')}}</el-button>
            <el-button type="text" @click="deleteTemplate(scope.row)">{{$t('btn.delete')}}</el-button>
            <el-button type="text" @click="detailTaskId = scope.row.task_id">{{$t('btn.detail')}}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-area">
        <el-pagination @current-change="handleTemplateCurrentChange" @size-change="handleTemplateSizeChange"
          :current-page.sync='query.current' :page-sizes='[10, 20, 50, 100]' layout='prev, pager, next, sizes'
          :total='total'>
        </el-pagination>
      </div>
    </div>
  </div>

</template>

<script>
import templateForm from "./templateForm.vue";
import taskAPI from "@/api/task";
import templateAPI from "@/api/taskTemplate";
import TemplateDetail from "./TemplateDetail";
import ListCountTip from "@/shared/components/ListCountTip";

export default {
  name: "templatePage",
  components: {
    templateForm,
    TemplateDetail,
    ListCountTip
  },
  data() {
    return {
      tableData: [],
      query: {
        size: 10,
        current: 1
      },
      templateForm: undefined,
      total: 0,
      taskTypes: [],
      detailTaskId: undefined
    };
  },
  methods: {
    showForm(form) {
      if (!form) {
        this.templateForm = {};
      } else {
        this.templateForm = form;
      }
    },

    handleTemplateCurrentChange(val) {
      this.query.current = val;
      this.getTemplateList();
    },
    handleTemplateSizeChange(size) {
      this.query.current = 1;
      this.query.size = size;
      this.getTemplateList();
    },
    searchTemplateList() {
      this.query.current = 1;
      this.getTemplateList();
    },

    getTemplateList() {
      templateAPI
        .searchTemplatePage(this.query)
        .then(response => {
            this.tableData = response.records;
            this.total = response.total;
        })
    },
    getTaskTypes() {
      taskAPI
        .getTaskTypes()
        .then(response => {
            this.taskTypes = response;
        })
        .catch(err => {
          console.error(err);
        });
    },
    copyTemplate(row) {
      let cloneForm = JSON.parse(JSON.stringify(row));
      console.log(cloneForm);
      cloneForm.task.id = "";
      this.showForm(cloneForm);
    },
    updateTemplate(row) {
      let cloneForm = JSON.parse(JSON.stringify(row));
      this.showForm(cloneForm);
    },
    deleteTemplate(row) {
      this.$confirm(
        this.$t("common.confirm_delete", { name: row.name }),
        this.$t("common.tips"),
        {
          confirmButtonText: this.$t("btn.confirm"),
          cancelButtonText: this.$t("btn.cancel"),
          type: "warning"
        }
      )
        .then(() => {
          templateAPI
            .deleteTemplate({ id: row.id })
            .then(response => {
              if (response.success) {
                this.getTemplateList();
              } 
            })
        })
    }
  },
  mounted() {
    this.getTaskTypes();
    this.getTemplateList();
  }
};
</script>
