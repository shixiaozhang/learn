<template>
  <el-dialog :title="$t('user.delete')" :visible.sync="visible" @close="resetFields()">
    <el-form ref="form" :model="form">
      <el-form-item :label="$t('user.name')" prop="name" :rules="[{ required: true, message: $t('error.required') }]">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('user.migrate')" prop="migrateTask">
        <el-switch v-model="form.migrateTask" @change="closeMigrate(form.migrateTask)"></el-switch>
        <p class="tips-warning "><i class="el-icon-warning" style="color:#e6a23c"></i>
          {{$t('user.tips')}}
        </p>
      </el-form-item>
      <el-form-item :label="$t('user.migrate_to')">
        <el-select :placeholder="$t('common.placeholder_select')" v-model="form.toUser" filterable style="width:100%" v-bind:disabled="!form.migrateTask">
          <el-option v-for="item in form.users" :key="item.id" :label="item.username" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button size="small" plain @click="cancel()">{{$t('btn.cancel')}}</el-button>
      <el-button size="small" type="primary" @click="confirmDeleteUser">{{$t('btn.delete')}}
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
import loginAPI from "@/api/login";
export default {
  name: "userDeleteForm",
  props: {
    userDeleteForm: {
      type: Object
    }
  },
  watch: {
    userDeleteForm(val) {
      if (!val) return;
      this.form = val;
      this.visible = true;
    }
  },
  data() {
    return {
      visible: false,
      form: {}
    };
  },
  methods: {
    closeMigrate(migrate) {
      if (!migrate) {
        this.$message.warning("What you are doing is not recommended!");
      }
    },
    confirmDeleteUser() {
      loginAPI
        .deleteUser({
          id: this.form.id,
          migrateTask: this.form.migrateTask,
          toUser: this.form.toUser
        })
        .then(response => {
          if (response.success) {
            this.cancel();
            this.$emit("close");
          }
        })
    },
    resetFields(){
      this.$refs.form.resetFields();
    },
    cancel() {
      this.resetFields();
      this.visible = false;
    }
  }
};
</script>
