import Theme from 'vitepress/theme';
import './style.css';
import { inBrowser } from 'vitepress';
import BlogTheme from '@sugarat/theme'

import mediumZoom from 'medium-zoom';
import { onMounted, watch, nextTick } from 'vue';
import { useData, useRoute } from 'vitepress';

import giscusTalk from 'vitepress-plugin-comment-with-giscus';
export default {
  // BlogTheme,
  extends: Theme,
  setup() {
    const route = useRoute();
    const initZoom = () => {
      // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );

    // Get frontmatter and route
    const { frontmatter } = useData();

    // giscus配置
    giscusTalk(
      {
        repo: 'pridejoy/netshare-doc', //仓库
        repoId: 'R_kgDOMA_NoA', //仓库ID
        category: 'Announcements', // 讨论分类
        categoryId: 'DIC_kwDOMA_NoM4CfoRO', //讨论分类ID
        mapping: 'pathname',
        inputPosition: 'bottom',
        lang: 'zh-CN',
      },
      {
        frontmatter,
        route,
      },
      //默认值为true，表示已启用，此参数可以忽略；
      //如果为false，则表示未启用
      //您可以使用“comment:true”序言在页面上单独启用它
      true
    );
  },
};
// export default Theme;
