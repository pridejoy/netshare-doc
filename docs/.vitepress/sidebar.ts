export default {
  // 当用户位于 `guide` 目录时，会显示此侧边栏
  '/guid/': [
    {
      text: '指南',
      // collapsed: false,
      items: [
        { text: '开始', link: '/guid/intro' },
        { text: '数据校验', link: '/guid/datavalidation' },
        {
          text: '配置与选项',
          base: '/guid/conf-options',
          items: [
            { text: '配置', link: '/configuration' },
            { text: '选项', link: '/options' },
          ],
        },
        { text: '跨域处理', link: '/guid/cors' },
        {
          text: '开放接口', base: '/guid/openapi',
          items: [
            { text: 'Swagger', link: '/swagger' },
            { text: '规范化返回值', link: '/standard' },
          ],
        },
        {
          text: '数据库操作',
          base: '/guid/orm',
          items: [
            { text: 'SqlSugar', link: '/sqlsugar' },
            { text: 'EF', link: '/ef' },
          ],
          link: '',
        },
        { text: '对象关系映射', link: '/guid/mapper' },
        { text: '异常处理', link: '/guid/exception-handling' },
        { text: '依赖注入/控制反转', link: '/guid/dependency-injection' },
        { text: '缓存管理', link: '/guid/cache' },
        { text: '安全鉴权', link: '/guid/auth' },
        { text: '日志管理', link: '/guid/log' },
        {
          text: '中间件',
          link: '/guid/middleware/',
        },
        { text: '实时应用', link: '/guid/signalr' },
        {
          text: '进程服务',
          base: '/guid/service',
          items: [
            { text: '后台服务', link: '/background-service' },
            { text: '安装部署', link: '/install' }
          ],
        },
        {
          text: '托管部署',
          base: '/guid/deployment',
          items: [
            { text: 'IIS部署', link: '/win-iis-deployment' },
            { text: 'Docker部署', link: '/docker-deployment' },
            { text: '使用PM2守护', link: '/linux-pm2-deployment' },
            { text: '使用Supervisor守护', link: '/supervisor-dotnet' },
            { text: '使用Systemd守护', link: '/linux-systemd-deployment' },

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
        { text: 'Linux', link: '/command/linux' },
        { text: 'Vim', link: '/command/vim' },
      ],
    },
  ],
  '/netopensource/': [
    {
      text: '工具库',
      collapsed: true,
      items: [
        { text: 'ORM', link: '/netopensource/library/orm' },
        { text: 'Zip', link: '/netopensource/library/dotnetzip' },
        { text: 'Excel', link: '/netopensource/library/excel' },
        { text: 'Word', link: '/netopensource/library/word' },
        { text: 'Pdf', link: '/netopensource/library/pdf' },
        { text: '条形码二维码', link: '/netopensource/library/qrcode' },
        { text: '工具库', link: '/netopensource/library/tool' },
        { text: 'Redis', link: '/netopensource/library/redis' },
        { text: '加密解密', link: '/netopensource/library/encryption' },
        { text: '其他库', link: '/netopensource/library/other' },
      ],
    },
    {
      text: '组件库',
      collapsed: true,
      items: [
        { text: 'Wpf', link: '/netopensource/assembly/wpf' },
        { text: 'MAUI', link: '/netopensource/assembly/maui' },
        { text: 'Blazor', link: '/netopensource/assembly/blazor' },
        { text: 'WinForm', link: '/netopensource/assembly/winfrom' },
      ],
    },
    {
      text: '开源项目',
      collapsed: true,
      items: [
        { text: 'Web-后台管理', link: '/netopensource/project/web-admin' },
        { text: 'Shop', link: '/netopensource/project/shop' },
        { text: '博客', link: '/netopensource/project/blog' },
        { text: 'CMS', link: '/netopensource/project/cms' },
        { text: 'WPF', link: '/netopensource/project/wpf' },
        { text: 'Blazor', link: '/netopensource/project/blazor' },
        { text: '其他', link: '/netopensource/project/other' },
      ],
    },
  ],
  '/interview/': [
    {
      text: '面试题',
      base: '/interview',
      collapsed: true,
      items: [
        { text: '基础试题1', link: '/basepaper1' },
        { text: '基础试题2', link: '/basepaper2' },
        { text: '基础试题3', link: '/basepaper3' },
        { text: '基础试题4', link: '/basepaper4' },
        { text: '随机试题1', link: '/randompaper1' },
        { text: '随机试题2', link: '/randompaper2' },
        { text: '中高级开发工程师', link: '/intermediate1' },
        { text: '群友25k面试题', link: '/groupfriends25' },
        { text: '某公司.NET面试题1', link: '/intermediate3' },
        { text: '某公司.NET面试题2', link: '/zhiying' },
        { text: '某物流公司高级面试题', link: '/yuehai' },
      ],
    },
    {
      text: '专项面试',
      base: '/interview/special',
      collapsed: true,
      items: [
        { text: 'Redis高频', link: '/redis' },
        { text: 'Sqlserver高频', link: '/sqlserver' },
        { text: 'Mysql高频', link: '/mysql' },
        { text: 'RabbitMQ高频', link: '/rabbitmq' },
        { text: 'ASPNETCore笔试题', link: '/core' },
        { text: 'NET笔试题基础篇', link: '/net' },

      ],
    },
    {
      text: 'WPF面试',
      collapsed: true,
      items: [
        { text: '基础面试', link: '/interview/wpf/wpf_basepaper1' },
        {
          text: '核心面试',
          collapsed: true,
          base: 'interview/wpf',
          link: '',
          items: [
            { text: '初级', link: '/wpf_basepaper2_1' },
            { text: '中级', link: '/wpf_basepaper2_2' },
            { text: '高级', link: '/wpf_basepaper2_3' },
          ],
        },
      ],
    },
    {
      text: '上位机面试',
      collapsed: true,
      items: [
        { text: '基础面试', link: '/interview/upper_computer/tcp' },

      ],
    },
  ],
  '/article/': [
    {
      text: '学习路径',
      base: '/article/learn_path',
      items: [
        { text: '学习资料', link: '/index' },
        { text: 'AspNetCore', link: '/webapi' },
        { text: '上位机', link: '/upper_computer' },
        { text: 'WPF', link: '/wpf' },
      ],
    },
    {
      text: '学习系列',
      items: [
        {
          text: 'JS快速上手',
          collapsed: true,
          items: [
            {
              text: '1. 基础',
              link: '/article/learn_js/1_base',
            },
            { text: '2.进阶', link: '/article/learn_js/2_advaned' },
          ],
        },
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
          base: '/article/learn_design',
          link: '',
          items: [
            { text: '00.前言', link: '/00_index' },
            { text: '01.单例模式', link: '/01_Singleton' },
            { text: '02.工厂方法模式', link: '/02_FactoryMethod' },
            { text: '03.抽象工厂模式', link: '/03_AbstractFactory' },
            { text: '04.建造者模式', link: '/04_Builder' },
            { text: '05.原型模式', link: '/05_Prototype' },
            { text: '06.适配器模式', link: '/06_Adapter' },
            { text: '07.桥接模式', link: '/07_Bridge' },
            { text: '08.组合模式', link: '/08_Composite' },
            { text: '09.装饰器模式', link: '/09_Decorator' },
            { text: '10.外观模式', link: '/10_Facade' },
            { text: '11.享元模式', link: '/11_Flyweight' },
            { text: '12.代理模式', link: '/12_Proxy' },
            { text: '13.责任链模式', link: '/13_ChainOfResponsibility' },
            { text: '14.命令模式', link: '/14_Command' },
            { text: '15.解释器模式', link: '/15_Interpreter' },
            { text: '16.迭代器模式', link: '/16_Iterator' },
            { text: '17.中介者模式', link: '/17_Mediator' },
            { text: '18.备忘录模式', link: '/18_Memento' },
            { text: '19.观察者模式', link: '/19_Observer' },
            { text: '20.状态模式', link: '/20_State' },
            { text: '21.策略模式', link: '/21_Strategy' },
            { text: '22.模板方法模式', link: '/22_TemplateMethod' },
            { text: '23.访问者模式', link: '/23_Visitor' },
          ],
        },
        // {
        //     text: 'Flex布局技巧',
        //     collapsed: true,
        //     items: [{ text: '创建型模式', link: '/article/learn_design/01_creationtype' }],
        // },
      ],
    },
    { text: 'Csharp代码大全', link: '/article/csharp' },
    { text: 'DotNet知识技能大全', link: '/article/dotnetskill' },
    { text: 'Docker速通', link: '/article/docker' },
    { text: '前端工程化', link: '/article/frontend' },
    {
      text: '文章',
      items: [
        {
          text: '1. CentOS上Nginx用Certbot生成SSL证书',
          link: '/article/centos-nginx-cerbot-ssl',
        },
        { text: '2.HttpClient的简单用法', link: '/article/httpclient' },
        { text: '3.全局和隐式usings', link: '/article/globalusing' },
        { text: '4.nuget文件从C盘移到其它盘', link: '/article/nuget-remove' },
      ],
    },
    {
      text: '前端',
      items: [
        { text: 'NVM快速切换NodeJS版本', link: '/article/nvm' },
        { text: '快速删除node_modules文件夹', link: '/article/delete_mode_moules' },
        { text: '前端包的更新及卸载', link: '/article/update' },
      ],
    },
  ],
};
