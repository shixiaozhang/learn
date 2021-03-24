<template>
  <el-dialog width="60vw" :visible.sync="visible" :title="$t('coverage.title')" @close="resetFormFields()">
    <el-form ref="form" :model="form">
      <el-row :gutter="20">

        <el-col :span="8">
          <el-form-item :label="$t('coverage.country_type')">
            <el-select style="width:100%" :placeholder="$t('common.placeholder_select')" v-model="form.country_type">
              <el-option label="Major" :value="1"></el-option>
              <el-option label="Minor" :value="0"></el-option>
              <el-option label="Not ready for online" :value="-1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item :label="$t('coverage.country')" prop="country"
            :rules="[{ required: true, message: $t('coverage.edit_form.country_code_required') }]">

            <add-coverage-code @addCountryCodeDone="getAllCountryData()"></add-coverage-code>

            <el-select @change="changeCountry()" :placeholder="$t('common.placeholder_select')" v-model="form.country"
              filterable clearable  style="width:100%">
              <el-option v-for="item in countryCodeList" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item :label="$t('coverage.patent_type')" prop="patent_type"
            :rules="[{ required: true, message: $t('coverage.edit_form.patent_type_required')  }]">
            <el-popover placement="top" trigger="hover">
              <div>
                {{$t('coverage.edit_form.patent_type_tip')}}
              </div>
              <i slot="reference" class="el-icon-warning"></i>
            </el-popover>
            <el-select :placeholder="$t('common.placeholder_select')" v-model="form.patent_type" filterable clearable
              style="width:100%">
              <el-option v-for="item in patentTypeList" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>

        </el-col>

      </el-row>

      <el-row :gutter="20" style="margin:10px 0">
        <el-col :span="7" :offset="1">
          {{$t('coverage.field')}}
        </el-col>
        <el-col :span="8" align="center">
          {{$t('coverage.coverage')}}
        </el-col>
        <el-col :span="8" align="center">
          {{$t('coverage.start_time')}}
        </el-col>
      </el-row>

      <draggable v-model="form.field_status" handle=".handle">

        <el-row :gutter="20" v-for="(field,index) in form.field_status" :key="field.type">

          <el-col :span="1">
            <i class="iconfont icontuodong handle"
              v-if="['biblio','pdf','fulltext'].includes(field.type)&&form.field_status[index].value"></i>
          </el-col>

          <el-col :span="7"
            :offset="['biblio','pdf','fulltext'].includes(field.type)&&form.field_status[index].value?0:1">
            <el-form-item :prop="`field_status[${index}].type`">
              <el-input class="type_name" :placeholder="$t('common.placeholder_select')" :disabled="true"
                v-model="form.field_status[index].type">
              </el-input>
            </el-form-item>
          </el-col>
          　
          <el-col :span="8" align="center">
            <el-form-item :prop="`field_status[${index}].value`">
              <el-checkbox class="coverage-checkbox" v-model="form.field_status[index].value"></el-checkbox>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :prop="`field_status[${index}].startTime`"
              v-if="['biblio','pdf','fulltext'].includes(form.field_status[index].type)&&form.field_status[index].value"
              :rules="[{validator:coverageStartTime ,trigger:'change'},
            {required: true, message: 'Required', trigger: 'blur' }
             ]">
              <el-date-picker style="width:100%" :picker-options="pickerOptions0"
                v-model="form.field_status[index].startTime">
              </el-date-picker>
            </el-form-item>
          </el-col>

        </el-row>
      </draggable>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button plain @click="hide()">{{$t('btn.cancel')}}</el-button>
      <el-button type="primary" @click="saveDataCoverage('form')">{{$t('btn.confirm')}}</el-button>
    </div>
  </el-dialog>
</template>
<script>
import toolsAPI from "@/api/tools";
import draggable from "vuedraggable";
import moment from "moment";
import AddCoverageCode from "./AddCountryCode";
export default {
  name: "coverageForm",
  components: {
    draggable,
    AddCoverageCode,
  },
  props: {
    coverageForm: {
      type: Object,
    },
  },
  watch: {
    coverageForm(val) {
      if (val) {
        if (!_.isEmpty(val)) {
          this.form = this.transFormatToUser(val);
        } else {
          this.form = {
            patent_type: undefined,
            field_status: [
              {
                type: "biblio",
                value: true,
                startTime: "",
              },
              {
                type: "fulltext",
                value: false,
                startTime: "",
              },
              {
                type: "pdf",
                value: false,
                startTime: "",
              },
              {
                type: "legal",
                value: false,
                startTime: "",
              },
              {
                type: "family",
                value: false,
                startTime: "",
              },
              {
                type: "citation",
                value: false,
                startTime: "",
              },
            ],
          };
        }
        this.visible = true;
        this.getAllCountryData();
        if (this.form.country) {
          this.getPatentTypelist();
        }
      }
    },
  },
  data() {
    const validateStartTime = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t("coverage.edit_form.start_time_required")));
      } else if (
        Number(value) < new Date("1782/01/01").getTime() ||
        Number(value) > Date.now() - 8.64e6
      ) {
        callback(new Error(this.$t("coverage.edit_form.start_time_range")));
      } else {
        const biblioTime = _.result(
          _.find(this.form.field_status, ["type", "biblio"]),
          "startTime"
        );
        let currentStartTimeObj = this.form.field_status[
          rule.field.replace(/[^0-9]/gi, "")
        ];
        switch (currentStartTimeObj.type) {
          case "fulltext":
            const fulltextTime = currentStartTimeObj.startTime;
            if (fulltextTime && fulltextTime < biblioTime) {
              callback(
                new Error(this.$t("coverage.edit_form.fulltext_start_time"))
              );
            } else {
              callback();
            }
            break;
          case "pdf":
            const pdfTime = currentStartTimeObj.startTime;
            if (pdfTime && pdfTime < biblioTime) {
              callback(new Error(this.$t("coverage.edit_form.pdf_start_time")));
            } else {
              callback();
            }
            break;
          default:
            callback();
            break;
        }
      }
    };

    return {
      visible: false,
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        },
      },
      countryCodeList: [],
      patentTypeList: [],
      form: {
        field_status: [
          {
            type: "biblio",
            value: true,
          },
          {
            type: "fulltext",
            value: false,
          },
          {
            type: "pdf",
            value: false,
          },
          {
            type: "legal",
            value: false,
          },
          {
            type: "family",
            value: false,
          },
          {
            type: "citation",
            value: false,
          },
        ],
      },
      coverageStartTime: validateStartTime,
    };
  },
  methods: {
    async getAllCountryData() {
      this.countryCodeList = await toolsAPI.getAllCountryData();
    },

    changeCountry() {
      this.form.patent_type = undefined;
      this.getPatentTypelist();
    },

    async getPatentTypelist() {
      this.patentTypeList = await toolsAPI.getPatentTypeByCountry(
        this.form.country
      );
    },

    saveDataCoverage(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          toolsAPI
            .saveDataCoverage(this.transDataToRequest(this.form))
            .then((response) => {
              if (response.success) {
                this.hide();
                this.$emit("done");
              }
            });
        }
      });
    },
    hide() {
      this.resetFormFields();
      this.patentTypeList = [];
      this.visible = false;
    },
    resetFormFields() {
      this.$refs.form.resetFields();
    },
    transFormatToUser(val) {
      let formUseData = _.cloneDeep(val);
      let originStatus = _.cloneDeep(formUseData.field_status);
      formUseData.field_status = [];
      formUseData.start_remark.forEach((data) => {
        let key = data.type;
        let subMils = moment(data.from).format("YYYY-MM-DD");
        formUseData.field_status.push({
          type: key === "from" ? "biblio" : key, //
          value: true,
          startTime: moment(subMils).valueOf(),
        });
      });
      let startRemarkKeys = _.map(formUseData.start_remark, "type");
      let fieldsKeys = _.difference(_.keys(originStatus), startRemarkKeys);
      fieldsKeys.forEach((key) => {
        if (startRemarkKeys.includes("from") && key === "biblio") {
          //originStatus中的biblio字段不需要了，因为上面已经添加了start_rremark中的from字段。
        } else {
          formUseData.field_status.push({
            type: key,
            value: originStatus[key],
          });
        }
      });
      return formUseData;
    },
    transDataToRequest(val) {
      let requestData = _.cloneDeep(val);
      requestData.start_remark = [];
      const originFieldStatus = _.cloneDeep(requestData.field_status);
      requestData.field_status = {};
      originFieldStatus.forEach((status) => {
        if (status.startTime && status.value) {
          requestData.start_remark.push({
            type: status.type === "biblio" ? "from" : status.type,
            from: Number(status.startTime),
          });
        }
        requestData.field_status[status.type] = status.value;
      });
      return requestData;
    },
  },
};
</script>

<style lang="scss" >
.coverage-checkbox {
  margin-left: 20px;
  .el-checkbox__inner {
    width: 20px;
    height: 20px;
  }
  .el-checkbox__inner::after {
    height: 10px;
    left: 7px;
    top: 3px;
  }
}
</style>

<style lang="scss" scoped>
.iconfont {
  font-size: 20px;
  font-weight: bolder;
  cursor: move;
}
</style>