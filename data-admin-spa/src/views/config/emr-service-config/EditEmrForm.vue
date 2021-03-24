<template>

  <el-dialog :title="$t('emr_service.title')" :visible.sync="dialogVisible" :close-on-click-modal="false">

    <el-form :rules="rules" ref="emrForm" :model="editEmrForm"  v-loading="addLoading">
      <el-form-item label="Config Json" prop="params">
        <!-- <el-input type="textarea" :rows="7" v-model="editEmrForm.params">
        </el-input> -->
        <json-editor @onInitEditor="initEditor($event)" :json="editEmrForm.params"
          :options="{  'mode':'code',navigationBar: false}">
        </json-editor>
      </el-form-item>

       <div>
          <a :href="constantConfig.EMR_HELP" class="app-primary-link" target="_blank">
            {{$t('emr_service.help_more')}}
          </a>
        </div>

    </el-form>

    <span slot="footer">
      <el-button plain @click="dialogVisible=false">{{$t('btn.cancel')}}</el-button>
      <el-button type="primary" @click="submit">{{$t('btn.confirm')}}</el-button>
    </span>

  </el-dialog>

</template>

<script>
import JsonEditor from "@/shared/components/JsonEditor";
import EmrServiceAPI from "@/api/config";
import constantAPP from "@/shared/config/app";

export default {
  components: { JsonEditor },

  props: {
    originEmrForm: {
      default: {},
      type: Object
    }
  },
  watch: {
    originEmrForm(val) {
      if (val) {
        this.dialogVisible = true;
        this.editEmrForm = _.cloneDeep(val);
        if (!this.editEmrForm.params) {
          this.editEmrForm.params = {};
        }
      }
    }
  },
  data() {
    const validateEMRConfig = (rule, val, callback) => {
      if (!val) {
        callback(new Error("不能为空"));
      } else if (!this.isJSON(val)) {
        callback(new Error("必须是JSON格式"));
      } else {
        callback();
      }
    };
    return {
      editEmrForm: {},
      dialogVisible: false,
      rules: {
        params: [{ validator: validateEMRConfig }]
      },
      edit: undefined,
      addLoading:false,
      constantConfig: constantAPP

    };
  },
  methods: {
    submit() {
        const jsonString = this.edit.get();
        this.addLoading=true;
        EmrServiceAPI.addEMRService({
          params:
            typeof jsonString === "object"
              ? JSON.stringify(jsonString)
              : jsonString
        })
          .then(result => {
            this.addLoading=false;
            if (result.success) {
              this.dialogVisible = false;
              this.$emit("onSuccess");
            } 
          })
          .catch(err => {
            this.addLoading=false;
          });
    },
    initEditor(val) {
      this.edit = val;
      this.edit.errorTableVisible = false;
    },
    isJSON(str) {
      if (typeof str == "string") {
        try {
          var obj = JSON.parse(str);
          if (typeof obj == "object" && obj) {
            return true;
          } else {
            return false;
          }
        } catch (e) {
          console.log("error：" + str + "!!!" + e);
          return false;
        }
      }
    }
  }
};
</script>