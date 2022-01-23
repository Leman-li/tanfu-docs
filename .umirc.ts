import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'Tanfu',
  outputPath: 'docs-dist',
  mode: 'site',
  favicon: "/tanfu-docs/logo.png",
  logo: "/tanfu-docs/logo.png",
  base: '/tanfu-docs',
  publicPath: '/tanfu-docs/',
  navs: {
    // 多语言 key 值需与 locales 配置中的 key 一致
    'en-US': [
      null, // null 值代表保留约定式生成的导航，只做增量配置
      {
        title: 'GitHub',
        path: 'https://github.com/Leman-li/tanfu.js',
      },
    ],
    'zh-CN': [
      null, // null 值代表保留约定式生成的导航，只做增量配置
      {
        title: 'GitHub',
        path: 'https://github.com/Leman-li/tanfu.js',
      },
    ],
  },
  // more config: https://d.umijs.org/config
});
