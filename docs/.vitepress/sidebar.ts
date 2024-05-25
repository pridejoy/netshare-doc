export default {
    // 当用户位于 `guide` 目录时，会显示此侧边栏
    '/guid/': [
        {
            text: '开始',
            items: [
                { text: '简介', link: '/guid/intro' },
                { text: '快速上手', link: '/guid/quick-start' },
                { text: '学习路径', link: '/guid/learn-path' },
            ],
        },
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
                {
                    text: '数据库操作',
                    base: '/guid/orm',
                    collapsed: true,
                    items: [
                        { text: 'SqlSugar', link: '/sqlsugar' },
                        { text: 'EF', link: '/ef' },
                    ],
                    link: '',
                },
                { text: '对象关系映射', link: '/guid/mapper' },
                { text: '异常处理', link: '/guid/exception-handling' },
                { text: '依赖注入/控制反转', link: '/guid/dependency-injection' },
                { text: '缓存', link: '/guid/cache' },
                { text: '安全鉴权', link: '/guid/auth' },
                { text: '日志', link: '/guid/log' },
                // {
                //     text: '管道',
                //     link: '/guid/piping/',
                //     collapsed: true,
                //     items: [
                //         { text: '过滤器', link: '/guid/piping/filter' },
                //         { text: '中间件', link: '/guid/piping/middleware' },
                //     ],
                // },
                { text: '实时应用', link: '/guid/signalr' },
                {
                    text: '后台服务',
                    base: '/guid/service',
                    collapsed: true,
                    items: [
                        { text: 'IHostedService', link: '/background-service' },
                        { text: 'Quartz定时任务', link: '/quartz-service' },
                        {
                            text: '安装为服务',
                            base: '/guid/service/install',
                            collapsed: true,
                            items: [
                                { text: '微软服务', link: '/use-windows-server' },
                                { text: 'Topshelf ', link: '/topshelf' },
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
                { text: 'DotNet', link: '/command/dotnet' },
                { text: 'Sqlserver', link: '/command/sqlserver' },
                { text: 'Nginx', link: '/command/nginx' },
                { text: 'Pm2', link: '/command/pm2' },
                { text: 'Redis', link: '/command/redis' },
                { text: 'RabbitMQ', link: '/command/rabbitmq' },
                { text: 'Docker', link: '/command/docker' },
                { text: 'Git', link: '/command/git' },
                { text: 'Certbot', link: '/command/certbot' },
            ],
        },
    ],
    '/netopensource/': [
        {
            text: '开源库',
            collapsed: false,
            items: [
                { text: 'ORM', link: '/netopensource/library/orm' },
                { text: 'Zip', link: '/netopensource/library/dotnetzip' },
                { text: 'Excel', link: '/netopensource/library/excel' },
                { text: 'Word', link: '/netopensource/library/word' },
                { text: 'Pdf', link: '/netopensource/library/pdf' },
                { text: '条形码二维码', link: '/netopensource/library/qrcode' },
                { text: '工具库', link: '/netopensource/library/tool' },
                { text: 'Redis', link: '/netopensource/library/redis' }, 
                { text: '其他库', link: '/netopensource/library/other' },
            ],
        },
        {
            text: '开源项目',
            collapsed: false,
            items: [
                { text: 'Web-后台管理', link: '/netopensource/project/web-admin' },
                { text: '博客', link: '/netopensource/project/blog' },
                { text: 'Wpf', link: '/netopensource/project/wpf' },
                { text: '其他', link: '/netopensource/project/other' },
            ],
        },
    ],
    '/interview/': [
        {
            text: '面试题',
            collapsed: false,
            items: [
                { text: '240422-zy面试题', link: '/interview/zhiying' },
                { text: '240422-物流高级面试题', link: '/interview/yuehai' },
                { text: '240306-基础试题1', link: '/interview/basepaper1' },
                { text: '240306-随机试卷1', link: '/interview/randompaper1' },
                { text: '240306-随机试卷2', link: '/interview/randompaper2' },
                { text: '240306-中高级开发工程师', link: '/interview/intermediate1' },
            ],
        },
    ],
    '/article/': [
        {
            text: '学习系列',
            items: [
                {
                    text: 'TS快速上手',
                    collapsed: true,
                    items: [
                        {
                            text: '1. 基础类型',
                            link: '/article/learn_ts/1_type',
                        },
                        { text: '2. 接口', link: '/article/learn_ts/2_interface' },
                        { text: '3. 类', link: '/article/learn_ts/3_class' },
                        { text: '4. 函数', link: '/article/learn_ts/4_function' },
                        { text: '5. 泛型', link: '/article/learn_ts/5_generic' },
                        { text: '6. 其它', link: '/article/learn_ts/6_other' },
                    ],
                },
                {
                    text: '十大排序',
                    collapsed: true,
                    items: [
                        { text: '1.冒泡排序', link: '/article/learn_sort/01_bubblesort' },
                        { text: '2.选择排序', link: '/article/learn_sort/02_selectionsort' },
                        { text: '3.插入排序', link: '/article/learn_sort/03_insertionsort' },
                        { text: '4.希尔排序', link: '/article/learn_sort/04_shellsort' },
                        { text: '5.归并排序', link: '/article/learn_sort/05_mergesort' },
                        { text: '6.快速排序', link: '/article/learn_sort/06_quicksort' },
                        { text: '7.堆排序', link: '/article/learn_sort/07_heapsort' },
                        { text: '8.计数排序', link: '/article/learn_sort/08_countingsort' },
                        { text: '9.桶排序', link: '/article/learn_sort/09_bucketsort' },
                        { text: '10.基数排序', link: '/article/learn_sort/10_radixsort' },
                    ],
                },
                {
                    text: '设计模式',
                    collapsed: true,
                    items: [{ text: '创建型模式', link: '/article/learn_design/01_creationtype' }],
                },
            ],
        },
        {
            text: '文章',
            items: [
                {
                    text: '1. CentOS上Nginx用Certbot生成SSL证书',
                    link: '/article/centos-nginx-cerbot-ssl',
                },
                { text: '2.HttpClient的简单用法', link: '/article/httpclient' },
                { text: '3.全局和隐式usings', link: '/article/globalusing' },
            ],
        },
        {
            text: '前端',
            items: [
                { text: 'NVM快速切换NodeJS版本', link: '/article/nvm' },
                { text: '快速删除node_modules文件夹', link: '/article/delete_mode_moules' },
            ],
        },
    ],
};
