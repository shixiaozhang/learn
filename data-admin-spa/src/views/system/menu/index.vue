<template>
  <div class="app-list-page">
    <menu-edit-form :permissionModuleForm="permissionModuleForm" @save="getMenuList">
    </menu-edit-form>

    <div class="filter-list-title">
      {{$t('menu_config.title')}}
    </div>

    <div class="filter-list-content">
      <el-form label-position="left" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item :label="$t('menu_config.name')">
              <el-input v-model="query.name"></el-input>
            </el-form-item>
          </el-col>
          <el-button type="primary" @click="searchPermissionModuleList()">
            <i class="iconfont iconsearch"></i>
            {{$t('btn.search')}}</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="showMenuModal()">
            {{$t('btn.new')}}</el-button>
        </el-row>
      </el-form>

      <list-count-tip i18="common.table_total" :counts="total">
      </list-count-tip>

      <el-table size="small" v-loading="getListLoading" row-key="id"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :data='tableData'>
        <el-table-column :label="$t('menu_config.name')">
          <template slot-scope="scope">
            {{scope.row.name}}
          </template>
        </el-table-column>

        <el-table-column prop="order" :label="$t('menu_config.order')" width="100px">
        </el-table-column>

        <el-table-column prop="route" :label="$t('menu_config.router')" width="100px">
        </el-table-column>

        <el-table-column prop="url" :label="$t('menu_config.function_api')">
        </el-table-column>

        <el-table-column :label="$t('menu_config.visible')" width="100px">

          <template slot-scope="scope">
            <div v-if="scope.row.visible && scope.row.type!==2">
              <i class="iconfont icontianjiachenggong success-icon"></i>
            </div>
            <div v-else-if="!scope.row.visible && scope.row.type!==2">
              <i class="iconfont iconshibai failure-icon"></i>
            </div>
          </template>

        </el-table-column>

        <el-table-column prop='create_ts' :label="$t('common.create_time')" width="100px">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top" :open-delay="300">
              {{ common.formatExactTs(scope.row.create_ts) }}
              <div slot="reference">
                {{common.getDateDiff(scope.row.create_ts)}}
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop='update_ts' :label="$t('common.update_time')" width="100px">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top" :open-delay="300">
              {{ common.formatExactTs(scope.row.update_ts) }}
              <div slot="reference">
                {{common.getDateDiff(scope.row.update_ts)}}
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column :label='$t("common.operate")' width="180">
          <template slot-scope="scope">

            <!-- edit -->
            <el-button type="text" size="small" @click="showMenuModal(scope.row,'edit')">
              {{$t('btn.edit')}}
            </el-button>

            <!-- delete -->
            <el-popover :ref="scope.row.id" placement="top" width="300">
              <p>{{$t('menu_config.confirm_delete')}}</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">
                  {{$t('btn.cancel')}}
                </el-button>
                <el-button type="primary" size="mini" @click="deletePermissionModule(scope.row)">
                  {{$t('btn.confirm')}}</el-button>
              </div>
              <el-button type="text" size="small" style="margin:0 10px" slot="reference">
                {{$t('btn.delete')}}
              </el-button>
            </el-popover>

            <el-button type="text" size="small" v-if="scope.row.type===2" @click="showMenuModal(scope.row,'copy')">
              {{$t('btn.copy')}}
            </el-button>

            <el-button type="text" size="small" v-if="scope.row.type===2" @click="showMenuModal(scope.row,'move')">
              {{$t('btn.move')}}
            </el-button>

          </template>
        </el-table-column>

      </el-table>

      <div class="pagination-area">
        <el-pagination @current-change="handlePermissionModuleCurrentChange"
          @size-change="handlePermissionModuleSizeChange" :current-page.sync='query.current'
          :page-sizes='[10, 20, 50, 100]' layout='  prev, pager, next, sizes' :total='total'>
        </el-pagination>
      </div>
    </div>

  </div>

</template>
<script>
import permissionAPI from "@/api/permission";
import MenuEditForm from "./MenuEditForm";
import ListCountTip from "@/shared/components/ListCountTip";

export default {
  components: {
    MenuEditForm,
    ListCountTip
  },
  data() {
    return {
      tableData: [],
      permissionModuleForm: undefined,
      query: {
        size: 10,
        current: 1
      },
      total: 0,
      getListLoading: false
    };
  },
  mounted() {
    this.getMenuList();
  },
  methods: {
    handlePermissionModuleCurrentChange(val) {
      this.query.current = val;
      this.getMenuList();
    },
    handlePermissionModuleSizeChange(size) {
      this.query.current = 1;
      this.query.size = size;
      this.getMenuList();
    },
    searchPermissionModuleList() {
      this.query.current = 1;
      this.getMenuList();
    },
    getMenuList() {
      this.getListLoading = true;
      permissionAPI
        .getMenuList(this.query)
        .then(response => {
          this.getListLoading = false;
          this.tableData = response.records;
          this.total = response.total;
        })
        .catch(error => {
          this.getListLoading = false;
        });
    },

    showMenuModal(form, type) {
      if (!form) {
        this.permissionModuleForm = {};
      } else {
        let cloneForm = _.cloneDeep(form);
        cloneForm.editType = type;
        this.permissionModuleForm = cloneForm;
      }
    },
    deletePermissionModule(row) {
      permissionAPI.deleteMenu(row.id).then(response => {
        if(response.success){
          this.getMenuList();
        }
      });
    }
  }
};
</script>
