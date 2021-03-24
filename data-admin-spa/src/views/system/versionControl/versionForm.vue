<template>
  <el-dialog width="60vw" :title="$t('version.title')" @close="resetFields()" :visible.sync="visible"
    :close-on-click-modal="false">
    <el-form ref="form" :model="form">

      <el-row :gutter="20">

        <el-col :span="12">
          <el-form-item :label="$t('version.version')" prop="version"
            :rules="[{ required: true, message: $t('error.required') }]">
            <el-input v-bind:disabled="readonly" v-model.trim="form.version"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item :label="$t('version.summary')" prop="summary">
            <el-input v-model="form.summary">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item :label="$t('version.notify')" prop="notify_open">
        <el-switch v-model="form.notify_open"></el-switch>
      </el-form-item>

      <!-- <el-form-item :label="$t('version.content')" prop="update_content"> -->

      <!-- </el-form-item> -->

      <div class="example">
        <quill-editor class="editor" ref="myTextEditor" :value="form.update_content" :options="editorOption"
          @change="onEditorChange">
          <div id="toolbar" slot="toolbar">

            <select class="ql-font">
              <option selected="selected"></option>
              <option value="serif"></option>
              <option value="monospace"></option>
            </select>

            <select class="ql-size">
              <option value="small"></option>
              <!-- Note a missing, thus falsy value, is used to reset to default -->
              <option selected></option>
              <option value="large"></option>
              <option value="huge"></option>
            </select>

            <!-- Add a bold button -->
            <button class="ql-bold">Bold</button>
            <button class="ql-italic">Italic</button>
            <button class="ql-underline">Underline</button>

            <button class="ql-script" value="sub"></button>
            <button class="ql-script" value="super"></button>

            <span class="ql-formats">
              <button class="ql-blockquote"></button>
            </span>

            <span class="ql-formats">
              <button class="ql-header" value="1"></button>
              <button class="ql-header" value="2"></button>
            </span>

            <span class="ql-formats">
              <button class="ql-list" value="ordered"></button>
              <button class="ql-list" value="bullet"></button>
            </span>

            <span class="ql-formats">
              <select class="ql-header">
                <option value="1"></option>
                <option value="2"></option>
                <option value="3"></option>
                <option value="4"></option>
                <option value="5"></option>
                <option value="6"></option>
              </select>

            </span>

          </div>
        </quill-editor>
      </div>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button plain size="small" @click="cancel()">{{$t('btn.cancel')}}</el-button>
      <el-button type="primary" size="small" @click="createRegister('form')">{{$t('btn.confirm')}}</el-button>
    </div>
  </el-dialog>
</template>
<script>
import configAPI from "@/api/config";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import debounce from "lodash/debounce";
import { quillEditor } from "vue-quill-editor";

export default {
  props: {
    versionControlForm: {
      type: Object,
    },
  },
  components: {
    quillEditor,
  },
  mounted() {},
  beforeDestroy() {},
  watch: {
    versionControlForm(val) {
      if (!val) return;
      this.visible = true;
      if (JSON.stringify(val) !== "{}") {
        this.form = val;
        if (this.form.id != null) {
          this.readonly = true;
        } else {
          this.readonly = false;
        }
      } else {
        this.readonly = false;
      }
    },
  },
  data() {
    return {
      form: {
        id: "",
      },
      visible: false,
      readonly: false,
      editorOption: {
        highlight: false,
        modules: {
          toolbar: "#toolbar",
        },
      },
    };
  },

  methods: {
    onEditorChange: debounce(function (value) {
      this.form.update_content = value.html;
    }, 466),

    createRegister(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          configAPI.saveVersionControl(this.form).then((response) => {
            if (response.success) {
              this.cancel();
              this.$emit("close");
            }
          });
        }
      });
    },
    resetFields() {
      this.$refs.form.resetFields();
    },
    cancel() {
      this.visible = false;
      this.resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.example {
  .editor {
    height: 250px;
    margin-bottom: 20px;
  }
}
</style>