export const routes = [
    // 默认版本
    {
        name: '首页',
        path: '/app',
        abstract: true,
        widgetName: '',
        children: [
            {
                name: '所有信息',
                path: '/appIndex',
                default: true,
                vipName: '所有信息',
                widgetName: '',
            },
        ],
    },
    // 售后服务工单的路由
    {
        name: '工单小程序管理',
        path: '/video',
        abstract: true,
        from: 'afterSales',
        children: [
            {
                name: '工单小程序管理',
                path: '/videoIndex',
                default: true,
                childName: '',
            },
            {
                name: '工单小程序管理',
                path: '/orderDealHandle',
                childName: '处理工单',
            },
            {
                name: '工单小程序管理',
                path: '/orderAppUpdate',
                childName: '安装服务',
            },
        ],
    },
];
export const defaultPath = '/app/appIndex';
