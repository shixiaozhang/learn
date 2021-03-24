<template>
  <el-dialog top="6vh" :title="$t('role.title')" :visible.sync="visible" @close="resetFields()">

    <el-form ref="editRoleForm" :model="form" :label-position="'top'">

      <el-form-item :label="$t('role.name')" prop="name" :rules="[{ required: true, message: $t('error.required') }]">
        <el-input v-model="form.name" :rules="[{ required: true, message: '名称不能为空' }]">
        </el-input>
      </el-form-item>

      <el-tree :data="treeSelectListForm" :default-checked-keys="form.selectedMenus" check-strictly show-checkbox
        accordion node-key="id" ref="menu" highlight-current :props="defaultProps">
      </el-tree>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button plain size="small" @click="cancel()">{{$t('btn.cancel')}}</el-button>
      <el-button type="primary" size="small" @click="submit()">
        {{$t('btn.confirm')}}</el-button>
    </div>
  </el-dialog>
</template>
<script>
import roleAPI from "@/api/role";
import permissionAPI from "@/api/permission";

export default {
  props: {
    roleSaveForm: {
      type: Object
    },
    treeSelectList: {
      type: Array
    }
  },
  watch: {
    roleSaveForm(val) {
      if (!val) return;
      this.visible = true;
      this.form = _.cloneDeep(val);
      this.treeSelectListForm = _.cloneDeep(this.treeSelectList);
    }
  },
  data() {
    return {
      visible: false,
      form: {},
      treeSelectListForm: [],
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  methods: {
    submit() {
      this.$refs.editRoleForm.validate(valid => {
        if (valid) {
          this.form.selectedMenus = this.$refs.menu.getCheckedKeys();
          roleAPI
            .saveRole(this.form)
            .then(response => {
              if (response.success) {
                this.cancel();
                this.$emit("save");
              }
            })
        }
      });
    },
    resetFields(){
      this.$refs.editRoleForm.resetFields();
    },
    cancel() {
      this.resetFields();
      this.visible = false;
    }
  }
};
</script>

