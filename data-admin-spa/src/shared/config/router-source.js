const routerSourceConfig = [
    {
        path: '/',
        name: 'layout',
        redirect: 'dashboard',
        component: () => import('@/views/layout/Layout'),
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                component: () => import('@/views/dashboard/index')
            },
            {
                path: 'job',
                component: () => import('@/views/task/index'),
                children: [
                    {
                        path: '',
                        component: () => import('@/views/task/TaskList'),
                    },
                    {
                        path: 'create-task',
                        name: 'create-task',
                        component: () => import('@/views/task/TaskForm'),
                    },
                    {
                        path: 'sub-task',
                        component: () => import('@/views/task/SubTask'),
                    },
                    {
                        path: 'detail',
                        name: "/job/detail",
                        component: () => import('@/views/task/TaskDetail'),
                    }
                ]
            },
            {
                path: 'config',
                component: () => import('@/views/config/index'),
                children: [
                    {
                        path: 'task-type',
                        component: () => import('@/views/config/taskType/index'),
                    },
                    {
                        path: 'service',
                        component: () => import('@/views/config/serviceConfig/index'),
                    },
                    {
                        path: 'auto-scaling',
                        component: () => import('@/views/config/autoScalingConfig/index')
                    },
                    {
                        path: 'handler',
                        component: () => import('@/views/config/handlerConfig/index')
                    },
                    {
                        path: 'schedule',
                        component: () => import('@/views/config/detectConfig/index')
                    },
                    {
                        path: 'template',
                        component: () => import('@/views/config/templateConfig/index'),
                    },
                    {
                        path: 'context-keys',
                        component: () => import('@/views/config/contextKeys/index')
                    },
                    {
                        path: 'task-alert',
                        component: () => import('@/views/config/taskAlert/index')
                    }
                ]
            },
            {
                path: 'tools',
                component: () => import('@/views/tools/index'),
                children: [
                    {
                        path: 'emr-service',
                        component: () => import('@/views/config/emr-service-config/EmrService'),
                    },
                    {
                        path: 'data-api',
                        component: () => import('@/views/tools/dataApi/index')
                    },
                    {
                        path: 'glacier',
                        component: () => import('@/views/tools/glacier/index')
                    },
                    {
                        path: 'data-coverage',
                        component: () => import('@/views/tools/dataCoverage/index'),
                    },
                    {
                        path: 'solr-notify',
                        component: () => import('@/views/tools/solrNotify/index')
                    },
                    {
                        path: 'athena',
                        component: () => import('@/views/tools/athena/index'),
                        // redirect: 'athena/query',
                        children: [
                            // {
                            //     path: 'query',
                            //     component: () => import('@/views/tools/athena/Query'),
                            // },
                            {
                                path: 'saved',
                                component: () => import('@/views/tools/athena/SavedQueryList'),
                            },
                            {
                                path: 'schedule',
                                component: () => import('@/views/tools/athena/ScheduleQueryList'),
                            },
                            {
                                path: 'history',
                                component: () => import('@/views/tools/athena/HistoryList'),
                            },
                            {
                                path: 'analysis',
                                component: () => import('@/views/tools/athena/AthenaAnalysis'),
                            },
                            {
                                path:'widgets',
                                component:()=>import('@/views/tools/athena/WidgetCharts')
                            }
                        ]
                    },
                    {
                        path: 'fix',
                        component: () => import('@/views/tools/fix/index'),
                    }
                ]
            },
            {
                path: 'system',
                component: () => import('@/views/system/index'),
                children: [
                    {
                        path: 'user',
                        component: () => import('@/views/system/user/index')
                    },
                    {
                        path: 'role',
                        component: () => import('@/views/system/role/index')
                    },
                    {
                        path: 'menu',
                        component: () => import('@/views/system/menu/index')
                    },
                    {
                        path: 'category',
                        component: () => import('@/views/system/category/index'),
                    },
                    {
                        path: 'version-control',
                        component: () => import('@/views/system/versionControl/index'),
                    }
                ]
            },
            {
                path: 'life-cycle',
                component: () => import('@/views/lifecycle/index'),
                children: [
                    {
                        path: '',
                        name: 'life-cycle',
                        component: () => import('@/views/lifecycle/TimeLines'),
                    },
                    {
                        path: 'logs',
                        name: '/life-cycle/logs',
                        component: () => import('@/views/lifecycle/Logs'),
                    }
                ]
            },
            {
                path: 'accounts',
                component: () => import('@/views/accounts/index'),
                children: [
                    {
                        path: 'change-password',
                        component: () => import('@/views/accounts/ChangePassword')
                    }
                ]
            }

        ]
    },
    {
        path: '/others',
        component: () => import('@/views/others/index'),
        children: [
            {
                path: 'release',
                component: () => import('@/views/others/Release'),
            }
        ]
    },
    { path: '*', redirect: '/404', hidden: true },
    { path: '/404', component: () => import('@/views/error/404'), hidden: true },
    { path: '/401', component: () => import('@/views/error/401'), hidden: true },
    {
        path: '/auth',
        component: () => import('@/views/auth/index'),
        redirect: 'auth/login',
        children:[
            {
                path:'login',
                component:()=>import('@/views/auth/Login')
            },
            {
                path:'forget-password',
                component:()=>import('@/views/auth/ForgetPassword')
            }
        ]
    },
]

export default {
    ROUTER_SOURCE_CONFIG: routerSourceConfig
}