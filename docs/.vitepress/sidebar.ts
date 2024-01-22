export default {
    // 当用户位于 `guide` 目录时，会显示此侧边栏
    '/guid/': [
        {
            text: '指南',
            // collapsed: false,
            items: [
                { text: '前言', link: '/guid/easy-use' },
                { text: '数据校验', link: '/guid/datavalidation' },
                {
                    text: '配置与选项',
                    base: '/guid/conf-options',
                    collapsed: true,
                    items: [
                        { text: '配置', link: '/configuration' },
                        { text: '选项', link: '/options' },
                    ],
                },
                { text: '跨域', link: '/guid/cors' },
                { text: 'Swagger', link: '/guid/swagger' },
                { text: 'SqlSugar', link: '/guid/sqlsugar' },
                { text: '对象关系映射', link: '/guid/mapper' },
                { text: '异常处理', link: '/guid/exception-handling' },
                { text: '依赖注入/控制反转', link: '/guid/dependency-injection' },
                { text: '缓存', link: '/guid/cache' },
                { text: '安全鉴权', link: '/guid/auth' },
                { text: '日志', link: '/guid/auth' },
                {
                    text: '中间件',
                    base: '/guid/conf-options',
                    collapsed: true,
                    items: [
                        { text: '过滤器', link: '/configuration' },
                        { text: '自定义中间件', link: '/options' },
                    ],
                },
                { text: '实时应用', link: '/guid/signalr' },
                {
                    text: '后台服务',
                    base: '/guid/service',
                    collapsed: true,
                    items: [
                        { text: 'IHostedService', link: '/background-service' },
                        {
                            text: '安装服务',
                            base: '/guid/service/install',
                            collapsed: true,
                            items: [
                                { text: 'Topshelf ', link: '/topshelf' },
                                { text: '微软服务', link: '/use-windows-server' },
                            ],
                        },
                    ],
                },
                {
                    text: '部署',
                    base: '/guid/deployment',
                    collapsed: true,
                    items: [
                        { text: 'Docker部署', link: '/docker-deployment' },
                        { text: '使用PM2守护', link: '/linux-pm2-deployment' },
                        { text: '使用Supervisor守护', link: '/supervisor-dotnet' },
                        { text: '使用Systemd守护', link: '/linux-systemd-deployment' },
                        { text: 'IIS部署', link: '/win-iis-deployment' },
                    ],
                },
            ],
        },
    ],
    '/command/': [
        {
            text: '常用软件安装和命令',
            items: [
                { text: '1.DotNet', link: '/command/dotnet' },
                { text: '2.Sqlserver', link: '/command/sqlserver' },
                { text: '3.Nginx', link: '/command/nginx' },
                { text: '4.Pm2', link: '/command/pm2' },
                { text: '5.Redis', link: '/command/redis' },
                { text: '6.RabbitMQ', link: '/command/rabbitmq' },
                { text: '7.Docker', link: '/command/docker' },
            ],
        },
    ],
    '/netopensource/': [
        {
            text: '开源',
            collapsed: false,
            items: [
                { text: '开源库', link: '/netopensource/library' },
                { text: '开源项目', link: '/netopensource/project' },
            ],
        },
    ],
};
