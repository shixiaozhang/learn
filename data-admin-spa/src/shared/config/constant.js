export default {
  JOB_ITEM_STATUS: [
    {
      id: null,
      name: "ALL",
      type: null,
    },
    {
      id: -2,
      name: "RUNNING",
      type: "primary",
    },
    {
      id: -1,
      name: "FAILED",
      type: "danger",
    },
    {
      id: 0,
      name: "RETRY",
      type: "info",
    },
    {
      id: 1,
      name: "SUCCESS",
      type: "success",
    },
    {
      id: 2,
      name: "PREPARED",
      type: "info",
    },
  ],

  SCHEDULE_LOG_STATUS: [
    {
      operation: "RESUME",
      icon: "el-icon-refresh-right",
      color: "#2A396D",
    },
    {
      operation: "PAUSE",
      icon: "el-icon-video-pause",
      color: "#FC544C",
    },
    {
      operation: "SCHEDULE",
      icon: "el-icon-video-play",
      color: "#4DC600",
    },
    {
      operation: "UNSCHEDULE",
      icon: "el-icon-switch-button",
      color: "#FF9038",
    },
    {
      operation: "ADD",
      icon: "el-icon-circle-plus-outline",
      color: "#516FEA",
    },
  ],

  ATHEAN_ANALYSIS_DAY_OPTIONS: [
    {
      value: "3",
      text: "three",
    },
    {
      value: "7",
      text: "seven",
    },
    {
      value: "15",
      text: "fifteen",
    },
    {
      value: "30",
      text: "thirty",
    },
    {
      value: "90",
      text: "ninety",
    },
  ],

  GLACIER_STATUS: [
    {
      value: 1,
      text: "Running",
      type: "primary",
    },
    {
      value: 2,
      text: "Done",
      type: "success",
    },
    {
      value: 3,
      text: "Fail",
      type: "danger",
    },
  ],

  SQL_CUSTOM_KEYWORDS: ["regexp_like"],

  DPP_THEME_LIST: [
    {
      value: "#6D78BA",
    },
    {
      value: "#409EFF",
    },
    {
      value: "#3E9BDC",
    },
    {
      value: "#71A950",
    },
    {
      value: "#608492",
    },
    {
      value: "#06B8CF",
    },
    {
      value: "#2C3E50",
    },
    {
      value: "#4285F3",
    },
    {
      value: "#0152CC",
    },
   {
     value:'#FBBD03'
   },
   {
     value:"#33A852"
   }
  ],

  SQL_EDITOR_PLACEHOLDER: `-- Run an ANSI SQL or Hive Data Definition Language (DDL) statement
-- ANSI SQL Example:
-- SELECT * FROM default.cloudfront_logs limit 10;
-- Hive DDL Example:
-- CREATE EXTERNAL TABLE IF NOT EXISTS cloudfront_logs (
-- Date Date,
-- Time STRING,
-- Location STRING,
-- Bytes INT,
-- RequestIP STRING,
-- Method STRING,
-- Host STRING,
-- Uri STRING,
-- Status INT,
-- Referrer STRING,
-- OS String,
-- Browser String,
-- BrowserVersion String
-- )
-- ROW FORMAT SERDE 'org.apache.hadoop.hive.serde2.RegexSerDe'
-- WITH SERDEPROPERTIES (
--    "input.regex" = "^(?!#)([^ ]+)\\s+([^ ]+)\\s+([^ ]+)\\s+([^ ]+)\\s+([^ ]+)\\s+([^ --]+)\\s+([^   
--                     ]+)\\s+([^ ]+)\\s+([^ ]+)\\s+([^ ]+)\\s+[^(]+[(]([^;]+).*%20([^/]+)[/](.*)$"
-- ) LOCATION 's3://athena-examples/cloudfront/plaintext/';
`,

  TASK_TRIGGERS: [
    {
      id: 1,
      label: 'job.create_form.not_trigger'
    },
    {
      id: 2,
      label: 'job.create_form.manu_trigger'
    },
    {
      id: 3,
      label: 'job.create_form.auto_trigger'
    }
  ],

  SERVICE_MQ_TYPE: [
    {
      id: 1,
      name: 'ActiveMq'
    },
    {
      id: 2,
      name: 'Sqs'
    }
  ],

  ATHENA_ACCOUNTS:[
    '747875099153',
    '006694404643',
    '397751057748'
  ]

};
