import { defineConfig, type DefaultTheme } from 'vitepress';
// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'NetShare',
    description: 'A VitePress Site',
    lastUpdated: true,
    sitemap: {
        hostname: 'http://localhost:5173/',
    },
    themeConfig: {
        logo: '/icon/logo.png',
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: '首页', link: '/' },
            { text: '指南', link: '/guid/' },
            { text: '常用命令', link: '/command/' },
            {
                text: '开源',
                link: '/netopensource/',
            },
            {
                text: '其他',
                link: '/article/',
            },
        ],
        sidebar: {
            // 当用户位于 `guide` 目录时，会显示此侧边栏
            '/guid/': [
                {
                    text: '指南',
                    // collapsed: false,
                    items: [
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
                                    base: '/install',
                                    collapsed: true,
                                    items: [
                                        { text: 'Topshelf ', link: '/topshelf' },
                                        { text: '安装服务', base: '/install' },
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
                                {
                                    text: 'Linux上使用PM2',
                                    link: '/linux-pm2-deployment',
                                },
                                {
                                    text: 'Linux上使用Systemd',
                                    link: '/linux-systemd-deployment',
                                },
                                { text: 'IIS部署', link: '/win-iis-deployment' },
                            ],
                        },
                    ],
                },
            ],
            '/command/': [
                {
                    text: '命令',
                    items: [
                        { text: 'Docker', link: '/command/docker' },
                        { text: 'Nginx', link: '/command/nginx' },
                        { text: 'Pm2', link: '/command/pm2' },
                        { text: 'Redis', link: '/command/redis' },
                        { text: 'Sqlserver', link: '/command/sqlserver' },
                    ],
                },
            ],
            '/netopensource/': [
                {
                    text: '开源',
                    collapsed: false,
                    items: [{ text: '开源库', link: '/netopensource/library' }],
                },
            ],
        },
        // socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
        footer: {
            message: '基于 MIT 许可发布',
            copyright: `版权所有 © 2019-${new Date().getFullYear()} NetShare`,
        },
        search: {
            provider: 'local',
        },
        docFooter: {
            prev: '上一页',
            next: '下一页',
        },

        outline: {
            label: '页面导航',
        },

        lastUpdated: {
            text: '最后更新于',
            formatOptions: {
                dateStyle: 'short',
                timeStyle: 'medium',
            },
        },
        langMenuLabel: '多语言',
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',
    },
});
