<template>
  <div ref="jsoneditor">
  </div>
</template>

<script>
import JSONEditor from "jsoneditor/dist/jsoneditor-minimalist.js";
import "jsoneditor/dist/jsoneditor.min.css";
let Ajv = require('ajv');
export default {
  name: "json-editor",
  data() {
    return {
      editor: null
    };
  },
  props: {
    json: {
      required: true
    },
    options: {
      type: Object,
      default: () => {
        return {};
      }
    },
    onChange: {
      type: Function
    },
    onModeChange: {
      type: Function
    }
  },
  watch: {
    json: {
      handler(newJson) {
        if (this.editor) {
          this.editor.set(newJson);
          this.editor.expandAll();
        }
      },
      deep: true
    }
  },
  methods: {
    _onChange(e) {
      if (this.onChange && this.editor) {
        this.onChange(this.editor.get());
      }
    },
    _onModeChange(newMode, oldMode) {
      if (this.onModeChange && this.editor) {
        this.onModeChange(this.editor, newMode, oldMode);
      }
    }
  },
  mounted() {
    const container = this.$refs.jsoneditor;
    const options = _.extend(
      {
        onChange: this._onChange,
        onModeChange: this._onModeChange
      },
      this.options
    );

    this.editor = new JSONEditor(container, options);
    this.editor.set(this.json);
    this.$emit('onInitEditor', this.editor)
  },
  beforeDestroy() {
    if (this.editor) {
      this.editor.destroy();
      this.editor = null;
    }
  }
};
</script>
