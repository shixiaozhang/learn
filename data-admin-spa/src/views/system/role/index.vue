<template>
  <div class="app-list-page">
    <role-edit-form :treeSelectList="treeSelectList" :roleSaveForm="roleSaveForm" @save="getRoleList"></role-edit-form>

    <div class="filter-list-title">
      {{$t('role.title')}}
    </div>

    <div class="filter-list-content">
      <el-form label-position="left" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item :label="$t('role.name')">
              <el-input v-model="query.name"></el-input>
            </el-form-item>
          </el-col>
          <el-button type="primary" @click="searchRoleList()">
            <i class="iconfont iconsearch"></i>
            {{$t('btn.search')}}</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="showRoleSaveForm()">{{$t('btn.new')}}</el-button>
        </el-row>
      </el-form>

      <list-count-tip i18="common.table_total" :counts="total">
      </list-count-tip>

      <el-row :gutter="50">
        <el-col :span="14">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span class="role-span">{{$t('role.list')}}</span>
            </div>
            <el-table @current-change="handleCurrentChange" highlight-current-row v-loading="getListLoading"
              :data='tableData'>
              <el-table-column prop="name" :label="$t('role.name')"></el-table-column>
              <el-table-column :label="$t('common.create_time')">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <span>{{ common.formatExactTs(scope.row.create_ts) }}</span>
                    <div slot="reference">
                      <span>{{common.getDateDiff(scope.row.create_ts)}}</span>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column :label="$t('common.update_time')">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <span>{{ common.formatExactTs(scope.row.update_ts) }}</span>
                    <div slot="reference">
                      <span>{{common.getDateDiff(scope.row.update_ts)}}</span>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column :label='$t("common.operate")'>
                <template slot-scope="scope">
                  <el-button type="text" @click="showRoleSaveForm(scope.row)">
                    {{$t('btn.edit')}}
                  </el-button>
                  <el-button type="text" @click="deleteRole(scope.row)">
                    {{$t('btn.delete')}}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>

            <div class="pagination-area">
              <el-pagination @current-change="handleRoleListCurrentChange" @size-change="handleRoleListSizeChange"
                :current-page.sync='query.current' :page-sizes='[10, 20, 50, 100]' layout='  prev, pager, next, sizes'
                :total='total'>
              </el-pagination>
            </div>

          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span class="role-span">{{$t('role.menu')}}</span>
            </div>
            <el-tree :data="treeSelectList" :default-checked-keys="menuIds" check-strictly show-checkbox accordion
              node-key="id" ref="menu" highlight-current :props="defaultProps">

               <span class="custom-tree-node" slot-scope="{ node }">
                   <span :title="node.label">{{ node.label }}</span>
               </span>


            </el-tree>
          </el-card>
        </el-col>
      </el-row>

    </div>

  </div>
</template>
<script>
import roleAPI from "@/api/role";
import permissionAPI from "@/api/permission";

import RoleEditForm from "./RoleEditForm";
import ListCountTip from "@/shared/components/ListCountTip";

export default {
  components: {
    RoleEditForm,
    ListCountTip
  },
  data() {
    return {
      query: {
        size: 10,
        current: 1
      },
      tableData: [],
      total: 0,
      treeSelectList: [],
      roleSaveForm: undefined,
      getListLoading: false,
      defaultProps: {
        children: "children",
        label: "name"
      },
      menuIds: []
    };
  },
  mounted() {
    this.getRoleList();
    this.getMenus();
  },
  methods: {
    handleRoleListCurrentChange(val) {
      this.query.current = val;
      this.getRoleList();
    },
    handleRoleListSizeChange(size) {
      this.query.current = 1;
      this.query.size = size;
      this.getRoleList();
    },
    searchRoleList() {
      this.query.current = 1;
      this.getRoleList();
    },
    handleCurrentChange(val) {
      if (val) {
        this.$refs.menu.setCheckedKeys([]);
        this.menuIds = val.selectedMenus;
      }
    },
    getMenus() {
      permissionAPI.getMenuTreeSelect().then(response => {
        const handle = source => {
          source.map(data => {
            if (data.children && data.children.length) {
              handle(data.children);
            } else {
              delete data.children;
            }
          });
        };
        handle(response);
        this.treeSelectList = response;
      });
    },
    getRoleList() {
      this.getListLoading = true;
      this.$refs.menu.setCheckedKeys([]);
      this.menuIds = [];
      roleAPI
        .pageListRole(this.query)
        .then(response => {
          this.getListLoading = false;
            this.tableData = response.records;
            this.total = response.total;
        })
        .catch(error => {
          this.getListLoading = false;
        });
    },

    showRoleSaveForm(form) {
      if (!form) {
        this.roleSaveForm = {};
      } else {
        this.roleSaveForm = _.cloneDeep(form);
      }
    },

    deleteRole(row) {
      this.$confirm(
        this.$t("common.confirm_delete", { name: row.name }),
        this.$t("common.tips"),
        {
          confirmButtonText: this.$t("btn.confirm"),
          cancelButtonText: this.$t("btn.cancel"),
          type: "warning"
        }
      ).then(() => {
        roleAPI.deleteRole(row.id).then(response => {
          if(response.success){
            this.getRoleList();
          }
        });
      });
    }
  }
};
</script>



