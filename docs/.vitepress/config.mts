import { defineConfig, type DefaultTheme } from 'vitepress';
import sidebar from './sidebar';
import nav from './nav';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'DotNet技术分享',
    description: 'DotNet技术分享',
    head: [
        // 站点图标
        ['link', { rel: 'icon', href: '/icon/favicon.ico' }],
        // SEO
        [
            'meta',
            {
                name: 'keywords',
                content:
                    '迷恋的知识库, netshare, Dotnet, Net, Net7, 迷恋自留地, 今晚打老虎, NetShare, Net分享, Net开源项目, Dotnet面试知识库',
            },
        ],
        // webfont
        ['link', { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' }],
        ['link', { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' }],
        [
            'link',
            { rel: 'preconnect', crossorigin: 'anonymous', href: 'https://fonts.googleapis.com' },
        ],
        [
            'link',
            { rel: 'preconnect', crossorigin: 'anonymous', href: 'https://fonts.gstatic.com' },
        ],
        // og
        ['meta', { property: 'og:url', content: 'https://www.dotnetshare.com/' }],
        ['meta', { property: 'og:locale', content: 'zh_CN' }],
        // 百度统计
        [
            'script',
            {},
            `
          var _hmt = _hmt || [];
          (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?cc5a66c545a0dc6ac6f0b83090e2b806";
            var s = document.getElementsByTagName("script")[0]; 
            s.parentNode.insertBefore(hm, s);
          })();
        `,
        ],
        // 1
        ['script', { charset: 'UTF-8', id: 'LA_COLLECT', src: '//sdk.51.la/js-sdk-pro.min.js' }],
        // 2
        [
            'script',
            {},
            ` 
               LA.init({id:"3HLVg3ji8KgRiH3O",ck:"3HLVg3ji8KgRiH3O"})
            `,
        ],
    ],
    lastUpdated: true,
    sitemap: {
        hostname: 'https://www.dotnetshare.com/',
    },
    markdown: {
        lineNumbers: true,
    },
    themeConfig: {
        logo: '/icon/logo.png',

        // https://vitepress.dev/reference/default-theme-config
        nav,
        sidebar,
        // socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
        footer: {
            message:
                '迷恋自留地 | MIT License | <a href="https://beian.miit.gov.cn/" target="_blank">豫ICP备19020414号</a>',
            copyright: `版权所有 © 2019-${new Date().getFullYear()} | DotNET技术分享`,
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
            level: [2, 4],
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
