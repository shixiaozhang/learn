<template>
  <el-dialog :title="$t('glacier.restore')" :visible.sync="visible" :before-close="emitParent">
    <el-form>
      <el-row>
        <el-form-item :label="$t('glacier.path')">
          <el-input v-model="form.file_path"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item :label="$t('glacier.list')">
          <el-input v-model="form.list_file"></el-input>
        </el-form-item>
      </el-row>
      <el-form-item :label="$t('glacier.last_time')">
        <el-input-number style="width:100%" :min="1" :max="5" v-model="form.duration"></el-input-number>
      </el-form-item>
      <el-form-item :label="$t('glacier.options')">
        <el-select :placeholder="$t('common.placeholder_select')" style="width:100%" v-model="form.restore_option">
          <el-option value="Bulk" label="Bulk(5h-12h)"></el-option>
          <el-option value="Standard" label="Standard(3h-5h)"></el-option>
          <el-option value="Expedited" label="Expedited(1m-5m)"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="restoreFile()">{{$t('btn.confirm')}}</el-button>
    </div>
  </el-dialog>
</template>
<script>
import toolsAPI from "@/api/tools";
export default {
  name: "glacierRestoreForm",
  props: {
    visible: {
      type: Boolean
    }
  },
  data() {
    return {
      form: {
        file_path: "",
        list_file: "",
        restore_option: "Bulk",
        duration: 1
      }
    };
  },
  methods: {
    emitParent() {
      this.$emit("close");
    },
    restoreFile() {
      toolsAPI
        .restoreS3File(this.form)
        .then(response => {
            if (response.success) {
              this.emitParent();
            }
        })
    }
  }
};
</script>
