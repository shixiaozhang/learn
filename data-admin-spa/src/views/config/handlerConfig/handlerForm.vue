<template>
  <el-dialog :title="$t('handler.title')" @closed="resetFormFields()" :visible.sync="visible" :close-on-click-modal="false" >
    <el-form ref="form" :model="form" label-width="100px">

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('task_type.title')" prop="task_types"
            :rules="[{ required: true, message: $t('error.required') }]">
            <el-select :placeholder="$t('common.placeholder_select')" v-model="form.task_types" multiple filterable
              style="width:100%">
              <el-option v-for="item in taskTypeArray" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item :label="$t('handler.name')" prop="component.component_name"
            :rules="[{ required: true, message: $t('error.required') }]">
            <el-input v-bind:disabled="readonly" v-model.trim="form.component.component_name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="$t('handler.env')" prop="component.component_env"
            :rules="[{ required: true, message: $t('error.required') }]">
            <el-input v-model.trim="form.component.component_env"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('handler.type')" prop="component.component_type"
            :rules="[{ required: true, message: $t('error.required') }]">
            <el-select :placeholder="$t('common.placeholder_select')" style="width:100%"
              v-model="form.component.component_type">
              <el-option v-for="item in allHandlerType" :key="item.value" :label="item.name + '(' + item.value + ')'"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item :label="$t('handler.path')" prop="component.component_path"
        :rules="[{ required: true, message: $t('error.required') }]">
        <el-input v-model.trim="form.component.component_path"></el-input>
      </el-form-item>

      <el-form-item :label="$t('common.description')" prop="component.component_desc">
        <el-input type="textarea" :rows="5" v-model="form.component.component_desc"></el-input>
      </el-form-item>
      <el-form-item :label="$t('handler.meta')">
        <el-input type="textarea" :rows="5" v-model="meta_string"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button plain @click="hide()">{{$t('btn.cancel')}}</el-button>
      <el-button type="primary" @click="createRegister('form')">{{$t('btn.confirm')}}</el-button>
    </span>
  </el-dialog>
</template>
<script>
import configAPI from "@/api/config";

export default {
  props: {
    handlerForm: {
      type: Object
    },
    taskTypeArray: {
      type: Array
    }
  },
  watch: {
    handlerForm(val) {
      if (!val) return;
      this.visible = true;
      if (JSON.stringify(val) !== "{}") {
        this.form = _.cloneDeep(val);
        if (this.form.id != null) {
          this.readonly = true;
        } else {
          this.readonly = false;
          this.form.component.component_name = "";
        }
        this.meta_string = JSON.stringify(val.component.component_meta);
      } else {
        this.reset();
        this.readonly = false;
      }
    }
  },
  data() {
    return {
      form: {
        id: "",
        task_types: [],
        component: {
          component_name: "",
          component_type: 0,
          component_path: "",
          component_env: "java",
          component_desc: ""
        }
      },
      meta_string: undefined,
      visible: false,
      readonly: false,
      allHandlerType: []
    };
  },
  methods: {
    createRegister(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.format_meta();
          configAPI.saveHandlerConfig(this.form).then(response => {
            if (response.success) {
              this.hide();
              this.$emit("close");
            }
          });
        } 
      });
    },
    listAllHandlerType() {
      configAPI
        .listAllHandlerType()
        .then(response => {
            this.allHandlerType = response;
        })
    },
    reset() {
      this.form = {
        id: "",
        task_types: [],
        component: {
          component_name: "",
          component_type: 0,
          component_path: "",
          component_env: "java",
          component_desc: ""
        }
      };
    },
    resetFormFields() {
      this.$refs.form.resetFields();
    },
    hide() {
      this.visible = false;
      this.resetFormFields();
      this.reset();
    },
    format_meta() {
      var map = {};
      if (this.meta_string !== undefined) {
        for (var key in JSON.parse(this.meta_string)) {
          map[key] = JSON.parse(this.meta_string)[key];
        }
        this.form.component.component_meta = map;
      }
    }
  },
  mounted() {
    this.listAllHandlerType();
  }
};
</script>
