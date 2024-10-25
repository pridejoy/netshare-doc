import { defineConfig, type DefaultTheme } from 'vitepress';
import sidebar from './sidebar';
import nav from './nav';
//https://sugarat.top/technology/learn/vitepress-plugin-rss.html
import { RssPlugin, RSSOptions } from 'vitepress-plugin-rss'
import { AnnouncementPlugin } from 'vitepress-plugin-announcement'
import { La51Plugin } from 'vitepress-plugin-51la'


const RSS: RSSOptions = {
  title: 'NetShare',
  baseUrl: "https://www.dotnetshare.com",
  copyright: 'Copyright (c) 2018-present, NetShare',
}
const base = '/netshare-doc/'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base,
  // 继承博客主题配置
  // extends: blogTheme,
  title: 'NetShare',
  description: 'DotNet分享',
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
  ],
  lastUpdated: true,
  sitemap: {
    hostname: 'https://www.dotnetshare.com/',
  },
  markdown: {
    lineNumbers: false,
  },
  themeConfig: {
    // logo: '/logo.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav,
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/pridejoy/netshare-doc' },
      {
        icon: {
          svg: '<svg t="1703483542872" class="icon" viewBox="0 0 1309 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6274" width="200" height="200"><path d="M1147.26896 912.681417l34.90165 111.318583-127.165111-66.823891a604.787313 604.787313 0 0 1-139.082747 22.263717c-220.607239 0-394.296969-144.615936-394.296969-322.758409s173.526026-322.889372 394.296969-322.889372C1124.219465 333.661082 1309.630388 478.669907 1309.630388 656.550454c0 100.284947-69.344929 189.143369-162.361428 256.130963zM788.070086 511.869037a49.11114 49.11114 0 0 0-46.360916 44.494692 48.783732 48.783732 0 0 0 46.360916 44.494693 52.090549 52.090549 0 0 0 57.983885-44.494693 52.385216 52.385216 0 0 0-57.983885-44.494692z m254.985036 0a48.881954 48.881954 0 0 0-46.09899 44.494692 48.620028 48.620028 0 0 0 46.09899 44.494693 52.385216 52.385216 0 0 0 57.983886-44.494693 52.58166 52.58166 0 0 0-57.951145-44.494692z m-550.568615 150.018161a318.567592 318.567592 0 0 0 14.307712 93.212943c-14.307712 1.080445-28.746387 1.768001-43.283284 1.768001a827.293516 827.293516 0 0 1-162.394168-22.296458l-162.001279 77.955749 46.328175-133.811485C69.410411 600.858422 0 500.507993 0 378.38496 0 166.683208 208.689602 0 463.510935 0c227.908428 0 427.594322 133.18941 467.701752 312.379588a427.463358 427.463358 0 0 0-44.625655-2.619261c-220.24709 0-394.100524 157.74498-394.100525 352.126871zM312.90344 189.143369a64.270111 64.270111 0 0 0-69.803299 55.659291 64.532037 64.532037 0 0 0 69.803299 55.659292 53.694846 53.694846 0 0 0 57.852923-55.659292 53.465661 53.465661 0 0 0-57.852923-55.659291z m324.428188 0a64.040926 64.040926 0 0 0-69.574114 55.659291 64.302852 64.302852 0 0 0 69.574114 55.659292 53.694846 53.694846 0 0 0 57.951145-55.659292 53.465661 53.465661 0 0 0-57.951145-55.659291z" p-id="6275"></path></svg>',
        },
        link: '/aboutme.html',
        // You can include a custom label for accessibility too (optional but recommended):
        ariaLabel: 'wechat',
      },
    ],
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
  vite: {
    plugins: [
      RssPlugin(RSS),
      AnnouncementPlugin({
        title: '公告',
        duration: -1,
        twinkle: true,
        body: [
          { type: 'text', content: '👇公众号👇 ---👇 微信 👇' },
          {
            type: 'image',
            src: '/images/netfenxiang.png',
            style: 'display: inline-block;width:46%;padding-right:6px'
          },
          {
            type: 'image',
            src: '/images/QQ20240918-102756.png',
            style: 'display: inline-block;width:46%;padding-left:6px'
          }
        ],
        footer: [
          {
            type: 'text',
            content: '欢迎大家私信&加群交流'
          },
          {
            type: 'button',
            content: '关于作者',
            link: '/aboutme.html'
          },
          // {
          //   type: 'button',
          //   content: '加群交流',
          //   link: 'https://theme.sugarat.top',
          //   props: {
          //     type: 'success'
          //   }
          // },
        ],
      }),
      La51Plugin({
        id: '3HLVg3ji8KgRiH3O',
        ck: '3HLVg3ji8KgRiH3O'
      })
    ],


  }
});
