// import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import CronLocale from "vue-cron-generator/src/locale/zh-CN";

export default {
  ...ELEMENT.lang.zhCN,
  ...CronLocale,
  menu: {
    "dashboard": '图表分析',
    "job": '任务',
    "job-list": "任务列表",
    "config": '配置',
    'task-type': '任务类型',
    "service": '服务配置',
    "emr-service": "EMR服务配置",
    'auto-scaling': '自动伸缩',
    "handler": '处理函数配置',
    'schedule': '定时任务',
    "template": '模版配置',
    'context-keys': '任务参数',
    'task-alert': '任务报警',
    "category": '分类',
    "tools": '数据工具',
    'data-api': '数据API',
    'data-coverage': '数据范围管理',
    "glacier": 'Glacier Tools',
    'solr-notify': '人工通知Solr调用',
    "athena": 'Athena',
    'fix': '人工数据修正',
    "system": '系统管理',
    "user": '用户管理',
    "role": '角色管理',
    "permission": '权限管理',
    'menu': '菜单管理',
    'version-control': '版本更新',
    "release": '版本发布',
    'life-cycle': '生命周期',
    'help_center': '帮助文档',
    'theme': '一键换肤',
    'language': '切换语言',
    'signOut': '退出',
    'catalog': '数据资产平台',
    'rule_engine': '规则引擎平台',
    'search_job': '输入您的任务名称...',
    "version_log": '日志更新',
    "change_password": '修改密码'
  },
  btn: {
    search: '查询',
    reset: '重置',
    new: '新建',
    confirm: '确认',
    cancel: '取消',
    edit: '编辑',
    delete: '删除',
    copy: '复制',
    resend: '重发',
    item_send: '发送',
    operations: '更多操作',
    statistics: "统计",
    view_task_list: '查看任务列表',
    create_another: '新建任务',
    transfer: '转换',
    fix: '修正',
    refresh: '刷新',
    stop: '停止',
    pause: '暂停',
    resume: '恢复',
    logs: '查看日志',
    detail: '详情',
    download: '下载',
    upload: '上传',
    retry: '重试',
    back: '返回',
    move: '移动',
    clean: '清空',
    copy_once: '一键复制',
    read_already: '立即刷新',
    save: '保存',
    preview: '完成并预览',
    archived:'归档',
    recovery:'还原'
  },
  common: {
    status: '状态',
    open: '展开',
    collapse: '收起',
    start_time: '开始',
    stop_time: '结束',
    multi_choosen_table: "您已经选择<span class='count'>{counts}</span>条数据",
    table_total: '当前共查询到<span>{counts}</span>条数据',
    update_time: '更新时间',
    create_time: '创建时间',
    operate: '操作',
    description: '描述',
    tag: '标签',
    export_path: '导出路径',
    download_file: '下载文件',
    week: '最近一周',
    month: '最近一个月',
    three_month: '最近三个月',
    tips: '提示信息',
    done: '成功',
    error: '错误',
    confirm_delete: '请确认是否删除 {name} 这条数据？',
    no_data: '暂无数据',
    context: '参数名',
    value: '参数值',
    placeholder_select: '请选择',
    notify: '版本更新',
    create_done: '创建成功',
    notify_tip: '如果您未发现版本变化，只需要刷新页面即可。',
    loading_text: '加载中',
    delete_popconfirm: '这是一条数据确认删除吗？',
    yes: '是',
    no: '否',
    cron_parse: '最近三次运行时间',
    // cron
    from: '从',
    fromThe: '从第',
    start: '开始',
    every: '每',
    between: '在',
    and: '到',
    end: '之间的',
    specified: '固定的',
    symbolTip: '通配符支持',
    valTip: '值为',
    nearest: '最近的',
    current: '本',
    nth: '第',
    index: '个',
    placeholder: '请选择',
    placeholderMulti: '请选择(支持多选)',
    help: '帮助',
    wordNumError: '格式不正确，必须有6或7位',
    reverse: '反向解析',
    reset: '重置',
    tagError: '表达式不正确',
    numError: '含有非法数字',
    use: '使用',
    inputPlaceholder: 'Cron表达式'
  },
  login: {
    title: '登录',
    email_label:'邮箱地址',
    psd_label:'密码',
    email: '请输入账户邮箱',
    psd: '请输入密码',
    name: 'Patsnap数据处理平台',
    sub_title:'快速进入您的数据处理工作.',
    forget_tip:'忘记了我的登录密码？',
    des: '智慧芽供内部人员使用的</br>数据处理平台<br /> 支持不同应用接入并自定义编排的</br>数据管道<br /> 可视化展示管理任务进展<br /> 并提供专业的数据工具支持和维护服务'
  },
  dashboard: {
    'DPP-Cost': '费用分析',
    'DPP-Monitor': '任务监控',
    'data-sync-monitor': '同步监控'
  },
  job: {
    title: '数据处理任务',
    task_name: '任务名称',
    task_type: '任务类型',
    own: '只看自己',
    task_id: '任务ID',
    time_range: '时间范围',
    multi_resend: '批量重发',
    multi_send: '批量发送',
    multi_statistics: '批量统计',
    multi_delete: '批量删除',
    done_all: '完成/全部',
    schdule_name: '定时任务',
    confirm_resend: '请确认是否重发您选中的 {counts} 条任务？（选中的所有任务会以默认的重试状态进行重发）',
    confirm_statisic: '请确认是否统计您选中的 {counts} 条任务？',
    confirm_delete: '请确认是否删除您选中的 {counts} 条任务？',
    all_items: '所有记录',
    success: '成功记录',
    unsucessful: '失败记录',
    retry:'重试记录',
    steps: '步骤列表',
    confirm_resend_items: "请确认是否重发您选中的 {counts} 条任务？（选中的所有任务会以默认的重试状态进行重发）。如果您选中的任务有'RUNNING'状态的，后台不会执行这些任务的重发。",
    confirm_send_items: "请确认是否发送您选中的 {counts} 条任务？如果您选中的任务有'RUNNING'状态的，后台不会执行这些任务的发送。",
    export: '导出',
    sub_task: "子任务",
    parent_task: '任务列表',
    sub_task_list: '子任务列表',
    confirm_change_task_status: '您确认要将此任务设置为{status}吗？',
    confirm_backup:'您确认要将任务 {name} 归档吗？',
    confirm_recovery:'您确认要将任务 {name} 还原吗？',
    create_form: {
      task_list: '任务列表',
      task_form: '任务表单',
      basic_info: '基础信息',
      console: 'Console模式',
      console_tip: '如果你打开了Console模式，那么任务会变得轻量化。它会去启动一个程序，当然，你需要提前创建一个服务。',
      template: '模版',
      template_tips: '模版是与您选择的任务类型联动的。',
      item_type: 'Item Type',
      commands: '指令',
      items: 'Items',
      service: '服务',
      input_path: '输入路径',
      input_path_tips: '如果您输入了多个文件，请用“；”分隔，或者您可以输入一个目录（必须以“/”结尾），并且您需要确认文件列表是正确的。',
      auto_resend_title: '自动重发',
      auto_resend: '是否开启',
      max_times: '最大次数',
      count: '任务重试次数',
      interval: '时间间隔（小时)',
      steps: '步骤配置',
      success_tip: '您已经成功编辑此任务！',
      not_save: '不保存',
      items_tips: '最多1000条',
      trigger_tips: `
      <ol 
      style='padding-left:20px;'>
      <li>不触发：默认不会触发新的任务</li>
      <li>手动触发：点击开启，你可能需要一次填写多个task信息，我们会为你创建好从第二个位置开始的所有task和所有item，但不会发送至MQ。你可以在前一个task状态为DONE后，点击<b>Start</b>，启动发送消息至MQ。</li>
      <li>自动触发：创建时操作与手动触发相同，不同的是，前一个任务状态为<b>DONE</b>时，当前位置的task会自动发送item至MQ</li>
      </ol>
      <small>注：该功能用于一个task的所有item都成功后才触发下一个任务（一次分发多个task场景不适用）。</small>
      `,
      trigger_way: '触发方式',
      not_trigger: '不触发',
      manu_trigger: '手动触发',
      auto_trigger: '自动触发',
      continue_edit: '继续编辑',
      pre: '上一步',
      next: '下一步',
      change_to_not_trigger: '如果您选择不触发此任务，需要确保此任务为最后一个任务，此操作会删除此任务后面的所有任务，是否继续?',
      before_pre_task: '您还未保存这个任务的数据，您需要保存之后再前往上一步吗?',
      preview_cancel_tip: '取消此次编辑任务，您填写的数据将不进行保存，是否继续取消?',
      step: {
        name: '步骤',
        service_type: '服务类型',
        step_name: '步骤名称',
        service_config: '服务',
        service_config_tips: '服务列表是与您选择的服务类型联动的。',
        deadline: '最后期限时间',
        deadline_hour: '最后期限（小时）',
        deadline_hour_tip: '这个值是创建定时任务后需要设置的。如果不想设置最后期限，可以设置0。',
        handles: '处理函数',
        handler_tips: '处理函数列表是与您选择的任务类型联动的。',
        distribute: '是否分发',
        item_batch: 'Item Batch',
        delete_tip: '您确认要删除吗？',
        remove_error: '原始步骤不能删除。',
        filter_fileds: '过滤参数',
        add_context_key: '添加',
        step_by_step_edit:'步骤信息',
        view_edit:'可视化拖拽',
        step_info:'步骤信息',
        filter_keys:'过滤参数',
        add_step:'添加步骤',
        edit_step:'编辑步骤信息'
      }
    },
    task_records: {
      title: '任务记录',
      sub_title: '您可以勾选要转换的数据；如果不勾选，则可以转换所有数据。您可以展开表的每一行以查看更多信息。',
      from: '源任务',
      from_status: '源状态',
      to: '目标任务',
      to_status: '目标状态',
      inprocess_step: '进程步骤',
      key: 'Key',
      error: '错误信息',
      next: '下一个',
      transfer_all: '您还没有选中数据，您是要操作所有的数据吗？',
      context: 'Context',
      result: '结果',
      statisic: '统计',
      lifecycle: '生命周期',
    },
    task_steps: {
      tip: '当前共查询到<span>{counts}</span>条数据。该按钮提供查询有可能变化的step信息功能，并非实时信息。',
      title: '任务步骤',
      index: '序列',
      name: '步骤名',
      success: '成功',
      retry: '重试',
      fail: '失败',
      pending: '待处理',
      queue_size: '队列大小',
      dequeue: '出队列',
      enqueue: '进队列',
      delete_queue: '这是一条数据,确认清空队列吗'
    },
    task_export: {
      title: '任务导出',
      fields: '其他字段',
      split: '以逗号分隔'
    },
    detail: {
      title: '任务详情',
      id: '任务ID',
      finish: '已完成',
      total: '总任务',
      step_flow: '步骤流程',
      step_list: '步骤列表',
      chart: '图表',
      table: '详细数据',
      step_flow_tip:'点击步骤节点可以查看步骤更多信息',
      step_detail_charts:'步骤运行情况'
    }
  },
  lifecycle: {
    title: '生命周期',
    sub_title: '通过输入专利号，以步骤条的形式展示完整的数据服务生命周期，方便您追溯服务记录，发现异常问题。与kinaba数据集成 保持最近一周数据。',
    search_placeholder: '请输入专利号或者ID'
  },
  task_type: {
    title: '任务类型',
    name: '类型名称',
    category: '类别',
    is_mq:'是否通过MQ创建任务'
  },
  service_config: {
    title: '服务配置',
    name: '服务名称',
    queue_name: '队列名称',
    enable: '是否可用',
    launch_type: '启动方式',
    queue_size: '队列大小',
    rate: '速率（每分钟）',
    auto_scaling: '自动伸缩',
    image_is_not_latest_list: '当前镜像不是最新版本。',
    create_form: {
      vpc: 'SUBNET',
      task_define: '任务定义',
      cluster: '集群',
      profiles: 'Profiles',
      chart_name: 'Chart Name',
      namespace: '空间',
      commands: '指令',
      mq_type:'MQ类型',
      auto_scaling_anable: '开启自动伸缩',
      auto_config_id: '自动伸缩',
      tips: '如果启动方式选择了“FARGATE”，cpu和内存将在“任务定义”中设置值，它们不能被更改。',
      cpu: 'CPU资源',
      memory: '内存资源',
      avaliable_task_counts: '可用任务数',
      avaliable_task_counts_tips: '请确认集群名称，CPU，内存三个参数已经选择。',
      image_is_not_latest: '镜像不是最新版本。',
      change_to_latest_image: '使用最新版本',
      docker_url: 'Docker地址',
      desire_size: '期望任务大小',
      is_machine:'机器伸缩',
      machine_tips:'开启机器伸缩，dpp将使用设置的AWSAutoScalingGroup去伸缩服务'
    },
    stop_service_tip: 'Service配置修改后需要重启应用才能生效，确认是否立刻重启？',
    task_list: '任务列表',
    running: '查看任务',
    stop: '您确定要停止此服务配置吗？',
    stopped: '停止任务',
    exit_code: 'Exit Code',
    stop_reason: '停止原因'
  },
  emr_service: {
    title: 'EMR服务配置',
    name: '名称',
    tag: '标签',
    status: '状态',
    user: "创建人",
    params: '参数信息',
    stop: '您确定要停止名为 {name} 的EMR服务配置吗？',
    stop_done: '停止成功',
    help_more: '更多帮助信息'
  },
  autoscaling: {
    title: '自动伸缩配置',
    name: '服务名称',
    max: '最大任务数',
    min: '最小任务数',
    require: '需求任务数量',
    queue: '任务队列数量',
  },
  handler: {
    title: '函数配置',
    name: '名称',
    tips: '当前共查询到<span>{counts}</span>条数据，展开可以查看每条数据的详细JSON格式信息。',
    env: '运行环境',
    path: '路径',
    meta: '附带信息',
    type: '类型',
  },
  detect: {
    title: '定时任务配置',
    sub_title: '探测配置， 由于大部分爬虫，解析都是周期性的任务。 所以在以尽量减少人工干预的设想出发， 开发了探测服务。 服务将会周期性地执行配置好的探测配置。',
    name: '名称',
    type: '类型',
    cron: 'CRON',
    interval: '执行间隔',
    next: '下次执行时间',
    email: '邮箱',
    template: '模版',
    date_value: '日期值',
    time_forward: 'Forward',
    comment: '备注',
    console: '控制台',
    console_tip: "如果打开“控制台”开关，任务类型将被设置为控制台，定时任务将变得简洁。创建该定时任务是为了定期执行程序。",
    runtime: '运行时间',
    runtime_tip: `
    <ul><li>“每周” : 则远期时间单位为周，日期值表示一周中的一天。</li><li>“每月” ：则远期时间单位为月。</li><li>“每天” ：则向前的时间单位为天。</li><li>   例如，如果选择“Weekly”（每周）和“date_value”（日期值）选择4，而“time_forward”（时间向前）选择1，则任务的日期将从上周四到本周三。</li>
     </ul>`,
    logs: '操作日志',
    next_context: '下次运行时间概览'
  },
  temlpate: {
    title: '任务模板配置',
    sub_title: '任务模板：可以让用户创建一个基础的任务模板。 任务模板可以在多个地方被使用到， 例如创建任务， 创建定时任务场景等。',
    name: '模版名称',
    detail: '模版详情'
  },
  context_keys: {
    title: '任务参数配置',
    key: '参数名',
    type: '参数类型',
    remark: '备注',
  },
  task_alert: {
    title: '任务报警',
    sub_title: "此功能模块主要配合任务告警闭环实现，当task出现在超出设置时间后还呈现未完成状态的情况， dpp平台会想ops发起消息告警，并记录alter id在pg中，在owner处理完毕task后，可手动close告警，以形成告警功能闭环的效果。",
    id: '报警ID',
    user_name: '用户名',
    content: '内容',
    stop: '您确定要关闭ID为 {name} 的报警任务吗？'
  },
  data_api: {
    title: 'Data API',
    sub_title: 'Data API主要提供根据pn号查询dynamodb数据的功能，查询结果以JSON格式展示，您可以方便的点击或者收起JSON对象进行查看。',
    key: '专利号',
    key_required: '请输入专利号',
    key_placeholder: '若批量查询，可输入多个标签，按回车分隔',
    key_max_length: '最多输入十条',
    table: '表',
    result: '加载结果',
    source: '源文件',
    type: '类型',
    parser: '解析器',
    patent: 'Patent',
    biblio: 'Biblio',
    legal: 'Legal',
    family: 'Family',
    none: '暂无',
    no_search: '暂无搜索结果'
  },
  glacier: {
    title: 'Glacier List',
    restore: '恢复文件',
    duration: '时长',
    options: '检索选项',
    list: 'List File',
    path: '文件路径',
    last_time: 'Last Time',
    error_message: '错误信息',
    fail_file: '失败文件'
  },
  coverage: {
    title: '数据范围管理',
    sub_title: '数据范围管理，并将结果分为三项：主要国家，其他国家，不在线。',
    main: '主要国家',
    other: '其他国家',
    offline: '不在线',
    start: '起始记录',
    start_time: '开始时间',
    country: '国家代码',
    patent_type: '专利类型',
    field:'字段类型',
    coverage:'字段覆盖',
    biblio: '著录项',
    fulltext: '全文',
    pdf: 'PDF',
    legal: '法律状态',
    family: '专利家族',
    citation: '引证信息',
    country_type: '国家类型',
    edit_form:{
      country_code_required:'请选择国家代码',
      patent_type_required:'请选择专利类型',
      patent_type_tip:'专利类型是与国家代码是联动的',
      start_time_required:'开始时间是必填的',
      start_time_range:'起始时间需要在1782/01/01和当前时间范围之内',
      fulltext_start_time:'全文的起始时间必须大于等于著录项的起始时间',
      pdf_start_time:'pdf的起始时间必须大于等于著录项的起始时间'
   },
   add_country_form:{
     title:'新增国家代码名称',
     country_required:'请输入国家代码',
     uppercase_required:'国家代码必须为大写字母',
     length_reuired:'国家代码长度必须为2位',
   }
  },
  athena: {
    query: '输入查询',
    saved_btn: '保存',
    schedule_btn: '定时',
    query_title: '输入查询',
    saved_title: '保存查询',
    schedule_title: '定时查询',
    history_title: '查询历史',
    analysis_title: '统计分析',
    accounts: '账号',
    database: '数据库',
    tables: '表',
    filter: '输入表名过滤...',
    view_colums: '查看所有列',
    preview: '预览',
    ddl: '生成 DDL',
    drop: '删除该表',
    copy_table_name: '复制表名',
    run: '运行查询',
    auto_with_download_url: '文件下载地址',
    format: '格式化',
    light: '亮色',
    dark: '暗色',
    results: '查询结果',
    result_tip: '最多显示100条数据',
    result_total_pre: '当前共显示',
    result_total_aft: '条数据。',
    get_location: '获取文件下载地址...',
    editor_tip_title: '您需要知道的',
    editor_tip_one: '您可以对您的数据运行符合ANSI-SQL规则的查询。 ',
    editor_tip_one_link: 'SQL/DDL 参考文档.',
    download: '下载查询结果',
    fail: '获取链接失败',
    copy: '复制S3路径',
    fullscreen: '全屏查看',
    nodata: '暂无结果，您可以现在开始进行查询',
    total: '当前共查询到<span>{counts}</span>条数据， 您可以将鼠标悬浮在SQL列查看完整格式化的SQL语句。',
    sql: 'SQL',
    search_tag: 'SQL/QueryId',
    sql_required: '请输入有效的SQL语句',
    result_error_timeout: '查询超时，可能存在后台仍在执行此查询的情况，您可以到历史查询记录查看更多情况。',
    confirm_stop_query: '您确定要终止此查询任务吗？',
    get_params: '获取字段中...',
    quering: '查询中',
    export_excel: '导出Excel',
    stop_query: '停止查询',
    history_sql: '历史语句',
    insert: '插入',
    format_icon: '点击图标格式化SQL代码',
    search_records: '搜索记录',
    saved_list: '已保存语句',
    code_theme_icon: '点击图标切换代码编辑器主题',
    items: '条',
    query_with_no_result: '查询已完成，但是没有查询结果。',
    no_query:'您还没有运行查询任务',
    edit_query: {
      schedule_name: '名称',
      name_error: '名称只能由数字或英文组成',
      saved_name: '名称',
      period: '执行时间',
      last: '最近执行时间',
      enable: '是否可用',
      true: '可用',
      false: '不可用',
      total: '当前共查询到<span>{counts}</span>条数据， 您可以将鼠标悬浮在SQL列查看完整格式化的SQL语句。',
      result_view: "查看执行结果",
      period_tip: '以天为单位；如果设置为默认值零，则会一小时执行一次。',
      confirm_refresh_tip: '您确认要立即执行 {name} 这个查询任务吗？',
      refresh_tip: '点击刷新，此查询任务将会立即执行。',
      refresh_success: '刷新操作已经触发成功，您可以前往查询记录页面查看相关查询结果的信息。',
      query_id: '查询ID为：',
      query_info_page: '前往查询结果',
      click_name_view_result: '点击查看执行结果',
    },
    history: {
      time: '查询时间',
      sql_id: 'SQL/ID',
      id: '查询ID',
      run_times: '平台运行时间',
      message: '信息',
      location: 'S3地址',
      retry: '获取下载地址',
      info: '执行信息'
    },
    analysis: {
      title: '统计分析',
      time: '时间范围',
      three: "三天内",
      seven: '一周内',
      fifteen: '半个月内',
      thirty: '一个月内',
      ninety: '三个月内',
      view_all_people: '查看所有人',
      counts: '查询数量概览情况',
      all: '总共查询',
      account_first: '0066账户',
      account_second: '7478账户',
      account_ring: '账户查询占比情况',
      person_all_ring: '表查询占比情况',
      person_table: '日期查询次数分布情况',
      all_people_counts_line: '用户查询次数TOP10分布',
      all_people_table_line: '最多被查询的表名',
      nodata: '未查询到数据',
      counts_total: '查询次数',
      username: '用户名',
      chart_options: '图表选项',
      options: '选项',
      pre: '前',
      show: '显示'
    }
  },
  fix_manual: {
    title: '人工数据修正',
    sub_title: '人工修正数据，您需要首先载入数据，然后可以进行对比，且在右侧编辑区域进行修改，修改完成后需要点击检查，若检查通过，您可以保存修改。',
    save: '保存修改',
    reset: "重置修改",
    check: '检查',
    patent_id: '专利ID/专利号',
    type: '修正数据表',
    load: '载入数据',
    source_data: '源数据',
    edit_data: '编辑数据',
    record: '修改记录',
    query: '请输入CFD进行查询',
    total: '当前共查询到<span>{counts}</span>条数据,点击表格第一列的展开图标，您可以方便的查看JSON的修改记录。',
    cfd: 'CFD',
    operate_table: '操作表',
    operate_type: '操作类型',
  },
  user: {
    title: '用户管理',
    role: '用户角色',
    psd: '密码',
    confirm_psd: '确认密码',
    last: '最近登录时间',
    enable: '是否可用',
    name: '用户名',
    reset_psd: '重置密码',
    migrate: '迁移',
    input_psd: '请输入新密码',
    delete: '删除用户',
    migrate_to: '迁移目标用户',
    tips: '迁移任务将选择一个用户接收任务，或者删除操作将直接删除该用户拥有的任务，不推荐！',
    source_task: '源任务',
    target_task: '目标任务',
    resume_task: '恢复'
  },
  role: {
    title: '角色管理',
    name: '角色名称',
    list: '角色列表',
    menu: '菜单分配',
    table_total: '当前共查询到<span>{counts}</span>条数据。点击列表的每一行，右边区域会显示相应的菜单分配情况。',
  },
  menu_config: {
    title: '菜单管理',
    name: '菜单名称',
    order: '菜单排序',
    category: '上级层级',
    function_name: '按钮名称',
    function_api: '对应接口',
    type: '菜单类型',
    menu: '菜单',
    function: '功能',
    visible: '是否可见',
    visible_tip: '如果您选择不可见，则在菜单栏里面则不会看见此菜单。',
    tree_select_placeholder: '选择上级类目',
    router: '路由地址',
    confirm_delete: '确定删除吗,如果存在下级节点则一并删除，此操作不能撤销！'
  },
  category: {
    title: '分组',
    name: '分组名称'
  },
  version: {
    title: '版本控制',
    sub_title: '您可以更新此平台的版本更新，每个用户都可以在发布日志页中查看更新。',
    summary: '摘要',
    version: '版本号',
    content: '更新内容',
    notify: '是否通知',
    time: '更新时间',
  },
  other: {
    403: '抱歉，您无权访问该页面',
    back: '返回首页',
    404: '抱歉，您访问的页面不存在',
    edit_done: '编辑成功',
    search_input_nav: '您已经在任务列表页面，请在此页面搜索框中进行搜索。',
    input_sql: '请检查您是否输入SQL语句或者是否选择了正确的Account和Database。',
    copy_done: '复制成功'
  },
  accounts: {
    change_password: {
      title: '修改密码',
      done: '修改密码成功!',
      confirm_btn: '确认修改',
      old: '旧密码',
      old_required: '请填写旧密码',
      new: '新密码',
      new_required: '请填写新密码',
      new_min: '长度最小6位字符',
      confirm: '确认密码',
      confirm_required: '请填写确认密码',
      same: '两次输入密码不一致!'
    },
    forget_password: {
      title: '忘记密码',
      name: '请输入账户邮箱',
      get_code: '获取验证码',
      resend: '重新获取 {time} s',
      code: '验证码',
      code_required: '请填写验证码',
      send_code_done: '验证码已发送,请前往邮箱查看。',
      reset_done: '重置密码成功，请前往登录。',
      confirm: '确认',
      back: '返回登录'
    }
  },
  error: {
    required: '不能为空',
    email: '请输入正确的邮箱格式',
  }
}