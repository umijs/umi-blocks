
export default {
  plugins: [
    ['umi-plugin-block-dev', {
      layout: process.env.LAYOUT || 'ant-design-pro',
      menu: {
        name: process.env.BLOCK,
        icon: 'home',
      },
    }],
    ['umi-plugin-react', {
      'dva': true,
      'antd': true,
    }],
    require.resolve('./plugin'),
  ],
};
