<template>
  <el-popover placement="bottom" ref="addCodePop" trigger="hover" @hide="resetFormFields()">
    <div>
      <h4>{{$t('coverage.add_country_form.title')}}</h4>
      <el-form v-loading="addLoading" ref="countryCodeForm" :model="addCoverageCountryForm"
        :rules="addCountryCodeRules">
        <el-form-item prop="country">
          <el-input v-model="addCoverageCountryForm.country">
          </el-input>
        </el-form-item>

        <el-button style="margin-top:20px" plain size="small" @click="cancel()">{{$t('btn.cancel')}}</el-button>
        <el-button type="primary" size="small" @click="confirm()">{{$t('btn.confirm')}}</el-button>

      </el-form>
    </div>
    <i slot="reference" class="el-icon-circle-plus-outline"></i>
  </el-popover>
</template>

<script>
import toolsAPI from "@/api/tools";

export default {
  data() {
    const validateCountry = (rule, value, callback) => {
      if (!value) {
        callback(
          new Error(this.$t("coverage.add_country_form.country_required"))
        );
      } else if (!/^[A-Z]+$/.test(value)) {
        callback(
          new Error(this.$t("coverage.add_country_form.uppercase_required"))
        );
      } else if (value.length !== 2) {
        callback(
          new Error(this.$t("coverage.add_country_form.length_reuired"))
        );
      } else {
        callback();
      }
    };
    return {
      addCoverageCountryForm: { country: "" },
      addLoading: false,
      addCountryCodeRules: {
        country: [{ validator: validateCountry, trigger: "blur" }],
      },
    };
  },
  methods: {
    resetFormFields() {
      this.$refs.countryCodeForm.resetFields();
    },
    cancel() {
      this.$refs.addCodePop.doClose();
      this.resetFormFields();
    },
    confirm() {
      this.$refs.countryCodeForm.validate(async (valid) => {
        if (valid) {
          this.addLoading = true;
          toolsAPI.addCountryCode(this.addCoverageCountryForm).then((data) => {
            this.addLoading = false;
            if (data.success) {
              this.$emit("addCountryCodeDone");
              this.cancel();
            }
          });
        }
      });
    },
  },
};
</script>