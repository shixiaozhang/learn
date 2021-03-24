<template>

  <div class="app-list-page">
    <user-add-form :userForm="userForm" :categoryOptions="categoryOptions" :userRoles="userRoles" @close="getUserList">
    </user-add-form>
    <user-update-form :userUpdateForm="userUpdateForm" :categoryOptions="categoryOptions" :userRoles="userRoles"
      @close="getUserList"></user-update-form>
    <user-delete-form :userDeleteForm="userDeleteForm" @close="getUserList"></user-delete-form>
    <user-migrate-form :userMigrateForm="userMigrateForm" @close="getUserList"></user-migrate-form>
    <div class="filter-list-title">
      {{$t('user.title')}}
    </div>

    <div class="filter-list-content">
      <el-form label-position="left" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item :label="$t('user.name')">
              <el-input v-model="query.name"></el-input>
            </el-form-item>
          </el-col>
          <el-button type="primary" @click="searchUserList()">
            <i class="iconfont iconsearch"></i>
            {{$t('btn.search')}}</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="showUserForm()">{{$t('btn.new')}}</el-button>
        </el-row>

      </el-form>

      <list-count-tip i18="common.table_total" :counts="total">
      </list-count-tip>

      <el-table v-loading="getListLoading" :data='tableData'>
        <el-table-column prop="username" :label="$t('user.name')"></el-table-column>
        <el-table-column prop="role_name" :label="$t('user.role')"></el-table-column>
        <el-table-column :label="$t('user.last')">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <span>{{ common.formatExactTs(scope.row.lastLoginTime) }}</span>
              <div slot="reference">
                <span>{{common.getDateDiff(scope.row.lastLoginTime)}}</span>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column :label="$t('user.enable')">
          <template slot-scope="scope">
            <div v-if="scope.row.is_enabled">
              <i class="iconfont icontianjiachenggong success-icon"></i>
            </div>
            <div v-else>
              <i class="iconfont iconshibai failure-icon"></i>
            </div>
          </template>
        </el-table-column>

        <el-table-column :label='$t("common.operate")' width="350">
          <template slot-scope="scope">
            <el-button type="text" @click="updateUser(scope.row)">
              {{$t('btn.edit')}}
            </el-button>
            <el-button type="text" @click="resetPassword(scope.row)">
              {{$t('user.reset_psd')}}</el-button>
            <el-button type="text" @click="migrateUser(scope.row)">
              {{$t('user.migrate')}}
            </el-button>
            <el-button type="text" @click="deleteUser(scope.row)">
              {{$t('btn.delete')}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-area">
        <el-pagination @current-change="handleUserListCurrentChange" @size-change="handleUserListSizeChange"
          :current-page.sync='query.current' :page-sizes='[10, 20, 50, 100]' layout=' prev, pager, next, sizes'
          :total='total'>
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import logInAPI from "@/api/login";
import commonAPI from "@/api/common";
import UserAddForm from "./dialogs/UserAddForm";
import UserUpdateForm from "./dialogs/UserUpdateForm";
import UserDeleteForm from "./dialogs/UserDeleteForm";
import UserMigrateForm from "./dialogs/UserMigrateForm";
import ListCountTip from "@/shared/components/ListCountTip";

export default {
  components: {
    UserAddForm,
    UserUpdateForm,
    UserDeleteForm,
    UserMigrateForm,
    ListCountTip
  },

  data() {
    return {
      tableData: [],
      userForm: undefined,
      userUpdateForm: undefined,
      userDeleteForm: {},
      userRoles: [],
      userMigrateForm: {},
      categoryOptions: [],
      query: {
        size: 10,
        current: 1
      },
      total: 0,
      getListLoading: false
    };
  },
  methods: {
    showUserForm(form) {
      if (!form) {
        this.userForm = {};
      } else {
        this.userForm = form;
      }
    },
    showUserUpdateForm(form) {
      if (!form) {
        this.userUpdateForm = {};
      } else {
        this.userUpdateForm = form;
      }
    },
    getRoles() {
      logInAPI
        .getAllUserRoles()
        .then(response => {
          this.userRoles = response;
        })
    },
    getCategoryOptions() {
      commonAPI
        .listAllCategory()
        .then(response => {
            this.categoryOptions = response;
        })
    },
    handleUserListCurrentChange(val) {
      this.query.current = val;
      this.getUserList();
    },
    handleUserListSizeChange(size) {
      this.query.current = 1;
      this.query.size = size;
      this.getUserList();
    },
    searchUserList() {
      this.query.current = 1;
      this.getUserList();
    },
    getUserList() {
      this.getListLoading = true;
      logInAPI
        .listUser(this.query)
        .then(response => {
          this.getListLoading = false;
            this.tableData = response.records;
            this.total = response.total;
        })
        .catch(err => {
          this.getListLoading = false;
        });
    },
    updateUser(row) {
      let cloneForm = JSON.parse(JSON.stringify(row));
      delete cloneForm.password;
      this.showUserUpdateForm(cloneForm);
    },
    deleteUser(row) {
      logInAPI.listAllUser().then(response => {
          this.userDeleteForm = {
            id: row.id,
            name: row.username,
            users: response,
            userTasks: row.userTasks,
            migrateTask: true
          };
      });
    },
    migrateUser(row) {
      this.userMigrateForm = row;
    },

    resetPassword(row) {
      this.$prompt(this.$t("user.input_psd"), this.$t("user.reset_psd"), {
        confirmButtonText: this.$t("btn.confirm"),
        cancelButtonText: this.$t("btn.cancel"),
        inputType: "password",
      })
        .then(({ value }) => {
          logInAPI
            .resetPassword({
              user_id: row.id,
              password: value
            })
            .then(response => {
              if(response.success){
                this.getUserList();
              }
            })
        })
    }
  },
  mounted() {
    this.getRoles();
    this.getCategoryOptions();
    this.getUserList();
  }
};
</script>
