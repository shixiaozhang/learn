<template>
  <el-dialog :title="$t('menu_config.title')" @closed="resetFields()" :visible.sync="visible">
    <el-form ref="form" :model="form" label-width="100px">

      <el-form-item :label="$t('menu_config.type')" prop="type">
        <el-radio-group v-model="form.type" size="mini">
          <el-radio-button :label="1">{{$t('menu_config.menu')}}</el-radio-button>
          <el-radio-button :label="2">{{$t('menu_config.function')}}</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item :label="form.type=== 1?$t('menu_config.name'):$t('menu_config.function_name')" prop="name"
        :rules="[{ required: true, message: $t('error.required') }]">
        <el-input :disabled="form.editType==='copy'||form.editType==='move'" v-model="form.name"></el-input>
      </el-form-item>

      <template v-if="form.type=== 1">

        <el-form-item :label="$t('menu_config.order')" prop="order"
          :rules="[{ required: true, message: $t('error.required') }]">
          <el-input-number :disabled="form.editType==='copy'||form.editType==='move'" v-model="form.order"
            controls-position="right" style="width:100%"></el-input-number>
        </el-form-item>

        <el-form-item :label="$t('menu_config.router')" prop="route">
          <el-input :disabled="form.editType==='copy'||form.editType==='move'" v-model="form.route"></el-input>
        </el-form-item>

        <el-form-item>

          <el-switch v-model="form.visible"></el-switch>

          <template slot="label">
            {{$t('menu_config.visible')}}
            <el-popover placement="top-start" trigger="hover">
              <span>{{$t('menu_config.visible_tip')}}</span>
              <i slot="reference" class="iconfont iconinfo"></i>
            </el-popover>
          </template>
        </el-form-item>

      </template>

      <template v-if="form.type === 2">
        <el-form-item :label="$t('menu_config.function_api')" prop="url"
          :rules="[{ required: true, message: $t('error.required') }]">
          <el-input :disabled="form.editType==='copy'||form.editType==='move'" v-model="form.url"></el-input>
        </el-form-item>
      </template>

      <el-form-item :label="$t('menu_config.category')" prop="parentId">
        <treeselect v-model="form.parentId" :options="treeSelectList" :normalizer="normalizer"
          :placeholder="$t('menu_config.tree_select_placeholder')" />
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button size="small" plain @click="cancel()">{{$t('btn.cancel')}}</el-button>
      <el-button size="small" type="primary" @click="submit('form')">{{$t('btn.confirm')}}
      </el-button>
    </span>

  </el-dialog>
</template>
<script>
import permissionAPI from "@/api/permission";
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  components: {
    Treeselect
  },
  props: {
    permissionModuleForm: {
      type: Object
    }
  },
  watch: {
    permissionModuleForm(val) {
      if (!val) return;
      if (!val.type) {
        val.type = 1;
      }
      this.form = _.cloneDeep(val);
      this.visible = true;
      this.getMenus();
    }
  },
  data() {
    return {
      visible: false,
      form: {},
      treeSelectList: [],
      normalizer(node) {
        return {
          label: node.name
        };
      }
    };
  },
  mounted() {},
  methods: {
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
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.form.editType === "copy") {
            delete this.form.id;
          }
          delete this.form.editType;
          permissionAPI.saveMenuConfig(this.form).then(response => {
            if (response.success) {
              this.cancel();
              this.$emit("save");
            }
          });
        }
      });
    },
    resetFields(){
      this.$refs.form.resetFields();
    },
    cancel() {
      this.resetFields();
      this.visible = false;
      this.options = [];
    }
  }
};
</script>